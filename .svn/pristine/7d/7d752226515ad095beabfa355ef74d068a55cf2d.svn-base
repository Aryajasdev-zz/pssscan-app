import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent, Marker, MarkerOptions } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationsService } from './../../services/locations-service';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  public lat:any;
  public long:any;  
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  public locations:any;
  
  constructor(public nav: NavController,             
    public platform: Platform,    
    private gmap: GoogleMaps,
    private geo: Geolocation,
    public locs: LocationsService) {
    
  }

  ngAfterViewInit() {
    let loc : LatLng;
    this.initMap(); 
    this.map.one(GoogleMapsEvent.MAP_READY).then(() =>{
      this.getLocation().then(res =>{
        loc = new LatLng(res.coords.latitude, res.coords.longitude);
        this.map.moveCamera({
          'target': loc,
          'tilt': 10,
          'zoom': 15
          });          
        this.createMarker(loc, "My Location").then((marker : Marker) => {
         marker.showInfoWindow();
        }).catch(err =>{
          console.log(err);
        })
        this.locs.getlocations().subscribe(locs => {
          this.locations = locs;
          for(let location of this.locations){
            loc = new LatLng(location.latitude, location.longitude);
            this.createMarker(loc, location.Title).then((marker : Marker) => {
              marker.showInfoWindow();
            });
          }
        });        
      }).catch(err => {
        console.log(err);
      });   
    })   
  }

  getLocation(){
    return this.geo.getCurrentPosition();
  } 

  createMarker(loc:LatLng, title:string){
    let markerOptions: MarkerOptions = {
      position:loc,
      title:title
    }
    return this.map.addMarker(markerOptions);
  }

  initMap(){
    let element = this.mapElement.nativeElement;
    this.map = this.gmap.create(element);
  }
}