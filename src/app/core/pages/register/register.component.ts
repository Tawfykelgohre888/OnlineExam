import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../../projects/auth/src/public-api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private toster: ToastrService) {}
  _authService = inject(AuthService);

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.maxLength(7),
      Validators.minLength(4),
      Validators.required,
    ]),
    firstName: new FormControl('', [
      Validators.maxLength(10),
      Validators.minLength(4),
      Validators.required,
    ]),
    lastName: new FormControl('', [
      Validators.maxLength(10),
      Validators.minLength(4),
      Validators.required,
    ]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.pattern('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{6,}$'),
      Validators.required,
    ]),
    rePassword: new FormControl('', [
      Validators.pattern('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{6,}$'),
      Validators.required,
    ]),
    phone: new FormControl('', [
      Validators.pattern('^01[0-2,5][0-9]{8}$'),
      Validators.required,
    ]),
  });

  submitRegisterForm() {
    if (this.registerForm.valid) {
      this._authService.REGISTER(this.registerForm.value).subscribe({
        next: (res) => {
          this.toster.success(res.message, 'Register');
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
