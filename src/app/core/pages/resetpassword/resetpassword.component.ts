import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../layout/authlayout/navbar/navbar.component';
import { FooterComponent } from '../../../layout/authlayout/footer/footer.component';

@Component({
  selector: 'app-resetpassword',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss',
})
export class RESETPASSWORDComponent {
  passwordVisible: boolean = false;
  rePasswordVisible: boolean = false;

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleRePassword() {
    this.rePasswordVisible = !this.rePasswordVisible;
  }
}
