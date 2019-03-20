import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { CustomerConfirmationService } from '../Services/customerConfirmation.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-customer-confirmation',
  templateUrl: './customer-confirmation.component.html',
  styleUrls: ['./customer-confirmation.component.css']
})

/**
 * CustomerConfirmationComponent is the components that gets rendered for
 * the Customer whenever they make an action that requires some sort of
 * confirmation message to be shown to them. This confirmation message
 * can be set at runtime depending on the action that is being confirmed.
 */
export class CustomerConfirmationComponent implements OnInit {

  message: string;
  
  constructor( private authService: AuthService, private service: CustomerConfirmationService, private router: Router) { }


  ngOnInit() {
  /** 
    * Get a handle on the current confirmation
    */
    this.message = this.service.getConfirmationMessage();
  }

  /**
   * When the user clicks the "OK" button, redirect them to the listJobs
   * component.
   */
  ok(): void{
    this.router.navigate(["/listJobs"]);
  }

  
  /**
   * When the Customer clicks on a button on the nav bar.
   */
  

   /**
    * When the user click on the "List Jobs" navigation button, redirect them
    * to listJobs component.
    */
  navListJobs(): void{
    this.router.navigate(["/listJobs"]);
  }


  /**
   * When the user clicks "My Jobs" navigation button, redirect them to
   * the myJobs component.
   */
   navMyJobs(): void{
    this.router.navigate(["/myJobs"]);
  }

  /**
   * When the user click the "Post Job" navigation button, redirect
   * them to the postJob component.
   */
   navPostJob(): void{
    this.router.navigate(["/postJob"]);
  }


  /**
   * When the user clicks the "Logout" navigation button, logout 
   * that user and redirect them to the login page. 
   */
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
