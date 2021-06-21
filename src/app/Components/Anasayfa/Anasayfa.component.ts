import { Component, OnInit } from '@angular/core';
import { Ev } from 'src/app/Models/Ev';
import { EvKiralamaServisService } from 'src/app/Services/EvKiralamaServis.service';

@Component({
  selector: 'app-Anasayfa',
  templateUrl: './Anasayfa.component.html',
  styleUrls: ['./Anasayfa.component.scss']
})
export class AnasayfaComponent implements OnInit {

  constructor(public service: EvKiralamaServisService) { }

 evler:Ev[];

  ngOnInit() { this.evliste();
  }

  evliste(){
    this.service.evliste().subscribe((d:Ev[])=>{
      this.evler=d;

    })
  }
  
}
