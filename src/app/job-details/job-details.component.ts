import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { SERVER_URL } from '../app.constants';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../job-service/job.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  jobDetails: any; 
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private jobService: JobService) { }

  ngOnInit() {
    const jobId = this.activatedRoute.snapshot.params['jobId'];
    this.jobService.find(jobId).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Response:
          this.jobDetails = event.body;
          }
      });    
  }

}
