import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HeaderPage } from '../../../shared/components/ui/header-page/header-page';
import { ExamService } from '../../../core/services/Exams/exam.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Daum } from '../../../core/interfaces/iexam';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-exam',
  imports: [HeaderPage,RouterLink],
  templateUrl: './exam.html',
  styleUrl: './exam.scss',
})
export class Exam implements OnInit {
  private readonly examService=inject(ExamService);
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly pLATFORM_ID=inject(PLATFORM_ID);
  Exams:Daum[]=[]
  examTitle:string=''
ngOnInit(): void {
if(isPlatformBrowser(this.pLATFORM_ID)){
  this.activatedRoute.paramMap.subscribe({
  next:(p)=>{
    this.examTitle=p.get('title') || '';
    let diplomaId= p.get('id');

    this.examService.getAllExams(diplomaId).subscribe({
      next:(res)=>{
        console.log(this.examTitle);
        this.Exams=res.payload.data;


      }
    })
  }
})
}
}

}
