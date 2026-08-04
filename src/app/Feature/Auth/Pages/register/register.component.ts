import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../../../projects/auth/src/public-api';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../../../../layout/authlayout/navbar/navbar.component';
import { FooterComponent } from '../../../../layout/authlayout/footer/footer.component';
import {
  email,
  maxLength,
  minLength,
  phoneNumberValidator,
  required,
  storePasswordValidator,
} from '../../../../shared/validators/validators';
import { SIGNUP } from '../../../../../../projects/auth/src/lib/interfaces/registerInterfae';
import { AppInputComponent } from '../../../../shared/components/Form/app-input/app-input.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, AppInputComponent],
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
  registerForm = new FormGroup({
    username: new FormControl('', [maxLength, minLength, required]),
    firstName: new FormControl('', [maxLength, minLength, required]),
    lastName: new FormControl('', [maxLength, minLength, required]),
    email: new FormControl('', [email, required]),
    password: new FormControl('', [storePasswordValidator, required]),
    rePassword: new FormControl('', [storePasswordValidator, required]),
    phone: new FormControl(null, [phoneNumberValidator, required]),
  });

  submitRegisterForm() {
    const payload: SIGNUP = {
      username: this.registerForm.value.username!,
      firstName: this.registerForm.value.firstName!,
      lastName: this.registerForm.value.lastName!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
      rePassword: this.registerForm.value.rePassword!,
      phone: this.registerForm.value.phone!,
    };
    if (this.registerForm.valid) {
      this._authService.REGISTER(payload).subscribe({
        next: (res) => {
          this.toster.success(
            'Your account has been created successfully. Please log in to continue.',
            'Registration Successful',
          );
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.toster.error(err.error.message || 'Something went wrong');
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
