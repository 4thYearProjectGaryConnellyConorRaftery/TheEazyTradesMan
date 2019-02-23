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
//import * as angular from 'angular';

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


  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private customerService: CustomersService,
    private workerService: WorkersService
  ) {
    this.createForm();
   }

   customer: Customer = {
    id: null,
    firstName: null,
    secondName: null,
    address: null,
    age: null,
    firebaseUid: null
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
      firebaseUid: null,
      jobsRequested: "",
      jobsAccepted: ""
    // photoPath?: string;
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
       this.router.navigate(['/user']);
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
     console.log("NAME ---> " + this.firstName);
    
    console.log(value);
     this.authService.doRegister(value)
     .then(res => {
       console.log(res);
       console.log("Register --> " + firebase.auth().currentUser.uid.toString());
       this.createCustomer();///////////////////////// Test.
       this.customer.firebaseUid = firebase.auth().currentUser.uid.toString();
       this.customerService.postCustomer(this.customer).subscribe((data: Customer) => {
         console.log(data);
         console.log("Creating new customer with firebase uid of ---> " + this.customer.firebaseUid)
         this.getUser(firebase.auth().currentUser.uid.toString());
       })
      
       /////////////////////////////////////////////// Test.
       this.errorMessage = "";
       this.successMessage = "Your account has been created"; /// Do user identification here:

       //Get UID and PUT to MongoDB here, set user as customer
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
       this.createWorker();
       this.worker.firebaseUid = firebase.auth().currentUser.uid.toString();
       this.workerService.postWorker(this.worker).subscribe((data: Worker) => {
         console.log(data);
         console.log("Creating a new worker with firebase uid of ---> " + this.worker.firebaseUid);
         this.getUser(firebase.auth().currentUser.uid.toString());
       })
       
       this.errorMessage = "";
       this.successMessage = "Your account has been created"; /// Do user identification here:

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


     getUser(id: string): void{
    this.customerService.getCustomers().subscribe(data =>  {
      this.customers = data
      
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
   

   console.log("Trying to login!")
   /* for(let i = 0; i < this.customers.length; i++){
      console.log(this.customers[i].id)
    } */

  }
   

}
