import { User } from './user'

export interface Logger extends User {
  ipinfo: IpInfo
  userAgent: string
}

export interface IpInfo {
  ip: string
  city: string
  region: string
  country: string
  loc: string
  org: string
  postal: string
}
