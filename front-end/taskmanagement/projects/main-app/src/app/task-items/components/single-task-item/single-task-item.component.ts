import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskItemsService } from '../../../core/services/task-items.service';
import { TaskItem } from '../../../core/models/taskItem';

@Component({
  selector: 'app-task',
  imports: [
    DatePipe,
    RouterLink,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './single-task-item.component.html',
  styleUrl: './single-task-item.component.css'
})
export class SingleTaskItemComponent implements OnInit{

  taskItem$!: Observable<TaskItem>;

  constructor(private taskItemsService: TaskItemsService,
              private router: Router,
              private route: ActivatedRoute) {}
  
  
  ngOnInit(): void {
    this.getTaskItem();
  }

  private getTaskItem(){
    const taskItemId =  this.route.snapshot.params['id'];
    if (taskItemId) {
      this.taskItem$ = this.taskItemsService.getTaskItemById(Number(taskItemId));
      // this.taskItemsService.getTaskItemById(Number(taskItemId)).subscribe(item => {
      //   this.myTaskItem = item;
      // });
    }
  }

  editTask(taskItem: TaskItem) {
    this.router.navigate(['edit', taskItem.id]);
  }
}
