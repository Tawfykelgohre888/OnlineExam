import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../../projects/auth/src/public-api';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { required } from '../../../shared/validators/validators';
import { AppInputComponent } from '../../../shared/components/Form/app-input/app-input.component';

@Component({
  selector: 'app-verifyresetcode',
  standalone: true,
  imports: [ReactiveFormsModule, AppInputComponent],
  templateUrl: './verifyresetcode.component.html',
  styleUrl: './verifyresetcode.component.scss',
})
export class VerifyresetcodeComponent {
  constructor(
    private router: Router,
    private toster: ToastrService,
  ) {}

  _authService = inject(AuthService);

  verifyForm = new FormGroup({
    resetCode: new FormControl('', required),
  });

  verifySubmit(): void {
    const payload = { resetCode: this.verifyForm.value.resetCode! };
    if (this.verifyForm.valid) {
      this._authService.VERIFYRESETCODE(payload).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.toster.success(res.message);
          }
          this.router.navigate(['/RESETPASSWORD']);
        },
      });
    } else {
      this.verifyForm.markAllAsTouched();
    }
  }
}
