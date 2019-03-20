import { WorkerConfirmationService } from './workerConfirmation.service';
import { CustomerConfirmationService } from './customerConfirmation.service';
import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';


/**
 * This testing suite tests the confirmation services. It contains 4 specs.
 */
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

/**
 * Tests that the WorkcerConfirmationService has been created.
 */
it('should create WorkerConfirmationService', inject([ WorkerConfirmationService ], (service: WorkerConfirmationService)=>{
    expect(service).toBeTruthy();
}))

/**
 * Tests that the CustomerConfirmationService has been created.
 */
it('should create CustomerConfirmationService', inject([ CustomerConfirmationService ], (service: CustomerConfirmationService)=>{
    expect(service).toBeTruthy();
}))


/**
 * Tests that the setConfirmationMessage for the Worker is working..
 */
it('should set the Worker confirmation message', inject([ WorkerConfirmationService ], (service: WorkerConfirmationService)=>{
    let message = "Worker confirmation message."
    service.setConfirmationMessage(message);
    expect(service.getConfirmationMessage()).toContain("Worker")
}))


/**
 * Tests that the setConfirmationMessage for the Customer is working..
 */
it('should set the Customer confirmation message', inject([ CustomerConfirmationService ], (service: CustomerConfirmationService)=>{
    let message = "Customer confirmation message."
    service.setConfirmationMessage(message);
    expect(service.getConfirmationMessage()).toContain("Customer")
}))

})
