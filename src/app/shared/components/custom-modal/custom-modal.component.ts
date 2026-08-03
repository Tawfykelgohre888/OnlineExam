import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { questionAdapter } from '../../../Feature/Exam/interface/question';
import {
  selectCurrentQuestion,
  selectNumQuestion,
} from '../../../store/questions/questions.select';
import { Subject, takeUntil } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  onBack,
  onNext,
  updateQuestion,
} from '../../../store/questions/questions.action';
@Component({
  selector: 'app-custom-modal',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.scss',
})
export class CustomModalComponent implements OnInit, OnDestroy {
  private readonly _store = inject(Store);
  currentQuestion: questionAdapter = {} as questionAdapter;
  private destroy$ = new Subject<void>();
  numOfQuestion = 0;
  selectAnswer: string = '';
  isBackBtnDisabled: boolean = true;
  isNextBtnDisabled: boolean = true;
  getCurrentQuestion(): void {
    this._store
      .select(selectCurrentQuestion)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.currentQuestion = data as questionAdapter;
        },
      });
  }

  getNumOfQuestion() {
    this._store
      .select(selectNumQuestion)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.numOfQuestion = data;
        },
      });
  }

  currentQuestion$ = this._store.select(selectCurrentQuestion);

  questionProgressArray() {
    return [...new Array(this.numOfQuestion).keys()];
  }
  onSelectAnswer() {
    console.log(this.selectAnswer);
    this.enableNextButton();
  }

  enableNextButton() {
    this.isNextBtnDisabled = false;
  }
  disableNextButton() {
    this.isNextBtnDisabled = true;
  }
  enableBackButton() {
    this.isBackBtnDisabled = false;
  }
  disableBackButton() {
    this.isBackBtnDisabled = true;
  }

  onExam() {
    // update the question selected answer
    this._store.dispatch(
      updateQuestion({
        qId: this.currentQuestion._id,
        selectedAnswer: this.selectAnswer,
      }),
    );

    // reset Selected Answer

    this.selectAnswer = '';

    if (this.currentQuestion.index === this.numOfQuestion - 1) {
      // show the report
      return;
    }

    this.disableNextButton();
    // get the next question
    this._store.dispatch(onNext());
    // enable Back Btn
    this.enableBackButton();
  }

  onBack() {
    // get previous question
    this._store.dispatch(onBack());
    // make the selected answer as in the new current question
    this.selectAnswer = this.currentQuestion.selectedAnswer!;
    // enable next button
    this.enableNextButton();
    // check of you are in the first questions start disable the back button
    if (this.currentQuestion.index === 1) {
      this.disableBackButton();
    }
  }

  ngOnInit(): void {
    this.getCurrentQuestion();
    this.getNumOfQuestion();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
