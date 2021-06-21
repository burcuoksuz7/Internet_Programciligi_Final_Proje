import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Ev } from 'src/app/Models/Ev';
import { Sonuc } from 'src/app/Models/Sonuc';
import { EvKiralamaServisService } from 'src/app/Services/EvKiralamaServis.service';
import { EvDialogComponent } from '../Dialogs/ev-dialog/ev-dialog.component';


@Component({
  selector: 'app-Ev',
  templateUrl: './Ev.component.html',
  styleUrls: ['./Ev.component.scss']
})
export class EvComponent implements OnInit {



  displayedColumns: string[] = ['evFiyat', 'evKat', 'evMetrekare', 'evOdaSayisi', 'evIsinma', 'evBanyoSayisi', 'evAdres', 'evEsya', 'evYas', 'evGorsel', 'evKategoriAd', 'Duzenle', 'Sil'];
  dataSource: any;

  evdialogref: MatDialogRef<EvDialogComponent>
  ev: Ev;


  constructor(public service: EvKiralamaServisService, public matdialog: MatDialog, public toastr: ToastrService) {

  }

  ngOnInit() {
    this.evliste();
  }

  evliste() {
    this.service.evliste().subscribe((veri: Ev[]) => {
      this.dataSource = new MatTableDataSource(veri);
      console.log(veri);
    })
  }

  evekle() {
    this.ev = new Ev();
    this.evdialogref = this.matdialog.open(EvDialogComponent, {
      width: "600px",
      data: {
        kayit: this.ev,
        islem: "ekle"
      }
    })

    this.evdialogref.afterClosed().subscribe((veri: Ev) => {
      if (veri) {
        this.service.evekle(veri).subscribe((sonuc: Sonuc) => {
          if (sonuc.Islem == true) {
            this.toastr.success(sonuc.Mesaj);
            this.evliste()
          } else {
            this.toastr.success(sonuc.Mesaj);
            this.evliste()
          }
        })
      }
    })

  }

  evduzenle(kayit: Ev) {
    this.evdialogref = this.matdialog.open(EvDialogComponent, {
      width: "600px",
      data: {
        kayit: kayit,
        islem: "duzenle"
      }
    })

    this.evdialogref.afterClosed().subscribe(d => {
      if (d) {
        kayit.evFiyat = d.evFiyat;
        kayit.evKat = d.evKat;
        kayit.evMetrekare = d.evMetrekare;
        kayit.evOdaSayisi = d.evOdaSayisi;
        kayit.evIsinma = d.evIsinma;
        kayit.evBanyoSayisi = d.evBanyoSayisi;
        kayit.evAdres = d.evAdres;
        kayit.evEsya = d.evEsya;
        kayit.evYas = d.evYas;
        kayit.evGorsel = d.evGorsel;
        kayit.evKategoriId = d.evKategoriId;
        this.service.evduzenle(kayit).subscribe((s: Sonuc) => {
          console.log(s)
          if (s.Islem) {
            this.evliste();
          }
        });
      }
    });
  }


  evSil(evId) {
    this.service.evsil(evId).subscribe((sonuc: Sonuc) => {
      this.toastr.success(sonuc.Mesaj);
      this.evliste();
    })
  }
}

