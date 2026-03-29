import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Forgetpassword } from './shared/components/forgetpassword/forgetpassword';
import { Diplomas } from './pages/diplomas/diplomas';

export const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'',component:AuthLayout,children:[
    {path:'login',component:Login,title:'login'},
    {path:'register',component:Register,title:'register'},
    {path:'reset-password',component:Forgetpassword,title:'forgetpassword'}
  ]},
  {path:'',component:MainLayout,children:[
    {path:'Diplomas',component:Diplomas,title:'Diplomas'}
  ]}
];
