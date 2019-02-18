import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CustomersService{

     constructor(private client: HttpClient){}

     getCustomers(): Observable<Customer[]>{
         return this.client.get<Customer[]>("http://localhost:8080/customers");
     }

     postCustomer(customer: Customer): Observable<Customer>{
         return this.client.post<Customer>("http://localhost:8080/customers", customer,{
       headers: new HttpHeaders({ 
        'Content-Type': 'application/json'
      })
    });
     }

}