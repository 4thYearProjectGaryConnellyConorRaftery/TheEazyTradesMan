import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { auth } from 'firebase';
import * as firebase from 'firebase';
import { Customer } from '../models/customer.model';
import { CustomersService } from '../Services/customers.service';
import { Worker } from '../models/worker.model';
import { WorkersService } from '../Services/workers.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})

/**
 * The LoginComponent is the component responsible for logging in users to the system.
 * It is the Job of the Login component to first check if it is a valid user, then check
 * whether that user is a Customer or a Worker, then load the details of that user from
 * the database. The Login component also handles social media logins.
 */
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';
  customers: Customer[];
  workers: Worker[];
  isFound: boolean = false;
  

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private customerService: CustomersService,
    private workerService: WorkersService
  ) {
    this.createForm();
  }

  ngOnInit() {
    console.log("INIT.")
   localStorage.setItem('CustomerID', "x")
   localStorage.setItem('WorkerID', "x")
  }


  /**
   * Create the form to be displayed to the user.
   */
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }


  /**
   * This method handles Facebook logins. If the user authentication with firebase is 
   * successful, use the Firebase UID to retrieve that Customers details from the database
   * through the web API.
   */
  tryFacebookLogin(){
    this.authService.doFacebookLogin()
    .then(res => {
      /*
       * Send the user to the getUser() method to get their data from the database.
       */
      this.isFound = true;
      this.getUser(firebase.auth().currentUser.uid.toString());
    })
  }

  tryTwitterLogin(){
    this.authService.doTwitterLogin()
    .then(res => {
      this.router.navigate(['/user']);
    })
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/user']);
    })
  }


  /**
   * Extract the values entered to the form and authenticate them with Firebase.
   * If the authentication is successfull, use the Firebase UID to check whether
   * the user is a Customer or a Worker and retrieve their data from the database.
   * @param value, the values entered into the form.
   */
  tryLogin(value){
    
    this.authService.doLogin(value)
    .then(res => {
      console.log("Login --> " + firebase.auth().currentUser.uid.toString());

      /*
       * Send the user to the getUser() method to get their data from the database.
       */
      this.getUser(firebase.auth().currentUser.uid.toString());

      console.log("Firebase ---> " + firebase.auth().currentUser.uid.toString())

    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
    
  }

 
  /**
   * This method is used once the user has been authenticated through Firebase
   * to check whether the user is a Customer or a Worker. Once the user is found,
   * set their id into local storage so that is is globally accessible, and redirect
   * them to the corresponding user page.
   * @param id 
   */
  getUser(id: string): void{
    /*
     * Get the customers from the database.
     */
    this.customerService.getCustomers().subscribe(data =>  {
      this.customers = data
      
      /*
       * For each customer, check if the firebase uid matches the firebase uid of the user trying to log in.
       */
      for(let i = 0; i < this.customers.length; i++){
        console.log(this.customers.length)
       if(this.customers[i].firebaseUid == id){
         /*
          * If it matches, set the user id in local storage to that user and navigate the user.
          */
          this.isFound = true;
          console.log("CUSTOMER FOUND ---> " + id)
          localStorage.setItem('CustomerID', this.customers[i].id)
          console.log("Local Storage ---> " + localStorage.getItem('CustomerID'));
          this.router.navigate(['/listJobs']);
       }
    }
  });

  /*
   * If the user is not found, check the workers database using the same process.
   */
  if(this.isFound == false){
   
    this.workerService.getWorkers().subscribe(data => {
      this.workers = data
      

      for(let i = 0; i < this.workers.length; i++){
        console.log("HERE")
        console.log("Worker: " + this.workers[i].firebaseUid + "id: " + id)
        if(this.workers[i].firebaseUid == id){
          console.log("Searching workers table.")
          console.log("WORKER FOUND ---> " + id)
          localStorage.setItem('WorkerID', this.workers[i].id)
          console.log("Local Storage ---> " + localStorage.getItem('WorkerID'));
          this.router.navigate(['/listJobsWorker']);
        }
      }
    })
  }
  
  }//End getuser()
}
