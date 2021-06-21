import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kategori } from 'src/app/Models/Kategori';
import { Uye } from 'src/app/Models/Uye';
import { EvKiralamaServisService } from 'src/app/Services/EvKiralamaServis.service';

@Component({
  selector: 'app-uye-dialog',
  templateUrl: './uye-dialog.component.html',
  styleUrls: ['./uye-dialog.component.scss']
})
export class UyeDialogComponent implements OnInit {

  uye: Uye;

  uyeler:Uye[];

  kategoriler: Kategori[];

  form: FormGroup;

  dialogBaslik: string;

  islem: string;

  constructor(

    public formBuilder: FormBuilder,
    public service: EvKiralamaServisService,
    public dialogRef: MatDialogRef<UyeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {

    this.islem = data.islem,
      this.uye = data.kayit

    if (this.islem == "ekle") {
      this.dialogBaslik = "Üye Ekle"
    } else {
      this.dialogBaslik = "Üye Düzenle"
    }
    this.uyeListe();
    this.form = this.uyeForm();

   }

   uyeListe() {
    this.service.uyeliste().subscribe((veri: Uye[]) => {
      this.uyeler = veri;
    })
  }

  uyeForm() {
    return this.formBuilder.group({
      uyeAd: [this.uye.uyeAd, [Validators.required]],
      uyeSoyad: [this.uye.uyeSoyad, [Validators.required]],
      uyeTel: [this.uye.uyeTel, [Validators.required]],
      uyeMail: [this.uye.uyeMail, [Validators.required]],
      uyeParola: [this.uye.uyeParola, [Validators.required]],
      uyeYetki: [this.uye.uyeYetki, [Validators.required]],
    });

  }

  ngOnInit() {
  }

}
