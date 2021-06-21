import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kategori } from 'src/app/Models/Kategori';

@Component({
  selector: 'app-kategori-dialog',
  templateUrl: './kategori-dialog.component.html',
  styleUrls: ['./kategori-dialog.component.scss']
})
export class KategoriDialogComponent implements OnInit {

  kategori:Kategori;

  form:FormGroup;

  dialogBaslik:string;

  islem:string;


  constructor(
    public formBuilder:FormBuilder,
    public dialogRef:MatDialogRef<KategoriDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.islem=data.islem,
    this.kategori=data.kayit
    
    if(this.islem=="ekle"){
      this.dialogBaslik="Kategori Ekle"
    }else{
      this.dialogBaslik="Kategori Düzenle"
    }

    this.form=this.kategoriform();

   }

   kategoriform(){
     return this.formBuilder.group({
       kategoriAd:[this.kategori.kategoriAd,[Validators.required]]
     });

   }

  ngOnInit() {
  }

}
