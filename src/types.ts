import { roles } from './config'

export type Role = (typeof roles)[number]

export type Message = {
  role: Role
  content: string
}
