import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { authGuard } from './core/gaurds/auth-guard';
import { logedGuard } from './core/gaurds/loged-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Auth Layout Routes
  {
    path: '',
    component: AuthLayout,
    canActivate:[logedGuard],
    children: [
      {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login)
      },
      {
        path: 'register',
        title: 'Register',
        loadComponent: () => import('./pages/register/register').then(m => m.Register)
      },
      {
        path: 'reset-password',
        title: 'Forget Password',
        loadComponent: () => import('./shared/components/forgetpassword/forgetpassword').then(m => m.Forgetpassword)
      }
    ]
  },

  // Main Layout Routes
  {
    path: '',
    component: MainLayout,
    canActivate:[authGuard],
    children: [
      {
        path: 'Diplomas',
        title: 'Diplomas',
        loadComponent: () => import('./pages/diplomas/diplomas').then(m => m.Diplomas),
        data:{breadcrumb:'Diplomas'}
      },
      {
        path: 'Exam/:id/:title',
        title: 'Exams',
        loadComponent: () => import('./pages/Exam/exam/exam').then(m => m.Exam),
        data:{breadcrumb:'Exams'}
      },
      {
        path: 'Question/:examid',
        title: 'Questions',
        loadComponent: () => import('./pages/Questions/question/question').then(m => m.Question),
        data:{breadcrumb:'Question'}
      },
      {
        path: 'Answer/:id',
        title: 'Answers',
        loadComponent: () => import('./pages/Answers/answer/answer').then(m => m.Answer),
        data:{breadcrumb:'Answer'}
      },
      {
        path: 'Account',
        title: 'Account',
        loadComponent: () => import('./pages/Account/account/account').then(m => m.Account),
        data:{breadcrumb:'Account'}
      },
      {
        path: 'changePassword',
        title: 'Change Password',
        loadComponent: () => import('./pages/ChangePassword/change-password/change-password').then(m => m.ChangePassword),
         data:{breadcrumb:'changePassword'}
      }
    ]
  },
   {
    path: '**',
    redirectTo: 'login'
  }
];
