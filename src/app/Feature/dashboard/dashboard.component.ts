import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { RouterLink } from '@angular/router';
import { SubjectService } from '../Exam/Services/subject.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { Datum } from '../Exam/interface/get-subject';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PageHeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  _sub = inject(SubjectService);
  subjects: Datum[] = [];
  limit: number = 12;
  ngOnInit(): void {
    initFlowbite();
    this.displaySubject();
  }

  displaySubject(): void {
    this._sub.getSubject().subscribe({
      next: (res) => {
        this.subjects = res.payload.data;
        console.log(res, 'diploma');
      },
    });
  }
}
