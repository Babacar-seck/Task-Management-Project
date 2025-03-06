import { Component, Input, OnInit } from '@angular/core';
import { TaskItem } from '../models/taskItem';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskItemsService } from '../services/task-items.service';

@Component({
  selector: 'app-task-items-list',
  imports: [TaskItemComponent],
  templateUrl: './task-items-list.component.html',
  styleUrl: './task-items-list.component.css'
})
export class TaskItemsListComponent implements OnInit{
  @Input() myTaskItem!: TaskItem;
  mytaskItems!: TaskItem[];
  constructor(private taskItemsService: TaskItemsService) {
  }


  ngOnInit(): void {
    this.mytaskItems = this.taskItemsService.getTaskItems();
  }

}
