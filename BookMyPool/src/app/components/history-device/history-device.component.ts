import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DevicesData } from 'src/app/models/device';
import { BookEmployeeData } from 'src/app/models/book-employee';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-history-device',
  templateUrl: './history-device.component.html',
  styleUrls: ['./history-device.component.css']
})
export class HistoryDeviceComponent implements AfterViewInit {

  employeeBook: Array<BookEmployeeData> = [];
  device!: DevicesData;

  displayedColumns: string[] = ['position', 'employee', 'lendingDate', 'returningDate'];
  dataSource!: MatTableDataSource<BookEmployeeData>;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(public apiService: ApiService, private route: ActivatedRoute) {
    apiService.getDevice(this.route.snapshot.params['id']).subscribe(device => {
      this.device = device;
    });

    apiService.getHistoryDevice(this.route.snapshot.params['id']).subscribe(books => {
        books.map(book => apiService.getEmployeeById(book.employeeId).subscribe(employee => {
            this.employeeBook.push({employee: employee, book: book});

            this.dataSource = new MatTableDataSource(this.employeeBook);
            this.dataSource.paginator = this.paginator!;
            this.dataSource.sort = this.sort!;
          }));
      });
  }

  ngAfterViewInit() { }
}
