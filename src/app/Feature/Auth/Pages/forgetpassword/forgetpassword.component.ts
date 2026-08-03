import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../../projects/auth/src/public-api';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../../layout/authlayout/navbar/navbar.component';
import { FooterComponent } from '../../../../layout/authlayout/footer/footer.component';
import { email, required } from '../../../../shared/validators/validators';
import { AppInputComponent } from '../../../../shared/components/Form/app-input/app-input.component';

@Component({
  selector: 'app-forgetpassword',
  imports: [
    ReactiveFormsModule,
    NavbarComponent,
    FooterComponent,
    AppInputComponent,
  ],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  constructor(
    private toster: ToastrService,
    private router: Router,
  ) {}
  _authService = inject(AuthService);

  emailForm = new FormGroup({
    email: new FormControl('', [required, email]),
  });

  FORGETPASSWORD(): void {
    const payload = {
      email: this.emailForm.value.email!,
    };
    if (this.emailForm.valid) {
      this._authService.FORGETPASSWORD(payload).subscribe({
        next: (res) => {
          this.toster.success(res.message);
          this.router.navigate(['/verifyresetcode']);
        },
      });
    } else {
      this.emailForm.markAllAsTouched();
    }
  }
}
