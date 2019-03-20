import { Injectable } from '@angular/core';
import { Worker } from '../models/worker.model';

@Injectable({
  providedIn: 'root'
})

/**
 * WorkerConfirmationService is a simple class that contains a string message and
 * accessor methods to that message. This message is set at runtime depending on
 * what actions the user makes, and consumed by the Confirmation component for Workers. 
 */
export class WorkerConfirmationService{

    constructor(){}

    /**
     * The confirmation message.
     */
     confirmationMessage: string;
     
     /**
      * Accessor method that sets the value of confirmation message at runtime.
      * @param message, the value to set the confirmation message to.
      */
     setConfirmationMessage(message: string): void{
        console.log("Setting confirmation message ---> " + message)
        this.confirmationMessage = message;
     }


     /**
      * Getter method to access the current value of the the confirmationmessage.
      * @returns confirmationMessage
      */
     getConfirmationMessage(): string{
        return this.confirmationMessage
     }
}