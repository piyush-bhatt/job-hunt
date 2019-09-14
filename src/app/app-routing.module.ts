import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'jobs', pathMatch: 'full' },
  {
    path: 'jobs',
    component: JobsListComponent
  },
  {
    path: 'jobs/:jobId/view',
    component: JobDetailsComponent
  },
  {
    path: 'jobs/new',
    component: CreateJobComponent
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }