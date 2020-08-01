import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { BackendApiService } from '../service/backend-api.service';
import { NgForm, Validators } from '@angular/forms'

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent  {
  options: FormGroup;
  taskDetails:any;
  constructor( public dialogRef: MatDialogRef<AppComponent>,fb: FormBuilder,public backendAPI : BackendApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      this.taskDetails = data;
      console.log(data);
    
    }
    saveTask(taskDetails){
      this.backendAPI.postDetails(taskDetails).subscribe(data=>{
        console.log(data);
      });
      this.dialogRef.close();
    }
  onNoClick(): void {
    this.dialogRef.close();
  }

}