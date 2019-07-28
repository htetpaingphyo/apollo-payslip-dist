import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Local } from './local.model';
import { PayslipService } from './payslip.service';
import { HttpClient } from '@angular/common/http';
import { Expat } from './expat.model';
import { MatRadioChange } from '@angular/material';

@Component({
  selector: 'app-payslips',
  templateUrl: './payslips.component.html',
  styleUrls: ['./payslips.component.scss']
})
export class PayslipsComponent implements OnInit {
  // radio buttons rendering
  employeeTypes: string[] = ['Local', 'Expat'];
  employeeStatus: string;

  serviceUrl = 'http://localhost:3000/api/sendmail';
  // serviceUrl = 'http://192.168.1.12:8080/api/sendmail';

  localDisplayColumns: string[] = [
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

  expatDisplayColumns: string[] = [
    'Select',
    'EmployeeName',
    'Email',
    'WorkingDays',
    'ActualWorkedDays',
    'TotalBaseSalary_MMK',
    'TotalDeduction_MMK',
    'NetPay_MMK',
    'NetPay_USD'
  ];

  // assigned data source for displaying grid.
  dataSource = null;

  // assigned selection for one ~ all
  selection = null;

  // declare service
  private service: PayslipService;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient) {
    this.service = new PayslipService(this.http);
  }

  radioChange(event: MatRadioChange) {
    this.employeeStatus = event.value;
    if (this.employeeStatus === 'Local') {
      // data and selection list binding for local employees.
      this.service.getLocalPayslips().subscribe(slip => {
        this.dataSource = new MatTableDataSource<Local>(slip);
      });
      this.selection = new SelectionModel<Local>(true, []);
    } else {
      // data and selection list binding for expat employees.
      this.service.getExpatPayslips().subscribe(slip => {
        this.dataSource = new MatTableDataSource<Expat>(slip);
      });
      this.selection = new SelectionModel<Expat>(true, []);
    }
  }

  ngOnInit() {
    this.service.getLocalPayslips().subscribe(slip => {
      this.dataSource = new MatTableDataSource<Local>(slip);
      this.dataSource.paginator = this.paginator;
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (this.selection === null) {
      alert('Error! Selection state is null.');
    }
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

  sendMail(status: string) {
    if (status === 'Local') {
      this.selection.selected.forEach(val => {
        this.http.post( this.serviceUrl, { status: status, email: val['Email'] } )
          .subscribe(
            data => {
              console.log('POST Request is successful ', data);
            },
            error => {
              console.log('Error', error);
            }
          );
      });
    } else {
      this.selection.selected.forEach(val => {
        this.http
          .post(this.serviceUrl, {
            status: status,
            email: val['Email']
          })
          .subscribe(
            data => {
              console.log('POST Request is successful ', data);
            },
            error => {
              console.log('Error', error);
            }
          );
        console.log('Sending => ' + val['Email']);
      });
    }
  }
}
