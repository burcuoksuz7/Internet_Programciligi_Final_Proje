import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EvComponent } from './Components/Ev/Ev.component';
import { UyeComponent } from './Components/Uye/Uye.component';
import { KategoriComponent } from './Components/Kategori/Kategori.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './Components/Home/Home.component';
import { AnasayfaComponent } from './Components/Anasayfa/Anasayfa.component';
import { KategoriDialogComponent } from './Components/Dialogs/kategori-dialog/kategori-dialog.component';
import { EvDialogComponent } from './Components/Dialogs/ev-dialog/ev-dialog.component';
import { UyeDialogComponent } from './Components/Dialogs/uye-dialog/uye-dialog.component';
import { GirisComponent } from './Components/Giris/Giris.component';

@NgModule({
  declarations: [
    AppComponent,
    EvComponent,
    UyeComponent,
    KategoriComponent,
    HomeComponent,
    AnasayfaComponent,
    KategoriDialogComponent,
    EvDialogComponent,
    UyeDialogComponent,
    GirisComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


