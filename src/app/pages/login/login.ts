import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
hasError = true;

  features = [
    { title: 'Tailored Diplomas', icon: 'fa-regular fa-id-card', desc: 'Choose from specialized tracks like Frontend, Backend, and Mobile.' },
    { title: 'Focused Exams', icon: 'fa-regular fa-file-lines', desc: 'Access topic-specific tests including HTML, CSS, and JS.' },
    { title: 'Smart Multi-Step Forms', icon: 'fa-solid fa-list-ol', desc: 'Manage complex data entry with our intuitive form wizard.' }
  ];
}
