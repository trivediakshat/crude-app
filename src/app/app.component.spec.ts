import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BackendApiService } from './service/backend-api.service';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(() => {
    const backendApiServiceStub = () => ({
      getDetails: () => ({ subscribe: f => f({}) }),
      deleteDetails: (data, task) => ({ subscribe: f => f({}) })
    });
    const matDialogStub = () => ({
      open: (taskDetailComponent, object) => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppComponent],
      providers: [
        { provide: BackendApiService, useFactory: backendApiServiceStub },
        { provide: MatDialog, useFactory: matDialogStub }
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it(`title has default value`, () => {
    expect(component.title).toEqual(`crud-app`);
  });
  it(`details has default value`, () => {
    expect(component.details).toEqual([]);
  });
  it(`spinnerFlag has default value`, () => {
    expect(component.spinnerFlag).toEqual(false);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getData').and.callThrough();
      component.ngOnInit();
      expect(component.getData).toHaveBeenCalled();
    });
  });
  describe('getData', () => {
    it('makes expected calls', () => {
      const backendApiServiceStub: BackendApiService = fixture.debugElement.injector.get(
        BackendApiService
      );
      spyOn(backendApiServiceStub, 'getDetails').and.callThrough();
      component.getData();
      expect(backendApiServiceStub.getDetails).toHaveBeenCalled();
    });
  });
});
