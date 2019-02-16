import { Component, OnInit } from '@angular/core';
import { Worker } from '../models/worker.model';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  worker: Worker = {
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

  constructor() { }

  ngOnInit() {
  }

}
