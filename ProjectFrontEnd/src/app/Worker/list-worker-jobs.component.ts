// /// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job.model';
import { Worker } from '../models/worker.model';
import { JobsService } from '../Services/jobs.service';
import { WorkersService } from '../Services/workers.service';
import { WorkerConfirmationService } from '../Services/workerConfirmation.service';
import { Router, Params } from '@angular/router';
import { ViewChild } from '@angular/core';
import { GeocodeService } from '../GeomapService/geocode.service';
import { AuthService } from '../core/auth.service';
import { CustomersService } from '../Services/customers.service';
import { Customer } from '../models/customer.model';


@Component({
  selector: 'app-list-worker-jobs',
  templateUrl: './list-worker-jobs.component.html',
  styleUrls: ['./list-worker-jobs.component.css']
})
export class ListWorkerJobsComponent implements OnInit {


  firstName: string = "";
  secondName: string = "";
  customer: Customer;
  jobs: Job[];
  x: number = 0; 

  updateJob: Job ={
    id: "",
    trade: "",
    description: "",
    customer: "",
    requests: "",
    complete: false,
    location: "",
    date: "",
    accepted: false,
    contact: ""

  }

  worker: Worker;
  
  constructor(
   private workerService: WorkersService,
   private jobService: JobsService, 
   private confirmationService: WorkerConfirmationService,  
   private router: Router,
   private geoMap: GeocodeService,
   private authService: AuthService,
   private customerService: CustomersService) { }

  ngOnInit() {
    /*
     * Get a handle on all of the jobs.
     */
    this.jobService.getJobs().subscribe(data => {
      this.jobs = data
      /*
      for(var i = 0; i < this.jobs.length; i++){
        //this.id = this.jobs[i].customer
        this.customerService.getCustomer(this.jobs[i].customer).subscribe(data =>{
          console.log(i)
          this.customer = data;
          
          this.jobs[this.x].customerName = this.customer.firstName + " " + this.customer.secondName ;
          this.x++
       
        })
      } */
    })
  }
  /*
   * When the worker clicks request on a job.
   */
  request(job: Job): void{
    console.log("REQUEST FOR -->" + job.id);
    /*
     * Add this workers id to the requests string for this job.
     */
    job.requests += " " + localStorage.getItem('WorkerID');

    this.updateJob.id = job.id;
    this.updateJob.trade = job.trade;
    this.updateJob.description = job.description;
    this.updateJob.customer = job.customer;
    this.updateJob.requests = job.requests;
    this.updateJob.complete = job.complete;
    this.updateJob.location = job.location;
    this.updateJob.date = job.date;
    this.updateJob.accepted = job.accepted
    this.updateJob.contact = job.contact;


    /*
     * Update this job on the server side and navigate the user.
     */
    this.jobService.putJob(this.updateJob).subscribe((data: Job) =>{
      console.log(data);
      this.confirmationService.setConfirmationMessage("Job has been successfully requested!");
      this.router.navigate(["/workerConfirmation"]);
    });
    /*
     * Now add this jobs id to the jobsRequested string on the current worker
     * and update that worker on the server side.
     */
    this.workerService.getWorker(localStorage.getItem('WorkerID')).subscribe(data => {
      this.worker = data;
      this.worker.jobsRequested += job.id + " ";
      console.log("Current jobs requested ---> " + this.worker.jobsRequested)
      this.workerService.putWorker(this.worker).subscribe(data => {
        console.log("DONE ---> " + data); 
        console.log("Jobs requested ---> " + this.worker.jobsRequested)
      })
    })
    
  }

 /*
  * If the user wants to view the mao fir this job.
  */
  getMap(job: Job){

    this.geoMap.setAddress(job.location);
    this.router.navigate(["/gmap"]);

  }

 

   // Navigation.
  navListJobs(): void{
    this.router.navigate(["/listJobsWorker"]);
  }

   navMyProfile(): void{
    this.router.navigate(["/viewProfile"]);
  }

   navEditProfile(): void{
    this.router.navigate(["/editProfile"]);
  }

  navMyRequests(): void{
    this.router.navigate(["/myrequests"]);
  }

   logout(){
    this.authService.doLogout()
    .then((res) => {
      //this.location.back(); //login
       localStorage.setItem('WorkerID', "x")
      this.router.navigate(["/login"]);
    }, (error) => {
      console.log("Logout error", error);
    });
  }

  // End Navigation.

}


