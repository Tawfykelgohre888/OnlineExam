import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { DeleteMyAccountService } from '../../Feature/Auth/Services/delete-my-account.service';
import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ProfileDataService } from '../../Feature/Account/Services/profile-data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AvatarModule } from 'primeng/avatar';

import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    DialogModule,
    ButtonModule,
    RouterLinkActive,
    AvatarModule,
    InputTextModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  private readonly deleteMyAccountService = inject(DeleteMyAccountService);
  private readonly profileDataService = inject(ProfileDataService);
  private destroyRef = inject(DestroyRef);
  private readonly toster = inject(ToastrService);
  router = inject(Router);
  deleteDialog = signal(false);
  logoutDialog = signal(false);
  userName = signal('');
  lastName = signal('');
  email = signal('');

  visible: boolean = false;
  showDialog() {
    this.visible = true;
  }
  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  // Get user profile data
  getProfileData() {
    this.profileDataService
      .getProfileData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.userName.set(res.user.firstName);
          this.lastName.set(res.user.lastName);
          this.email.set(res.user.email);
        },
      });
  }

  deleteMyAccount(): void {
    this.deleteMyAccountService.deleteAccount().subscribe({
      next: (res) => {
        this.toster.success(res.message, 'Delete Is Successfully');
        localStorage.removeItem('userToken');
        this.router.navigate(['/register']);
      },
      error: (err) => {
        this.toster.error(err.message);
      },
    });
  }

  ngOnInit(): void {
    this.getProfileData();
  }
}
