import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { Subject } from '../Exam/interface/get-subject';
import { RouterLink } from '@angular/router';
import { SubjectService } from '../Exam/Services/subject.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PageHeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  _sub = inject(SubjectService);
  subjects: Subject[] = [];
  limit: number = 12;
  ngOnInit(): void {
    initFlowbite();
    this.displaySubject();
  }

  displaySubject(): void {
    this._sub.getSubject().subscribe({
      next: (res) => {
        this.subjects = res.subjects;
      },
    });
  }

  getCourseDescription(courseName: string): string {
    switch (courseName) {
      case 'JavaScript':
        return 'Master the fundamentals of JavaScript, including variables, functions, DOM manipulation, events, and modern ES6+ features to build interactive web applications.';

      case 'Python':
        return 'Learn Python from the ground up, covering programming fundamentals, object-oriented programming, file handling, and problem-solving techniques.';

      case 'HTML & CSS':
        return 'Build responsive and modern websites by learning HTML5, CSS3, Flexbox, Grid, animations, and best practices for web design.';

      case 'Data Struct':
        return 'Understand essential data structures and algorithms such as arrays, linked lists, stacks, queues, trees, and sorting techniques to improve coding skills.';

      case 'React.js':
        return 'Create fast and dynamic user interfaces with React, including components, hooks, state management, routing, and API integration.';

      case 'Node.js':
        return 'Develop scalable backend applications using Node.js, Express.js, REST APIs, authentication, and database integration.';

      case 'Databases':
        return 'Learn relational databases, SQL queries, normalization, relationships, indexing, and efficient data management techniques.';

      case 'Git & DevOp':
        return 'Master Git, GitHub, version control, collaboration workflows, CI/CD concepts, and modern DevOps practices for software development.';

      case 'Arabic':
        return 'Enhance your Arabic language skills through grammar, vocabulary, reading, writing, and effective communication exercises.';

      default:
        return 'Explore this course to gain practical knowledge, improve your technical skills, and prepare yourself for real-world projects and career opportunities.';
    }
  }
}
