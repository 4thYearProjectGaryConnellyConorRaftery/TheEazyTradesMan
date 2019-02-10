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

}
