import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proizvodjac } from 'src/app/models/proizvodjac';
import { ProizvodjacService } from 'src/app/services/proizvodjac.services';

@Component({
  selector: 'app-proizvodjac-dialog',
  templateUrl: './proizvodjac-dialog.component.html',
  styleUrls: ['./proizvodjac-dialog.component.css']
})
export class ProizvodjacDialogComponent implements OnInit {

  public flag: number;
  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProizvodjacDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Proizvodjac,
              public proizvodjacService: ProizvodjacService) { }

  ngOnInit(): void {
  }
  public addProizvodjac(): void {
    this.proizvodjacService.addProizvodjac(this.data).subscribe(() => {
      this.snackBar.open('Uspesno dodat proizvodjac: ' + this.data.naziv, 'OK', {
        duration:2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom unosa novog proizvodjaca ', 'Zatvori', {
        duration:2500
      })
    }
  }
  public updateProizvodjac(): void {
    this.proizvodjacService.updateProizvodjac(this.data).subscribe(() =>{
      this.snackBar.open('Uspesno modifikovan proizvodjac: ' + this.data.naziv, 'OK', {
        duration:2500
      }) 
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom modifikacije novog proizvodajaca ', 'Zatvori', {
        duration:2500
      })
    }
  }
  public deleteProizvodjac(): void {
    this.proizvodjacService.deleteProizvodjac(this.data.id).subscribe(() => {
      this.snackBar.open('Uspesno obrisan proizvodjac: ' + this.data.naziv, 'OK', {
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
