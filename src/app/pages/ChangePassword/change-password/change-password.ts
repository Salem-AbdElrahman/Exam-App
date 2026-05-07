import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Sidebar } from '../../../shared/components/ui/Account/sidebar/sidebar';
import { HeaderPage } from '../../../shared/components/ui/header-page/header-page';
import { AccountService } from '../../../core/services/UserAccount/account-service';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule,CommonModule,Sidebar,HeaderPage],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
})
export class ChangePassword {
    showCurrent = false;
  showNew = false;
  showConfirm = false;
  private readonly accountService=inject(AccountService)
  passwordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  },this.confirmPassword);

 updatePassword() {
  const passwordData = {
    currentPassword: this.passwordForm.get('currentPassword')?.value,
    newPassword: this.passwordForm.get('newPassword')?.value,
    confirmPassword: this.passwordForm.get('confirmPassword')?.value
  };

  this.accountService.changePassword(passwordData).subscribe({
    next: (res) => {
      this.passwordForm.reset();
    },
    error: (err) => {
    }
  });
}
   confirmPassword(group:AbstractControl){
  const password=group.get('password')?.value;
  const rePassword=group.get('rePassword')?.value;
  return password===rePassword ? null: {mismatch:true}
}

}
