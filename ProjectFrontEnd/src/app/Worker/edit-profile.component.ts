import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Worker } from '../models/worker.model';
import { WorkersService } from '../Services/workers.service';
import { WorkerConfirmationService } from '../Services/workerConfirmation.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private workerService: WorkersService, private confirmationService: WorkerConfirmationService, private router: Router) { }

  worker: Worker ={
    id: localStorage.getItem('WorkerID'),
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
    this.worker.rating = "";
  }




   update(updateWorker: Worker): void{
    this.workerService.putWorker(updateWorker).subscribe((data: Worker) =>{
      console.log(data);
      this.confirmationService.setConfirmationMessage("Your profile has been updated!");
      this.router.navigate(["/workerConfirmation"]);
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
