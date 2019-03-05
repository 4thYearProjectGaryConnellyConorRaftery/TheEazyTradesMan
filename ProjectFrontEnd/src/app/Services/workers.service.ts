import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Worker } from '../models/worker.model';

@Injectable({
  providedIn: 'root'
})

export class WorkersService{
    constructor(private client: HttpClient){}

    base: string = "http://localhost:8080/workers/";
    //base: string;


    //PUT.
    putWorker(worker: Worker): Observable<Worker>{
     console.log("This is the path ---> " + this.base + worker.id);
      return this.client.put<Worker>(this.base + worker.id, worker,{
       headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

}//End PUT.

    //GET Workers.
     getWorkers(): Observable<Worker[]>{
         return this.client.get<Worker[]>(this.base);
     }//End GET Workers.


//GET Worker.
 getWorker(id: string): Observable<Worker>{
    return this.client.get<Worker>(this.base + id)
  }//End GET Worker.

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