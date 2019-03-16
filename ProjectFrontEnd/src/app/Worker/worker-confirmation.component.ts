import { Component, OnInit } from '@angular/core';
import { WorkerConfirmationService } from '../Services/workerConfirmation.service';
import { Router, Params } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-worker-confirmation',
  templateUrl: './worker-confirmation.component.html',
  styleUrls: ['./worker-confirmation.component.css']
})
export class WorkerConfirmationComponent implements OnInit {

  message: string;

  constructor(private authService: AuthService, private service: WorkerConfirmationService, private router: Router) { }

  ngOnInit() {
    /* 
     * Get a handle on the current confirmation message.
     */
    this.message = this.service.getConfirmationMessage();
  }

  ok(): void{
    this.router.navigate(["/listJobsWorker"]);
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
