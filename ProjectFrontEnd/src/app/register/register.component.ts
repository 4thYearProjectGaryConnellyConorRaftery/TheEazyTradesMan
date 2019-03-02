import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule  } from '@angular/forms';
import { auth } from 'firebase';
import * as firebase from 'firebase';
import { Customer } from '../models/customer.model';
import { CustomersService } from '../Services/customers.service';
import { Worker } from '../models/worker.model';
import { WorkersService } from '../Services/workers.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  firstName: string = "";
  secondName: string = "";
  customers: Customer[];
  workers: Worker[];
  isFound: boolean = false;
  user: string;
  fbname: string;
  fbfirstname: string;
  fbsecondname: string;
  fbnamearray: string[] = [];
  exists: boolean = false;


  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private customerService: CustomersService,
    private workerService: WorkersService
  ) {
    this.createForm();
   }
   /*
    * Create blank Customer and Worker objects to be filled out by the user.
    */
   customer: Customer = {
    id: null,
    firstName: null,
    secondName: null,
    address: null,
    age: null,
    firebaseUid: ""
   };

   worker: Worker = {
      id: null,
      firstName: null,
      secondName: null,
      address: "",
      //age: number;
      trade: "",
      rating: "",
      phoneNumber: "",
      email: "",
      website: "",
      firebaseUid: "",
      jobsRequested: "",
      jobsAccepted: ""
   }

   createForm() {
     this.registerForm = this.fb.group({
       email: ['', Validators.required ],
       password: ['',Validators.required]
     });
   }

   tryFacebookLogin(){
     this.authService.doFacebookLogin()
     .then(res =>{
      
       
      /*
       * Check if the user already exists by searching through an array of customers, if the firebase uid
       * matches the current users uid, then they already exist and it will automatically redirect them to their page.
       */
       this.customerService.getCustomers().subscribe(data =>{
         this.customers = data;
         
         for(var i =0; i < this.customers.length; i++){ // Loop thrpugh customers.
            if(this.customers[i].firebaseUid == firebase.auth().currentUser.uid.toString()){
              localStorage.setItem('CustomerID', this.customers[i].id)
              this.router.navigate(["/listJobs"]);
              this.exists = true;
            }
         }

        /*
         * If the user doesn't exist, create it.
         */
         if(this.exists == false){ 
          console.log("Facebook --> " + firebase.auth().currentUser.displayName.toString());
          /*
           * Get a handle on the users first and second name from their facebook.
           */
          this.fbname = firebase.auth().currentUser.displayName.toString();
          this.fbnamearray = this.fbname.split(" ")
          this.firstName = this.fbnamearray[0];
          this.secondName = this.fbnamearray[1];
          /*
           * Set the default values for the customer.
           */
          this.createCustomer();
          this.customer.firebaseUid = firebase.auth().currentUser.uid.toString();
          
          console.log("First FB name ---> " + this.fbfirstname);
          /*
           * Send the customer through the web api and add it to the database, then navigate the user.
           */
          this.customerService.postCustomer(this.customer).subscribe((data: Customer) => {
            console.log(data);
            console.log("Creating new customer with firebase uid of ---> " + this.customer.firebaseUid)
            this.getUser(firebase.auth().currentUser.uid.toString());
            //this.user = "customer";
            this.errorMessage = "";
            this.successMessage = "Your account has been created"; 
            this.router.navigate(["/listJobs"]);
          })

         }
       })

     }, err => console.log(err)
     )
   }

   tryTwitterLogin(){
     this.authService.doTwitterLogin()
     .then(res =>{
       this.router.navigate(['/user']);
     }, err => console.log(err)
     )
   }

   tryGoogleLogin(){
     this.authService.doGoogleLogin()
     .then(res =>{
       this.router.navigate(['/user']);
     }, err => console.log(err)
     )
   }

   tryRegisterCustomer(value){
     
     this.authService.doRegister(value)
     .then(res => {
       console.log(res);
       console.log("Register --> " + firebase.auth().currentUser.uid.toString());
       /*
        * Set the default values for the customer and send it to the server side to be added to the database.
        */
       this.createCustomer();
       this.customer.firebaseUid = firebase.auth().currentUser.uid.toString();
       this.customerService.postCustomer(this.customer).subscribe((data: Customer) => {
         console.log(data);
         console.log("Creating new customer with firebase uid of ---> " + this.customer.firebaseUid)
         /*
          * Set the users id in local storage so we can easily access it later.
          */
         this.getUser(firebase.auth().currentUser.uid.toString());
         this.errorMessage = "";
         this.successMessage = "Your account has been created"; 
         this.router.navigate(["/listJobs"]);
       })
    
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })

   }

   tryRegisterWorker(value){
    console.log("NAME ---> " + this.firstName);
    console.log(value);
     this.authService.doRegister(value)
     .then(res => {
       console.log(res);
       console.log("Register --> " + firebase.auth().currentUser.uid.toString());
       /*
        * Set the default values for the worker and send it to the server side to be added to the database.
        */
       this.createWorker();
       this.worker.firebaseUid = firebase.auth().currentUser.uid.toString();
       this.workerService.postWorker(this.worker).subscribe((data: Worker) => {
         console.log(data);
         console.log("Creating a new worker with firebase uid of ---> " + this.worker.firebaseUid);
         /*
          * Set the users id in local storage so we can easily access it later.
          */
         this.getUser(firebase.auth().currentUser.uid.toString());
         this.errorMessage = "";
         this.successMessage = "Your account has been created"; /// Do user identification here:
         this.router.navigate(["/listJobsWorker"]);
       })
       
       

       //Get UID and PUT to MongoDB here, set user as worker
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
    }

    createCustomer(): void{
      this.customer.firstName = this.firstName;
      this.customer.secondName = this.secondName;
    }

     createWorker(): void{
      this.worker.firstName = this.firstName;
      this.worker.secondName = this.secondName;
    }

     /*
      * This method is used to set the current users id in local storage so the users data
      *  can be accessed from anywhere in the application.
      */
     getUser(id: string): void{
    this.customerService.getCustomers().subscribe(data =>  {
      this.customers = data
      /* 
       * Search the database for the user with the same firebase uid as the current user,
       * and set it in local storage.
       */
      for(let i = 0; i < this.customers.length; i++){
       if(this.customers[i].firebaseUid == id){
         this.isFound = true;
          console.log("REGISTERED CUSTOMER FOUND ---> " + id)
          localStorage.setItem('CustomerID', this.customers[i].id)
          console.log("Local Storage ---> " + localStorage.getItem('CustomerID'));
       }
    }
  });

  if(this.isFound == false){
    console.log("Searching workers table.")

    this.workerService.getWorkers().subscribe(data => {
      this.workers = data

      for(let i = 0; i < this.workers.length; i++){
        if(this.workers[i].firebaseUid == id){
          console.log("REGISTERED WORKER FOUND ---> " + id)
          localStorage.setItem('WorkerID', this.workers[i].id)
          console.log("Local Storage ---> " + localStorage.getItem('WorkerID'));
        }
      }
    })
  }
 
  }

  login(): void{

  }
   

}
