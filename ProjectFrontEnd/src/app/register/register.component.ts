import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule  } from '@angular/forms';
import { auth } from 'firebase';
import * as firebase from 'firebase';
import { Customer } from '../models/customer.model';
import { CustomersService } from '../Services/customers.service';
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


  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,private customerService: CustomersService
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
    console.log(value);
     this.authService.doRegister(value)
     .then(res => {
       console.log(res);
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
   

}
