import { Component } from '@angular/core';
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

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryFacebookLogin(){
    this.authService.doFacebookLogin()
    .then(res => {
      this.router.navigate(['/user']);
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

  tryLogin(value){
    
    this.authService.doLogin(value)
    .then(res => {
      console.log("Login --> " + firebase.auth().currentUser.uid.toString());

      this.getUser(firebase.auth().currentUser.uid.toString());

      
      /*Get UID from MongoDB, and switch landing page respectively
      if(UID is worker){
        this.router.navigate(['/listWorkerJobs']);
      }else{
        this.router.navigate(['/listWorkerCustomerJobs']);
      }
      */
     //Remove line below when routing is done correctly
      this.router.navigate(['/user']);
      
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
    
  }

  getUser(id: string): void{
    this.customerService.getCustomers().subscribe(data =>  {
      this.customers = data
      
      for(let i = 0; i < this.customers.length; i++){
       if(this.customers[i].firebaseUid == id){
         this.isFound = true;
          console.log("CUSTOMER FOUND ---> " + id)
       }
    }
  });

  if(this.isFound == false){
    console.log("Searching workers table.")

    this.workerService.getWorkers().subscribe(data => {
      this.workers = data

      for(let i = 0; i < this.workers.length; i++){
        if(this.workers[i].firebaseUid == id){
          console.log("WORKER FOUND ---> " + id)
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
