import { Component, Input, OnInit } from '@angular/core';
import { TaskItem } from '../models/taskItem';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-item',
  imports: [  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input() myTaskItem!: TaskItem;

  constructor(private router: Router) {}
  
  onTaskItemClicked(){
    this.router.navigateByUrl(`/taskItems/${this.myTaskItem.Id}`);
  }
}