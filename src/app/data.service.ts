import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from './products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public url = 'http://localhost:3000/details';
  constructor(private _http: HttpClient) {}

  getproducts_data(): Observable<Products[]> {
    return this._http.get<Products[]>(this.url);
  }
  delete_mobiles(id: number): Observable<Products[]> {
    return this._http.delete<Products[]>(this.url + '/' + id);
  }
  post_mobile(body: any): Observable<Products[]> {
    return this._http.post<Products[]>(this.url, body);
  }
  put_mobile(body: any): Observable<Products[]> {
    return this._http.put<Products[]>(this.url, body);
  }
}
