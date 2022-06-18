import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private authenticationSerice: AuthenticationService,
  ) {}

  ngOnInit(): void {
    
  }

  login(formValues: any): void {
    this.authenticationSerice.login(formValues.email, formValues.password);
  }
}
