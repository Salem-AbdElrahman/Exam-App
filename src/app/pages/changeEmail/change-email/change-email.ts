import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/UserAccount/account-service';

@Component({
  selector: 'app-change-email',
  imports: [CommonModule, FormsModule],
  templateUrl: './change-email.html',
  styleUrl: './change-email.scss',
})
export class ChangeEmail {
@Output() close = new EventEmitter<void>();
isModalOpen:boolean=false
  newEmail: string = '';
  currentStep: 'EMAIL' | 'OTP' = 'EMAIL';
  email: string = 'user@example.com';
  otpCode: string = '';
  private readonly accountService=inject(AccountService)

  onClose() {
    this.close.emit();
  }

  onNext() {
    console.log('Next clicked with email:', this.newEmail);
  }
  onRequestEmailChange() {
  if (this.newEmail) {
    this.accountService.requestNewEmail(this.newEmail).subscribe({
      next: (res) => {
        // console.log('OTP Sent:', res);
        this.goToOtp();
      },
      error: (err) => {
        // console.error('Error:', err);
        alert(err.error.message || 'Something went wrong');
      }
    });
  }
}



  otpArray = new Array(6).fill('');

  goToOtp() {
    this.currentStep = 'OTP';
  }


  moveFocus(event: any, index: number) {
    const input = event.target;
    if (input.value && index < 5) {
      const nextInput = input.closest('.flex').querySelectorAll('input')[index + 1];
      nextInput.focus();
    }
  }
  onVerifyCode() {
  if (this.otpCode.length === 6) {
    this.accountService.confirmEmail(this.otpCode).subscribe({
      next: (res) => {
        // console.log('Email changed successfully!', res);
        // alert('Your email has been updated.');
        this.isModalOpen = false;
      },
      error: (err) => {
        // console.error('Verification failed:', err);
        // alert(err.error.message || 'Invalid OTP code');
      }
    });
  }

  }
}
