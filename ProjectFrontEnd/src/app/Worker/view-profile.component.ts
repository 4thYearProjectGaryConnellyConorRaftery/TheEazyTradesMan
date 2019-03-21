import { Component, OnInit } from '@angular/core';
import { Worker } from '../models/worker.model';
import { WorkersService } from '../Services/workers.service';
import { Router, Params } from '@angular/router';
import { AuthService } from '../core/auth.service';

/**
 * View profile component is used to view the logged in workers profile when the page is opened.
 */
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
  
  /**
   * Null constructor
   * @param workerService 
   * @param router 
   * @param authService 
   */
  constructor(private workerService: WorkersService,  private router: Router, private authService: AuthService) { }

  /**
     * If the user is a Worker, then let them see the data.
     */
  ngOnInit() { 
    if(localStorage.getItem('WorkerID') == "x"){
      this.message = "Only logged in workers can view this page." // For testing.
      console.log("here" + this.message)
    }
    else{
    this.isWorker = true;
    
    /** 
     * Get a handle on the current workers profile and display their details on the screen.
     * Also generates the workers rating via a calculation.
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
