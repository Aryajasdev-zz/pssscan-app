import {Injectable} from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {
  private GUIDUrl = "https://www.partysuperstores.co.uk/api/GetproductbyGUID/";
  private codeUrl = "https://www.partysuperstores.co.uk/api/GetproductbyCode/";
  private prodUrl = "https://www.partysuperstores.co.uk/api/GetproductbyID/";
  constructor(private http: Http) {}

  getItemsbyBarcode(barcode) {    
    let headers = new Headers();
    headers.append('Authorization', "Bearer "+ localStorage.getItem("token"));
    let opts = new RequestOptions();
    opts.headers = headers;  
    return this.http.get(this.GUIDUrl + barcode, opts)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getItemsbycode(code) {
    let headers = new Headers();
    headers.append('Authorization', "Bearer "+ localStorage.getItem("token"));
    let opts = new RequestOptions();
    opts.headers = headers;      
    return this.http.get(this.codeUrl + code, opts)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getItemsbyID(ID) {    
    let headers = new Headers();
    headers.append('Authorization', "Bearer "+ localStorage.getItem("token"));
    let opts = new RequestOptions();
    opts.headers = headers;  
    return this.http.get(this.prodUrl + ID, opts)
      .map(this.extractData)
      .catch(this.handleError);
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
