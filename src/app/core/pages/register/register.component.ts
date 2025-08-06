import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../../projects/auth/src/public-api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private toster:ToastrService ){}
  _authService = inject(AuthService)

  registerForm = new FormGroup({
    username: new FormControl('',[Validators.maxLength(10),Validators.minLength(4)]),
    firstName:new FormControl('',[Validators.maxLength(10),Validators.minLength(4)]),
    lastName:new FormControl('',[Validators.maxLength(10),Validators.minLength(4)]),
    email:new FormControl('',Validators.email),
    password:new FormControl('',Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$')),
    rePassword:new FormControl('',Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$')),
    phone:new FormControl('',Validators.pattern('^01[0-2,5][0-9]{8}$'))
  })


  submitRegisterForm(){
    this._authService.REGISTER(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.toster.success(res.message)
      },error:(err)=> {
        console.log(err);
        this.toster.error(err.error.message)
      },
    })
  }



}
