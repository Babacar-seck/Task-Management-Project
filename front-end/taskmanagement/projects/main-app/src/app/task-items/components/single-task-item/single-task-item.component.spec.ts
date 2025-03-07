import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTaskItemComponent } from './single-task-item.component';

describe('TaskComponent', () => {
  let component: SingleTaskItemComponent;
  let fixture: ComponentFixture<SingleTaskItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleTaskItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleTaskItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
