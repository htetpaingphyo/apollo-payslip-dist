import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Local } from './local.model';
import { Expat } from './expat.model';

@Injectable({
  providedIn: 'root'
})
export class PayslipService {
  private serviceUrl = 'http://localhost:3000/api/payslips';
  // private serviceUrl = 'http://192.168.1.252:8080/api/payslips';

  constructor(private http: HttpClient) {}

  getLocalPayslips(): Observable<Local[]> {
    console.log('stat => local');
    return this.http.get<Local[]>(this.serviceUrl, {
      params: { stat: 'local' }
    });
  }

  getExpatPayslips(): Observable<Expat[]> {
    console.log('stat => expat');
    return this.http.get<Expat[]>(this.serviceUrl, {
      params: { stat: 'expat' }
    });
  }
}
