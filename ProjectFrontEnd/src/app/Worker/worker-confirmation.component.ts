import { Component, OnInit } from '@angular/core';
import { WorkerConfirmationService } from '../Services/workerConfirmation.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-worker-confirmation',
  templateUrl: './worker-confirmation.component.html',
  styleUrls: ['./worker-confirmation.component.css']
})
export class WorkerConfirmationComponent implements OnInit {

  message: string;

  constructor(private service: WorkerConfirmationService, private router: Router) { }

  ngOnInit() {
    this.message = this.service.getConfirmationMessage();
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

  // End Navigation.

}
