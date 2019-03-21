import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { filter, catchError, tap, map, switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Location } from './location-model';

declare var google: any;

/**
 * This class is used to obtain a handle on the Geo Map service
 *  provided by Google Maps. It is injected with the GeoMaps API.
 */
@Injectable()
export class GeocodeService {
  private geocoder: any;
  address: string;

  /**
   * Null constructor
   * @param mapLoader 
   */
  constructor(private mapLoader: MapsAPILoader) { }

  /**
   * Setter for setting Address of Job
   * @param address 
   */
  setAddress(address: string): void {
    this.address = address;
  }

  /**
   * Getter for getting Address of Job
   */
  getAddress(): string {
    return this.address;
  }

  /**
   * Initialize the Geocoder for GeoMap.
   */
  private initGeocoder() {
    console.log('Init geocoder!');
    this.geocoder = new google.maps.Geocoder();
  }

  /**
   * Wait for map to load before adding a geolocation.
   */
  private waitForMapsToLoad(): Observable<boolean> {
    if (!this.geocoder) {
      return fromPromise(this.mapLoader.load())
        .pipe(
          tap(() => this.initGeocoder()),
          map(() => true)
        );
    }
    return of(true);
  }

  /**
   * Obtain the address and translate it into geo code coordinates to be placed on the map.
   * @param location 
   */
  geocodeAddress(location: string): Observable<Location> {
    console.log('Start geocoding!');
    return this.waitForMapsToLoad().pipe(
      // filter(loaded => loaded),
      switchMap(() => {
        return new Observable(observer => {
          this.geocoder.geocode({ 'address': this.address }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              console.log('Geocoding complete!');
              observer.next({
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              });
            } else {
              console.log('Error - ', results, ' & Status - ', status);
              observer.next({ lat: 0, lng: 0 });
            }
            observer.complete();
          });
        })
      })
    )
  }

}