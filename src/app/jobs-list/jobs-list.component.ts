import {HttpClient, HttpEvent, HttpEventType} from '@angular/common/http';
import {Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { JobData } from './job.model';
import { Router } from '@angular/router';
import { JobService } from '../job-service/job.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class JobsListComponent implements OnInit {
  totalJobs= 0;
  resultsLength: number;
  filteredJobs: number;
  displayedColumns: string[] = ['title', 'companyname', 'location', 'skills', 'experience', 'created', 'expiring'];
  dataSource: MatTableDataSource<JobData>;
  expandedElement: JobData | null;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private _http: HttpClient, private router: Router, private jobService: JobService) {}

  ngOnInit() {
    this.populateJobs();
  }

  populateJobs() {
    this.jobService.getData().subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request sent!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header received!');
          break;
        case HttpEventType.DownloadProgress:
          const kbLoaded = Math.round(event.loaded / 1024);
          console.log(`Download in progress! ${kbLoaded}Kb loaded`);
          break;
        case HttpEventType.Response:
          if (event.body['len'] !== 0) {
            this.dataSource = new MatTableDataSource(event.body['data']);
            this.totalJobs = event.body['len'];
            this.resultsLength = this.totalJobs;
            setTimeout(()=>{
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            });
          }
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filteredJobs = this.dataSource.filteredData.length;
    this.resultsLength = this.filteredJobs;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewJobDetails(jobId: string) {
    this.router.navigate(['jobs', `${jobId}`, 'view']);
  }
}

