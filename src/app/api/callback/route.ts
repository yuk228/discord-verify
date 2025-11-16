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

    return NextResponse.redirect(new URL('/verify', process.env.BASE_URL), {
      headers: res.headers,
    })
  } catch (error) {
    console.error('Error in api/callback:', error)
    return NextResponse.redirect(new URL('/error', process.env.BASE_URL))
  }
}
