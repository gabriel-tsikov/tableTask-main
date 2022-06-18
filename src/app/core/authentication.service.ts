import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): void {
    this.http.post('http://localhost:3000/user', { email: email, password: password }).pipe().subscribe(() => {
      this.router.navigate(['home']);
    });
  }
}
