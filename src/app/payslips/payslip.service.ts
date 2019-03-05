import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payslip } from './payslip.model';

@Injectable({
  providedIn: 'root'
})
export class PayslipService {
  // private serviceUrl = 'http://localhost:3000/api/payslips';
  private serviceUrl = 'http://192.168.1.252:8080/api/payslips';

  constructor(private http: HttpClient) {}

  getPayslips(): Observable<Payslip[]> {
    return this.http.get<Payslip[]>(this.serviceUrl);
  }
}
