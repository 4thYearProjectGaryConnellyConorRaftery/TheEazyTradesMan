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
  /* = {
     id: "0404040404040",
    firstName: "Gary",
    secondName: "Connelly",
    address: "Cloonena, Kilaconnell, Ballinasloe, Galway",
    trade: "Mechanic",
    rating: "87",
    phoneNumber: "0879762143",
    email: "G00368437@gmit.ie",
    website: "www.github.com",
   // photoPath: "assets/images/easytrade.jpg"
  }
*/
  constructor(private workerService: WorkersService,  private router: Router, private authService: AuthService) { }

  ngOnInit() { // Hard code the worker ID for now.
    this.workerService.getWorker(localStorage.getItem('WorkerID')).subscribe(data => this.worker = data);

     console.log(this.worker.firstName);
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
