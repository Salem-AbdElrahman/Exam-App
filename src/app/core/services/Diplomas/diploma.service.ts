import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class DiplomaService {
private readonly httpClient= inject(HttpClient);





getAllDiplomas():Observable<any>{
 return this.httpClient.get(`${enviroment.basUrl}/api/diplomas?page=1&limit=12`);
}

}
