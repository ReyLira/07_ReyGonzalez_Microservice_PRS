import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Cliente } from '../model/Cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = 'http://localhost:8080/v1/funcionary';

  constructor(private httpClient: HttpClient) {

  }

  consultarCliente(): Observable<Cliente[]>{
      return this.httpClient.get<Cliente[]>(this.baseUrl).pipe(map(res => res));
  }

  saveCliente(request:any): Observable<any>{
    return this.httpClient.post<any>(this.baseUrl, request).pipe(map (res => res));
  }

  updateCliente(request: any): Observable<any> {
    const id = request.id; 
    return this.httpClient.put<any>(`${this.baseUrl}/${id}`, request).pipe(map(res => res));
  }
  

  deleteCliente(id: number): Observable<any> {
    return this.httpClient.delete<any>('http://localhost:8080/v1/funcionary/'+ id).pipe(map(resp => resp));
  }

}
