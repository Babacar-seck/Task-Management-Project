import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskItemsService } from '../../../core/services/task-items.service';
import { TaskItem } from '../../../core/models/taskItem';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task-item',
  imports: [
      ReactiveFormsModule,
      CommonModule
    ],
  templateUrl: './new-task-item.component.html',
  styleUrl: './new-task-item.component.css'
})
export class NewTaskItemComponent {
  userForm: FormGroup;
  taskItem!: TaskItem;

  constructor(private fb: FormBuilder,
              private taskItemsService: TaskItemsService,
              private router: Router) {
    this.userForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      isCompleted: [false] // Checkbox false by default 

    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Task Data:', this.userForm.value.title);
      this.taskItem = {
        title: this.userForm.value.title,
        description: this.userForm.value.description,
        dueDate: this.userForm.value.dueDate,
        isCompleted: this.userForm.value.isCompleted
      };
      this.taskItemsService.createTask(this.taskItem).pipe(
        tap(() => {
          this.router.navigateByUrl('/taskItems');
        })
      ).subscribe({
        next: () => alert('Task created successfully!'),
        error: (err) => {
          console.error('Error creating task:', err);
          alert('Error creating task. Please try again.');
        }
      });
    }
  }
}