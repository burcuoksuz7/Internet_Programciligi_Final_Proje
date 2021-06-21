import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Kategori } from '../Models/Kategori';
import { Ev } from '../Models/Ev';
import { Uye } from '../Models/Uye';


@Injectable({
  providedIn: 'root'
})
export class EvKiralamaServisService {

  apiurl = "https://localhost:44305/api/";

  constructor(public http: HttpClient) { }

  kategorilistele() {
    return this.http.get(this.apiurl + "kategoriliste");

  }

  kategoribyid(evId: number) {
    return this.http.get(this.apiurl + "kategoribyid/" + evId)

  }

  kategoriekle(kat: Kategori) {

    return this.http.post(this.apiurl + "kategoriekle", kat);

  }

  kategoriduzenle(kat: Kategori) {

    return this.http.put(this.apiurl + "kategoriduzenle", kat);
  }
  kategorisil(katid: number) {

    return this.http.delete(this.apiurl + "kategorisil/" + katid);
  }

  evliste() {

    return this.http.get(this.apiurl + "evliste");
  }

  evlistebykatid(evId: number) {

    return this.http.get(this.apiurl + "evlistebykatid/" + evId);
  }

  evekle(ev: Ev) {
    return this.http.post(this.apiurl + "evekle", ev);
  }

  evduzenle(ev: Ev) {
    return this.http.put(this.apiurl + "evduzenle", ev);
  }

  evsil(evId: number) {

    return this.http.delete(this.apiurl + "evsil/" + evId);
  }


  uyeliste() {
    return this.http.get(this.apiurl + "uyeliste");

  }

  uyebyid(uyeid: number) {

    return this.http.get(this.apiurl + "uyebyid/" + uyeid);

  }

  uyeekle(uye: Uye) {
    return this.http.post(this.apiurl + "uyeekle", uye);

  }

  uyeduzenle(uye: Uye) {
    return this.http.put(this.apiurl + "uyeduzenle", uye);

  }

  uyesil(uyeid: number) {
    return this.http.delete(this.apiurl + "uyesil/" + uyeid);
  }

  girisYap(mail: string, sifre: string) {
    return this.http.get(this.apiurl + "girisyap/" + mail + "/" + sifre)
  }

}
