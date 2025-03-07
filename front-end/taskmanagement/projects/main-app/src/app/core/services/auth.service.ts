import { HttpClient, HttpHeaders } from "@angular/common/http";
import { computed, Injectable, signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'  
})
export class AuthService {

  private apiUrl = 'http://localhost:5036/api/Auth';
  private _currentUser = signal<User | null>(null)
  currentUser = this._currentUser.asReadonly()
  isConnected = computed(() => this.currentUser() !== null)
  
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {}

    login(credentials: { email: string; password: string }): Observable<{
      user: User, token: string
    }> {
    return this.http.post<{
      user: User,
      token: string
    }>(`${this.apiUrl}/Login`, credentials, { withCredentials: true, headers: this.headers })
       .pipe(
        tap(response => {
          //localStorage.setItem('authToken', response.token); 
          this._currentUser.set(response.user); 
          console.log('_currentUser:', this._currentUser);
      })
    );
  }

  // Méthode pour rafraîchir les tokens. Utilisée par l'intercepteur HTTP
  revokeToken(credentials: { email: string; refreshToken: string }):Observable<{
    user: User, token: string
  }> {
    return this.http.post<any>(`${this.apiUrl}/RefreshToken`, credentials, { withCredentials: true })
      .pipe(
        tap(response => {
          this._currentUser.set(response.user); 
          console.log('Tokens refreshed successfully');
        })
      );
  }

  logout(credentials: { email: string }): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/Logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this._currentUser.set(null);
          console.log('User logged out successfully');
        })
      );
  }

  isAuthenticated(): boolean {
    if (this.isConnected() === null) {
      return false;
    }
    return true;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}