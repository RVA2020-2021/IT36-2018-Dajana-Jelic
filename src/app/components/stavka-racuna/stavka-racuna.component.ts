import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Proizvod } from 'src/app/models/proizvod';
import { Racun } from 'src/app/models/racun';
import { StavkaRacuna } from 'src/app/models/stavka-racuna';
import { StavkaRacunaService } from 'src/app/services/stavka-racuna.service';
import { StavkaRacunaDialogComponent } from '../dialogs/stavka-racuna-dialog/stavka-racuna-dialog.component';

@Component({
  selector: 'app-stavka-racuna',
  templateUrl: './stavka-racuna.component.html',
  styleUrls: ['./stavka-racuna.component.css']
})
export class StavkaRacunaComponent implements OnInit, OnChanges, OnDestroy {

  displayedColumns = ['id', 'redni_broj', 'kolicina', 'jedinicaMere', 'cena', 'racun', 'proizvod', 'actions'];
  dataSource: MatTableDataSource<StavkaRacuna>;
  subscription: Subscription;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  @Input() selektovanRacun : Racun
  constructor(private stavkaRacunaService: StavkaRacunaService,
    private dialog: MatDialog) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  ngOnChanges(): void {
    if (this.selektovanRacun.id) {
      this.loadData();
    }
  }

  ngOnInit(): void {
    //this.loadData();
  }

 loadData(){
  this.subscription=this.stavkaRacunaService.getStavkeZaRacun(this.selektovanRacun.id).subscribe(
    data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
 }
  );
  (error: Error) => {
    console.log(error.name + ' ' + error.message);
  }
 }
 public openDialog(flag: number, id?: number, redniBroj?: number, kolicina?: number, jedinicaMere?: string, cena?: number,
  racun?: Racun, proizvod?: Proizvod)
  {
      const dialogRef = this.dialog.open(StavkaRacunaDialogComponent,
           {  data: {id, redniBroj, kolicina, jedinicaMere, cena, racun, proizvod}});
      dialogRef.componentInstance.flag = flag;
      if(flag === 1) {
        dialogRef.componentInstance.data.racun = this.selektovanRacun;
      }
      dialogRef.afterClosed().subscribe(result => {
        if(result === 1) {
          this.loadData();
        }
      })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();   
    this.dataSource.filter = filterValue;
  }
}
