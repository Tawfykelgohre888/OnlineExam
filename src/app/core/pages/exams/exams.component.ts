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



}
