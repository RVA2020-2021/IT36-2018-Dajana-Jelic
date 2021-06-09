import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs';
import { Proizvod } from 'src/app/models/proizvod';
import { ProizvodService } from 'src/app/services/proizvod.service';
import { ProizvodDialogComponent } from '../dialogs/proizvod-dialog/proizvod-dialog.component';

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.component.html',
  styleUrls: ['./proizvod.component.css']
})
export class ProizvodComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'naziv', 'proizvodjac', 'actions'];
  dataSource: MatTableDataSource<Proizvod>;
  subscription: Subscription;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private proizvodService: ProizvodService,
    private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.subscription= this.proizvodService.getAllProizvods().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      
    }
  }
  public openDialog(flag: number, id?: number, naziv?: string, proizvodjac?: string): void {
    const dialogRef = this.dialog.open(ProizvodDialogComponent, {data: {id,naziv,proizvodjac}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if(res===1)
      {
        this.loadData();
      }
    })
  }
    selectRow(row: any){
      console.log(row);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();   
    this.dataSource.filter = filterValue;

  }
}
