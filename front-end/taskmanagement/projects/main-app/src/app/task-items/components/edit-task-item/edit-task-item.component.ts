import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskItemsService } from '../../../core/services/task-items.service';
import { Observable } from 'rxjs';
import { TaskItem } from '../../../core/models/taskItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-task-item',
  imports: [
        ReactiveFormsModule,
        CommonModule
      ],
  templateUrl: './edit-task-item.component.html',
  styleUrl: './edit-task-item.component.css'
})
export class EditTaskItemComponent implements OnInit {
  taskForm!: FormGroup;
  taskItem$!: Observable<TaskItem>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private taskItemsService: TaskItemsService 
  ) {}

  ngOnInit() {
    const taskId = Number(this.route.snapshot.paramMap.get('id')); 
    this.taskItemsService.getTaskItemById(taskId).subscribe(task => {
      console.log(task);
      this.taskForm = this.fb.group({
        description: [task.description, Validators.required],
        dueDate: [this.formatDate(task.dueDate), Validators.required],
        title: [task.title, Validators.required],
        isCompleted: [task.isCompleted]
      });
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const updatedTask = { id: Number(this.route.snapshot.paramMap.get('id')), ...this.taskForm.value };
      this.taskItemsService.updateTaskItem(updatedTask).subscribe(() => {
        this.router.navigate(['/taskItems']); 
      });
    }
  }

  cancelEdit() {
    this.router.navigate(['/taskItems']); 
  }

  formatDate(date: string): string {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so +1
    const day = String(formattedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
