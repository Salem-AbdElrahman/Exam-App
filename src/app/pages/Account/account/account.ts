import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChangeEmail } from '../../changeEmail/change-email/change-email';
import { DeleteAccount } from '../../DeleteAccount/delete-account/delete-account';
import { HeaderPage } from '../../../shared/components/ui/header-page/header-page';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Sidebar } from '../../../shared/components/ui/Account/sidebar/sidebar';
import { AccountService } from '../../../core/services/UserAccount/account-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-account',
  imports: [ReactiveFormsModule,ChangeEmail,DeleteAccount,HeaderPage,Sidebar],
  templateUrl: './account.html',
  styleUrl: './account.scss',
})
export class Account implements OnInit {
  isModalOpen = false;
  isDeleteModalOpen = false;
profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl({ value: '', disabled: true }),
    email: new FormControl('user@example.com'),
    phone: new FormControl('1012345678')
  });
  private readonly accountService=inject(AccountService)
  private readonly pLATFORM_ID=inject(PLATFORM_ID)
  ngOnInit(): void {
if (isPlatformBrowser(this.pLATFORM_ID)) {
this.getUserData() ;
}
  }
  getUserData(){
this.accountService.getUserProfile().subscribe({
  next:(res)=>{
    const user=res.payload.user;
    console.log(user);

    this.profileForm.patchValue({
      firstName:user.firstName,
      lastName:user.lastName,
      username:user.userName,
      email:user.email,
      phone:user.phone
    });
  }
})
  }
saveChanges() {
  if (this.profileForm.valid) {
    const updatedData = {
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      phone: this.profileForm.value.phone
    };

    this.accountService.updateUserProfile(updatedData).subscribe({
      next: (res) => {
        // alert('Profile updated successfully!');
      },
      error: (err) => {
        // alert('Failed to update profile. Please try again.');
      }
    });
  }
}
  openChangeEmailModal() {
  this.isModalOpen = true;
}
openDeleteModal() {
  this.isDeleteModalOpen = true;
}
}
