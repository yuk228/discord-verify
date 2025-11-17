import { User } from '@/generated/prisma'
import { prisma } from '../../../prisma/prisma'

export async function getUsersFromIp(ip: string): Promise<User[]> {
  const users = await prisma.user.findMany({
    where: {
      ip: ip,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return users
}

export async function isAlt(
  ip: string
): Promise<{ isAlt: boolean; users: User[] }> {
  const users = await getUsersFromIp(ip)
  return {
    isAlt: users.length > 1,
    users: users,
  }
}

export async function getUserFromUserId(userId: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      userId: userId,
    },
  })
  return user
}

export async function getUserFromId(id: number): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  })
  return user
}
