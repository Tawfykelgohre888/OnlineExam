import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { SubjectService } from '../../services/subject.service';
import { Subject } from '../../interface/get-subject';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  _sub = inject(SubjectService);
  cdr = inject(ChangeDetectorRef);
  subjects: Subject[] = [];
  limit: number = 9;

  ngOnInit(): void {
    initFlowbite();
    this.displaySubject();
  }

  displaySubject(): void {
    this._sub.getSubject().subscribe({
      next: (res) => {
        console.log(res);
        this.subjects = res.subjects;
        console.log('Subjects length:', this.subjects.length);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  viewAll() {
    this.limit = this.subjects.length;
    console.log('limit updated:', this.limit);
    this.cdr.detectChanges();
  }
}
