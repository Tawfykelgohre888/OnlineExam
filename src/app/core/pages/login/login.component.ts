import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
constructor(private router: Router){}


  goRegister():void{
    this.router.navigate(['/register'])
  }


  goChangePass():void{
    this.router.navigate(['/ChangePassword'])
  }



}
