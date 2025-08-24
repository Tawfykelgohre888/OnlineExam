import { Routes } from '@angular/router';
import { AuthlayoutComponent } from './layout/authlayout/authlayout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthlayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./core/pages/login/login.component').then(
            (c) => c.LoginComponent
          ),
        title: 'login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/pages/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        title: 'register',
      },
      {
        path: 'LOGOUT',
        loadComponent: () =>
          import('./core/pages/logout/logout.component').then(
            (c) => c.LogoutComponent
          ),
        title: 'LOGOUT',
      },
      {
        path: 'forgetPassword',
        loadComponent: () =>
          import('./core/pages/forgetpassword/forgetpassword.component').then(
            (c) => c.ForgetpasswordComponent
          ),
        title: 'FORGETPASSWORD',
      },
      {
        path: 'verifyresetcode',
        loadComponent: () =>
          import('./core/pages/verifyresetcode/verifyresetcode.component').then(
            (c) => c.VerifyresetcodeComponent
          ),
        title: 'VERIFYRESETCODE',
      },
      {
        path: 'RESETPASSWORD',
        loadComponent: () =>
          import('./core/pages/resetpassword/resetpassword.component').then(
            (c) => c.RESETPASSWORDComponent
          ),
        title: 'RESETPASSWORD',
      },
    ],
  },

  {
    path: 'mainLayout',
    component: MainLayoutComponent,
    children: [
      {path:'', redirectTo:'dashboard',pathMatch:'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./core/pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
        title: 'dashboard',
      },
      {
        path:"exams/:id",
        loadComponent:()=>
          import('./core/pages/exams/exams.component').then(
            (c)=> c.ExamsComponent
          ),
          title:'exams'
      }
    ],
  },
];
