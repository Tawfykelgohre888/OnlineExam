import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { SubjectService } from '../../services/subject.service';
import { Subject } from '../../interface/get-subject';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  _sub = inject(SubjectService);
  subjects: Subject[] = [];
  limit: number = 9;
  ngOnInit(): void {
    initFlowbite();
    this.displaySubject();
  }

  displaySubject(): void {
    this._sub.getSubject().subscribe({
      next: (res) => {
        this.subjects = res.subjects;
      }
    });
  }

  viewAll() {
    this.limit = this.subjects.length;
    this.subjects = this.subjects.slice(0,this.limit)
    console.log('limit updated:',);
  }
}
