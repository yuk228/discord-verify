import { User } from '@/entities/user'
import { IpInfo } from '@/entities/logger'

export async function getAccessToken(code: string) {
  try {
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: `${process.env.BASE_URL}/api/callback`,
    }).toString()

    const response = await fetch(`https://discord.com/api/v10/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
          ).toString('base64'),
      },
      body: body,
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch token: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.log('Error in get token from discord:', error)
    throw error
  }
}

export async function getInfo(accessToken: string): Promise<User> {
  try {
    const response = await fetch(`https://discord.com/api/users/@me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.log('Error in getInfo:', error)
    throw error
  }
}

export async function getIpInfo(ip: string): Promise<IpInfo> {
  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json`)

    if (!response.ok) {
      throw new Error(`Failed to fetch IP info: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.log('Error in getIpInfo:', error)
    throw error
  }
}
