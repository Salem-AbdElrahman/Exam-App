import { Injectable } from '@angular/core';
import { Adaptor } from '../interfaces/adaptor';
import { loginRes } from '../interfaces/login';
import { confirmEmailRes, registerRes, sendEmailReq, sendEmailRes } from '../interfaces/register';
import { ForgotPasswordRes } from '../interfaces/forgot-password';
import { ResetPasswordRes } from '../interfaces/reset-password';

@Injectable({
  providedIn: 'root',
})
export class AuthAdaptor implements Adaptor {

  adapt(data:{status:boolean,payload:{user:{email:string},token:string}}):loginRes{
    return{
      status:data.status,
      email:data.payload.user.email,
      token:data.payload.token
    }
  }

  adaptSend(data:{message:string}):sendEmailRes{
    return{
      message:data.message
    }
  }

   adaptConfirm(data:{status:boolean,message:string}):confirmEmailRes{
    return{
      status:data.status,
      message:data.message
    }
  }
   adaptRegister(data:{status:boolean,payload:{user:{email:string}},token:string}):registerRes{
    return{
      status:data.status,
      email:data.payload.user.email,
      token:data.token
    }
  }
    adaptForgotPassword(data: {message:string,status:boolean}):ForgotPasswordRes {
   return{
    message:data.message,
    status:data.status
   }
  }
    adaptresetPassword(data: {message:string,status:boolean}) :ResetPasswordRes{
    return{
      message:data.message,
      status:data.status

    }
  }
}
