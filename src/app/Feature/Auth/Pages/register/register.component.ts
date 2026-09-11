import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../../../projects/auth/src/public-api';
import { ToastrService } from 'ngx-toastr';

import { SIGNUP } from '../../../../../../projects/auth/src/lib/interfaces/registerInterfae';
import { AppInputComponent } from '../../../../shared/components/Form/app-input/app-input.component';
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    AppInputComponent,
    InputOtpModule,
    FormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private toster: ToastrService,
    private readonly router: Router,
  ) {}
  _authService = inject(AuthService);
  passwordVisible: boolean = false;
  rePasswordVisible: boolean = false;
  isLoading = signal(false);
  errorMessage = signal('');
  currentStep = signal(1);
  emailForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  });
  otpForm = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.maxLength(20),
      Validators.minLength(2),
      Validators.required,
    ]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [
      Validators.maxLength(20),
      Validators.minLength(2),
      Validators.required,
    ]),
    lastName: new FormControl('', [
      Validators.maxLength(20),
      Validators.minLength(2),
      Validators.required,
    ]),
    phone: new FormControl(null, [Validators.required]),
  });

  onSendOtp() {
    if (!this.emailForm.valid) return;
    this.isLoading.set(true);
    this.errorMessage.set('');
    const email = this.emailForm.value.email;
    this._authService.sendEmailVerification(email).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.toster.success('OTP sent successfully');
        this.currentStep.set(2);
        console.log('Email sent successfully:', res);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error.message || 'Failed to send OTP');
      },
    });
  }

  onConfirmOtp() {
    if (!this.otpForm.valid) return;
    this.isLoading.set(true);
    this.errorMessage.set('');
    const code = this.otpForm.value.code;
    this._authService.confirmEmailVerification(code).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.toster.success('Email verified successfully');
        this.currentStep.set(3);
        console.log(res);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error.message || 'Failed to verify email');
      },
    });
  }

  submitRegisterForm() {
    const payload: SIGNUP = {
      username: this.registerForm.value.username!,
      firstName: this.registerForm.value.firstName!,
      lastName: this.registerForm.value.lastName!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
      confirmPassword: this.registerForm.value.confirmPassword!,
      phone: this.registerForm.value.phone!,
    };
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');
      this._authService.REGISTER(payload).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this.toster.success(
            'Your account has been created successfully. Please log in to continue.',
            'Registration Successful',
          );
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.error.message || 'Something went wrong');
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
