import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DeleteMyAccountService } from '../../core/services/delete-my-account.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  private readonly deleteMyAccountService = inject(DeleteMyAccountService);
  router = inject(Router);

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  deleteMyAccount(): void {
    this.deleteMyAccountService.deleteAccount().subscribe({
      next: (res) => {
        console.log(res, 'deleteAcc');
      },
    });
  }
}
