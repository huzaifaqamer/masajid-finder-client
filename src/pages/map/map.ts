import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';


declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  googleMap: any;
  masajidMarkers = [];
  dataUrl = 'http://127.0.0.1:8000/api/v0/mosques';

  constructor(
    public navCtrl: NavController, 
    public http: Http,
    public geolocation: Geolocation, 
    public navParams: NavParams) {

  }

  ionViewDidLoad() {
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
  
      this.googleMap = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.googleMap.addListener('idle', (e) => {
        this.loadMasajid();
      });

    }, (err) => {
      console.log(err);
    });
 
  }

  loadMasajid() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('ne_lat', this.googleMap.getBounds().getNorthEast().lat());
    params.set('ne_lng', this.googleMap.getBounds().getNorthEast().lng());
    params.set('sw_lat', this.googleMap.getBounds().getSouthWest().lat());
    params.set('sw_lng', this.googleMap.getBounds().getSouthWest().lng());
    params.set('namaz', this.navParams.get('namaz'));

    let requestOptions = new RequestOptions();
    requestOptions.search = params;

    this.http.get(this.dataUrl, requestOptions).map(res => res.json())
    .subscribe(
      data => {
        this.removeMarkers();
        this.addMarkers(data);
    },
      err => {
        console.log('Something bad happened')
      }
    );
  }

  addMarkers(masajidData) {
    for (let masjid of masajidData) {
      var marker = new google.maps.Marker({
        position: {'lat': masjid.latitude, 'lng': masjid.longitude},
        map: this.googleMap
      });
      this.addInfoWindow(marker, masjid);
      this.masajidMarkers.push(marker);
   }
  }

  removeMarkers() {
    for (let marker of this.masajidMarkers) {
      marker.setMap(null);
    }
    this.masajidMarkers = [];
  }

  addInfoWindow(marker, masjid) {
    let content = "<h4>" + masjid.name + "</h4>"
    content += "<p><strong>" + this.navParams.get('namaz') + ": </strong>"
    content += masjid[this.navParams.get('namaz')] +"</p>";

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.googleMap, marker);
    });
  }
}
