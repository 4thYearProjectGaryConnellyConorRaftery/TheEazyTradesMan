/**
 * This class is used to help control dependency injection. It contains dependency declarations. 
 * Providing services at the Module level, creates an instance of the service to share across the entire module.
 * 
 */

 //Used for core angular creation
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

//Firebase imports
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';

//Import self created components 
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { ListJobsComponent } from './Customer/list-jobs.component';
import { MyJobsComponent } from './Customer/my-jobs.component';
import { PostJobComponent } from './Customer/post-job.component';
import { RequestDetailsComponent } from './Customer/request-details.component';
import { ReviewJobComponent } from './Customer/review-job.component';
import { EditProfileComponent } from './Worker/edit-profile.component';
import { ViewProfileComponent } from './Worker/view-profile.component';
import { ListWorkerJobsComponent } from './Worker/list-worker-jobs.component';
import { EditJobComponentComponent } from './Customer/edit-job-component.component';
import { CustomerConfirmationComponent } from './Customer/customer-confirmation.component';
import { WorkerConfirmationComponent } from './Worker/worker-confirmation.component';
import { MyRequestsComponent } from './Worker/my-requests.component';
import { WorkerProfileComponent } from './Customer/worker-profile.component';

//Used for form creation
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

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

@NgModule({
  
  //Declarations for components to be used.
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

  //Used to import modules that are needed
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for authentication features
    FormsModule, 
    HttpClientModule,
    AgmCoreModule.forRoot({//GoogleMaps
      apiKey: 'AIzaSyC7bMomggbd1_CFMfE7A1Njp4kaM7HmsLs'
    })
  ],
 
  //Declare service providers for use
  providers: [
    AuthService, 
    UserService, 
    UserResolver, 
    AuthGuard, 
    JobsService, 
    WorkersService, 
    GeocodeService, 
    CustomersService, 
    CustomerConfirmationService, 
    WorkerConfirmationService
  ],

  //Apply bootstrap to the application
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }