import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
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
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NavbarComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private router: Router, private toster: ToastrService) {}

  _authService = inject(AuthService);
  passwordVisible: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [required, email]),
    password: new FormControl('', [required, storePasswordValidator]),
  });

  // start Logic Login
  LoginPOst() {
    this._authService.LOGIN(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('userToken', res.token);
        this.router.navigate(['/mainLayout/dashboard']);
        this.toster.success(res.message);
      },
    });
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
