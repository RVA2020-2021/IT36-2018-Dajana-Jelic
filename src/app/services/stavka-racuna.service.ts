import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { STAVKE_ZA_RACUN_URL, STAVKE_RACUNA_URL } from '../app.constants';
import { StavkaRacuna } from '../models/stavka-racuna';

@Injectable({
  providedIn: 'root'
})
export class StavkaRacunaService {

  constructor(private httpClient: HttpClient) { }

  public getStavkeZaRacun(idRacuna: number): Observable<any> {
    return this.httpClient.get(`${STAVKE_ZA_RACUN_URL}/${idRacuna}`);
  }
  
  public addStavkaRacuna(stavkaRacuna: StavkaRacuna): Observable<any> {
    stavkaRacuna.id = 0;
    return this.httpClient.post(`${STAVKE_RACUNA_URL}`, stavkaRacuna);
  }
  public updateStavkaRacuna(stavkaRacuna: StavkaRacuna): Observable<any> {
    return this.httpClient.put(`${STAVKE_RACUNA_URL}`, stavkaRacuna);
  }
  public deleteStavkaRacuna(id: number): Observable<any> {
    return this.httpClient.delete(`${STAVKE_RACUNA_URL}/${id}`);
  }
}
