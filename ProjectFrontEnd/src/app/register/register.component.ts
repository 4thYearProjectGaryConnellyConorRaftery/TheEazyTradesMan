import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { auth } from 'firebase';
import * as firebase from 'firebase';
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
/*
AccountTypeSelection(){
  var app = angular.module('myApp', []);
app.controller('formCtrl', function($scope) {
    $scope.master = {firstName:"John", lastName:"Doe"};
    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };
    $scope.reset();
});
}
*/


  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
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

   tryRegister(value){
    console.log(value);
     this.authService.doRegister(value)
     .then(res => {
       console.log(res);
        console.log("Register --> " + firebase.auth().currentUser.uid.toString());
       this.errorMessage = "";
       this.successMessage = "Your account has been created"; /// Do user identification here:
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
     
/*
     angular.module('resultApp', []).controller('resultCtrl', function($scope) {
 
      $scope.result = 'pass';
      
      $scope.submitResult = function(result) {
        
        alert(result)
      };
    });
    */
   }


   

}
