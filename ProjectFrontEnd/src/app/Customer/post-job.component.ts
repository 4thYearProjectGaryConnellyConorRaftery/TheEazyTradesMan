import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Job } from '../models/job.model';
import { JobsService } from '../Services/jobs.service';
import { Router, Params } from '@angular/router';
import { CustomerConfirmationService } from '../Services/customerConfirmation.service';
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {

  constructor(private jobService: JobsService, private confirmationService: CustomerConfirmationService,  private router: Router, private authService: AuthService) { }

   job: Job = {
    id : null,
    trade: null,
    description: null,
    customer: null,
    complete: null,
    requests: null,
    location: null,
    date: null,
    accepted: null,
    contact: null,
  };

  ngOnInit() { // Some default data for testing.
    this.job.customer = localStorage.getItem('CustomerID'); // Hard coded for now.
    this.job.complete = false;
    this.job.requests = "";
    this.job.date = "10/02/2019";
    this.job.accepted = false;
  }

   postJob(newJob: Job): void{
   // console.log(postJobForm.value);
   
   console.log(newJob);

   this.jobService.postJob(newJob).subscribe((data: Job) => {
      console.log(data);
      this.confirmationService.setConfirmationMessage("Your Job had been posted!");
      this.router.navigate(["/customerConfirmation"]);
    });
  }

  // Navigation.
  navListJobs(): void{
    this.router.navigate(["/listJobs"]);
  }

   navMyJobs(): void{
    this.router.navigate(["/myJobs"]);
  }

   navPostJob(): void{
    this.router.navigate(["/postJob"]);
  }

   logout(){
    this.authService.doLogout()
    .then((res) => {
      //this.location.back(); //login
       localStorage.setItem('CustomerID', "x")
      this.router.navigate(["/login"]);
    }, (error) => {
      console.log("Logout error", error);
    });
  }

  // End Navigation.

}
