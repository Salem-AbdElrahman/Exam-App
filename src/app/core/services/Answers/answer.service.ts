import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private readonly httpClient=inject(HttpClient);

  getAllAnswers():Observable<any>{
    return this.httpClient.get(`${enviroment.basUrl}`)
  }

}
