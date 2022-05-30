import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DevicesData } from 'src/app/models/device';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog} from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookDialogComponent } from './book-dialog/book-dialog.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements AfterViewInit {
  displayedColumns: string[] = ['state', 'serialNumber', 'brand', 'model', 'operativeSystem', 'version', 'actions'];
  dataSource!: MatTableDataSource<DevicesData>;
  private durationInSeconds: number = 2;
  public devices: Array<DevicesData> = [];
  ELEMENT_DATA: any[] = [
    {position: 0, name: 'null', weight: 0, symbol: 'null'}
  ];

  @ViewChild(MatTable) table?: MatTable<DevicesData>;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(public apiService: ApiService, public dialog: MatDialog, private _snackBar: MatSnackBar, public router: Router) {
    apiService.getDevices().subscribe(devices => {
      devices.map(device => this.devices.push(device));
      this.dataSource = new MatTableDataSource(this.devices);

      this.dataSource.paginator = this.paginator!;
      this.dataSource.sort = this.sort!;
    });
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator!;
    //this.dataSource.sort = this.sort!;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialogBook(id: Number): void {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '500px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar('Booked, nice job ;D');
        this.autoRefresh();
      }
    });
  }

  openDialogEdit(data: DevicesData): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: {
        device: data,
        edit: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar('Edited, nice job ;D');
        this.autoRefresh();
      }
    });
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: {
        device: null,
        edit: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.autoRefresh();
        this.openSnackBar('Added, nice job ;D');
      }
    });
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Okey', {
      duration: this.durationInSeconds * 1000,
    });
  }

  deleteDevice(id: number){
    this.apiService.deleteDevice(id);
    this.autoRefresh();
  }

  autoRefresh(){
    console.log('Refreshing...');
    this.devices = [];
    this.apiService.getDevices().subscribe(devices => {
      devices.map(device => this.devices.push(device));
      this.dataSource = new MatTableDataSource(this.devices);
      this.table?.renderRows();
      this.dataSource.paginator = this.paginator!;
      this.dataSource.sort = this.sort!;
    });
  }

  openHistotyDevice(id: Number) {
    this.router.navigateByUrl(`/history-device/${id}`);
  }
}
