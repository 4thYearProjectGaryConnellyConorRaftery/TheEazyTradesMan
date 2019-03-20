import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Worker } from '../models/worker.model';

@Injectable({
  providedIn: 'root'
})

/**
 * WorkersService class handles all data transfer that relates to worker interactions.
 * This includes providing methods to transfer Worker data through HTTP to a web API.
 */
export class WorkersService{
    constructor(private client: HttpClient){}

    base: string = "http://localhost:8080/workers/";
    //base: string;


    /**
     * Puts(Updates) a Worker object on the database through the web API.
     * @param worker, the Worker object to be updated.
     */
    //PUT.
    putWorker(worker: Worker): Observable<Worker>{
     console.log("This is the path ---> " + this.base + worker.id);
      return this.client.put<Worker>(this.base + worker.id, worker,{
       headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "token": "xxxxxxx"
        })
      });
    }//End PUT.


    /**
     * Returns an array of all of the Worker objects in the database through the web API.
     * @returns Observable<Worker[]>, all of the Worker objects in the database.
     */
    //GET Workers.
    getWorkers(): Observable<Worker[]>{
      return this.client.get<Worker[]>(this.base);
     }//End GET Workers.


     /**
      * Returns the Worker object with the id passed in as a parameter through the web API.
      * @param id, the id of the Worker object to be returned.
      */
    //GET Worker.
    getWorker(id: string): Observable<Worker>{
      return this.client.get<Worker>(this.base + id)
    }//End GET Worker.


    /**
     * Posts(Creates) a new Worker object on the database through the web API.
     * @param worker, the Worker object to be created.
     */
    //POST
    postWorker(worker: Worker): Observable<Worker>{
         return this.client.post<Worker>(this.base, worker,{
           headers: new HttpHeaders({ 
          'Content-Type': 'application/json'
            })
        });
    }
  //End POST
}