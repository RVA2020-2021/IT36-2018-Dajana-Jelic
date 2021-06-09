-- PROIZVODJAC PODACI

INSERT INTO "proizvodjac"("id", "naziv", "adresa", "kontakt")
VALUES (nextval('proizvodjac_seq'), 'AMK', 'Kristofera Kolumba BB, Beograd', '+3816358344');
INSERT INTO "proizvodjac"("id", "naziv", "adresa", "kontakt")
VALUES (nextval('proizvodjac_seq'), 'Twins', 'Veselina Maslese 2, Novi Sad', '+38121888666');
INSERT INTO "proizvodjac"("id", "naziv", "adresa", "kontakt")
VALUES (nextval('proizvodjac_seq'), 'Beba Kids', 'Bulevar Aleksandra Velikog 72, Beograd', '+38156987415');
INSERT INTO "proizvodjac"("id", "naziv", "adresa", "kontakt")
VALUES (nextval('proizvodjac_seq'), 'TCR', 'Radinacki put, Sremska Mitrovica', '+38158741236');

INSERT INTO "proizvodjac"("id", "naziv", "adresa", "kontakt")
VALUES (-100, 'TestNaziv', 'TestAdrs', '+38155541236');

-- PROIZVOD PODACI

INSERT INTO "proizvod"("id", "naziv", "proizvodjac")
VALUES (nextval('proizvod_seq'), 'Majica zenska kratak rukav Maja, vel 8', 1);
INSERT INTO "proizvod"("id", "naziv", "proizvodjac")
VALUES (nextval('proizvod_seq'), 'Majica zenska dug rukav Ena, vel 12', 1);
INSERT INTO "proizvod"("id", "naziv", "proizvodjac")
VALUES (nextval('proizvod_seq'), 'Majica zenska kratak rukav Jovana, vel 10', 1);

INSERT INTO "proizvod"("id", "naziv", "proizvodjac")
VALUES (nextval('proizvod_seq'), 'Trenerka muska Jovan, vel 12', 2);
INSERT INTO "proizvod"("id", "naziv", "proizvodjac")
VALUES (nextval('proizvod_seq'), 'Donji deo trenerke zenski Ana, vel 2', 2);
INSERT INTO "proizvod"("id", "naziv", "proizvodjac")
VALUES (nextval('proizvod_seq'), 'Duks muski Aca, vel 6', 2);

INSERT INTO "proizvod"("id", "naziv", "proizvodjac")
VALUES (nextval('proizvod_seq'), 'Majica zenska kratak rukav Ana Pruga, vel 3', 3);
INSERT INTO "proizvod"("id", "naziv", "proizvodjac")
VALUES (nextval('proizvod_seq'), 'Suknja Anika roza, vel 6', 3);
INSERT INTO "proizvod"("id", "naziv", "proizvodjac")
VALUES (nextval('proizvod_seq'), 'Haljina Mina, vel 8', 3);

INSERT INTO "proizvod"("id", "naziv", "proizvodjac")
VALUES (nextval('proizvod_seq'), 'Farmerke muske teksas Nikola, vel 14', 4);
INSERT INTO "proizvod"("id", "naziv", "proizvodjac")
VALUES (nextval('proizvod_seq'), 'Farmerke zenske teksas Milica, vel 4', 4);
INSERT INTO "proizvod"("id", "naziv", "proizvodjac")
VALUES (nextval('proizvod_seq'), 'Gornjak sljokica Ena, vel 16', 4);

INSERT INTO "proizvod"("id", "naziv", "proizvodjac")
VALUES (-100, 'TestNaziv', 2);



-- RACUN PODACI

INSERT INTO "racun"("id", "datum", "nacin_placanja")
VALUES (nextval('racun_seq'), to_date('12.06.2020.', 'dd.mm.yyyy.'), 'kartica');
INSERT INTO "racun"("id", "datum", "nacin_placanja")
VALUES (nextval('racun_seq'), to_date('15.11.2020.', 'dd.mm.yyyy.'), 'kes');
INSERT INTO "racun"("id", "datum", "nacin_placanja")
VALUES (nextval('racun_seq'), to_date('04.05.2020.', 'dd.mm.yyyy.'), 'virman' );
INSERT INTO "racun"("id", "datum", "nacin_placanja")
VALUES (nextval('racun_seq'), to_date('01.07.2020.', 'dd.mm.yyyy.'),'kes');
INSERT INTO "racun"("id", "datum", "nacin_placanja")
VALUES (nextval('racun_seq'), to_date('08.03.2020.', 'dd.mm.yyyy.'), 'cek');

INSERT INTO "racun"("id", "datum", "nacin_placanja")
VALUES (-100, to_date('04.08.2020.', 'dd.mm.yyyy.'), 'testplacanja');

-- STAVKA RACUNA PODACI

INSERT INTO "stavka_racuna"("id", "racun", "redni_broj", "proizvod", "kolicina", "jedinica_mere", "cena")
VALUES (nextval('stavka_racuna_seq'), 1, 1, 1, 2, 'komad', 1390);
INSERT INTO "stavka_racuna"("id", "racun", "redni_broj", "proizvod", "kolicina", "jedinica_mere", "cena")
VALUES (nextval('stavka_racuna_seq'), 1, 2, 2, 1, 'komad', 2830);
INSERT INTO "stavka_racuna"("id", "racun", "redni_broj", "proizvod", "kolicina", "jedinica_mere", "cena")
VALUES (nextval('stavka_racuna_seq'), 1, 3, 3, 1, 'komad', 1690);

INSERT INTO "stavka_racuna"("id", "racun", "redni_broj", "proizvod", "kolicina", "jedinica_mere", "cena")
VALUES (nextval('stavka_racuna_seq'), 2, 1, 4, 1, 'komad', 1290);
INSERT INTO "stavka_racuna"("id", "racun", "redni_broj", "proizvod", "kolicina", "jedinica_mere", "cena")
VALUES (nextval('stavka_racuna_seq'), 2, 2, 5, 3, 'komad', 3820);
INSERT INTO "stavka_racuna"("id", "racun", "redni_broj", "proizvod", "kolicina", "jedinica_mere", "cena")
VALUES (nextval('stavka_racuna_seq'), 2, 3, 6, 2, 'komad', 990);

INSERT INTO "stavka_racuna"("id", "racun", "redni_broj", "proizvod", "kolicina", "jedinica_mere", "cena")
VALUES (nextval('stavka_racuna_seq'), 3, 1, 7, 1, 'komad', 1520);
INSERT INTO "stavka_racuna"("id", "racun", "redni_broj", "proizvod", "kolicina", "jedinica_mere", "cena")
VALUES (nextval('stavka_racuna_seq'), 3, 2, 8, 1, 'komad', 850);
INSERT INTO "stavka_racuna"("id", "racun", "redni_broj", "proizvod", "kolicina", "jedinica_mere", "cena")
VALUES (nextval('stavka_racuna_seq'), 3, 3, 9, 1, 'komad', 3520);

INSERT INTO "stavka_racuna"("id", "racun", "redni_broj", "proizvod", "kolicina", "jedinica_mere", "cena")
VALUES (nextval('stavka_racuna_seq'), 4, 1, 10, 1, 'komad', 1690);
INSERT INTO "stavka_racuna"("id", "racun", "redni_broj", "proizvod", "kolicina", "jedinica_mere", "cena")
VALUES (nextval('stavka_racuna_seq'), 4, 2, 11, 1, 'komad', 1120);
INSERT INTO "stavka_racuna"("id", "racun", "redni_broj", "proizvod", "kolicina", "jedinica_mere", "cena")
VALUES (nextval('stavka_racuna_seq'), 4, 3, 12, 1, 'komad', 990);
INSERT INTO "stavka_racuna"("id", "racun", "redni_broj", "proizvod", "kolicina", "jedinica_mere", "cena")
VALUES (nextval('stavka_racuna_seq'), 5, 1, 10, 2, 'komad', 1450);
INSERT INTO "stavka_racuna"("id", "racun", "redni_broj", "proizvod", "kolicina", "jedinica_mere", "cena")
VALUES (nextval('stavka_racuna_seq'), 5, 2, 11, 1, 'komad', 2010);

INSERT INTO "stavka_racuna"("id", "racun", "redni_broj", "proizvod", "kolicina", "jedinica_mere", "cena")
VALUES (-100, 3, 1, 9, 2, 'Testkomad', 210);