
  export interface IUserProfile {
  status: boolean
  code: number
  payload: Payload
}

export interface Payload {
  user: User
}

export interface User {
  id: string
  username: string
  email: string
  phone: string
  firstName: string
  lastName: string
  profilePhoto: any
  emailVerified: boolean
  phoneVerified: boolean
  role: string
  createdAt: string
  updatedAt: string
}


