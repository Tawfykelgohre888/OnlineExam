import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExamsService } from '../../services/exams.service';
import { Exam } from '../../interface/exams';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectExamStatus,
  selectModalStatus,
} from '../../../store/modal/modal.select';
import { CustomModalComponent } from '../../../shared/components/custom-modal/custom-modal.component';
import { openModal } from '../../../store/modal/modal.action';
import { QuestionService } from '../../services/question.service';
import { ExamSautes } from '../../../store/modal/modal.state';
@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [RouterLink, CommonModule, AsyncPipe, CustomModalComponent],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss',
})
export class ExamsComponent implements OnInit {
  examId!: string;
  quizzes: Exam[] = [];
  IdSubject!: string;
  modalStatus$!: Observable<boolean>;
  examStatus$!: Observable<ExamSautes>;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly examsService: ExamsService,
    private readonly _store: Store,
    private readonly _questionService: QuestionService,
  ) {}

  getModalState(): void {
    this.modalStatus$ = this._store.select(selectModalStatus);
  }
  openExam(examId: string) {
    this._store.dispatch(openModal({ examId }));
  }

  getExamStatus() {
    this.examStatus$ = this._store.select(selectExamStatus);
  }

  ngOnInit(): void {
    this.getAllExam();
    this.getModalState();
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

  getAllQuestion(id: string): void {
    this._questionService.getQuestionByExamId(id).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
}
