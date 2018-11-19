import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MapPage } from '../map/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  selectedNamaz = 'asr';

  constructor(public navCtrl: NavController) {

  }

  searchMasajid(event) {

    this.navCtrl.push(MapPage, {
      namaz: this.selectedNamaz
    }); 
  }
  
}