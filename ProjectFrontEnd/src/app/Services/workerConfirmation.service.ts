import { Injectable } from '@angular/core';
import { Worker } from '../models/worker.model';

@Injectable({
  providedIn: 'root'
})

export class WorkerConfirmationService{

    constructor(){}

     confirmationMessage: string;

     setConfirmationMessage(message: string): void{
        console.log("Setting confirmation message ---> " + message)
        this.confirmationMessage = message;
     }

     getConfirmationMessage(): string{
        return this.confirmationMessage
     }
}