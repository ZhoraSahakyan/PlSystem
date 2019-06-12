import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) {
  }

  public getTasks(): Observable<any> {
    return this.http.get('./assets/json/tasks.json');
  };
}
