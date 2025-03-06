import { Component, Input, OnInit } from '@angular/core';

import { DatePipe } from '@angular/common';
import { TaskItem } from '../models/taskItem';
import { TaskItemsService } from '../services/task-items.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-task',
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './single-task-item.component.html',
  styleUrl: './single-task-item.component.css'
})
export class SingleTaskItemComponent implements OnInit{
  myTaskItem!: TaskItem;

  constructor(private taskItemsService: TaskItemsService,
              private route: ActivatedRoute) {}
  
  
  ngOnInit(): void {
    this.getTaskItem();
  }

  private getTaskItem(){
    const taskItemId =  this.route.snapshot.params['id'];
    if (taskItemId) {
      this.myTaskItem = this.taskItemsService.getTaskItemById(Number(taskItemId));
      // this.taskItemsService.getTaskItemById(Number(taskItemId)).subscribe(item => {
      //   this.myTaskItem = item;
      // });
    }
  }
}
