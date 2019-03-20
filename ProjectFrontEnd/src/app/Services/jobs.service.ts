import { Injectable } from '@angular/core';
import { Job } from '../models/job.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


/**
 * JobsService class handles all data transfer in relation to Job objects.
 * This includes providing methods to transfer Job data through HTTP to a 
 * web API, as well as general Job data processing such as providing accessor methods
 * for the current Job in focus and accessing Job requests on a Job.
 */
export class JobsService{

     constructor(private client: HttpClient){}
     requests: string;
     result: string[];
     currentJob: string;
     base: string = "http://localhost:8080/jobs/";
     //base: string;

     // ====================== Helper methods ======================
     /**
      * Accessor method to set the id of the current Job in focus.
      * @param id, the id of the Job to be set.
      */
     setCurrentJob(id: string): void{
       this.currentJob = id;
     }


     /**
      * Accessor method to get a handle on the id of the current Job in focus.
      * @returns string currentJob, the id of the current Job.
      */
     getCurrentJob(): string{
        return this.currentJob;
     }


     /**
      * Accessor method that sets the requests that the current Job in focus has.
      * This string simply contains a list of " " separated Worker ids. These Worker 
      * ids correspond to the Workers that requested the current Job in focus. 
      * @param newRequests, the string of " " Worker ids of Workers that requested this Job.
      */
     setJobRequests(newRequests: string): void{
        console.log("Inside setJobRequests.");
        this.requests = newRequests;
     }
     

     /**
      * Accessor method that returns the string array of Worker ids, of the 
      * Workers that requested this current Job. The string is split by the
      * " ", so that each element of the array contains a single Worker id.
      * @returns result, the resulting array of Worker ids.
      */
     getJobRequests(): string[]{
       this.result = this.requests.split(" "); // Split the requests by spaces.
        return this.result;
     }

     // ====================== End Helper methods ======================


     /**
      * Returns all of the current Job objects in the database thrugh
      * the web API.
      * @returns Observable<Job[]>, all of the Job objects in the database.
      */
     //GET Jobs.
     getJobs(): Observable<Job[]> {
        console.log("Get jobs.")
        return this.client.get<Job[]>(this.base);
    }//End GET.


    /**
     * Returns the Job object with the corresponding id passed in as a parameter.
     * @param id, the id of the Job to be returned.
     */
    //GET Job.
    getJob(id: string): Observable<Job>{
      return this.client.get<Job>(this.base + id)
    }//End GET Job.
    

    /**
     * Posts(Creates) a new Job object on the database through the web API.
     * @param job, the Job object to be created on the database.
     */
    //POST
    postJob(job: Job): Observable<Job>{
    console.log(job);
    return this.client.post<Job>(this.base, job,{
       headers: new HttpHeaders({ 
        'Content-Type': 'application/json'
      })
    });
  }//End POST.


  /**
   * Puts(Updates) the Job object that was passed in as a parameter on the database
   * through the web API.
   * @param putJob , the Job to be updated on the database.
   */
  //PUT 
   putJob(putJob: Job): Observable<Job>{
     console.log("This is the path ---> " + this.base + putJob.id);
      return this.client.put<Job>(this.base + putJob.id, putJob,{
       headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
}// End PUT.


/**
 * Deletes the Job object passed in as a parameter on the database through the
 * web API.
 * @param deleteJob, the Job object to be permanently deleted. 
 */
//DELETE
deleteJob(deleteJob: Job): Observable<Job>{

  return this.client.delete<Job>(this.base + deleteJob.id,{
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  })
}

}
