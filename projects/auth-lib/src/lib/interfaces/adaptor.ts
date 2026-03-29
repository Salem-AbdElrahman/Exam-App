

export interface Adaptor {
  adapt(data:any):any
  adaptSend(data:any):any
  adaptConfirm(data:any):any
  adaptRegister(data:any):any
  adaptForgotPassword(data:any):any
  adaptresetPassword(data:any):any
}
