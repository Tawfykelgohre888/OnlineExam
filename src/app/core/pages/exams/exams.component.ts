import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExamsService } from '../../services/exams.service';
import { Exam } from '../../interface/exams';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../interface/question';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [
    RouterLink,
    DialogModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
  ],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss',
})
export class ExamsComponent implements OnInit, OnDestroy {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
  examId!: string;
  Quazes: Exam[] = [] as Exam[];
  IdSubject!: string;
  questions: Question[] = [];
  currentIndex: number = 0;
  answers: (string | null)[] = [];
  currentQuestionIndex: number = 0;
  timeLeft: number = 0;
  displayTime: string = '00:00';
  private timerSub?: Subscription;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly examsService: ExamsService,
    private readonly questionService: QuestionService
  ) {}

  getAllExam(): void {
    this.examId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.examsService.getAllExamsBySubject(this.examId).subscribe({
      next: (res) => {
        this.Quazes = res.exams;
        this.IdSubject = res.exams[0]._id;
      },
    });
  }
  getAllQuestion(examId: string): void {
    this.questionService.getAllQuestion(examId).subscribe({
      next: (res) => {
        console.log(res);
        this.questions = res.questions;
        this.answers = new Array(this.questions.length).fill(null);
        this.currentQuestionIndex = 0;
      },
    });
  }

  get currentQuestion(): Question | null {
    return this.questions.length > 0
      ? this.questions[this.currentQuestionIndex]
      : null;
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  prevQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  finishExam(): void {
    this.timerSub?.unsubscribe();
    console.log('Final Answer:', this.answers);
    this.visible = false;
  }

  startExam(examId: string, durationMinutes: number): void {
    this.showDialog();
    this.getAllQuestion(examId);
    this.startTimer(durationMinutes * 60);
  }

  private startTimer(totalSeconds: number): void {
    this.timerSub?.unsubscribe();

    this.timeLeft = totalSeconds;
    this.displayTime = this.formatTime(this.timeLeft);

    this.timerSub = interval(1000)
      .pipe(takeWhile(() => this.timeLeft > 0))
      .subscribe({
        next: () => {
          this.timeLeft--;
          this.displayTime = this.formatTime(this.timeLeft);
          if (this.timeLeft === 0) {
            this.finishExam();
          }
        },
      });
  }

  private formatTime(sec: number): string {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  ngOnDestroy(): void {
    this.timerSub?.unsubscribe();
  }

  // End Logic Api
  ngOnInit(): void {
    // this.gitId();
    this.getAllExam();
  }
}
