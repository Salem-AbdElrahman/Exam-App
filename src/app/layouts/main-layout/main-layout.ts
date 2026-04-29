import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
isDropdownOpen = signal(false);

  toggleDropdown() {
    this.isDropdownOpen.update(val => !val);
  }

  logout() {
    this.isDropdownOpen.set(false);
  }
}
