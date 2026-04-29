import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly httpClient=inject(HttpClient);

  getUserProfile():Observable<any>{
    return this.httpClient.get(`${enviroment.basUrl}/api/users/profile`)
  }
  updateUserProfile(data:object):Observable<any>{
  return this.httpClient.patch(`${enviroment.basUrl}/api/users/profile`,data)
  }
  changePassword(data:object):Observable<any>{
    return this.httpClient.post(`${enviroment.basUrl}/api/users/change-password`,data)
  }
    requestNewEmail(data:string):Observable<any>{
    return this.httpClient.post(`${enviroment.basUrl}/api/users/email/request`,data)
  }
      confirmEmail(data:string):Observable<any>{
    return this.httpClient.post(`${enviroment.basUrl}/api/users/email/confirm`,data)
  }
   deleteUser():Observable<any>{
    return this.httpClient.delete(`${enviroment.basUrl}/api/users/account`)
  }

}
