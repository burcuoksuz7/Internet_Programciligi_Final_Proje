import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ev } from 'src/app/Models/Ev';
import { Kategori } from 'src/app/Models/Kategori';
import { EvKiralamaServisService } from 'src/app/Services/EvKiralamaServis.service';

@Component({
  selector: 'app-ev-dialog',
  templateUrl: './ev-dialog.component.html',
  styleUrls: ['./ev-dialog.component.scss']
})
export class EvDialogComponent implements OnInit {

  ev: Ev;
  kategoriler: Kategori[];

  form: FormGroup;

  dialogBaslik: string;

  islem: string;

  constructor(
    public formBuilder: FormBuilder,
    public service: EvKiralamaServisService,
    public dialogRef: MatDialogRef<EvDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem,
      this.ev = data.kayit

    if (this.islem == "ekle") {
      this.dialogBaslik = "Ev Ekle"
    } else {
      this.dialogBaslik = "Ev Düzenle"
    }
    this.kategoriListe();
    this.form = this.evForm();

  }

  kategoriListe() {
    this.service.kategorilistele().subscribe((veri: Kategori[]) => {
      this.kategoriler = veri;
    })
  }

  evForm() {
    return this.formBuilder.group({
      evFiyat: [this.ev.evFiyat, [Validators.required]],
      evKat: [this.ev.evKat, [Validators.required]],
      evMetrekare: [this.ev.evMetrekare, [Validators.required]],
      evOdaSayisi: [this.ev.evOdaSayisi, [Validators.required]],
      evIsinma: [this.ev.evIsinma, [Validators.required]],
      evBanyoSayisi: [this.ev.evBanyoSayisi, [Validators.required]],
      evAdres: [this.ev.evAdres, [Validators.required]],
      evEsya: [this.ev.evEsya, [Validators.required]],
      evYas: [this.ev.evYas, [Validators.required]],
      evGorsel: [this.ev.evGorsel, [Validators.required]],
      evKategoriId: [this.ev.evKategoriId, [Validators.required]]
    });

  }

  ngOnInit() {
  }

}