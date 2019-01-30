import {Injectable} from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class UserService {  
  private catUrl = "https://www.partysuperstores.co.uk/api/Getuser/";  
  private tokenUrl = "https://www.partysuperstores.co.uk/api/Token/";  
  constructor(private http: Http) {}
  
  getToken(ecode) {    
    return this.http.get(this.tokenUrl + ecode)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getuser(ecode) {    
    let headers = new Headers();
    headers.append('Authorization', "Bearer "+ localStorage.getItem("token"));
    let opts = new RequestOptions();
    opts.headers = headers;  
    return this.http.get(this.catUrl + ecode, opts)
      .map(this.extractData)
      .catch(this.handleError);
  }
  
  private extractData(res: Response) {    
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
