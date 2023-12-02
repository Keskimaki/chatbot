import { roles } from './config'

export type Role = (typeof roles)[number]

export type OpenaiMessage = {
  role: Role
  content: string
}
