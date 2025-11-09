import { User } from './user'

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
