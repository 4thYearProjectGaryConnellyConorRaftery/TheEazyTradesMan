import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CustomersService{

     constructor(private client: HttpClient){}

}
