import { User } from '@/entities/user'
import { IPInfo } from '@/entities/logger'

export async function getInfo(accessToken: string): Promise<User> {
  try {
    const res = await fetch(`https://discord.com/api/users/@me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const userInfo = await res.json()
    return userInfo
  } catch (error) {
    console.log('Error in getInfo:', error)
    throw error
  }
}

interface GetInfoProps {
  ip: string
}

export async function getIpInfo({ ip }: GetInfoProps): Promise<IPInfo> {
  try {
    const response = await fetch(
      `https://ipinfo.io/${ip}?token=${process.env.IPINFO_TOKEN || ''}`
    )

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
