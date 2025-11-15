import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions } from '@/services/session'
import { SessionData } from '@/entities/session'
import crypto from 'crypto'

export async function GET(req: NextRequest) {
  const res = new NextResponse()
  try {
    const session = await getIronSession<SessionData>(req, res, sessionOptions)
    const code = req.nextUrl.searchParams.get('code')

    const csrfToken = crypto.randomBytes(32).toString('hex')

    session.code = code ?? ''
    session.csrfToken = csrfToken
    await session.save()

    return createRedirectResponse('/verify', res)
  } catch (error) {
    console.error('Error in api/callback:', error)
    return NextResponse.redirect(new URL('/error', process.env.BASE_URL))
  }
}

function createRedirectResponse(path: string, res: NextResponse): NextResponse {
  const redirectUrl = new URL(path, process.env.BASE_URL)
  const response = NextResponse.redirect(redirectUrl)
  const cookies = res.headers.getSetCookie()
  cookies.map(cookie => {
    response.headers.append('Set-Cookie', cookie)
  })

  return response
}
