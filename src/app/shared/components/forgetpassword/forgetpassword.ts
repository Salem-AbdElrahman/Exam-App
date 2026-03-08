import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './forgetpassword.html',
  styleUrl: './forgetpassword.scss',
})
export class Forgetpassword {
// Step 1: Forgot Password (Email), Step 2: Password Reset Sent, Step 3: Create New Password
  currentStep = signal(1);

  features = [
    { title: 'Tailored Diplomas', icon: 'fa-regular fa-id-card', desc: 'Choose from specialized tracks like Frontend, Backend, and Mobile Development.' },
    { title: 'Focused Exams', icon: 'fa-regular fa-file-lines', desc: 'Access topic-specific tests including HTML, CSS, JavaScript, and more.' },
    { title: 'Smart Multi-Step Forms', icon: 'fa-solid fa-list-ol', desc: 'Manage complex data entry with our intuitive form wizard.' }
  ];

  nextStep() { this.currentStep.update(s => s + 1); }
  prevStep() { this.currentStep.update(s => s - 1); }
}
