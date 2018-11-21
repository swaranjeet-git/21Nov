import { Observable } from 'rxjs/Observable';
import { Injectable, } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { log } from 'util';

@Injectable()
export class RestService {
    private subject = new Subject<any>();
    
    constructor(private httpclient: HttpClient) {
        // console.log('Service Initialized.....');
    }


    // options = new Http({ headers: this.headers });

    getRequest(url: string) {
        const headers = new HttpHeaders().set(
            'Content-Type', 'application/json').set(
                'Access-Control-Allow-Origin', '*').set(
                    'Access-Control-Allow-Headers', 'Content-Type,x-requested-with,Authorization,Access-Control-Allow-Origin');
        // console.log('--------RestFul service about to invoke....');
        return this.httpclient.get(url, { headers }).map(res => res);
    }


    postRequest(url: string, body: string): Observable<Object> {
        const headers = new HttpHeaders().set(
            'Content-Type', 'application/json').set(
                'Access-Control-Allow-Origin', '*').set(
                    'Access-Control-Allow-Headers', 'Content-Type,x-requested-with,Authorization,Access-Control-Allow-Origin');
        // console.log('--------RestFul service about to invoke....');
        return this.httpclient.post(url, body, { headers }).map(res => res);
        // .subscribe(res => {
        //         console.log('--------RestFul service in progress....');
        //         console.log(res);
        //         response =  res;
        //         // if (res.status < 200 || res.status >= 300) {
        //         //     throw new Error('This request has failed ' + res.status);
        //         // } else {
        //         //     res;
        //         // }
        //     },
        //         error => this.handleError);
        //          this.subject.next({ text: message });
    }

    postFormRequest(url: string, body) {
        const headers = new HttpHeaders()
        // .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', 'Content-Type,x-requested-with,Authorization,Access-Control-Allow-Origin');

        return this.httpclient.post(url, body, { headers })
        .subscribe(res => {
                console.log(res);
            },
                error => this.handleError);
    }

    putRequest(url: string, body: string): Observable<Object> {
        const headers = new HttpHeaders().set(
            'Content-Type', 'application/json').set(
                'Access-Control-Allow-Origin', '*').set(
                    'Access-Control-Allow-Headers', 'Content-Type,x-requested-with,Authorization,Access-Control-Allow-Origin');
        console.log('--------RestFul service about to invoke....');
        return this.httpclient.put(url, body, { headers });
        // .subscribe(res => {
        //     console.log('--------RestFul service in progress....');
        //     // if (res.status < 200 || res.status >= 300) {
        //     //     throw new Error('This request has failed ' + res.status);
        //     // } else {
        //     //     res;
        //     // }
        //     return Observable.of(res)
        // },
        //     error => this.handleError
        // );
    }

    handleError(error: any) {
        // log error
        // could be something more sofisticated
        const errorMsg = error.message || `OOH! There was a problem with our service and we couldn't retrieve your data!`;
        console.log(errorMsg);
        // throw an application level error
        return Observable.throw(errorMsg);
    }
}
