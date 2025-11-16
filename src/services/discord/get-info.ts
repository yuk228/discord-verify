import { User } from '@/entities/user'
import { IPInfo } from '@/entities/logger'

interface GetInfoProps {
  accessToken: string
}

export async function getInfo({ accessToken }: GetInfoProps): Promise<User> {
  try {
    const res = await fetch(`https://discord.com/api/users/@me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch user info: ${res.status}`)
    }

    const userInfo = await res.json()
    return userInfo
  } catch (error) {
    console.log('Error in getInfo:', error)
    throw error
  }
}

interface GetIpInfoProps {
  ip: string
}

export async function getIpInfo({ ip }: GetIpInfoProps): Promise<IPInfo> {
  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json`)

    if (!response.ok) {
      throw new Error(`Failed to fetch IP info: ${response.status}`)
    }

    const data = await response.json()
    return data as IPInfo
  } catch (error) {
    console.log('Error in getIpInfo:', error)
    throw error
  }
}
