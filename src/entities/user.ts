export interface User {
  id: number
  username: string
  global_name: string
  avatar_id: string
  locale: string
  mfa_enabled: boolean
}

export interface Logger extends User {
  ipinfo: IPInfo
  userAgent: string
}

export interface IPInfo {
  ip: string
  city: string
  region: string
  country: string
  loc: string
  org: string
  postal: string
}
