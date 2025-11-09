import { SessionOptions } from 'iron-session'

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD!,
  cookieName: 'auth',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60,
  },
}
