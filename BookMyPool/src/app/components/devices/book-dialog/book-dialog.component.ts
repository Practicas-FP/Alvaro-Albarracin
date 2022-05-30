import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeData } from 'src/app/models/employee';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.css']
})
export class BookDialogComponent implements OnInit {

  public employes: Array<EmployeeData> = [];
  public EmployeeControl = new FormControl('', Validators.required);

  constructor(
    public dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public apiService: ApiService) {
    apiService.getEmployee().subscribe(employes => {
      employes.map(employee => this.employes.push(employee));
    });
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(employeeId: string) {
    if(employeeId != undefined){
        this.apiService.bookDevice({
        id: null,
        lendingDate: null,
        returningDate: null,
        deviceId: this.data,
        employeeId: Number(employeeId)
      });
      this.dialogRef.close(true);
    }
  }
}
