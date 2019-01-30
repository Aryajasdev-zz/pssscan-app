import {Injectable} from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class StockService {  
  private stockordersUrl = "https://www.partysuperstores.co.uk/api/GetStockOrders/";    
  private stockinUrl = "https://www.partysuperstores.co.uk/api/PostStockin";   
  private stockoutUrl = "https://www.partysuperstores.co.uk/api/PostStockout";
  private stockorderUrl = "https://www.partysuperstores.co.uk/api/GetStockOrder";  

  constructor(private http: Http) {}

  getstockorders(lto,lfrom) {    
    let headers = new Headers();
    headers.append('Authorization', "Bearer "+ localStorage.getItem("token"));
    let opts = new RequestOptions();
    opts.headers = headers;      
    return this.http.get(this.stockordersUrl + "/"+lto + "/"+lfrom, opts)
      .map(this.extractData)
      .catch(this.handleError);
  }

  fillstockin(stock){
    let headers = new Headers();
    headers.append('Authorization', "Bearer "+ localStorage.getItem("token"));
    let opts = new RequestOptions();
    opts.headers = headers;  
    this.http.post(this.stockinUrl, stock, opts)
      .map(res => res.json())
      .subscribe( 
        data => console.log(data)
    )   
  }

  fillstockorder(stock){
    let headers = new Headers();
    headers.append('Authorization', "Bearer "+ localStorage.getItem("token"));
    let opts = new RequestOptions();
    opts.headers = headers;  
    this.http.post(this.stockorderUrl, stock, opts)
      .map(res => res.json())
      .subscribe( 
        data => console.log(data)
    )  
  }

  fillstockout(stock){
    let headers = new Headers();
    headers.append('Authorization', "Bearer "+ localStorage.getItem("token"));
    let opts = new RequestOptions();
    opts.headers = headers;   
    this.http.post(this.stockoutUrl, stock, opts)
      .map(res => res.json())
      .subscribe( 
        data => console.log(data)
    ) 
  }
  
  private extractData(res: Response) {   
    console.log(res); 
    let body = JSON.parse(res['_body']);    
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
  
}

export class users {
  constructor(
    public userid: number,
    public username: string       
  ) { }
}
