import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  imports: [],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss'
})
export class RESETPASSWORDComponent {

  constructor(private router: Router) {}

  goToRegister():void{
    this.router.navigate(['/register'])
  }
  goToLogin():void{
    this.router.navigate(['/login'])
  }

}
