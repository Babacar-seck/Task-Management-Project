import { Injectable } from '@angular/core';
import { TaskItem } from '../models/taskItem';

@Injectable({
 providedIn:'root'
})

export class TaskItemsService {

private taskItems: TaskItem[] = [
  new TaskItem ( 1,
   "Task 1",      
    "Task 1 description",
    new Date(),
    false,
    0),
  new TaskItem ( 2,
    "Task 2",
    "Task 2 description",
    new Date(),
    false,
    0),
  new TaskItem ( 3,
    "Task 3",
    "Task 3 description",
    new Date(),
    false,
    0)
];

  getTaskItems() : TaskItem[] {
    return [...this.taskItems];
  }   

  getTaskItemById(id: number) : TaskItem {
    const taskItem = this.taskItems.find(taskItem => taskItem.Id === id)!;
    if (!taskItem) {
      throw new Error('Task item not found');
    }
    return taskItem;
  }
  
}