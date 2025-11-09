import { logger } from '@/services/discord/logger'
import { NextRequest, NextResponse } from 'next/server'
import { assignRole } from '@/services/discord/assign-role'
import { getInfo, getIpInfo } from '@/services/discord/get-info'
import { getToken, verifyToken } from '@/services/discord/verify'
import { getIronSession } from 'iron-session'
import { sessionOptions } from '@/services/session'
import { SessionData } from '@/entities/session'
import { BadRequest, InternalServerError, Ok } from '@/services/api/response'
import { usingVpn } from '@/services/vpn/vpn-check'

export async function POST(req: NextRequest) {
  const res = new NextResponse()
  const session = await getIronSession<SessionData>(req, res, sessionOptions)
  try {
    const body = await req.json()
    const { token } = body
    const csrfToken = req.headers.get('X-CSRF-Token')
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0] ||
      req.headers.get('x-real-ip') ||
      ''
    const userAgent = req.headers.get('user-agent') || ''

    if (userAgent.length > 256) {
      console.error('User-Agent too long', { length: userAgent.length })
      return BadRequest()
    }
    if (!token || !csrfToken || !session.code) {
      console.error(
        'Missing required parameters: token, csrfToken, or session.code not found',
        { token: !!token, csrfToken: !!csrfToken, code: !!session.code }
      )
      return BadRequest()
    }

    if (!session.csrfToken || session.csrfToken !== csrfToken) {
      console.error('CSRF token is incorrect', {
        sessionToken: session.csrfToken,
        headerToken: csrfToken,
      })
      return BadRequest()
    }

    await verifyToken(token)
    const getTokenResult = await getToken(session.code as string)
    const userInfo = await getInfo(getTokenResult.access_token)
    const ipInfo = await getIpInfo({ ip })
    const isVpn = usingVpn(ipInfo.org)

    if (isVpn) {
      await logger({
        logger: {
          ...userInfo,
          ipinfo: ipInfo,
          userAgent,
        },
        type: 'vpn',
      })
      return BadRequest()
    } else {
      await assignRole(userInfo.id.toString())
      await logger({
        logger: {
          ...userInfo,
          ipinfo: ipInfo,
          userAgent,
        },
        type: 'success',
      })
    }

    session.code = undefined
    session.csrfToken = undefined
    await session.save()

    return Ok()
  } catch (error) {
    console.error('Error in /api/verify:', error)

    session.code = undefined
    session.csrfToken = undefined
    await session.save()

    return InternalServerError()
  }
}
