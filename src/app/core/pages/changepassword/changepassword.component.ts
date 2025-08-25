import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../../projects/auth/src/public-api';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from "../../../layout/authlayout/navbar/navbar.component";

@Component({
  selector: 'app-changepassword',
  imports: [ReactiveFormsModule, RouterLink, NavbarComponent],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent {
  constructor(private toster:ToastrService){}
  _authService = inject(AuthService)



  submitPassword = new FormGroup ({
    createPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
  })

  RESETPASSWORD():void{
    this._authService.RESETPASSWORD(this.submitPassword.value).subscribe({
      next:(res)=>{
        console.log(res);
      }
    })
  }
}
