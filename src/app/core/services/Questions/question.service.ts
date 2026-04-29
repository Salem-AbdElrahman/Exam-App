import { HttpClient } from '@angular/common/http';
import {  inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class QuestionService  {
private readonly httpClient=inject(HttpClient)

getAllQuestions(id:string|null):Observable<any>{
  return this.httpClient.get(`${enviroment.basUrl}/api/questions/exam/${id}`)
}
  submitAnswers(data:{examId:string,answers:{questionId:string,answerId:string}[]}):Observable<any>{
    return this.httpClient.post(`${enviroment.basUrl}/api/submissions`,data)
  }
  getResult(id:string | null):Observable<any>{
    return this.httpClient.get(`${enviroment.basUrl}/api/submissions/${id}`)
  }
}
