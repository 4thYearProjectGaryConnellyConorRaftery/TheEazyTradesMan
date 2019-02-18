import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Worker } from '../models/worker.model';

@Injectable({
  providedIn: 'root'
})

export class WorkersService{
    constructor(private client: HttpClient){}


    //PUT.
    putWorker(worker: Worker): Observable<Worker>{
     console.log("This is the path ---> http://localhost:8080/workers/" + worker.id);
      return this.client.put<Worker>("http://localhost:8080/workers/" + worker.id, worker,{
       headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

}//End PUT.

//GET Worker.
 getWorker(id: string): Observable<Worker>{
    return this.client.get<Worker>("http://localhost:8080/workers/" + id)
  }//End GET Worker.

  //POST
   postWorker(worker: Worker): Observable<Worker>{
         return this.client.post<Worker>("http://localhost:8080/workers", worker,{
       headers: new HttpHeaders({ 
        'Content-Type': 'application/json'
      })
    });
     }
  //End POST
}