import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { ListJobsComponent } from './Customer/list-jobs.component';
import { MyJobsComponent } from './Customer/my-jobs.component';
import { PostJobComponent } from './Customer/post-job.component';
import { RequestDetailsComponent } from './Customer/request-details.component';
import { ReviewJobComponent } from './Customer/review-job.component';
import { EditProfileComponent } from './Worker/edit-profile.component';
import { ViewProfileComponent } from './Worker/view-profile.component';
import { ListWorkerJobsComponent } from './Worker/list-worker-jobs.component';
import { EditJobComponentComponent } from './Customer/edit-job-component.component';
import { GmapComponent } from './GeomapService/gmap.component';
import { CustomerConfirmationComponent } from './Customer/customer-confirmation.component';
import { WorkerConfirmationComponent } from './Worker/worker-confirmation.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},
  { path: 'listJobs', component: ListJobsComponent },
  { path: 'myJobs', component: MyJobsComponent },
  { path: 'postJob', component: PostJobComponent },
  { path: 'requestDetails', component: RequestDetailsComponent },
  { path: 'reviewJob', component: ReviewJobComponent },
  { path: 'listJobsWorker', component: ListWorkerJobsComponent },
  { path: 'viewProfile', component: ViewProfileComponent },
  { path: 'editJob/:id', component: EditJobComponentComponent },
  { path: 'editProfile', component: EditProfileComponent },
  { path: 'gmap', component: GmapComponent },
  { path: 'customerConfirmation', component: CustomerConfirmationComponent },
  { path: 'workerConfirmation', component: WorkerConfirmationComponent },
  { path: 'editProfile', component: EditProfileComponent }
];
