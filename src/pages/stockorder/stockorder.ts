import { StockService } from './../../services/stock-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductService } from './../../services/product-service';

@Component({
  selector: 'page-stockorder',
  templateUrl: 'stockorder.html'
})
export class StockOrderPage {
  public username:string;
  public userid:any;
  public product:any;
  public supplier:any;
  public size:any;
  public locationto:any;
  public locationfrom:any;
  public qty;any;
  public stock:any;
  public nl:any;
  public sotype:boolean;
  
  changesupp(){}
  changesize(){}
  changelocation(){}
  changelocationfrom(){}

  constructor(public nav: NavController,           
      public ps: ProductService,
      public ss: StockService,
      public navParams: NavParams) 
      {  
        this.product = this.navParams.get('prod');      
        this.size = {
          sizeid : this.product.sizes[0].sizeid
        };     
        this.supplier = {
          sid : this.product.supplycodes[0].sid
        };
        this.userid = localStorage.getItem("userId");
        this.username = localStorage.getItem("userName"); 
        this.nl = JSON.parse(localStorage.getItem("nearLocation"));  
        this.locationto = this.nl.locationid; 
  }

  stockin(prodid){      
    this.stock = {prodid : prodid, sizeid : this.size.sizeid, sid : this.supplier.sid,
    qty : this.qty, userid : localStorage.getItem("userId"), locationidto : this.locationto,
    locationidfrom : this.locationfrom, orderid : 0, sotype : this.sotype };    
    this.ss.fillstockorder(this.stock);        
  }
}