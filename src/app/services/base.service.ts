import { Injectable } from '@angular/core';
import {environment as env} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class BaseService {
    baseUrl: string = env.backendUrl;

    constructor(
        public http: HttpClient
    ) {}

    private handleError(err) {
        console.log(err.message);
    }

    private getHeaders() {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        return headers;
    }

    get = (url, callback?) => {
        return this.http.get(url, { headers: this.getHeaders(), observe: 'response' })
        .subscribe(
          response => {
            if (callback) {
              callback(response.body);
            }
          },
          err => {
            this.handleError(err);
          }
        );
    }

    post = (url, body, callback?) => {
        return this.http.post(url, body, { headers: this.getHeaders(), observe: 'response' })
        .subscribe(
            response => {
              if (callback) {
                  callback(response.body);
              }
            },
            err => {
              callback(err);
              this.handleError(err);
            }
        );
    }
}
