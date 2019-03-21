import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { GeocodeService } from './geocode.service';
import { Location } from './location-model';
import { Router, Params } from '@angular/router';

/**
 * This class is used for translating the the coordinates into a given point on the geomap.
 */
@Component({
  selector: 'my-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnInit {
  address = 'London';
  location: Location;
  loading: boolean;

  /**
   * Null constructor
   * @param geocodeService 
   * @param ref 
   * @param router 
   */
  constructor(
    private geocodeService: GeocodeService,
    private ref: ChangeDetectorRef,
    private router: Router
  ) { }

  /**
   * Display location when this class is ran.
   */
  ngOnInit() {
    this.showLocation();
  }

  /**
   * Get handle on User ID when back navigation is selected.
   */
  back() {
    console.log("Customer ID --->" + localStorage.getItem('CustomerID'))
    console.log("Worker ID --->" + localStorage.getItem('WorkerID'))

    if (localStorage.getItem('CustomerID') != "x") {
      this.router.navigate(["/listJobs"])
    }
    else if (localStorage.getItem('WorkerID') != "x") {
      this.router.navigate(["/listJobsWorker"])
    }
  }

  /**
   * Display address location on Map.
   */
  showLocation() {
    this.addressToCoordinates();
  }

  /**
   * Translate the given address to coordinates.
   */
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
