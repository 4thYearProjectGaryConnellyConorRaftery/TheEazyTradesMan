import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { CustomerConfirmationService } from '../Services/customerConfirmation.service';

@Component({
  selector: 'app-customer-confirmation',
  templateUrl: './customer-confirmation.component.html',
  styleUrls: ['./customer-confirmation.component.css']
})
export class CustomerConfirmationComponent implements OnInit {

  message: string;
  
  constructor(private service: CustomerConfirmationService, private router: Router) { }


  ngOnInit() {
    /*
    * Get a handle on the current confirmation
    */
    this.message = this.service.getConfirmationMessage();
  }

   // Navigation.
  navListJobs(): void{
    this.router.navigate(["/listJobs"]);
  }

   navMyJobs(): void{
    this.router.navigate(["/myJobs"]);
  }

   navPostJob(): void{
    this.router.navigate(["/postJob"]);
  }

  // End Navigation.

}
