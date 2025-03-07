import { Routes } from '@angular/router';
import { NewTaskItemComponent } from './task-items/components/new-task-item/new-task-item.component';
import { LoginPageComponent } from './auth/components/login-page/login-page.component';
import { TaskItemsListComponent } from './task-items/components/task-items-list/task-items-list.component';
import { SingleTaskItemComponent } from './task-items/components/single-task-item/single-task-item.component';
import { EditTaskItemComponent } from './task-items/components/edit-task-item/edit-task-item.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterPageComponent } from './auth/components/register-page/register-page.component';

export const routes: Routes = [
  {path : 'taskItems', component: TaskItemsListComponent, canActivate: [AuthGuard]},
  {path : 'taskItems/:id', component: SingleTaskItemComponent,canActivate: [AuthGuard]},
  {path: 'create', component: NewTaskItemComponent,canActivate: [AuthGuard]},
  {path: 'edit/:id', component: EditTaskItemComponent,canActivate: [AuthGuard]},
  {path: 'register', component: RegisterPageComponent},
  {path : 'login', component: LoginPageComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login'},
];
