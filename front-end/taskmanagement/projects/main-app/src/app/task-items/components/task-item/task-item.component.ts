import { Component, Input, OnInit } from '@angular/core';
import { TaskItem } from '../../../core/models/taskItem';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TaskItemsService } from '../../../core/services/task-items.service';

@Component({
  selector: 'app-task-item',
  imports: [  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input() taskItem!: TaskItem;

  constructor(private router: Router, private taskItemService : TaskItemsService) {}
  
  onTaskItemClicked(){
    this.router.navigateByUrl(`/taskItems/${this.taskItem.id}`);
  }

  deleteTask(){
    this.taskItemService.deleteTaskItem(Number(this.taskItem.id)).subscribe(() => {
      console.log('Task deleted:', this.taskItem.id);
      this.router.navigateByUrl('/taskItems');
    });
  }
}