import { Location } from "@angular/common"
import { TestBed, fakeAsync, tick } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { Router } from "@angular/router"

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
import { MyRequestsComponent } from './Worker/my-requests.component';
import { WorkerProfileComponent } from './Customer/worker-profile.component';

import { rootRouterConfig } from "./app.routes"
import { AppComponent } from "./app.component";


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from "angularfire2/auth";

/**
 * This test suite tests auto tests all of the routes in the application.
 */
describe('Routing', ()=>{

    let location: Location;
    let router: Router;  
    let fixture;

     // create new instance of FormBuilder
     const formBuilder: FormBuilder = new FormBuilder();

     /**
      * Initialise all of the needed imports and declarations in the beforeEach block.
      */
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(rootRouterConfig), FormsModule,
                AngularFireAuthModule, ReactiveFormsModule],
            declarations: [
                LoginComponent,
                RegisterComponent,
                UserComponent,
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
                WorkerProfileComponent,
                AppComponent
            ] ,
            providers: [ UserResolver, AuthGuard, { provide: FormBuilder, useValue: formBuilder } ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })//end testbed


        /**
         * Initialize variables needed for the tests.
         */
        router = TestBed.get(Router);
        location = TestBed.get(Location)
        fixture = TestBed.createComponent(AppComponent)
        router.initialNavigation();
        fixture.detectChanges();
    })//End before each.

  

    /**
     * Tests /login path.
     */
    it('The path "" redirects you to /login', fakeAsync(() => {
        router.navigate(['']).then(()=>{
           
                expect(location.path()).toBe('/login');
            
            
        });
    }))   

     /**
     * Tests /register path.
     */
    it('The path "register" directs you to /register', fakeAsync(() => {
        router.navigate(['register']).then(()=>{
            expect(location.path()).toBe('/register');
        });
    }))  

     /**
     * Tests /listJobs path.
     */
    it('The path "listJobs" directs you to /listJobs', fakeAsync(() => {
        router.navigate(['listJobs']).then(()=>{
            expect(location.path()).toBe('/listJobs');
        });
    }))  

     /**
     * Tests /myJobs path.
     */
    it('The path "myJobs" directs you to /myJobs', fakeAsync(() => {
        router.navigate(['myJobs']).then(()=>{
            expect(location.path()).toBe('/myJobs');
        });
    })) 
    
     /**
     * Tests /postJob path.
     */
    it('The path "postJob" directs you to /postJob', fakeAsync(() => {
        router.navigate(['postJob']).then(()=>{
            expect(location.path()).toBe('/postJob');
        });
    })) 

     /**
     * Tests /requestDetails path.
     */
    it('The path "requestDetails" directs you to /requestDetails', fakeAsync(() => {
        router.navigate(['requestDetails']).then(()=>{
            expect(location.path()).toBe('/requestDetails');
        });
    })) 

     /**
     * Tests /reviewJob path.
     */
    it('The path "reviewJob" directs you to /reviewJob', fakeAsync(() => {
        router.navigate(['reviewJob']).then(()=>{
            expect(location.path()).toBe('/reviewJob');
        });
    })) 

      /**
     * Tests /listJobsWorker path.
     */
    it('The path "listJobsWorker" directs you to /listJobsWorker', fakeAsync(() => {
        router.navigate(['listJobsWorker']).then(()=>{
            expect(location.path()).toBe('/listJobsWorker');
        });
    })) 

      /**
     * Tests /viewProfile path.
     */
    it('The path "viewProfile" directs you to /viewProfile', fakeAsync(() => {
        router.navigate(['viewProfile']).then(()=>{
            expect(location.path()).toBe('/viewProfile');
        });
    })) 

    /**
     * Tests /editJob path.
     */
    it('The path "editJob" directs you to /editJob', fakeAsync(() => {
        router.navigate(['editJob']).then(()=>{
            expect(location.path()).toBe('/editJob');
        });
    })) 

    /**
     * Tests /editProfile path.
     */
    it('The path "editProfile" directs you to /editProfile', fakeAsync(() => {
        router.navigate(['editProfile']).then(()=>{
            expect(location.path()).toBe('/editProfile');
        });
    })) 

    /**
     * Tests /gmap path.
     */
    it('The path "gmap" directs you to /gmap', fakeAsync(() => {
        router.navigate(['gmap']).then(()=>{
            expect(location.path()).toBe('/gmap');
        });
    })) 

    /**
     * Tests /customerConfirmation path.
     */
    it('The path "customerConfirmation" directs you to /customerConfirmation', fakeAsync(() => {
        router.navigate(['customerConfirmation']).then(()=>{
            expect(location.path()).toBe('/customerConfirmation');
        });
    })) 

    /**
     * Tests /workerConfirmation path.
     */
    it('The path "workerConfirmation" directs you to /workerConfirmation', fakeAsync(() => {
        router.navigate(['workerConfirmation']).then(()=>{
            expect(location.path()).toBe('/workerConfirmation');
        });
    })) 

    /**
     * Tests /myrequests path.
     */
    it('The path "myrequests" directs you to /myrequests', fakeAsync(() => {
        router.navigate(['myrequests']).then(()=>{
            expect(location.path()).toBe('/myrequests');
        });
    })) 

    /**
     * Tests /workerProfile path.
     */
    it('The path "workerProfile" directs you to /workerProfile', fakeAsync(() => {
        router.navigate(['workerProfile']).then(()=>{
            expect(location.path()).toBe('/workerProfile');
        });
    })) 

    /**
     * Tests /editProfile path.
     */
    it('The path "editProfile" directs you to /editProfile', fakeAsync(() => {
        router.navigate(['editProfile']).then(()=>{
            expect(location.path()).toBe('/editProfile');
        });
    })) 




})