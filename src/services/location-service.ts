import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { LocationsService } from '../services/locations-service';
 
@Injectable()
export class LocationService { 
    locs: any;
    err: any; 
    
    constructor(public locations: LocationsService) { } 

    public load(){
        this.locations.getlocations().subscribe(
            locs => this.locs = this.getlocdata(locs),
            error =>  this.err = <any>error);    
    } 

    getlocdata(locs){        
        this.locs = this.applyHaversine(locs); 
        this.locs.sort((locationA, locationB) => {
          return locationA.distance - locationB.distance;
        });       
        localStorage.setItem("locations",JSON.stringify(this.locs));
        localStorage.setItem("nearLocation",JSON.stringify(this.locs[0]));
        return this.locs;
      }   

    applyHaversine(locations){
        let usersLocation = {
            lat: localStorage.getItem("latitude"),
            lng: localStorage.getItem("longitude")
        };        
        locations.map((location) => { 
            let placeLocation = {
                lat: location.latitude,
                lng: location.longitude
            };
 
            location.distance = this.getDistanceBetweenPoints(
                usersLocation,
                placeLocation,
                'miles'
            ).toFixed(2);
        }); 
        return locations;
    }
 
    getDistanceBetweenPoints(start, end, units){ 
        let earthRadius = {
            miles: 3958.8,
            km: 6371
        };
 
        let R = earthRadius[units || 'miles'];
        let lat1 = start.lat;
        let lon1 = start.lng;
        let lat2 = end.lat;
        let lon2 = end.lng;
 
        let dLat = this.toRad((lat2 - lat1));
        let dLon = this.toRad((lon2 - lon1));
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c; 
        return d; 
    }
 
    toRad(x){
        return x * Math.PI / 180;
    }
 
}