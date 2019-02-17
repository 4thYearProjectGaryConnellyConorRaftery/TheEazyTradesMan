import { Component, OnInit } from '@angular/core';
import { Worker } from '../models/worker.model';
import { WorkersService } from '../Services/workers.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  worker: Worker;/* = {
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
  constructor(private workerService: WorkersService,  private router: Router) { }

  ngOnInit() { // Hard code the worker ID for now.
    this.workerService.getWorker("578f2e18-f876-410e-9645-b0a8ce444718").subscribe(data => this.worker = data);

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

  // End Navigation.

}
