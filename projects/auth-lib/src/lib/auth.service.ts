import { inject, Injectable } from '@angular/core';
import { authAPI } from './adaptor/base/authAPI';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthEndPoints } from './enums/AuthEndPoint';
import { AuthAdaptor } from './adaptor/auth-adaptor';
import { loginReq, loginRes } from './interfaces/login';
import { confirmEmailReq, confirmEmailRes, registerReq, registerRes, sendEmailReq, sendEmailRes } from './interfaces/register';
import { ForgotPasswordReq, ForgotPasswordRes } from './interfaces/forgot-password';
import { ResetPasswordReq, ResetPasswordRes } from './interfaces/reset-password';
import{jwtDecode}from '../../node_modules/jwt-decode'
@Injectable({
  providedIn: 'root',
})
export class AuthService implements authAPI {


  private readonly _httpClient=inject(HttpClient)
  private readonly _authAdaptor=inject(AuthAdaptor)
  userData:any=null
//login
 login(data: loginReq): Observable<loginRes> {
  return this._httpClient.post<loginRes>(AuthEndPoints.login,data)
  .pipe(map((res: any)=> this._authAdaptor.adapt(res)), catchError(err=>of(err)))
}

//register

   sendEmailVerification(data: sendEmailReq): Observable<sendEmailRes> {
    return this._httpClient.post<sendEmailRes>(AuthEndPoints.sendEmailVerification,data)
    .pipe(map((res:any)=> this._authAdaptor.adaptSend(res)),catchError(err=>of(err)))
  }

     confirmEmailVerification(data: confirmEmailReq): Observable<confirmEmailRes> {
    return this._httpClient.post<confirmEmailRes>(AuthEndPoints.confirmEmailVerification,data)
    .pipe(map((res:any)=> this._authAdaptor.adaptConfirm(res)),catchError(err=>of(err)))
  }
   register(data: registerReq): Observable<registerRes> {
     return this._httpClient.post<registerRes>(AuthEndPoints.register,data)
    .pipe(map((res:any)=> this._authAdaptor.adaptRegister(res)),catchError(err=>of(err)))
  }

//forgotpassword
   forgotPassword(data: ForgotPasswordReq): Observable<ForgotPasswordRes> {
      return this._httpClient.post<ForgotPasswordRes>(AuthEndPoints.forgotPassword,data)
    .pipe(map((res:any)=> this._authAdaptor.adaptForgotPassword(res)),catchError(err=>of(err)))
  }

//resetPassword
   resetPassword(data: ResetPasswordReq): Observable<ResetPasswordRes> {
      return this._httpClient.post<ResetPasswordRes>(AuthEndPoints.resetPassword,data)
    .pipe(map((res:any)=> this._authAdaptor.adaptresetPassword(res)),catchError(err=>of(err)))
  }

     saveUserData(): any {
    if(localStorage.getItem('userToken')!== null){
   return this.userData =  jwtDecode(localStorage.getItem('userToken') !);
    }
  }

}
