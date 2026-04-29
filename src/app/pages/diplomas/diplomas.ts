import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DiplomaService } from '../../core/services/Diplomas/diploma.service';
import { isPlatformBrowser } from '@angular/common';
import { data } from '../../core/interfaces/idiploma';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-diplomas',
  imports: [RouterLink],
  templateUrl: './diplomas.html',
  styleUrl: './diplomas.scss',
})
export class Diplomas implements OnInit {
 private readonly  diplomaService=inject(DiplomaService);
 private readonly  pLATFORM_ID=inject(PLATFORM_ID);
 Diplomas:data[]=[]
 ngOnInit(): void {
if (isPlatformBrowser(this.pLATFORM_ID)) {
this.getDiplomaData();
}
 }
 getDiplomaData():void{

this.diplomaService.getAllDiplomas().subscribe({
  next:(res:any)=>{
    this.Diplomas=res.payload.data;

  },
  error:(err)=>{


  }
})
 }

}
