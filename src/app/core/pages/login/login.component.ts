import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../../projects/auth/src/lib/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../../../layout/authlayout/navbar/navbar.component';
import { FooterComponent } from '../../../layout/authlayout/footer/footer.component';
import {
  email,
  required,
  storePasswordValidator,
} from '../../../shared/validators/validators';
import { CommonModule } from '@angular/common';
import { AppInputComponent } from '../../../shared/components/Form/app-input/app-input.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NavbarComponent,
    FooterComponent,
    CommonModule,
    AppInputComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private toster: ToastrService,
  ) {}

  _authService = inject(AuthService);
  passwordVisible: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [required, email]),
    password: new FormControl('', [required, storePasswordValidator]),
  });

  // start Logic Login
  LoginPost() {
    const payload = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };
    if (this.loginForm.valid) {
      this._authService.LOGIN(payload).subscribe({
        next: (res) => {
          localStorage.setItem('userToken', res.token);
          this.toster.success(res.message);
          this.router.navigate(['/mainLayout/dashboard']);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
