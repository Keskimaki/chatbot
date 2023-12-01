type User = {
  id: string
  username: string
  isAdmin: boolean
}

declare namespace Express {
  export interface Request {
    user: User
  }
}
