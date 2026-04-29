import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HeaderPage } from '../../../shared/components/ui/header-page/header-page';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../core/services/Questions/question.service';
import {  isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-answer',
  imports: [HeaderPage],
  templateUrl: './answer.html',
  styleUrl: './answer.scss',
})
export class Answer implements OnInit {
examId:string=''
examTitle:string=''
examScore:number=0
questionsAnalytics:any[]=[]
resultData:any
private readonly ActivatedRoute=inject(ActivatedRoute)
private readonly questionService=inject(QuestionService)
private readonly pLATFORM_ID=inject(PLATFORM_ID)


ngOnInit(): void {
if (isPlatformBrowser(this.pLATFORM_ID)) {
this.getSubmissions();
}

  }

getSubmissions(){
this.ActivatedRoute.paramMap.subscribe({
  next:(p)=>{
  let Id=p.get('id') ||null
    this.questionService.getResult(Id).subscribe({
  next:(res)=>{
console.log(res.payload.submission);
this.resultData=res.payload.submission;
this.questionsAnalytics=res.payload.analytics;
this.examTitle=res.payload.submission.examTitle;
this.examScore=res.payload.submission.score;
  },
  error:(err)=>{
    console.log(err);
  }
})
  }
})
}

}







