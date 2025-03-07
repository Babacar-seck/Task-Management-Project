import { Component, Input, OnInit } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TaskItem } from '../../../core/models/taskItem';
import { TaskItemsService } from '../../../core/services/task-items.service';

@Component({
  selector: 'app-task-items-list',
  standalone: true, 
  imports: [
    TaskItemComponent,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './task-items-list.component.html',
  styleUrl: './task-items-list.component.css'
})
export class TaskItemsListComponent implements OnInit{
  @Input() taskItem!: TaskItem;
  mytaskItems!: TaskItem[];

  taskItems$!: Observable<TaskItem[]>;

    constructor(private taskItemsService: TaskItemsService) {}


  ngOnInit(): void {
    // this.mytaskItems = this.taskItemsService.getTaskItems();
     this.taskItems$ = this.taskItemsService.getAllTaskItems();
    // console.log(this.taskItems$);
  }

}
