import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExamsService } from '../../services/exams.service';
import { Exam } from '../../interface/exams';
import { QuestionService } from '../../services/question.service';
import { Question, Answer } from '../../interface/question';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ExamDialogComponent } from '../../../ui/dialog-content-example/dialog-content-example.component';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
  ],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss',
})
export class ExamsComponent implements OnInit {
  examId!: string;
  quizzes: Exam[] = [];
  IdSubject!: string;
  questions: Question[] = [];
  currentIndex = 0;
  answer: { [key: string]: string } = {};
  duration!: number;

  readonly dialog = inject(MatDialog);

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly examsService: ExamsService,
    private readonly questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.getAllExam();
  }

  loadQuestions(id: string) {
    this.questionService.getAllQuestion(id).subscribe({
      next: (res) => {
        this.questions = res.questions;
        const exam = this.quizzes.find((q) => q._id === id);

        this.dialog.open(ExamDialogComponent, {
          width: '800px',
          data: {
            questions: this.questions,
            duration: exam?.duration || 0,
          },
        });
      },
    });
  }

  getCurrentQuestions(): Question {
    return this.questions[this.currentIndex];
  }

  selectAnswer(ans: Answer) {
    const currentQ = this.getCurrentQuestions();
    this.answer[currentQ._id] = ans.key;
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    }
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  // Exams list
  getAllExam(): void {
    this.examId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.examsService.getAllExamsBySubject(this.examId).subscribe({
      next: (res) => {
        this.quizzes = res.exams;
        this.IdSubject = res.exams[0]._id;
      },
    });
  }
}
