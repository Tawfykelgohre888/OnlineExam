import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../../../projects/auth/src/public-api';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../../../layout/authlayout/navbar/navbar.component';
import { FooterComponent } from '../../../layout/authlayout/footer/footer.component';
import {
  email,
  maxLength,
  minLength,
  phoneNumberValidator,
  required,
  storePasswordValidator,
} from '../../../shared/validators/validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NavbarComponent, FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private toster: ToastrService) {}
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
    phone: new FormControl('', [phoneNumberValidator, required]),
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

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleRePassword() {
    this.rePasswordVisible = !this.rePasswordVisible;
  }
}
