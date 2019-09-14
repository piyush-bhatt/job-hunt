import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';
import { JobService } from '../job-service/job.service';
import { JobData } from '../jobs-list/job.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {
  isSaving: boolean;
  minDate: any;

  editForm = this.fb.group({
    title: [null, [Validators.required, Validators.maxLength(100)]],
    applylink: [null, [Validators.required, Validators.maxLength(500)]],
    jd: [null, [Validators.required, Validators.maxLength(1000)]],
    companyname: [null, [Validators.required, Validators.maxLength(100)]],
    location: [null, [Validators.required, Validators.maxLength(100)]],
    experience: [null, [Validators.required, Validators.maxLength(50)]],
    salary: [null, [Validators.required, Validators.maxLength(50)]],
    skills: [null, [Validators.required, Validators.maxLength(100)]],
    enddate: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder, private http: HttpClient, private jobService: JobService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.minDate = moment(new Date()).utc().format();
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.openSnackBar('Job Posted successfully',null);
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
    this.openSnackBar('An error occured. Please try again',null);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1500,
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const job = this.createFromForm();
    this.jobService.create(job).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Response:
          if (event.status === 201) {
            this.onSaveSuccess();
          } else {
            this.onSaveError();
          }
      }
    });
  }

  private createFromForm() {
    return {
      ...new JobData(),
      title: this.editForm.get(['title']).value,
      applylink: this.editForm.get(['applylink']).value,
      jd: this.editForm.get(['jd']).value,
      companyname: this.editForm.get(['companyname']).value,
      location: this.editForm.get(['location']).value,
      experience: this.editForm.get(['experience']).value,
      salary: this.editForm.get(['salary']).value,
      skills: this.editForm.get(['skills']).value,
      enddate: moment(new Date(this.editForm.get(['enddate']).value)).format('YYYY-MM-DD')
    };
  }

}

