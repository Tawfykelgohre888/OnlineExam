import { Component, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { SubjectService } from '../../services/subject.service';
import { Subject } from '../../interface/get-subject';
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  _sub = inject(SubjectService)
  subjects:Subject[] = [];

    ngOnInit(): void {
    initFlowbite();
    this.displaySubject()
  }



  displaySubject():void{
    this._sub.getSubject().subscribe({
      next:(res)=>{
        console.log(res);
        this.subjects = res.subjects
      },error:(err)=>{
        console.log(err);
      }
    })
  }
}
