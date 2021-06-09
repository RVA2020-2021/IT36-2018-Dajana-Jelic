import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { error } from 'selenium-webdriver';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proizvod } from 'src/app/models/proizvod';
import { Proizvodjac } from 'src/app/models/proizvodjac';
import { ProizvodService } from 'src/app/services/proizvod.service';
import { ProizvodjacService } from 'src/app/services/proizvodjac.services';

@Component({
  selector: 'app-proizvod-dialog',
  templateUrl: './proizvod-dialog.component.html',
  styleUrls: ['./proizvod-dialog.component.css']
})
export class ProizvodDialogComponent implements OnInit {

  public flag: number;
  proizvodjaci: Proizvodjac[]; 

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProizvodDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Proizvod,
              public proizvodService: ProizvodService,
              public proizvodjacService: ProizvodjacService) { }

  ngOnInit(): void {
    this.proizvodjacService.getAllProizvodjacs().subscribe(
      data => {
        this.proizvodjaci = data;
      }
    );
  }

  compareTo(a,b) {
    return a.id == b.id;
  }

  public addProizvod(): void {
    this.proizvodService.addProizvod(this.data).subscribe(() => {
      this.snackBar.open('Uspesno dodat proizvod: ' + this.data.id, 'OK', {
        duration:2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom unosa novog proizvoda ', 'Zatvori', {
        duration:2500
      })
    }
  }
  public updateProizvod(): void {
    this.proizvodService.updateProizvod(this.data).subscribe(() =>{
      this.snackBar.open('Uspesno modifikovan proizvod: ' + this.data.id, 'OK', {
        duration:2500
      }) 
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom modifikacije novog proizvoda ', 'Zatvori', {
        duration:2500
      })
    }
  }
  public deleteProizvod(): void {
    this.proizvodService.deleteProizvod(this.data.id).subscribe(() => {
      this.snackBar.open('Uspesno obrisan proizvod: ' + this.data.id, 'OK', {
        duration:2500
      }) 
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom brisanja proizvoda ', 'Zatvori', {
        duration:2500
      })
    }
  }
  public cancel(){
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {
      duration: 1000
    })
  }
}

