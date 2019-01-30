import { LocationService } from './../../services/location-service';
import { StockOrdersPage } from './../stockorders/stockorders';
import { StockOutPage } from './../stockout/stockout';
import { StockOrderPage } from './../stockorder/stockorder';
import { StockInPage } from './../stockin/stockin';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ProductService } from './../../services/product-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public barcode:String = "";
  public product:any;
  public errorMessage:any;
  public username:string;
  public prodcode:string = "";
  public lat:any;
  public long:any;
  public loc:any;
  public nl:any;

  constructor(public nav: NavController, 
    private barcodeScanner: BarcodeScanner,    
    public ps: ProductService,
    public ls : LocationService) {
      this.ls.load();
      this.nl = JSON.parse(localStorage.getItem("nearLocation"));       
      this.username = localStorage.getItem("userName");  
  }   

  search(){
    this.ps.getItemsbycode(this.prodcode).subscribe(
      product => this.product = product,
      error =>  this.errorMessage = <any>error);  
   }   

   showorders(){ 
     this.nav.push(StockOrdersPage);
   }

   stockin(prod){
    this.nav.push(StockInPage,{prod:prod});
   }

  stockorder(prod){
    this.nav.push(StockOrderPage,{prod:prod});
  }  

  stockout(prod){
    this.nav.push(StockOutPage,{prod:prod});
  }  

  scan(){
    this.barcodeScanner.scan().then((barcodeData) => {
      this.barcode = barcodeData.text;
      this.ps.getItemsbyBarcode(this.barcode).subscribe(
        product => this.product = product,
        error =>  this.errorMessage = <any>error);  
     }, (err) => {
       // An error occurred
     });
  }
}
