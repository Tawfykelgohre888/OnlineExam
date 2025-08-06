import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../../projects/auth/src/public-api';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-changepassword',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent {
  constructor(private toster:ToastrService){}
_authService = inject(AuthService)
  emailForm= new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email])
  })


  FORGETPASSWORD():void{
    this._authService.FORGETPASSWORD(this.emailForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.toster.success(res.message)
      },error:(err)=>{
        this.toster.error(err.error.message)
        console.log(err);
      }
    })
  }

}
