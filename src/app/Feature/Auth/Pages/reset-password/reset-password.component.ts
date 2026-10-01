import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../../../projects/auth/src/public-api';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);
  private readonly _authServices = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _toster = inject(ToastrService);
  resetForm: FormGroup = this._fb.group({
    token: ['', Validators.required],
    newPassword: ['', Validators.required, Validators.minLength(8)],
    confirmPassword: ['', Validators.required],
  });
  ngOnInit(): void {
    this._route.queryParams.subscribe((prams) => {
      console.log(prams);
      this.resetForm.patchValue({ token: prams['token'] });
    });
  }

  passwordMatch(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  resetPassword(): void {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }
    this._authServices.RESETPASSWORD(this.resetForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this._router.navigate(['/login']);
        this._toster.success(res.message, 'Successful');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
