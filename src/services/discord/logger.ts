import { Logger } from '@/entities/logger'

interface Props {
  logger: Logger
  type: 'success' | 'vpn'
}

export async function logger({ logger, type }: Props) {
  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK || ''

    const fields = [
      {
        name: '👤 User',
        value: `${logger.global_name}(${logger.username})`,
        inline: false,
      },
      {
        name: '✉️ User Infomation',
        value: `ID: \`${logger.id}\`\nLang: \`${logger.locale}\`\nMFA: \`${logger.mfa_enabled}\``,
        inline: false,
      },
      {
        name: '🌏 IP Infomation',
        value: `IP: \`${logger.ipinfo.ip}\`\nAddress: \`${logger.ipinfo.city} ${logger.ipinfo.region}, ${logger.ipinfo.country}\`\nLocation: \`${logger.ipinfo.loc}\`\nPostal: \`${logger.ipinfo.postal}\`\nOrg: \`${logger.ipinfo.org}\``,
        inline: false,
      },
      {
        name: '💻 System Infomation',
        value: `UserAgent: \`${logger.userAgent}\``,
      },
    ]

    const embed = {
      title: type === 'success' ? '✅ Success' : '⚠️ VPN Detected',
      fields: fields,
      thumbnail: {
        url: `https://cdn.discordapp.com/avatars/${logger.id}/${logger.avatar_id}.png`,
      },
      color: 0x7e22d2,
      timestamp: new Date().toISOString(),
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    })

    if (!response.ok) {
      throw new Error('Webhook request failed')
    }
  } catch (error) {
    console.log('Error in logger:', error)
    throw error
  }
}
