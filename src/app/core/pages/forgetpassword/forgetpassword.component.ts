import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../projects/auth/src/public-api';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from "../../../layout/authlayout/navbar/navbar.component";

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule, NavbarComponent],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  constructor(private toster: ToastrService, private router: Router) {}
  _authService = inject(AuthService);

  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  FORGETPASSWORD(): void {
    this._authService.FORGETPASSWORD(this.emailForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.toster.success(res.message);
        this.router.navigate(['/verifyresetcode']);
      },
    });
  }
}
