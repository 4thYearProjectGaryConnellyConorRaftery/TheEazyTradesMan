import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})

export class CustomerConfirmationService{

     constructor(){}

     confirmationMessage: string;

     /*
      * Getter and setter accessor methods for the customers confirmation messages
      * to be allocated at runtime.
      */
     setConfirmationMessage(message: string): void{
        console.log("Setting confirmation message ---> " + message)
        this.confirmationMessage = message;
     }

     getConfirmationMessage(): string{
        return this.confirmationMessage
     }

}