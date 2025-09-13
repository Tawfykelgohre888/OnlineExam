import { Component } from '@angular/core';
import { NavbarComponent } from '../../../layout/authlayout/navbar/navbar.component';
import { FooterComponent } from '../../../layout/authlayout/footer/footer.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import {
  required,
  storePasswordValidator,
} from '../../../shared/validators/validators';

@Component({
  selector: 'app-resetpassword',
  imports: [NavbarComponent, FooterComponent, FormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss',
})
export class RESETPASSWORDComponent {
  passwordVisible: boolean = false;
  rePasswordVisible: boolean = false;

  loginForm = new FormGroup({
    password: new FormControl('', [required, storePasswordValidator]),
    rePassword: new FormControl('', [required, storePasswordValidator]),
  });

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleRePassword() {
    this.rePasswordVisible = !this.rePasswordVisible;
  }
}
