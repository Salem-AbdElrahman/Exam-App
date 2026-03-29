import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive,ActivatedRoute } from '@angular/router';
import { AuthService } from 'auth-lib';

@Component({
  selector: 'app-forgetpassword',
  imports: [RouterLink,RouterLinkActive,ReactiveFormsModule],
  templateUrl: './forgetpassword.html',
  styleUrl: './forgetpassword.scss',
})
export class Forgetpassword {
// Step 1: Forgot Password (Email), Step 2: Password Reset Sent, Step 3: Create New Password
  currentStep = signal(1);
  private readonly authService=inject(AuthService)
  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly pLATFORM_ID=inject(PLATFORM_ID)
  private readonly router=inject(Router)

  features = [
    { title: 'Tailored Diplomas', icon: 'fa-regular fa-id-card', desc: 'Choose from specialized tracks like Frontend, Backend, and Mobile Development.' },
    { title: 'Focused Exams', icon: 'fa-regular fa-file-lines', desc: 'Access topic-specific tests including HTML, CSS, JavaScript, and more.' },
    { title: 'Smart Multi-Step Forms', icon: 'fa-solid fa-list-ol', desc: 'Manage complex data entry with our intuitive form wizard.' }
  ];



  nextStep() { this.currentStep.update(s => s + 1); }
  prevStep() { this.currentStep.update(s => s - 1); }
userToken: string|null='';
  ngOnInit(): void {
if(isPlatformBrowser(this.pLATFORM_ID)){
this.userToken=localStorage.getItem('userToken');
}

}

  verifyEmail:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email])
  })
  resetPassword:FormGroup=new FormGroup({
  newPassword:new FormControl('',[Validators.required]),
  confirmPassword:new FormControl('',[Validators.required])
  },this.confirmPassword)

   confirmPassword(group:AbstractControl){
  const password=group.get('password')?.value;
  const rePassword=group.get('rePassword')?.value;
  return password===rePassword ? null: {mismatch:true}
}

verifyEmailSubmit():void{
  this.authService.forgotPassword(this.verifyEmail.value).subscribe({
    next:(res)=>{
console.log(res);
if(res.status == true){
  this.nextStep();

}
    },
    error:(err)=>{
      console.log(err);

    }
  })
}
resetPasswordSubmit():void{
  this.authService.resetPassword(this.resetPassword.value).subscribe({
    next:(res)=>{
console.log(res);
if(res.status == true){
 if(this.userToken){
  this.resetPassword.patchValue({
    token:this.userToken
  })
 }
setTimeout(() => {

this.router.navigate(['/Diplomas'])
}, 500);
}
    },
    error:(err)=>{
      console.log(err);

    }
  })
}
}

