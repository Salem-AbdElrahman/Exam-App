
  export interface IChangePassword {
  status: boolean
  code: number
  message: string
  errors: Error[]
}

export interface Error {
  path: string
  messages: string[]
}

