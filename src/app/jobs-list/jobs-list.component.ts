import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SERVER_URL } from '../app.constants';

export interface JobData {
  _id: string;
  title: string;
  applylink: string;
  jd: string;
  companyname: string;
  location: string;
  experience: string;
  salary: string;
  type: string;
  skills: string;
  startdate: string;
  enddate: string;
  created: string;
  source: string;
  timestamp: number;
  _v: number;
}

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'companyname', 'location', 'salary', 'applylink', 'created'];
  dataSource: MatTableDataSource<JobData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private _http: HttpClient) {}

  ngOnInit() {
    this._http.get(SERVER_URL).toPromise().then(res => {
      this.dataSource = new MatTableDataSource(res['data']);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

