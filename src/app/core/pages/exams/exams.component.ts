import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExamsService } from '../../services/exams.service';
import { Exam } from '../../interface/exams';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss',
})
export class ExamsComponent implements OnInit {
  examId!: string;
  Quazes:Exam[] = [] as Exam[];
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly examsService: ExamsService
  ) {}

  // start Logic Api
  // gitId() {
  //   this.examId = this.activatedRoute.snapshot.paramMap.get('id')!;
  // }

  getAllExam(): void {
    this.examId = this.activatedRoute.snapshot.paramMap.get('id')!;
  this.examsService.getAllExamsBySubject(this.examId).subscribe({
      next: (res) => {
        this.Quazes = res.exams
        console.log(res.exams);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // End Logic Api
  ngOnInit(): void {
    // this.gitId();
    this.getAllExam();
  }
}
