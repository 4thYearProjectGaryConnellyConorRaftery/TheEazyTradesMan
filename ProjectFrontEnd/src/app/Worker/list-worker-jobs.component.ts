// /// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job.model';
import { Worker } from '../models/worker.model';
import { JobsService } from '../Services/jobs.service';
import { WorkersService } from '../Services/workers.service';
import { WorkerConfirmationService } from '../Services/workerConfirmation.service';
import { Router, Params } from '@angular/router';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-list-worker-jobs',
  templateUrl: './list-worker-jobs.component.html',
  styleUrls: ['./list-worker-jobs.component.css']
})
export class ListWorkerJobsComponent implements OnInit {

  //Google Maps
 // @ViewChild('gmap') gmapElement: any;
 // map: google.maps.Map;

  worker: Worker;
  jobs: Job[];
  constructor(
   private workerService: WorkersService,
   private jobService: JobsService, 
   private confirmationService: WorkerConfirmationService,  
   private router: Router) { }

  ngOnInit() {
    this.jobService.getJobs().subscribe(data => this.jobs = data);
  
    //Google Maps ==================================https://medium.com/@balramchavan/integrating-google-maps-in-angular-5-ca5f68009f29
    //var mapProp = {
    //  center: new google.maps.LatLng(18.5793, 73.8143),
    //  zoom: 15,
     // mapTypeId: google.maps.MapTypeId.ROADMAP
    //};
   // this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  //======================================================
  
  }

  request(job: Job): void{
    console.log("Testing JobRequests branch.");
    console.log("REQUEST FOR -->" + job.id);
    job.requests += " " + localStorage.getItem('WorkerID'); // TEST
    this.jobService.putJob(job).subscribe((data: Job) =>{
      console.log(data);
      this.confirmationService.setConfirmationMessage("Job has been successfully requested!");
      this.router.navigate(["/workerConfirmation"]);
    });

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

  // End Navigation.

}


