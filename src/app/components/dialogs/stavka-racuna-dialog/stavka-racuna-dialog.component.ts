import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Proizvod } from 'src/app/models/proizvod';
import { StavkaRacuna } from 'src/app/models/stavka-racuna';
import { ProizvodService } from 'src/app/services/proizvod.service';
import { StavkaRacunaService } from 'src/app/services/stavka-racuna.service';
import { StavkaRacunaComponent } from '../../stavka-racuna/stavka-racuna.component';

@Component({
  selector: 'app-stavka-racuna-dialog',
  templateUrl: './stavka-racuna-dialog.component.html',
  styleUrls: ['./stavka-racuna-dialog.component.css']
})
export class StavkaRacunaDialogComponent implements OnInit, OnDestroy {

  proizvodi: Proizvod[];
  public flag: number;
  proizvodSubscription: Subscription;
  
  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StavkaRacunaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StavkaRacuna,
    public proizvodService: ProizvodService,
    public stavkaRacunaService: StavkaRacunaService) { }


  ngOnDestroy(): void {
    this.proizvodSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.proizvodSubscription = this.proizvodService.getAllProizvods().subscribe(
      data => {
        this.proizvodi = data;
      }
    ),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }

  compareTo(a,b) {
    return a.id == b.id;
  }

  public add(): void {
    this.stavkaRacunaService.addStavkaRacuna(this.data)
    .subscribe(() => {
      this.snackBar.open('Stavka racuna uspešno dodata: ' + this.data.id, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja stavke racuna: ' + this.data.id, 'Zatvori', {
        duration: 2500
      })
    }
  }
  public update(): void {
    this.stavkaRacunaService.updateStavkaRacuna(this.data)
    .subscribe(() => {
      this.snackBar.open('Stavka racuna uspešno izmenjena: ' + this.data.id, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom izmene stavke racuna: ' + this.data.id, 'Zatvori', {
        duration: 2500
      })
    }
  }
  public delete(): void {
    this.stavkaRacunaService.deleteStavkaRacuna(this.data.id)
    .subscribe(() => {
      this.snackBar.open('Stavka racuna uspešno obrisana: ' + this.data.id, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja stavke racuna: ' + this.data.id, 'Zatvori', {
        duration: 2500
      })
    }
  }
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.' + this.data.id, 'Zatvori', {
      duration: 1000
    })
  }

}
