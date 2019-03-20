import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Worker } from '../models/worker.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


/**
 * CustomersService class handles all data transfer that relates to customer interactions.
 * This includes interacting with the web API, as well as general data manipulation
 * such as providing access to the currently logged in Customer.
 */
export class CustomersService{

     constructor(private client: HttpClient){}

     currentWorker: string;
     name: string;
     base: string = "http://localhost:8080/customers/";
     //base: string;

      // ====================== Helper methods ======================
      /**
       * Accessor method that sets the current worker id.
       * @param id, the id of the current Worker.
       */
     setCurrentWorker(id: string): void{

       this.currentWorker = id;

     }

     /**
      * Accessor method that returns the current worker id.
      * @returns currentWorker, the id of the current Worker.
      */
     getCurrentWorker(): string{

        return this.currentWorker;
        
     }

     /**
      * Accessor method that sets the name of the current Customer.
      * @param name 
      */
     setCurrentCustomerName(name: string): void{
        this.name = name;
     }

     /**
      * Accessor method that returns the name of the current Customer.
      * @returns name, the name of the current Customer.
      */
     getCurrentCustomerName(): string{
        return this.name;
     }
     // ====================== End Helper methods ======================

     /**
      * Returns an array of all of the current Customer objects from the web API.
      * @returns Observable<Customer[]>, the list of Customer objects.
      */
     //GET Customers.
     getCustomers(): Observable<Customer[]>{
         return this.client.get<Customer[]>(this.base);
     }//End GET Customers.


     /**
      * Returns a Customer object with the id that is passed in as a parameter from the web API.
      * @param id, the id of the Customer to be returned.
      */
     //GET Customer.
      getCustomer(id: string): Observable<Customer>{
        return this.client.get<Customer>(this.base + id)
      }//End GET Customer.


      /**
       * Posts(Creates) a new Customer object in the database through the web API.
       * @param customer, the Customer object to be created.
       */
     //POST.
     postCustomer(customer: Customer): Observable<Customer>{
         return this.client.post<Customer>(this.base, customer,{
       headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
       // 'token' : 'xxxxx'
      })
    });
     }//End POST.
}
