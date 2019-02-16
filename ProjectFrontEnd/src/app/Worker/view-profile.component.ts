import { Component, OnInit } from '@angular/core';
import { Worker } from '../models/worker.model';
import { WorkersService } from '../Services/workers.service';

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
  constructor(private workerService: WorkersService) { }

  ngOnInit() { // Hard code the worker ID for now.
    this.workerService.getWorker("38be87ad-f34f-4d7d-ba6a-61a15bd9eede").subscribe(data => this.worker = data);

     console.log(this.worker.firstName);
  }

}
