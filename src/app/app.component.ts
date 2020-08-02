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
      this.spinnerFlag =false;
      this.details =data;
      if(data && data.length !==0){
        this.details = Object.values(data);
        if(this.details){
          this.details.forEach((element, index) => {
            if (typeof (element) !== 'string')
              element.title = Object.keys(data)[index];
            });
          }
          console.log(this.details);
      }
    },error=>{
      this.spinnerFlag =false;
    });
  }
  deleteTask(data,task) {
    let self =this;
    this.backendAPI.deleteDetails(data,task).subscribe(data => {
      setTimeout(function(){
        self.getData();
      },1000);
      
        
     
      
    });
  }
  openDialog(details): void {
    let taskDetails ={
      description: details.description,
        id: details.id,
        priority: details.priority,
        status: details.status,
        title:details.title
    }
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: '20%',
      data: taskDetails
    });

    dialogRef.afterClosed().subscribe(result => {
      let self =this;
      this.setTask = {
        description: "",
        id: '',
        priority: "",
        status: "",
      }
      setTimeout(function(){
        self.getData();
      },1000);
      console.log('The dialog was closed');
    });
  }
}