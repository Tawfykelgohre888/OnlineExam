import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-account-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, PageHeaderComponent],
  templateUrl: './account-layout.component.html',
  styleUrl: './account-layout.component.scss',
})
export class AccountLayoutComponent {}
