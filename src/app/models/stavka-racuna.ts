import { Proizvod } from "./proizvod";
import { Racun } from "./racun";

export class StavkaRacuna
{
   id: number;
   redni_broj: number; 
   kolicina: number;
   jedinica_mere: string;
   cena: number;
   racun: Racun;
   proizvod: Proizvod;
}