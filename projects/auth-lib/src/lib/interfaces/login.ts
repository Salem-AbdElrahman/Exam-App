export interface loginReq{
  username: string,
  password: string

}
export interface loginRes{
  status: boolean,
  email: string,
  token: string

}

