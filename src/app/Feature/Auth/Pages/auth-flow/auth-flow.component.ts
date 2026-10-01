import { Component, inject, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../../../../projects/auth/src/public-api';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth-flow',
  imports: [FormsModule, InputTextModule, ReactiveFormsModule, RouterLink],
  templateUrl: './auth-flow.component.html',
  styleUrl: './auth-flow.component.scss',
})
export class AuthFlowComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _authServices = inject(AuthService);
  private readonly _toster = inject(ToastrService);
  step = signal(1);
  sendEmail = signal('');
  emailForm: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    redirectUrl: ['http://localhost:4200/auth_flow'],
  });
  forgetPass(): void {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    const email = this.emailForm.value.email;

    this._authServices
      .FORGETPASSWORD({
        email,
        redirectUrl: 'http://localhost:4200/resetPass',
      })
      .subscribe({
        next: (res) => {
          this._toster.success(res.message, ' Successful');
          console.log(res);
          this.step.set(2);
          this.sendEmail.set(email);
          console.log(this.sendEmail());
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
