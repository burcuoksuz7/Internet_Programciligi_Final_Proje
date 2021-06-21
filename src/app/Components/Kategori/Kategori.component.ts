import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Kategori } from 'src/app/Models/Kategori';
import { Sonuc } from 'src/app/Models/Sonuc';
import { KategoriDialogComponent } from '../Dialogs/kategori-dialog/kategori-dialog.component';
import { EvKiralamaServisService } from 'src/app/Services/EvKiralamaServis.service';

@Component({
  selector: 'app-Kategori',
  templateUrl: './Kategori.component.html',
  styleUrls: ['./Kategori.component.scss']
})
export class KategoriComponent implements OnInit {

  displayedColumns: string[] = ['KategoriAd', 'Duzenle', 'Sil'];
  dataSource: any;

  kategoridialogref: MatDialogRef<KategoriDialogComponent>
  kategori: Kategori;


  constructor(public service: EvKiralamaServisService, public matdialog: MatDialog, public toastr: ToastrService) {

  }

  ngOnInit() {
    this.kategorilistele();
  }

  kategorilistele() {
    this.service.kategorilistele().subscribe((veri: Kategori[]) => {
      this.dataSource = new MatTableDataSource(veri);
    })
  }

  kategoriekle() {
    this.kategori = new Kategori();
    this.kategoridialogref = this.matdialog.open(KategoriDialogComponent, {
      width: "300px",
      data: {
        kayit: this.kategori,
        islem: "ekle"
      }
    })

    this.kategoridialogref.afterClosed().subscribe((veri: Kategori) => {
      if (veri) {
        this.service.kategoriekle(veri).subscribe((sonuc: Sonuc) => {
          if (sonuc.Islem == true) {
            this.toastr.success(sonuc.Mesaj);
            this.kategorilistele()
          } else {
            this.toastr.success(sonuc.Mesaj);
            this.kategorilistele()
          }
        })
      }
    })

  }


  kategoriduzenle(kayit: Kategori) {
    this.kategoridialogref = this.matdialog.open(KategoriDialogComponent, {
      width: "300px",
      data: {
        kayit: kayit,
        islem: "duzenle"
      }
    })

    this.kategoridialogref.afterClosed().subscribe(d => {
      if (d) {

        kayit.kategoriAd = d.kategoriAd;
        console.log(kayit)
        this.service.kategoriduzenle(kayit).subscribe((s: Sonuc) => {
          this.dataSource.AlertUygula(s);
          if (s.Islem) {
            this.kategorilistele();
          }
          else{
            this.kategorilistele();

          }
        })
      }
    });
  }


  kategoriSil(katid) {
    this.service.kategorisil(katid).subscribe((sonuc: Sonuc) => {
      this.toastr.success(sonuc.Mesaj);
      this.kategorilistele();
    })
  }
}
