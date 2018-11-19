import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, 
    public geolocation: Geolocation, 
    public navParams: NavParams) {

  }

  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap() {

    this.geolocation.getCurrentPosition().then((position) => {
      
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
  
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('idle', (e) => {
        this.loadMasajid();
      });

    }, (err) => {
      console.log(err);
    });
 
  }

  loadMasajid() {
    console.log(this.navParams.get('namaz'))
  }

}
