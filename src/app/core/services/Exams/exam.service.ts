import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private readonly httpClient=inject(HttpClient);

  getAllExams(id:string|null):Observable<any>{
    return this.httpClient.get(`${enviroment.basUrl}/api/exams?diplomaId=${id}&page=1&limit=12`)
  }
    getExamById(id:string|null):Observable<any>{
    return this.httpClient.get(`${enviroment.basUrl}/api/exams/${id}`)
  }

}
