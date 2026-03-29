import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from 'auth-lib';

@Component({
  selector: 'app-login',
  imports: [CommonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
hasError:boolean = false;
private readonly authService=inject(AuthService)
private readonly activatedRoute=inject(ActivatedRoute)
private readonly router=inject(Router)
isLoading:boolean=false
isSuccess:boolean=false
msgError:boolean=false
token:string |null=''


  features = [
    { title: 'Tailored Diplomas', icon: 'fa-regular fa-id-card', desc: 'Choose from specialized tracks like Frontend, Backend, and Mobile.' },
    { title: 'Focused Exams', icon: 'fa-regular fa-file-lines', desc: 'Access topic-specific tests including HTML, CSS, and JS.' },
    { title: 'Smart Multi-Step Forms', icon: 'fa-solid fa-list-ol', desc: 'Manage complex data entry with our intuitive form wizard.' }
  ];
// ngOnInit(): void {
// this.activatedRoute.paramMap.subscribe({
//  next: (p)=>{
//     this.token = p.get('token');
//     console.log(p);

//     console.log('Token To use:',this.token);

//   }
// })
// }



  loginForm:FormGroup=new FormGroup({
    username:new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])

  })

  submitForm():void{
if(this.loginForm.valid){
  this.isLoading=true;
   this.authService.login(this.loginForm.value).subscribe({
  next:(res)=>{
  if(res.status==true){
       console.log(res);
setTimeout(() => {

  this.token= localStorage.setItem('userToken',res.token) !

  this.authService.saveUserData()


this.router.navigate(['/Diplomas'])
}, 500);
   this.isSuccess= res.status;

  }
  this.isLoading=false
console.log(res);

  },
  error:(err)=>{
 console.log(err);



this.isLoading=false
  }

 })
}
  }



}
