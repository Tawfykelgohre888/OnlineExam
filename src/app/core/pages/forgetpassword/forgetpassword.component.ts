import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../projects/auth/src/public-api';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../layout/authlayout/navbar/navbar.component';
import { FooterComponent } from '../../../layout/authlayout/footer/footer.component';
import { email, required } from '../../../shared/validators/validators';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule, NavbarComponent, FooterComponent],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  constructor(private toster: ToastrService, private router: Router) {}
  _authService = inject(AuthService);

  emailForm = new FormGroup({
    email: new FormControl('', [required, email]),
  });

  FORGETPASSWORD(): void {
    this._authService.FORGETPASSWORD(this.emailForm.value).subscribe({
      next: (res) => {
        this.toster.success(res.message);
        this.router.navigate(['/verifyresetcode']);
      },
    });
  }
}
