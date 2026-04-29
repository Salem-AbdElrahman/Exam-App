import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-page',
  imports: [],
  templateUrl: './header-page.html',
  styleUrl: './header-page.scss',
})
export class HeaderPage {
@Input() title:string='';
@Input() icon:string='';
@Input() showBack:boolean=true;
constructor(private location:Location){
}
goBack():void{
  this.location.back();
}
}
