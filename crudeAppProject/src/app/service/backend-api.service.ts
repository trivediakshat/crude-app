import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
baseUrl:string='https://tasksmanager-302f5.firebaseio.com/Task.json';
  constructor(private http: HttpClient) { }
  getDetails():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl)
  }
  postDetails(data):Observable<any[]>{
    let endPoint ='Task';
    delete data.title;
    return this.http.post<any[]>(`https://tasksmanager-302f5.firebaseio.com/${endPoint}.json`,data);
  }
  putDetails(data):Observable<any[]>{
    let endPoint =data.title;
    delete data.title;
    return this.http.put<any[]>(`https://tasksmanager-302f5.firebaseio.com/Task/${endPoint}.json`,data);
  }
  deleteDetails(data,task):Observable<any[]>{
    let endPoint =data;
    return this.http.delete<any[]>(`https://tasksmanager-302f5.firebaseio.com/Task/${endPoint}.json`)
  }
}

