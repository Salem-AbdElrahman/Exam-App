import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HeaderPage } from '../../../shared/components/ui/header-page/header-page';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../core/services/Questions/question.service';
import { DecimalPipe, isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-answer',
  imports: [HeaderPage,DecimalPipe],
  templateUrl: './answer.html',
  styleUrl: './answer.scss',
})
export class Answer implements OnInit {
examId:string=''
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
// console.log(res.payload);
this.resultData=res.payload;
this.questionsAnalytics=res.payload.analytics;
  },
  error:(err)=>{
    console.log(err);

  }
})
  }
})
}

}







