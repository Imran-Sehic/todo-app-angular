import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovedTodosComponent } from './removed-todos.component';

describe('RemovedTodosComponent', () => {
  let component: RemovedTodosComponent;
  let fixture: ComponentFixture<RemovedTodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovedTodosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovedTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
