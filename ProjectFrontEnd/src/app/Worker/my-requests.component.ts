import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job.model';
import { Worker } from '../models/worker.model';
import { JobsService } from '../Services/jobs.service';
import { WorkersService } from '../Services/workers.service';
import { Router, Params } from '@angular/router';
import { GeocodeService } from '../GeomapService/geocode.service';
import { AuthService } from '../core/auth.service';
import { CustomersService } from '../Services/customers.service';
import { Customer } from '../models/customer.model';

/**
 * My Requests component handles all the workers job requests. 
 * When the worker requests a job and when a job request has been accepted.
 */
@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {
  worker: Worker;
  jobs: Job[] = [];
  acceptedJobs: Job[] = [];
  job: Job;
  acceptedJob: Job;
  requests: string[];
  accepts: string[];
  acceptSet = new Set();
  requestSet = new Set();
  customer: Customer;
  myJobs: Job[] = [];
  x: number = 0;
  message: string = "";
  isWorker; boolean = false;

  /**
   * Null Constructor
   * @param workerService 
   * @param jobService 
   * @param router 
   * @param geoMap 
   * @param authService 
   * @param customerService 
   */
  constructor(
    private workerService: WorkersService,
    private jobService: JobsService,
    private router: Router,
    private geoMap: GeocodeService,
    private authService: AuthService,
    private customerService: CustomersService) { }

  /**
    * If the user is a Worker, then let them see the data.
    */
  ngOnInit() {
    if (localStorage.getItem('WorkerID') == "x") {
      this.message = "Only logged in workers can view this page." // For testing.
      console.log("here" + this.message)
    }
    else {
      this.isWorker = true;

      /**
       * Get a handle on the current worker.
       */
      this.workerService.getWorker(localStorage.getItem('WorkerID')).subscribe(data => {
        this.worker = data;

        /**
         * Split the workers requests and accepts into string arrays.
         */
        this.requests = this.worker.jobsRequested.split(" ");
        this.accepts = this.worker.jobsAccepted.split(" ");

        for (let request of this.requests) {
          this.requestSet.add(request)
        }

        for (let accept of this.accepts) {
          this.acceptSet.add(accept)
        }

        /**
         * Populate the requests Job array by querying for each job from the database.
         */
        for (let request of this.requestSet) {

          if (request.length > 1) { // 1 was just picked randomley because a check for null wasn't working.
            this.jobService.getJob(request).subscribe(data => {
              this.job = data;
              if (this.job.accepted == false) {  // 
                console.log("JOB ---> " + this.job.id)
                this.jobs.push(this.job)
              }
            })
          }
        }// End for.

        /**
         * Populate the accepts Job array by querying for each job from the database.
         */
        for (let accept of this.acceptSet) {
          console.log("ACCEPT ---> " + accept)
          if (accept != "null" || accept != "") {
            this.jobService.getJob(accept).subscribe(data => {
              this.acceptedJob = data;
              if (this.acceptedJob.complete == false) {
                this.acceptedJobs.push(this.acceptedJob)
              }
            });
          }
        }

      })

    }
  }

  /**
  * If the user wants to view the map for this job by clicking View Map.
  */
  getMap(job: Job) {
    this.geoMap.setAddress(job.location);
    this.router.navigate(["/gmap"]);
  }

  /**
     * When the user click on the "List Jobs" navigation button, redirect them
     * to listJobsWorker component.
     */
  navListJobs(): void {
    this.router.navigate(["/listJobsWorker"]);
  }

  /**
   * When the user clicks "View Profile" navigation button, redirect them to
   * the viewProfile component.
   */
  navMyProfile(): void {
    this.router.navigate(["/viewProfile"]);
  }

  /**
   * When the user clicks "Edit Profile" navigation button, redirect them to
   * the editProfile component.
   */
  navEditProfile(): void {
    this.router.navigate(["/editProfile"]);
  }

  /**
   * When the user clicks "My Jobs" navigation button, redirect them to
   * the myrequests component.
   */
  navMyRequests(): void {
    this.router.navigate(["/myrequests"]);
  }

  /**
   * When the user clicks the "Logout" navigation button, logout 
   * that user and redirect them to the login page. Change the local
   *  storage to remove access for site navigation.
   */
  logout() {
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
