import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Worker } from '../models/worker.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CustomersService{

     constructor(private client: HttpClient){}

     currentWorker: string;

      // ====================== Helper methods ======================
     setCurrentWorker(id: string): void{

       this.currentWorker = id;

     }

     getCurrentWorker(): string{

        return this.currentWorker;
        
     }


     // ====================== Helper methods ======================

     //GET Customers.
     getCustomers(): Observable<Customer[]>{
         return this.client.get<Customer[]>("http://localhost:8080/customers");
     }//End GET Customers.

     //POST.
     postCustomer(customer: Customer): Observable<Customer>{
         return this.client.post<Customer>("http://localhost:8080/customers", customer,{
       headers: new HttpHeaders({ 
        'Content-Type': 'application/json'
      })
    });
     }//End POST.

}
