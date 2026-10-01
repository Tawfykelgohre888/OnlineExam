import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../../../projects/auth/src/lib/auth.service';
import { ToastrService } from 'ngx-toastr';
import {
  required,
  storePasswordValidator,
} from '../../../../shared/validators/validators';
import { CommonModule } from '@angular/common';
import { AppInputComponent } from '../../../../shared/components/Form/app-input/app-input.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, AppInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly _router = inject(Router);
  private readonly _toster = inject(ToastrService);

  _authService = inject(AuthService);
  passwordVisible: boolean = false;
  loginForm = new FormGroup({
    username: new FormControl('', [required]),
    password: new FormControl('', [required, storePasswordValidator]),
  });

  // start Logic Login
  LoginPost() {
    const payload = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
    };
    if (this.loginForm.valid) {
      this._authService.LOGIN(payload).subscribe({
        next: (res) => {
          if (!res.token) {
            this._toster.error(
              'Login response does not contain a token.',
              'Login Failed',
            );
            return;
          }
          localStorage.setItem('userToken', res.token);

          this._toster.success(
            'You have successfully logged in.',
            'Login Successful',
          );
          this._router.navigate(['/mainLayout/dashboard']);
        },
        error: (err) => {
          console.error('Login failed:', err);
          this._toster.error('Invalid username or password.', 'Login Failed');
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
