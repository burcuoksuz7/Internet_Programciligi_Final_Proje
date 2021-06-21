import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AnasayfaComponent } from './Components/Anasayfa/Anasayfa.component';
import { EvComponent } from './Components/Ev/Ev.component';
import { GirisComponent } from './Components/Giris/Giris.component';
import { HomeComponent } from './Components/Home/Home.component';
import { KategoriComponent } from './Components/Kategori/Kategori.component';
import { UyeComponent } from './Components/Uye/Uye.component';


const routes: Routes = [
  {path:"",component:AnasayfaComponent},
  {path:"uyeler",component:UyeComponent,canActivate:[AdminGuard]},
  {path:"girisyap",component:GirisComponent},
  {path:"kategoriler",component:KategoriComponent,canActivate:[AdminGuard]},
  {path:"evler",component:EvComponent,canActivate:[AdminGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
