import { Component } from '@angular/core';

import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../../layout/authlayout/navbar/navbar.component';
import { FooterComponent } from '../../../../layout/authlayout/footer/footer.component';
import { AppInputComponent } from '../../../../shared/components/Form/app-input/app-input.component';
import {
  required,
  storePasswordValidator,
} from '../../../../shared/validators/validators';

@Component({
  selector: 'app-resetpassword',
  imports: [NavbarComponent, FooterComponent, FormsModule, AppInputComponent],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss',
})
export class RESETPASSWORDComponent {
  loginForm = new FormGroup({
    password: new FormControl('', [required, storePasswordValidator]),
    rePassword: new FormControl('', [required, storePasswordValidator]),
  });
}
