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

  constructor(
   private workerService: WorkersService,
   private jobService: JobsService,
   private router: Router,
   private geoMap: GeocodeService,
   private authService: AuthService,
   private customerService: CustomersService) { }

  ngOnInit() {
    /*
     * Get a handle on the current worker.
     */
      this.workerService.getWorker(localStorage.getItem('WorkerID')).subscribe(data => {
      this.worker = data;
      /*
       * Split the workers requests and accepts into string arrays.
       */
      this.requests = this.worker.jobsRequested.split(" ");
      this.accepts = this.worker.jobsAccepted.split(" ");

      for(let request of this.requests){
        this.requestSet.add(request)
      }

      for(let accept of this.accepts){
        this.acceptSet.add(accept)
      }
     // console.log("This Worker ---> " + this.worker.id);

      /*
       * Populate the requests Job array by querying for each job from the database.
       */
      for(let request of this.requestSet){
        
      // console.log("Length of requests --->" + this.requests.length)
     //  console.log(this.requests[i].length)
      // console.log("This is the request at " + i + " " + this.requests[i])
      if(request.length > 1){ // 1 was just picked randomley because a check for null wasn't working.
          this.jobService.getJob(request).subscribe(data => {
            
            this.job = data;
         
            if(this.job.accepted == false){  // 
        
              console.log("JOB ---> " + this.job.id)
         
               this.jobs.push(this.job) 
          
            
            }
          })
      }
    }// End for.

    for(let accept of this.acceptSet){
      console.log("ACCEPT ---> " + accept)
     // console.log(" Hey ---> " + accept)
     if(accept != "null" || accept != ""){
      this.jobService.getJob(accept).subscribe(data =>{
        this.acceptedJob = data;
        if(this.acceptedJob.complete == false){
          
            this.acceptedJobs.push(this.acceptedJob) 

        
          
        }
         
         // this.acceptedJobs.push(this.acceptedJob)
          //console.log("INDEX --> " + this.acceptedJobs.indexOf(this.acceptedJob))
        
        
      });

     }

    }







/*

  /*
     * Populate the accepts Job array by querying for each job from the database.
     */
  //  for(var i = 0; i < this.accepts.length; i++){
      //  console.log("Length of accepted jobs array ---> " + this.accepts.length)
   //     console.log("---" + this.accepts[i] + "---")
       // console.log("INDEX --> " + this.accepts.includes(this.accepts[i]).valueOf())
   //     if(this.accepts[i] != "null"){
    //      this.jobService.getJob(this.accepts[i]).subscribe(data =>{
      //      this.acceptedJob = data;
          //  console.log("Accepted Job ID ---> " + this.acceptedJob.id)
             
       //       this.acceptedJobs.push(this.acceptedJob)
              //console.log("INDEX --> " + this.acceptedJobs.indexOf(this.acceptedJob))
            
            
      //    });
     //   }
   //   }
  






  









    })
  }
   /* 
    * If the user wants to see the map.
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
    this.router.navigate(["myrequests"]);
  }

   logout(){
    this.authService.doLogout()
    .then((res) => {
       localStorage.setItem('WorkerID', "x")
      this.router.navigate(["/login"]);
    }, (error) => {
     // console.log("Logout error", error);
    });
  }

  // End Navigation.

}
