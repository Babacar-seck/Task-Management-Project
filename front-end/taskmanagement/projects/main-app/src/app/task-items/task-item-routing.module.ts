import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewTaskItemComponent } from "./components/new-task-item/new-task-item.component";
import { SingleTaskItemComponent } from "./components/single-task-item/single-task-item.component";
import { TaskItemsListComponent } from "./components/task-items-list/task-items-list.component";



const routes: Routes = [ 
  {path : 'taskItems/:id', component: SingleTaskItemComponent},
  {path : 'taskItems', component: TaskItemsListComponent},
  {path: 'create', component: NewTaskItemComponent},

  // {path: 'edit/:id', component: EditTaskItemComponent},
];



@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],  
  exports: [
    RouterModule
  ]
})
export class TaskItemRoutingModule {}
