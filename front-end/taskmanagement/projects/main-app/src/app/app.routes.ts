import { Routes } from '@angular/router';
import { TaskItemsListComponent } from './task-items-list/task-items-list.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SingleTaskItemComponent } from './single-task-item/single-task-item.component';

export const routes: Routes = [
  {path : 'taskItems/:id', component: SingleTaskItemComponent},
  {path : 'taskItems', component: TaskItemsListComponent},
  {path : '', component: LoginPageComponent}
];
