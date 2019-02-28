import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
//firebase imports
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';//If we want to use database
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ListJobsComponent } from './Customer/list-jobs.component';
import { MyJobsComponent } from './Customer/my-jobs.component';
import { PostJobComponent } from './Customer/post-job.component';
import { RequestDetailsComponent } from './Customer/request-details.component';
import { ReviewJobComponent } from './Customer/review-job.component';
import { EditProfileComponent } from './Worker/edit-profile.component';
import { ViewProfileComponent } from './Worker/view-profile.component';
import { ListWorkerJobsComponent } from './Worker/list-worker-jobs.component';
import { FormsModule } from '@angular/forms';
import { EditJobComponentComponent } from './Customer/edit-job-component.component';
// Services
import { JobsService } from './Services/jobs.service';
import { WorkersService } from './Services/workers.service';
import { CustomersService } from './Services/customers.service';
import { CustomerConfirmationService } from './Services/customerConfirmation.service';
import { WorkerConfirmationService } from './Services/workerConfirmation.service';

//Google Maps
import { GeocodeService } from './GeomapService/geocode.service';
import { AgmCoreModule } from '@agm/core';
import { GmapComponent } from './GeomapService/gmap.component';
import { CustomerConfirmationComponent } from './Customer/customer-confirmation.component';
import { WorkerConfirmationComponent } from './Worker/worker-confirmation.component';
import { MyRequestsComponent } from './Worker/my-requests.component';
import { WorkerProfileComponent } from './Customer/worker-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    ListJobsComponent,
    MyJobsComponent,
    PostJobComponent,
    RequestDetailsComponent,
    ReviewJobComponent,
    EditProfileComponent,
    ViewProfileComponent,
    ListWorkerJobsComponent,
    EditJobComponentComponent,
    GmapComponent,
    CustomerConfirmationComponent,
    WorkerConfirmationComponent,
    MyRequestsComponent,
    WorkerProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    FormsModule, 
    HttpClientModule,
    AgmCoreModule.forRoot({//GoogleMaps
      apiKey: 'AIzaSyC7bMomggbd1_CFMfE7A1Njp4kaM7HmsLs'
    })
  ],
 
  providers: [AuthService, UserService, UserResolver, AuthGuard, JobsService, WorkersService, GeocodeService, CustomersService, CustomerConfirmationService, WorkerConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }