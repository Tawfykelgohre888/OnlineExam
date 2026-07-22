import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DeleteMyAccountService } from '../../core/services/delete-my-account.service';
import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { LocationStrategy } from '@angular/common';
@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, DialogModule, ButtonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  private readonly deleteMyAccountService = inject(DeleteMyAccountService);
  private readonly toster = inject(ToastrService);
  router = inject(Router);
  visible: boolean = false;
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  deleteMyAccount(): void {
    this.deleteMyAccountService.deleteAccount().subscribe({
      next: (res) => {
        this.toster.success(res.message, 'Delete Is Successfully');
        LocationStrategy.caller();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.toster.error(err.message);
      },
    });
  }
}
