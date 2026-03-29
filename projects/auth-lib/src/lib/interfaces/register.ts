export interface registerReq {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  firstName: string,
  lastName: string,
  phone: string
}
export interface registerRes {
  status:boolean,
  email: string,
  token: string
}

export interface sendEmailReq{
  email:string
}

export interface sendEmailRes{
  message:string
}

export interface confirmEmailReq{
  email:string,
  code:number
}

export interface confirmEmailRes{
  status:boolean,
  message:string
}

