import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Worker } from '../models/worker.model';
import { WorkersService } from '../Services/workers.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private workerService: WorkersService) { }

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
    //photoPath: null
  }

  ngOnInit() {
    this.worker.rating = "88";
  }


/*
   update(postJobForm: NgForm): void{
    console.log(postJobForm.value);
  }
  */

   update(updateWorker: Worker): void{
    this.workerService.putWorker(updateWorker).subscribe((data: Worker) =>{
      console.log(data);
    });
  }


}
