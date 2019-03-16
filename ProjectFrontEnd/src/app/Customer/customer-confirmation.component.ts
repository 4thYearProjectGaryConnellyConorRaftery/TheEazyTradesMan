import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { CustomerConfirmationService } from '../Services/customerConfirmation.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-customer-confirmation',
  templateUrl: './customer-confirmation.component.html',
  styleUrls: ['./customer-confirmation.component.css']
})
export class CustomerConfirmationComponent implements OnInit {

  message: string;
  
  constructor( private authService: AuthService, private service: CustomerConfirmationService, private router: Router) { }


  ngOnInit() {
    /*
    * Get a handle on the current confirmation
    */
    this.message = this.service.getConfirmationMessage();
  }

  ok(): void{
    this.router.navigate(["/listJobs"]);
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

  logout(){
    this.authService.doLogout()
    .then((res) => {
       localStorage.setItem('CustomerID', "x")
      this.router.navigate(["/login"]);
    }, (error) => {
      console.log("Logout error", error);
    });
  }



  // End Navigation.

}
