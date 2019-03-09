import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'page-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.scss']
})
export class UserComponent implements OnInit{



  

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder,
    private router: Router
  ) {
   
  }

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

 

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    })

    if(localStorage.getItem('WorkerID') != "x"){
      this.router.navigate(["/listJobsWorker"])
    }

    if(localStorage.getItem('CustomerID') != "x"){
      this.router.navigate(["/listJobs"])
    }

    if(localStorage.getItem('CustomerID') != "x" && localStorage.getItem('WorkerID') != "x"){
      this.router.navigate(["/login"])
    }

    if(localStorage.getItem('CustomerID') == "x" && localStorage.getItem('WorkerID') == "x"){
      this.router.navigate(["/login"])
    }
  }

  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required ]
    });
  }

  save(value){
    this.userService.updateCurrentUser(value)
    .then(res => {
      console.log(res);
    }, err => console.log(err))
  }

  logout(){
    this.authService.doLogout()
    .then((res) => {
      //this.location.back(); //login
      this.router.navigate(["/login"]);
    }, (error) => {
      console.log("Logout error", error);
    });
  }
}
