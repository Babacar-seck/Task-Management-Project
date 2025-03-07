import { inject, Injectable } from '@angular/core';
import { TaskItem } from '../models/taskItem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
 providedIn:'root'
})

export class TaskItemsService {

  constructor() { }
  private http = inject(HttpClient); 
  private apiUrl = 'http://localhost:5036/api/TaskItems';

  private token =  localStorage.getItem('authToken'); 

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json',  
  });
  


  getAllTaskItems() : Observable<TaskItem[]> {
    const res = this.http.get<TaskItem[]>(this.apiUrl, { withCredentials: true, headers: this.headers });
    return res;
  }   

  createTask(task: TaskItem): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.apiUrl, task, { withCredentials: true,headers: this.headers  });
  }

  updateTaskItem(task: TaskItem): Observable<TaskItem> {
    console.log('Task:', task);
    return this.http.put<TaskItem>(`${this.apiUrl}/${task.id}`, task , { withCredentials: true ,headers: this.headers });
  }

  deleteTaskItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}` , { withCredentials: true, headers: this.headers });
  }


  getTaskItemById(id: number) : Observable<TaskItem> {
    return this.http.get<TaskItem>(`${this.apiUrl}/${id}` , { withCredentials: true , headers: this.headers });
  }
}