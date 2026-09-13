import { Routes } from '@angular/router';
import { AuthlayoutComponent } from './layout/authlayout/authlayout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { mainGuard } from './core/guards/main.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthlayoutComponent,
    // canActivate: [mainGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./Feature/Auth/Pages/login/login.component').then(
            (c) => c.LoginComponent,
          ),
        title: 'login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./Feature/Auth/Pages/register/register.component').then(
            (c) => c.RegisterComponent,
          ),
        title: 'register',
      },
      {
        path: 'forgetPassword',
        loadComponent: () =>
          import('./Feature/Auth/Pages/forgetpassword/forgetpassword.component').then(
            (c) => c.ForgetpasswordComponent,
          ),
        title: 'FORGETPASSWORD',
      },
      {
        path: 'resetPassword',
        loadComponent: () =>
          import('./Feature/Auth/Pages/resetpassword/resetpassword.component').then(
            (c) => c.RESETPASSWORDComponent,
          ),
        title: 'RESETPASSWORD',
      },
    ],
  },

  {
    path: 'mainLayout',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./Feature/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent,
          ),
        title: 'dashboard',
      },
      {
        path: 'exams/:id',
        loadComponent: () =>
          import('./Feature/Exam/pages/exams/exams.component').then(
            (c) => c.ExamsComponent,
          ),
        title: 'exams',
      },
      {
        path: 'accountSetting',
        loadChildren: () =>
          import('./Feature/Account/Route/account.route').then((m) => m.routes),
      },
    ],
  },
];
