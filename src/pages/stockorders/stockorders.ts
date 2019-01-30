import { StockOutPage } from './../stockout/stockout';
import { StockService } from './../../services/stock-service';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-stockorders',
  templateUrl: 'stockorders.html'
})
export class StockOrdersPage {  
  public username:string;
  public userid:any;
  public locationto:any;
  public locationfrom:any;
  public stockorders:any;
  public nl:any;

  changelocationfrom(event:any){}
  changelocationto(event:any){}

  showorders(){
    this.ss.getstockorders(this.locationto, this.locationfrom).subscribe(data => this.stockorders = data);
  }

  stockfill(prod){
    this.nav.push(StockOutPage, {prod:prod});
  }

  constructor(public ss : StockService,
    public nav: NavController) {  
      this.nl = JSON.parse(localStorage.getItem("nearLocation")); 
      this.locationto = this.nl.locationid;
  }
}