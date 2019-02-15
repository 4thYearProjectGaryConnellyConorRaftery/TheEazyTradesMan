import { Injectable } from '@angular/core';
import { Job } from '../models/job.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})

export class JobsService{

     constructor(private client: HttpClient){}

     getJobs(): Observable<Job[]> {
    
        return this.client.get<Job[]>("http://localhost:8080/jobs");
    }

    postJob(job: Job): Observable<Job>{
    console.log("This is the job.");
    console.log(job);

    return this.client.post<Job>("http://localhost:8080/jobs", job,{
       headers: new HttpHeaders({ 
        'Content-Type': 'application/json'
      })
    });

    }

}
