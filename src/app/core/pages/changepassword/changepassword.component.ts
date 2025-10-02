import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../../projects/auth/src/public-api';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../../../layout/authlayout/navbar/navbar.component';

@Component({
  selector: 'app-changepassword',
  imports: [ReactiveFormsModule, NavbarComponent],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss',
})
export class ChangepasswordComponent {
  constructor(private toster: ToastrService) {}
  _authService = inject(AuthService);

  submitPassword = new FormGroup({
    createPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  RESETPASSWORD(): void {
    const payload = {
      confirmPassword: this.submitPassword.value.confirmPassword!,
      createPassword: this.submitPassword.value.createPassword!,
    };
    if (this.submitPassword.valid) {
      this._authService.RESETPASSWORD(payload).subscribe({
        next: (res) => {
          console.log(res);
        },
      });
    } else {
      this.submitPassword.markAllAsTouched();
    }
  }
}
