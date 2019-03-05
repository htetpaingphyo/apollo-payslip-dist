import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  file: File = null;
  message: string;
  // apiUrl = 'http://localhost:3000/api';
  apiUrl = 'http://192.168.1.252:8080/api/';

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onFileSelected(event) {
    this.file = <File>event.target.files[0];
  }

  onFileUpload() {
    if (this.file === null) {
      this.message = 'Please choose a file to upload.';
      return;
    }
    const fd = new FormData();
    fd.append('payslip', this.file, this.file.name);
    this.http
      .post(this.apiUrl + '/upload', fd, {
        reportProgress: true,
        observe: 'events'
      })
      .subscribe(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.message = `Uploading: ${((event.loaded / event.total) * 100).toString()}%`;
            break;
          case HttpEventType.Response:
            this.message = event.body['message'];
            break;
          default:
            break;
        }
      });
  }
}
