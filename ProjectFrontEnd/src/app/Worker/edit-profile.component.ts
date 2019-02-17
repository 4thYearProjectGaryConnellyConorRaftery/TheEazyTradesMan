import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Worker } from '../models/worker.model';
import { WorkersService } from '../Services/workers.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private workerService: WorkersService,  private router: Router) { }

  worker: Worker ={
    id: "5fff7f41-5cd6-4b89-9470-06dbd93b5121",
    firstName: null,
    secondName: null,
    address: null,
    trade: null,
    rating: null,
    phoneNumber: null,
    email:null,
    website: null,
    firebaseUid: null
    //photoPath: null
  }

  ngOnInit() {
    this.worker.rating = "88";
  }




   update(updateWorker: Worker): void{
    this.workerService.putWorker(updateWorker).subscribe((data: Worker) =>{
      console.log(data);
    });
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
