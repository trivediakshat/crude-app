import { Component } from '@angular/core';
import { BackendApiService } from './service/backend-api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskDetailComponent } from './task-detail/task-detail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud-app';
  details: any = [];
  setTask: {};
  spinnerFlag:boolean =false;
  constructor(public backendAPI: BackendApiService, public dialog: MatDialog) { }
  ngOnInit() {
    this.setTask = {
      description: "",
      id: this.details.length + 1,
      priority: "",
      status: "",
    }
   this.getData();
  }
  getData(){
    this.spinnerFlag = true;
    this.backendAPI.getDetails().subscribe(data => {
      this.details = Object.values(data);
      if(this.details){
        this.spinnerFlag =false;
        this.details.forEach((element, index) => {
          if (typeof (element) !== 'string')
            element.title = Object.keys(data)[index];
          console.log(element);
        });
      }
     
    });
  }
  deleteTask(data,task) {
    this.backendAPI.deleteDetails(data,task).subscribe(data => {
      this.getData();
    });
  }
  openDialog(details): void {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: '20%',
      data: details
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}