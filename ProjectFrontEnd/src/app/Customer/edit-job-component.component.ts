import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Job } from '../models/job.model';
import { JobsService } from '../Services/jobs.service';
import { Router, Params } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { CustomerConfirmationService } from '../Services/customerConfirmation.service';

@Component({
  selector: 'app-edit-job-component',
  templateUrl: './edit-job-component.component.html',
  styleUrls: ['./edit-job-component.component.css']
})
export class EditJobComponentComponent implements OnInit {

  constructor(
    private jobService: JobsService,
    private confirmationService: CustomerConfirmationService, 
    private router: Router, 
    private authService: AuthService
  ) { }

  currentJob: Job;

  updateJob: Job ={
    id: null,
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
  /*
   id: string;
    trade: string;
    description: string;
    customer: string;
    requests: string;
    complete: boolean;
    location: string;
    date: string;
    accepted: boolean;
    contact: string;
  */

  ngOnInit() {
  }

  update(job: Job): void{
    console.log("Updating this Job ---> " + job.description);

  }

}
