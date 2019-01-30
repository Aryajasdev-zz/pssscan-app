import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductService } from './../../services/product-service';
import { StockService } from '../../services/stock-service';

@Component({
  selector: 'page-stockin',
  templateUrl: 'stockin.html'
})
export class StockInPage {
    public username:string;
    public userid:any;
    public product:any;
    public supplier:any;
    public size:any;
    public location:any;
    public qty:any;
    public stock:any;
    public nl:any;
    public clap:any;
    public sutt:any;
    public croy:any;
    public ware:any;          

    changesupp(){}
    changesize(){}
    changelocation(){}

    constructor(public nav: NavController,           
      public ps: ProductService,
      public navParams: NavParams,
      public ss : StockService) 
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
        this.location = this.nl.locationid;
      }

      stockin(prodid){      
        this.stock = {
          locationid:this.location, prodid:prodid, sizeid:this.size.sizeid, 
          sid: this.supplier.sid, qty: this.qty, userid: localStorage.getItem("userId")
        };   
        var totqty = this.clap+this.croy+this.sutt+this.ware;
        if(totqty == this.qty){
          if(this.clap>0) this.ss.fillstockout({prodid : prodid, sizeid : this.size.sizeid, sid : this.supplier.sid,
            qty : this.clap, userid : localStorage.getItem("userId"), locationidto : 2,
            locationidfrom : this.location, orderid : 0, sotype: 0 });       
          
          if(this.croy>0) this.ss.fillstockout({prodid : prodid, sizeid : this.size.sizeid, sid : this.supplier.sid,
            qty : this.clap, userid : localStorage.getItem("userId"), locationidto : 4,
            locationidfrom : this.location, orderid : 0, sotype: 0 });       
          
          if(this.sutt>0) this.ss.fillstockout({prodid : prodid, sizeid : this.size.sizeid, sid : this.supplier.sid,
            qty : this.clap, userid : localStorage.getItem("userId"), locationidto : 3,
            locationidfrom : this.location, orderid : 0, sotype: 0 });       
          
          if(this.ware>0) this.ss.fillstockout({prodid : prodid, sizeid : this.size.sizeid, sid : this.supplier.sid,
            qty : this.clap, userid : localStorage.getItem("userId"), locationidto : 1,
            locationidfrom : this.location, orderid : 0, sotype: 0 });       
          
          if(this.qty>0) this.ss.fillstockin(this.stock);       
        }
      }
}