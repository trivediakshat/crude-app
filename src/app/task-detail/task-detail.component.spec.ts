import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { BackendApiService } from '../service/backend-api.service';
import { FormsModule } from '@angular/forms';
import { TaskDetailComponent } from './task-detail.component';
import { AppComponent } from '../app.component';
describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;
  let AppComponent : AppComponent;
  beforeEach(() => {
    const matDialogRefStub = () => ({ close: () => ({}) });
    const formBuilderStub = () => ({});
    const backendApiServiceStub = () => ({
      putDetails: taskDetails => ({ subscribe: f => f({}) }),
      postDetails: taskDetails => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TaskDetailComponent,AppComponent],
      providers: [
        { provide: MatDialogRef, useFactory: matDialogRefStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: BackendApiService, useFactory: backendApiServiceStub }
      ]
    });
    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('onNoClick', () => {
    it('makes expected calls', () => {
      const matDialogRefStub: MatDialogRef<AppComponent> = fixture.debugElement.injector.get(
        MatDialogRef
      );
      spyOn(matDialogRefStub, 'close').and.callThrough();
      component.onNoClick();
      expect(matDialogRefStub.close).toHaveBeenCalled();
    });
  });
});
