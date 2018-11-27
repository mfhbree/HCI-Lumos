import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HttpProvider {
  baseURL: string

  constructor(public http: HttpClient) {
    this.baseURL = 'http://192.168.157.1:3000/api'
  }

  public get(url: string): Observable<any[]> {
    return this.http.get<any[]>(this.baseURL + url);
  }
}

