import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AccountService } from '../../../core/services/UserAccount/account-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  imports: [],
  templateUrl: './delete-account.html',
  styleUrl: './delete-account.scss',
})
export class DeleteAccount {
@Output() close = new EventEmitter<void>();
  private readonly accountService=inject(AccountService)
  private readonly router=inject(Router)
onCancel() {
    this.close.emit();
  }



confirmDelete() {
  this.accountService.deleteUser().subscribe({
    next: (res) => {
      localStorage.clear();
      this.router.navigate(['/login']);
    },
    error: (err) => {
      alert('Failed to delete account. Please try again.');
    }
  });
}
}
