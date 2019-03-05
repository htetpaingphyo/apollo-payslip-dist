import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Payslip } from './payslip.model';
import { PayslipService } from './payslip.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payslips',
  templateUrl: './payslips.component.html',
  styleUrls: ['./payslips.component.scss']
})
export class PayslipsComponent implements OnInit {

  // serviceUrl = 'http://localhost:3000/api/sendmail';
  serviceUrl = 'http://192.168.1.252:8080/api/sendmail';

  displayColumns: string[] = [
    'Select',
    'Name',
    'Email',
    'Region',
    'Designation',
    'TotalWorkingDays',
    'ActualWorkingDays',
    'TotalBaseSalary',
    'TotalDeduction',
    'NetPay'
  ];
  dataSource: MatTableDataSource<Payslip>;
  selection = new SelectionModel<Payslip>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: PayslipService, private http: HttpClient) {
    this.service.getPayslips().subscribe(slip => {
      this.dataSource = new MatTableDataSource(slip);
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  sendMail() {
    this.selection.selected.forEach((val) => {
      this.http.post(this.serviceUrl, {
          'email': val['Email']
        })
        .subscribe(
          data => {
            console.log('POST Request is successful ', data);
          },
          error => {
            console.log('Error', error);
          }
        );
    });
  }
}
