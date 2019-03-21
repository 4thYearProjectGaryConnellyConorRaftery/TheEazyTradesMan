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

/**
 * ListWorkerJobsComponent is the initial component that gets rendered when a Worker logs in.
 * This component is only responsible for listing the Jobs for the Workers to see, this is
 * to allow to worker to request a job they would like to complete.
 */
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
  listJobs: Job[] = [];
  x: number = 0; 
  message: string = "";
  isWorker: boolean = false;

  /**
   * Initialize job object
   */
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
  
  /**
   * Null constructor
   * @param workerService 
   * @param jobService 
   * @param confirmationService 
   * @param router 
   * @param geoMap 
   * @param authService 
   * @param customerService 
   */
  constructor(
   private workerService: WorkersService,
   private jobService: JobsService, 
   private confirmationService: WorkerConfirmationService,  
   private router: Router,
   private geoMap: GeocodeService,
   private authService: AuthService,
   private customerService: CustomersService) { }

   /**
     * If the user is a Worker, then let them see the data.
     */
  ngOnInit() {
    if(localStorage.getItem('WorkerID') == "x"){
      this.message = "Only logged in workers can view this page.(try refreshing)" // For testing.
      console.log("here" + this.message)
    }
    else{
      this.isWorker = true;
      
      /**
       * Get a handle on all of the jobs.
       */
      this.jobService.getJobs().subscribe(data => {
        this.jobs = data
        this.jobs.reverse()
      })
    }
  }
  /**
   * When the worker clicks request on a job.
   */
  request(job: Job): void{
    console.log("REQUEST FOR -->" + job.id);

    /**
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


    /**
     * Update this job on the server side and navigate the user.
     */
    this.jobService.putJob(this.updateJob).subscribe((data: Job) =>{
      console.log(data);
      this.confirmationService.setConfirmationMessage("Job has been successfully requested!");
      this.router.navigate(["/workerConfirmation"]);
    });

    /**
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

 /**
  * If the user wants to view the map for this job by clicking View Map.
  */
  getMap(job: Job){
    this.geoMap.setAddress(job.location);
    this.router.navigate(["/gmap"]);
  }

  /**
    * When the user click on the "List Jobs" navigation button, redirect them
    * to listJobsWorker component.
    */
   navListJobs(): void{
    this.router.navigate(["/listJobsWorker"]);
  }

  /**
   * When the user clicks "View Profile" navigation button, redirect them to
   * the viewProfile component.
   */
   navMyProfile(): void{
    this.router.navigate(["/viewProfile"]);
  }

  /**
   * When the user clicks "Edit Profile" navigation button, redirect them to
   * the editProfile component.
   */
   navEditProfile(): void{
    this.router.navigate(["/editProfile"]);
  }

  /**
   * When the user clicks "My Jobs" navigation button, redirect them to
   * the myrequests component.
   */
  navMyRequests(): void{
    this.router.navigate(["/myrequests"]);
  }

  /**
   * When the user clicks the "Logout" navigation button, logout 
   * that user and redirect them to the login page. Change the local
   *  storage to remove access for site navigation.
   */
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

}


