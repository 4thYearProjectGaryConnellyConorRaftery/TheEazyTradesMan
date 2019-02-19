import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';

@Component({
  selector: 'page-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.scss']
})
export class UserComponent implements OnInit{

  //Long & Lat - Change to job locations, use arrays
  lat: number = 51.678418;
  lng: number = 7.809007;
  eircode: string = "H91R2PX";
  getLongLat();


getLongLat(){

  var geocoder = new google.maps.Geocoder();

    //var address = "5 Rockfield Park, Rahoon";
    var address = "D12 DF22";
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
         //lati = results[0].geometry.location.lat();
         //long = results[0].geometry.location.lng();
         var lati = results[0].geometry.location.lat();
         var long = results[0].geometry.location.lng();
         alert('Latitude: ' + lati + ' Logitude: ' + long);
         
        } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
    //alert('Latitude: ' +  + ' Logitude: ' + long);
    //alert('location' + location);
}

  

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    })
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
      this.location.back();
    }, (error) => {
      console.log("Logout error", error);
    });
  }
}
