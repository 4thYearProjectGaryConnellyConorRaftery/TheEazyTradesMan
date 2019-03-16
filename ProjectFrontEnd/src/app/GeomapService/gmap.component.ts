import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { GeocodeService } from './geocode.service';
import { Location } from './location-model';
import { Router, Params } from '@angular/router';


@Component({
  selector: 'my-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: [ './gmap.component.css' ] 
})
export class GmapComponent implements OnInit {
  address = 'London';
  location: Location;
  loading: boolean;

  constructor(
    private geocodeService: GeocodeService,
    private ref: ChangeDetectorRef,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.showLocation();
  }

  back(){
    console.log("Customer ID --->" + localStorage.getItem('CustomerID'))
    console.log("Worker ID --->" + localStorage.getItem('WorkerID'))

    if(localStorage.getItem('CustomerID') != "x"){
      this.router.navigate(["/listJobs"])
    }
    else if(localStorage.getItem('WorkerID') != "x"){
      this.router.navigate(["/listJobsWorker"])
    }
    /*else{
      this.router.na
    }*/
  }

  showLocation() {
    this.addressToCoordinates();
  }

  addressToCoordinates() {
    this.loading = true;
    this.geocodeService.geocodeAddress(this.address)
    .subscribe((location: Location) => {
        this.location = location;
        this.loading = false;
        this.ref.detectChanges();  
      }      
    );     
  }
}
