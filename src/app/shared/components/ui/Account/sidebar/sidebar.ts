import { Component, inject } from '@angular/core';
import {  Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly router=inject(Router)
logout() {
  localStorage.removeItem('userToken');
  this.router.navigate(['/login']);
}
}
