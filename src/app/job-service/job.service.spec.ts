import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { SERVER_URL } from '../app.constants';
import { take, map } from 'rxjs/operators';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { JobService } from './job.service';
import { JobData } from '../jobs-list/job.model';

const mockJobs = [
    {   
        applylink: "link1",
        companyname: "name1",
        created: "2019-09-13T09:19:27.438Z",
        enddate: "date1",
        experience: "exp1",
        id: "5eab5e03-be86-4e85-87c4-7f4c5e3a1e00",
        jd: "jd1",
        location: "location1",
        salary: "salary1",
        skills: "skills1",
        title: "title1"
    },
    {   
        applylink: "link2",
        companyname: "name2",
        created: "2019-09-13T09:19:27.438Z",
        enddate: "date2",
        experience: "exp2",
        id: "5eab5e03-be86-4e85-87c4-7f4c5e3a1e01",
        jd: "jd2",
        location: "location2",
        salary: "salary2",
        skills: "skills2",
        title: "title2"
    },
    {   
        applylink: "link3",
        companyname: "name3",
        created: "2019-09-13T09:19:27.438Z",
        enddate: "date3",
        experience: "exp3",
        id: "5eab5e03-be86-4e85-87c4-7f4c5e3a1e02",
        jd: "jd3",
        location: "location3",
        salary: "salary3",
        skills: "skills3",
        title: "title3"
    },
    {   
        applylink: "link4",
        companyname: "name4",
        created: "2019-09-13T09:19:27.438Z",
        enddate: "date4",
        experience: "exp4",
        id: "5eab5e03-be86-4e85-87c4-7f4c5e3a1e03",
        jd: "jd4",
        location: "location4",
        salary: "salary4",
        skills: "skills4",
        title: "title4"
    }
  ];

describe('Job Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JobService]
    });
  });

  it(
    'should get job posts from http endpoint',
    inject(
      [HttpTestingController, JobService],
      (
        httpMock: HttpTestingController,
        jobService: JobService
      ) => {          
          jobService.getData().subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Response:
                expect(event.body).toEqual(mockJobs);
            }
          });
          
          const mockReq = httpMock.expectOne(SERVER_URL);
          
          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          
          mockReq.flush(mockJobs);
          
          httpMock.verify();
      }
    )
  );

  it(
    'should create a job post',
    inject(
      [HttpTestingController, JobService],
      (
        httpMock: HttpTestingController,
        jobService: JobService
      ) => {          
          jobService.create(mockJobs[0]).subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Response:
                expect(event.status).toEqual(200);
            }
          });
          
          const mockReq = httpMock.expectOne(SERVER_URL);
          
          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          
          mockReq.flush(mockJobs);
          
          httpMock.verify();
      }
    )
  );
});

