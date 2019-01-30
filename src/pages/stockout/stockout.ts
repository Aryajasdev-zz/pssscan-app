import { StockService } from './../../services/stock-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductService } from './../../services/product-service';

@Component({
  selector: 'page-stockout',
  templateUrl: 'stockout.html'
})
export class StockOutPage {
  public username:string;
  public userid:any;
  public product:any;  
  public locationfrom:any;
  public locationto:any;
  public qty:any;
  public stock:any;
  public nl:any;
 
  changesupp(){}
  changesize(){}
  changelocation(){}
  changelocationto(){}

  constructor(public nav: NavController,           
    public ps: ProductService,
    public ss : StockService,
    public navParams: NavParams) 
    {  
      this.product = this.navParams.get('prod');         
      this.userid = localStorage.getItem("userId");
      this.username = localStorage.getItem("userName"); 
      this.nl = JSON.parse(localStorage.getItem("nearLocation"));  
      this.locationfrom = this.nl.locationid;  
    }

    stockin(prod){      
      this.stock = {prodid : prod.prodid, sizeid : prod.sizeid, sid : prod.sizeid,
      qty : this.qty, userid : localStorage.getItem("userId"), locationidto : this.locationto,
      locationidfrom : this.locationfrom, orderid : prod.orderid, sotype: prod.sotype };    
      this.ss.fillstockout(this.stock);    
    }
}