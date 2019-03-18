import { WorkerConfirmationService } from './workerConfirmation.service';
import { CustomerConfirmationService } from './customerConfirmation.service';
import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
//src\app\Services\workerConfirmation.service.ts
describe('ConfirmationServices', () =>{
    let component: WorkerConfirmationService;
    let fixture: ComponentFixture<WorkerConfirmationService>;
    let debug: DebugElement;


beforeEach(async(() =>{

    TestBed.configureTestingModule({
        providers: [ WorkerConfirmationService, CustomerConfirmationService ]
    })
    .compileComponents();
    
}));
/*
beforeEach(()=>{
    fixture = TestBed.createComponent(WorkerConfirmationService);
   // component = fixture.componentInstance;
  //  component.confirmationMessage = "confirmation message.";
    debug = fixture.debugElement;

    fixture.detectChanges();
})  */


it('should create WorkerConfirmationService', inject([ WorkerConfirmationService ], (service: WorkerConfirmationService)=>{
    expect(service).toBeTruthy();
}))

it('should create CustomerConfirmationService', inject([ CustomerConfirmationService ], (service: CustomerConfirmationService)=>{
    expect(service).toBeTruthy();
}))



it('should set the Worker confirmation message', inject([ WorkerConfirmationService ], (service: WorkerConfirmationService)=>{
    let message = "Worker confirmation message."
    service.setConfirmationMessage(message);
    expect(service.getConfirmationMessage()).toContain("Worker")
}))


it('should set the Customer confirmation message', inject([ CustomerConfirmationService ], (service: CustomerConfirmationService)=>{
    let message = "Customer confirmation message."
    service.setConfirmationMessage(message);
    expect(service.getConfirmationMessage()).toContain("Customer")
}))

})
