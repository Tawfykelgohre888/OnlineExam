import { Routes } from '@angular/router';
import { AccountLayoutComponent } from '../Components/account-layout/account-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AccountLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'accountSetting',
        pathMatch: 'full',
      },
      {
        path: 'accountSetting',
        loadComponent: () =>
          import('../Components/account-setting/account-setting.component').then(
            (c) => c.AccountSettingComponent,
          ),
      },
      {
        path: 'changePassword',
        loadComponent: () =>
          import('../Components/change-password/change-password.component').then(
            (c) => c.ChangePasswordComponent,
          ),
      },
    ],
  },
];
