import { Component, OnInit } from '@angular/core';
import { Worker } from '../models/worker.model';
import { WorkersService } from '../Services/workers.service';
import { Router, Params } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  worker: Worker;
  ratingArray: string[] = [];
  amount: number = null;
  sum: number = null;
  message: string = "";
  isWorker: boolean = false;
  
  constructor(private workerService: WorkersService,  private router: Router, private authService: AuthService) { }

  

  ngOnInit() { 

    if(localStorage.getItem('WorkerID') == "x"){
      this.message = "Only logged in workers can view this page." // For testing.
      console.log("here" + this.message)
    }
    else{
    this.isWorker = true;
    
    /* 
     * Get a handle on the current worker to be displayed on the screen.
     */
    this.workerService.getWorker(localStorage.getItem('WorkerID')).subscribe(data =>{
      this.worker = data
     
      this.ratingArray = this.worker.rating.split(",")
     
      this.amount = parseInt(this.ratingArray[0])
      this.sum = parseInt(this.ratingArray[1]) 

      if(this.amount == 0 || this.sum == 0){
        this.worker.displayedRating = "0"
      }
      else{
        this.worker.displayedRating = (this.sum/this.amount).toFixed().toString()
      }
      
    })

     console.log(this.worker.firstName);
  }
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
      //this.location.back(); //login
       localStorage.setItem('WorkerID', "x")
      this.router.navigate(["/login"]);
    }, (error) => {
      console.log("Logout error", error);
    });
  }

  // End Navigation.

}
