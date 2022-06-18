import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataModel } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getTableInformation(): Observable<DataModel[]> {
    return this.http.get<DataModel[]>('http://localhost:3000/payments');
  }
}
