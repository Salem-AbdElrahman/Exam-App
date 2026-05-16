import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BreadcrumbService } from '../../core/services/Breadcrump/breadcrumb-sevice';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [RouterLink,RouterLinkActive,RouterOutlet,AsyncPipe],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  breadcrumbService=inject(BreadcrumbService)
 private readonly router=inject(Router)
isDropdownOpen = signal(false);

  toggleDropdown() {
    this.isDropdownOpen.update(val => !val);
  }

  logout() {
    this.isDropdownOpen.set(false);
     localStorage.removeItem('userToken');
  this.router.navigate(['/login']);
  }
}
