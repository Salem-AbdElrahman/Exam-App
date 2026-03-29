import { Observable } from "rxjs";
import { loginReq, loginRes } from "../../interfaces/login";
import { confirmEmailReq, confirmEmailRes, registerReq, registerRes, sendEmailReq, sendEmailRes } from "../../interfaces/register";
import { ForgotPasswordReq, ForgotPasswordRes } from "../../interfaces/forgot-password";

export abstract class authAPI {

  abstract  login(data:loginReq) : Observable<loginRes>
  abstract  sendEmailVerification(data:sendEmailReq) : Observable<sendEmailRes>
  abstract  confirmEmailVerification(data:confirmEmailReq) : Observable<confirmEmailRes>
  abstract  register(data:registerReq) : Observable<registerRes>
  abstract  forgotPassword(data:ForgotPasswordReq) : Observable<ForgotPasswordRes>
  abstract  resetPassword(data:any) : Observable<any>
  abstract saveUserData():void

}
