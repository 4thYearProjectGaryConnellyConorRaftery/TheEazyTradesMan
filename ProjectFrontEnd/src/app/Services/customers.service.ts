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
     name: string;

      // ====================== Helper methods ======================
      /*
       * Getter and setter accessor methods to get a handle on the id of the worker
       * the customer is looking into.
       */
     setCurrentWorker(id: string): void{

       this.currentWorker = id;

     }

     getCurrentWorker(): string{

        return this.currentWorker;
        
     }

     setCurrentCustomerName(name: string): void{
        this.name = name;
     }

     getCurrentCustomerName(): string{
        return this.name;
     }
     // ====================== Helper methods ======================

     //GET Customers.
     getCustomers(): Observable<Customer[]>{
         return this.client.get<Customer[]>("http://localhost:8080/customers");
     }//End GET Customers.

     //GET Customer.
      getCustomer(id: string): Observable<Customer>{
        return this.client.get<Customer>("http://localhost:8080/customers/" + id)
      }//End GET Customer.

     //POST.
     postCustomer(customer: Customer): Observable<Customer>{
         return this.client.post<Customer>("http://localhost:8080/customers", customer,{
       headers: new HttpHeaders({ 
        'Content-Type': 'application/json'
      })
    });
     }//End POST.

}
