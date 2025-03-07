import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
 providedIn:'root'
})

export class UserService {

  constructor() { }
  private http = inject(HttpClient); 
  private apiUrl = 'http://localhost:5036/api/Auth/register';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',  
  });
  

  
  createUser(user: User): Observable<User> {
    const res = this.http.post<User>(this.apiUrl, user, { headers: this.headers });
    return res;
  }
  
}