import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemsListComponent } from './task-items-list.component';

describe('TaskItemsListComponent', () => {
  let component: TaskItemsListComponent;
  let fixture: ComponentFixture<TaskItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
