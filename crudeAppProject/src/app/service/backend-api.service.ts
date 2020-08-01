import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
baseUrl:string='https://tasksmanager-302f5.firebaseio.com/';
  constructor(private http: HttpClient) { }
  getDetails():Observable<any[]>{
    let endPoint ='Task.json';
    return this.http.get<any[]>(this.baseUrl+endPoint)
  }
  postDetails(data):Observable<any[]>{
    let endPoint =data.title ? data.title : 'Task' +'.json';
    return this.http.post<any[]>(this.baseUrl +endPoint,data)
  }
  deleteDetails(data,task):Observable<any[]>{
    let endPoint =data +'.json';
    return this.http.get<any[]>(this.baseUrl+endPoint)
  }
}

