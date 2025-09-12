import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../../projects/auth/src/public-api';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from "../../../layout/authlayout/navbar/navbar.component";
import { FooterComponent } from "../../../layout/authlayout/footer/footer.component";

@Component({
  selector: 'app-verifyresetcode',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent, FooterComponent],
  templateUrl: './verifyresetcode.component.html',
  styleUrl: './verifyresetcode.component.scss',
})
export class VerifyresetcodeComponent {
  constructor(private router: Router, private toster: ToastrService) {}

  _authService = inject(AuthService);

  verifyForm = new FormGroup({
    code: new FormControl('', Validators.required),
  });

  verifySubmit(): void {
    const payload = {
      resetCode: this.verifyForm.value.code,
    };

    this._authService.VERIFYRESETCODE(payload).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.toster.success(res.message);
        }
        this.router.navigate(['/RESETPASSWORD']);
      },
    });
  }
}
