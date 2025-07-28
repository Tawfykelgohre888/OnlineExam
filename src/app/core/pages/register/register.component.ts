import { Component, inject } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private router:Router){}

  // Nav Login
  navLogin():void{
    this.router.navigate(['/login'])
  }


}
