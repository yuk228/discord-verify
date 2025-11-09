import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions } from '@/services/session'
import { SessionData } from '@/entities/session'
import { InternalServerError, NotFound, Ok } from '@/services/api/response'

export async function GET(req: NextRequest) {
  const res = new NextResponse()
  try {
    const session = await getIronSession<SessionData>(req, res, sessionOptions)

    if (!session.csrfToken) {
      return NotFound()
    }

    return Ok({ token: session.csrfToken })
  } catch (error) {
    console.error('Error in /api/csrf:', error)
    return InternalServerError()
  }
}
