import { Injectable } from '@angular/core';
import { Job } from '../models/job.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class JobsService{

     constructor(private client: HttpClient){}
     requests: string;
     result: string[];
     currentJob: string;

     // ====================== Helper methods ======================
     setCurrentJob(id: string): void{

       this.currentJob = id;

     }

     getCurrentJob(): string{

        return this.currentJob;
        
     }



     setJobRequests(newRequests: string): void{
        console.log("Inside setJobRequests.");
        this.requests = newRequests;
     }
     

     getJobRequests(): string[]{
       this.result = this.requests.split(" "); // Split the requests by spaces.
       console.log("Setting results string: "+this.result[2]);// For Testing.
        return this.result;
     }

     // ====================== Helper methods ======================

     //GET Jobs.
     getJobs(): Observable<Job[]> {
    
        return this.client.get<Job[]>("http://localhost:8080/jobs");
    }//End GET.

    //GET Job.
    getJob(id: string): Observable<Job>{

      return this.client.get<Job>("http://localhost:8080/jobs/" + id)

    }//End GET Job.
    //POST
    postJob(job: Job): Observable<Job>{
    console.log("This is the job.");
    console.log(job);

    return this.client.post<Job>("http://localhost:8080/jobs", job,{
       headers: new HttpHeaders({ 
        'Content-Type': 'application/json'
      })
    });

  }//End POST.

  //PUT 
   putJob(putJob: Job): Observable<Job>{
   //  console.log("These are the requests --->" + putJob.requests);
     console.log("This is the path ---> http://localhost:8080/jobs/" + putJob.id);
      return this.client.put<Job>("http://localhost:8080/jobs/" + putJob.id, putJob,{
       headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

}// End PUT.
  


}
