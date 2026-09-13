import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AppInputComponent } from '../../../../shared/components/Form/app-input/app-input.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'auth';
import { ToastrService } from 'ngx-toastr';
import { RESETPASSWORD } from '../../../../../../projects/auth/src/lib/interfaces/restePassword';
@Component({
  selector: 'app-resetpassword',
  imports: [FormsModule, AppInputComponent, ReactiveFormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss',
})
export class RESETPASSWORDComponent {
  private readonly _route = inject(ActivatedRoute);
  private readonly _authServices = inject(AuthService);
  private readonly _toster = inject(ToastrService);
  private readonly _router = inject(Router);

  tokenFromUrl = signal<string>('');
  ngOnInit() {
    this._route.queryParams.subscribe((params) => {
      this.tokenFromUrl.set(params['token']);
    });
  }

  resetForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  submitResetForm() {
    if (!this.resetForm.valid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    if (
      this.resetForm.value.newPassword !== this.resetForm.value.confirmPassword
    ) {
      this._toster.error('Passwords do not match', 'Error');
      return;
    }

    const payload = {
      token: this.tokenFromUrl(),
      newPassword: this.resetForm.value.newPassword,
      confirmPassword: this.resetForm.value.confirmPassword,
    };

    this._authServices.RESETPASSWORD(payload as RESETPASSWORD).subscribe({
      next: (res) => {
        this._toster.success('Password reset successful', 'Success');
        this._router.navigate(['/login']);
      },
      error: (err) => {
        this._toster.error(err.error.message, 'Error');
      },
    });
  }
}
