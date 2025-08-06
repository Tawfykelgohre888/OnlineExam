import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../../projects/auth/src/lib/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent   {
constructor(private router: Router,private toster:ToastrService){}

_authService = inject(AuthService)

loginForm = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  ])
});

  // start Logic Login
  LoginPOst(){
    this._authService.LOGIN(this.loginForm.value).subscribe({
      next:(res)=>{
        localStorage.setItem('userToken',res.token);
        this.router.navigate(['/dashboard'])
        this.toster.success(res.message)
        console.log(res);
      },error:(err)=>{
        console.log(err);
        this.toster.error(err.error.message)
      }
    })
  }


}
