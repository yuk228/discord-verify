import { User } from '@/generated/prisma'
import { LoggerDto } from '@/entities/user'
import { prisma } from '../../../prisma/prisma'

export async function createUser({ logger }: { logger: LoggerDto }) {
  const user = await prisma.user.upsert({
    where: {
      userId: logger.id.toString(),
    },
    update: {
      ip: logger.ipinfo.ip,
      userAgent: logger.userAgent,
      userName: logger.username,
      globalName: logger.global_name || logger.username,
      avatarId: logger.avatar_id || '',
      locale: logger.locale || 'en',
      mfaEnabled: logger.mfa_enabled || false,
    },
    create: {
      ip: logger.ipinfo.ip,
      userAgent: logger.userAgent,
      userId: logger.id.toString(),
      userName: logger.username,
      globalName: logger.global_name || logger.username,
      avatarId: logger.avatar_id || '',
      locale: logger.locale || 'en',
      mfaEnabled: logger.mfa_enabled || false,
    },
  })
  return user
}

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
