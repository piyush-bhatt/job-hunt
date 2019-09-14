import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { SERVER_URL } from '../app.constants';

@Injectable()
export class JobService {

  constructor(private http: HttpClient) {}

  getData() {
    const req = new HttpRequest('GET', SERVER_URL, {
      reportProgress: true
    });

    return this.http.request(req);
  }

  find(jobId: number) {
    const req = new HttpRequest('GET', SERVER_URL + '/' + jobId, {
        reportProgress: true
      });
  
      return this.http.request(req);
  }

  create(job: object) {
    const req = new HttpRequest('POST', SERVER_URL, job, {
        reportProgress: true
      });
  
      return this.http.request(req);
  }
}