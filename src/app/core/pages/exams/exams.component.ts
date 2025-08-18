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
  imports: [RouterLink, DialogModule, ButtonModule, InputTextModule, CommonModule],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss',
})
export class ExamsComponent implements OnInit, OnDestroy {
  visible: boolean = false;          // Dialog الأسئلة والنتيجة (صفحتين)
  showResult: boolean = false;       // Dialog عرض الإجابات الصحيحة/الخطأ

  examId!: string;
  Quazes: Exam[] = [] as Exam[];
  IdSubject!: string;

  questions: Question[] = [];
  answers: (string | null)[] = [];

  currentQuestionIndex: number = 0;

  timeLeft: number = 0;
  displayTime: string = '00:00';
  private timerSub?: Subscription;

  // النتائج
  score: number = 0;
  incorrect: number = 0;
  percentage: number = 0;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly examsService: ExamsService,
    private readonly questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.getAllExam();
  }

  ngOnDestroy(): void {
    this.timerSub?.unsubscribe();
  }

  // Exams list
  getAllExam(): void {
    this.examId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.examsService.getAllExamsBySubject(this.examId).subscribe({
      next: (res) => {
        this.Quazes = res.exams;
        this.IdSubject = res.exams[0]._id;
      },
    });
  }

  // Questions
  getAllQuestion(examId: string): void {
    this.questionService.getAllQuestion(examId).subscribe({
      next: (res) => {
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

  // Navigation
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

  // Start exam
  startExam(examId: string, durationMinutes: number): void {
    this.visible = true;
    this.showResult = false;

    this.score = 0;
    this.incorrect = 0;
    this.percentage = 0;

    this.getAllQuestion(examId);
    this.startTimer(durationMinutes * 60);
  }

  // Finish -> احسب النتيجة واعرض شاشة النتيجة داخل نفس الدialog
  finishExam(): void {
    this.timerSub?.unsubscribe();

    this.score = 0;
    this.incorrect = 0;

    // correct موجودة في الـ interface باسم q.correct
    this.questions.forEach((q, i) => {
      if (this.answers[i] === q.correct) {
        this.score++;
      } else {
        this.incorrect++;
      }
    });

    this.percentage = this.questions.length
      ? Math.round((this.score / this.questions.length) * 100)
      : 0;

    // اعرض صفحة النتيجة داخل نفس الـDialog (آخر صفحة)
    this.currentQuestionIndex = this.questions.length;
  }

  // Timer
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

  // لون الدايرة حسب النسبة
  getCircleGradient(percentage: number): string {
    if (percentage >= 80) {
      return `conic-gradient(#22c55e ${percentage}%, #e5e7eb ${percentage}%)`; // أخضر
    } else if (percentage >= 50) {
      return `conic-gradient(#f59e0b ${percentage}%, #e5e7eb ${percentage}%)`; // أصفر/برتقالي
    } else {
      return `conic-gradient(#ef4444 ${percentage}%, #e5e7eb ${percentage}%)`; // أحمر
    }
  }
}
