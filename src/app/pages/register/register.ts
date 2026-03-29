import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {AuthService} from './../../../../dist/auth-lib'
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-register',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
 currentStep  = 1;
  isLoading    = false;
  showPassword = false;
  showConfirm  = false;
  countdown    = 60;
  private timer: any;
msgError:string="";
isSuccess:string="";
  otpControls = Array(6);
  stepDots    = [2, 3, 4];
features = [
    { title: 'Tailored Diplomas', icon: 'fa-regular fa-id-card', desc: 'Choose from specialized tracks like Frontend, Backend, and Mobile.' },
    { title: 'Focused Exams', icon: 'fa-regular fa-file-lines', desc: 'Access topic-specific tests including HTML, CSS, and JS.' },
    { title: 'Smart Multi-Step Forms', icon: 'fa-solid fa-list-ol', desc: 'Manage complex data entry with our intuitive form wizard.' }
  ];

 private readonly authService =inject(AuthService)
 private readonly router =inject(Router)


  nextStep() {
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

 registerForm = new FormGroup({
    emailStep: new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    }),

    otpStep: new FormGroup({
      email: new FormControl(null, [Validators.required]),
      code:  new FormControl(null, [Validators.required]),
    }),

    userInfoStep: new FormGroup({
      username:  new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      lastName:  new FormControl(null, [Validators.required]),
      phone:     new FormControl(null, [Validators.required]),
    }),

    passwordStep: new FormGroup(
      {
        password:        new FormControl(null, [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl(null, [Validators.required]),
      }, this.confirmPassword
    ),
  });

  ngOnInit(): void {}
  ngOnDestroy(): void { clearInterval(this.timer); }


  get emailStep()    { return this.registerForm.get('emailStep')    as FormGroup; }
  get otpStep()      { return this.registerForm.get('otpStep')      as FormGroup; }
  get userInfoStep() { return this.registerForm.get('userInfoStep') as FormGroup; }
  get passwordStep() { return this.registerForm.get('passwordStep') as FormGroup; }


   isInvalid(group: FormGroup, field: string): boolean {
    const ctrl = group.get(field);
    return !!(ctrl?.invalid && (ctrl.dirty || ctrl.touched));
  }

  get passwordMismatch(): boolean {
    return !!(
      this.passwordStep.errors?.['mismatch'] &&
      this.passwordStep.get('confirmPassword')?.touched
    );
  }
  confirmPassword(group:AbstractControl){
  const password=group.get('password')?.value;
  const rePassword=group.get('rePassword')?.value;
  return password===rePassword ? null: {mismatch:true}
}

 submitEmail(): void {
    if (this.emailStep.invalid) { this.emailStep.markAllAsTouched(); return; }


    this.otpStep.get('email')?.setValue(this.emailStep.get('email')?.value);

    this.isLoading = true;

    this.authService.sendEmailVerification(this.emailStep.value).subscribe({
      next:(res)=>{
        console.log(res);
  setTimeout(() => {
      this.isLoading = false;
      this.currentStep = 2;
      this.startCountdown();
    }, 600);
      },
      error:(err)=>{
        console.log(err);

      }
    })

  }

  //  Step 2: OTP
  submitOtp(): void {
    if (this.otpStep.invalid) { this.otpStep.markAllAsTouched(); return; }
    this.isLoading = true;
  this.authService.confirmEmailVerification(this.otpStep.value).subscribe({
      next:(res)=>{
        console.log(res);
 setTimeout(() => {
      this.isLoading = false;
      this.currentStep = 3;
    }, 600);
      },
      error:(err)=>{
        console.log(err);

      }
    })

  }

  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const val   = input.value.replace(/\D/g, '');
    input.value = val;
    // Concatenate all boxes into otpStep.code
    this.updateOtpCode();
    if (val && index < 5) {
      (document.getElementById(`otp-${index + 1}`) as HTMLInputElement)?.focus();
    }
  }

  onOtpKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && index > 0) {
      const current = document.getElementById(`otp-${index}`) as HTMLInputElement;
      if (!current.value) {
        (document.getElementById(`otp-${index - 1}`) as HTMLInputElement)?.focus();
      }
    }
    this.updateOtpCode();
  }

  private updateOtpCode(): void {
    const code = Array.from({ length: 6 }, (_, i) => {
      const el = document.getElementById(`otp-${i}`) as HTMLInputElement;
      return el?.value || '';
    }).join('');
    this.otpStep.get('code')?.setValue(code.length === 6 ? code : null);
  }

  startCountdown(): void {
    this.countdown = 60;
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.countdown > 0) this.countdown--;
      else clearInterval(this.timer);
    }, 1000);
  }

  resendOtp(): void {
     this.authService.confirmEmailVerification(this.otpStep.value).subscribe({
      next:(res)=>{
        console.log(res);
 setTimeout(() => {
      this.isLoading = false;
      this.currentStep = 3;
    }, 600);
      },
      error:(err)=>{
        console.log(err);

      }
    })
    this.startCountdown();
  }

  //  Step 3: User Info
  submitInfo(): void {
    if (this.userInfoStep.invalid) { this.userInfoStep.markAllAsTouched(); return; }
    this.currentStep = 4;
  }

  //  Step 4: Password
  submitPassword(): void {
    if (this.passwordStep.invalid) { this.passwordStep.markAllAsTouched(); return; }
    this.isLoading = true;


    const payload = {
      email:     this.emailStep.value.email,
      otp:       this.otpStep.value.code,
      ...this.userInfoStep.value,
      password:  this.passwordStep.value.password,
    };


    this.authService.register(payload).subscribe({
      next:(res)=>{
if(res.status=true){
          console.log(res);
setTimeout(() => {
      this.isLoading = false;
       this.router.navigate(['/login']);

    }, 1000);
     this.isSuccess= "success";
}
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
      this.msgError=  err.error.message;
this.isLoading = false;
      }
    })


  }

}
