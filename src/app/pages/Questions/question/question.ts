import { Component, inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { HeaderPage } from '../../../shared/components/ui/header-page/header-page';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../core/services/Questions/question.service';
import { Answer, Questiondata } from '../../../core/interfaces/iquestion';
import { isPlatformBrowser } from '@angular/common';
import { ExamService } from '../../../core/services/Exams/exam.service';

@Component({
  selector: 'app-question',
  imports: [HeaderPage],
  templateUrl: './question.html',
  styleUrl: './question.scss',
})
export class Question implements OnInit {
totalTime:number=20*60;
leftTime:number=20*60;
displayTime:string='20:00';
interval:any;
offset:number=0;
Questions:Questiondata[]=[]
Answers:Answer[]=[]
currentIndex:number=0
disabledMessage:string=''
examTitle:string=''
examId:any=''
userAnswers:any[]=[]
private readonly activatedRoute=inject(ActivatedRoute)
private readonly questionService=inject(QuestionService)
private readonly pLATFORM_ID=inject(PLATFORM_ID)
private readonly examService=inject(ExamService)
private readonly router=inject(Router)


constructor(private ngZone:NgZone){

}
ngOnInit(): void {
if (isPlatformBrowser(this.pLATFORM_ID)) {
 this.updateUI();
 this.activatedRoute.paramMap.subscribe({
  next:(p)=>{
this.examId =p.get('examid')
this.questionService.getAllQuestions(this.examId).subscribe({
  next:(res)=>{
    // console.log(res.payload.questions[this.currentIndex].examId);
    this.Questions=res.payload.questions;
    this.Answers=res.payload.questions.answers;
    this.examService.getExamById(res.payload.questions[this.currentIndex].examId).subscribe({
      next:(res)=>{
        // console.log(res.payload.exam.duration * 60);
        this.examTitle= res.payload.exam.title;
        const durationMinutes=res.payload.exam.duration * 60;
        this.leftTime=durationMinutes /60;
        this.displayTime=this.updateUI();
      }
    })
  }
})

  }
})
}
}
nextQuestion():void{
if(this.currentIndex<this.Questions.length ){
  this.currentIndex++;
}
}
previousQuestion():void{
this.disabledMessage='Return back is disabled';
setTimeout(() => {
this.disabledMessage='';
}, 2000);
}
ProgressWidth():number{
  if(this.Questions.length === 0) return 0;
  return ((this.currentIndex+1)/this.Questions.length)*100;
}
selectAnswer(questionId:string,answerId:string):void{
  const AnswerIndex= this.userAnswers.findIndex(a=>a.questionId == questionId);
  if(AnswerIndex > -1){
  this.userAnswers[AnswerIndex].answerId=answerId;
  }
  else{
    this.userAnswers.push({questionId,answerId});
  }
}
finishExam(){

const payload ={
examId:this.examId,
answers:this.userAnswers
};
this.questionService.submitAnswers(payload).subscribe({
  next:(res)=>{
this.router.navigate(['/Answer',res.payload.submission.id])
console.log(res);

  },
  error:(err)=>{
    // console.log(err);

  }
})
}
startTimer() {
  this.interval = setInterval(() => {
    if (this.leftTime > 0) {
      this.leftTime--;

      this.ngZone.run(() => {
        this.displayTime = this.updateUI();
      });

    } else {
      clearInterval(this.interval);
      alert('Time is Up');
    }
  }, 1000);
}


  updateUI():string{
    const minutes=Math.floor(this.leftTime/60);
    const seconds=this.leftTime%60;
    return`${(seconds.toString().padStart(2,'0'))}:${(minutes.toString().padStart(2,'0'))}`;

  }
  ngOnDestroy(): void {
   if(this.interval){
    clearInterval(this.interval);
   }
  }

}
