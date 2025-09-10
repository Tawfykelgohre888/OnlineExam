import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { Question } from '../../core/interface/question';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-dialog',
  templateUrl: './dialog-content-example.component.html',
  styleUrls: ['./dialog-content-example.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogContent,
    MatDialogActions,
    MatRadioModule,
  ],
  standalone: true,
})
export class ExamDialogComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  currentQuestion!: Question;
  answers: { [key: string]: string } = {};
  timeLeft: number;
  timer: any;
  submitted = false;
  score = 0;
  wrong = 0;

  constructor(
    public dialogRef: MatDialogRef<ExamDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { questions: Question[]; duration: number }
  ) {
    this.timeLeft = this.data.duration * 60;
  }

  ngOnInit(): void {
    this.currentQuestion = this.data.questions[this.currentIndex];
    this.startTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timer);
        alert('⏰ Time is up! Your answers will be submitted.');
        this.submitExam();
      }
    }, 1000);
  }

  next() {
    if (this.currentIndex < this.data.questions.length - 1) {
      this.currentIndex++;
      this.currentQuestion = this.data.questions[this.currentIndex];
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentQuestion = this.data.questions[this.currentIndex];
    }
  }

  submitExam() {
    clearInterval(this.timer);
    this.submitted = true;

    this.score = 0;
    this.wrong = 0;
    this.data.questions.forEach((q) => {
      const userAns = this.answers[q._id];
      if (userAns === q.correct) {
        this.score++;
      } else {
        this.wrong++;
      }
    });
  }

  formatTime(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  }

  isAnswerCorrect(ansKey: string): boolean {
    return ansKey === this.currentQuestion.correct;
  }

  showCorrectAnswer(): string | null {
    const userAnswer = this.answers[this.currentQuestion._id];
    if (
      this.submitted &&
      userAnswer &&
      userAnswer !== this.currentQuestion.correct
    ) {
      const correctAns = this.currentQuestion.answers.find(
        (a) => a.key === this.currentQuestion.correct
      );
      return correctAns ? correctAns.answer : null;
    }
    return null;
  }
}
