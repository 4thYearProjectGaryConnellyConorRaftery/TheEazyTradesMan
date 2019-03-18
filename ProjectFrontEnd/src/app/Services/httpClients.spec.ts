import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { Job } from '../models/job.model';
import { Customer } from '../models/customer.model';
import { Worker } from '../models/worker.model';

import { JobsService } from './jobs.service';
import { CustomersService } from './customers.service';
import { WorkersService } from './workers.service';


describe('HTTPclients', () =>{
    let jobService: JobsService;
    let customerService: CustomersService;
    let workerService: WorkersService;
    let httpMock: HttpTestingController;


    beforeEach(() =>{
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ JobsService, CustomersService, WorkersService ]
    })
    .compileComponents();

    jobService = TestBed.get(JobsService);
    customerService = TestBed.get(CustomersService);
    workerService = TestBed.get(WorkersService);
    httpMock = TestBed.get(HttpTestingController);
  
});

/*
----- Testing the Jobs service http client.
*/

it('should create Jobs Service.', inject([ JobsService ], (service: JobsService)=>{
    expect(service).toBeTruthy();
}))


/*
Test the GET jobs method.
*/
it('Should GET jobs from API.', ()=>{
    const mockJobs: Job[] = [{
    id: "xxx",
    trade: "xxx",
    description: "xxx",
    customer: "xxx",
    requests: "xxx",
    complete: false,
    location: "xxx",
    date: "xxx",
    accepted: false,
    contact: "xxx",
    customerName: "xxx"},
{
    id: "yyy",
    trade: "yyy",
    description: "yyy",
    customer: "yyy",
    requests: "yyy",
    complete: false,
    location: "yyy",
    date: "yyy",
    accepted: false,
    contact: "yyy",
    customerName: "yyy"}
]

jobService.getJobs().subscribe(data =>{
    expect(data.length).toBe(33);
    expect(data).toEqual(mockJobs);

    const request = httpMock.expectOne('http://localhost:8080/jobs/')
    expect(request.request.method).toBe('GET');

    request.flush(mockJobs);
})
})

/*
Test the GET Job method.
*/

it('Should GET one job from API.', ()=>{
   
    const mockJobs: Job[] = [{
    id: "xxx",
    trade: "xxx",
    description: "xxx",
    customer: "xxx",
    requests: "xxx",
    complete: false,
    location: "xxx",
    date: "xxx",
    accepted: false,
    contact: "xxx",
    customerName: "xxx"},
{
    id: "yyy",
    trade: "yyy",
    description: "yyy",
    customer: "yyy",
    requests: "yyy",
    complete: false,
    location: "yyy",
    date: "yyy",
    accepted: false,
    contact: "yyy",
    customerName: "yyy"}
] 

jobService.getJob("xxx").subscribe(data =>{
  //  expect(data.length).toBe(1);
    expect(data).toEqual(mockJobs[0]);

    const request = httpMock.expectOne('http://localhost:8080/jobs/xxx')
    expect(request.request.method).toBe('GET');

    request.flush(mockJobs);
})
})

/*
Test POST job method.
*/
it('Should POST one job to API.', ()=>{
   
    const mockJobs: Job[] = [{
    id: "xxx",
    trade: "xxx",
    description: "xxx",
    customer: "xxx",
    requests: "xxx",
    complete: false,
    location: "xxx",
    date: "xxx",
    accepted: false,
    contact: "xxx",
    customerName: "xxx"},
{
    id: "yyy",
    trade: "yyy",
    description: "yyy",
    customer: "yyy",
    requests: "yyy",
    complete: false,
    location: "yyy",
    date: "yyy",
    accepted: false,
    contact: "yyy",
    customerName: "yyy"}
] 

jobService.postJob(mockJobs[0]).subscribe(data =>{
  //  expect(data.length).toBe(1);
   // expect(data).toEqual(mockJobs[0]);

    const request = httpMock.expectOne('http://localhost:8080/jobs/')
    expect(request.request.method).toBe('POST');

    request.flush(mockJobs[0]);
})
})

/*
Test PUT job method.
*/
it('Should PUT one job from API.', ()=>{
   
    const mockJobs: Job[] = [{
    id: "xxx",
    trade: "xxx",
    description: "xxx",
    customer: "xxx",
    requests: "xxx",
    complete: false,
    location: "xxx",
    date: "xxx",
    accepted: false,
    contact: "xxx",
    customerName: "xxx"},
{
    id: "yyy",
    trade: "yyy",
    description: "yyy",
    customer: "yyy",
    requests: "yyy",
    complete: false,
    location: "yyy",
    date: "yyy",
    accepted: false,
    contact: "yyy",
    customerName: "yyy"}
] 

jobService.putJob(mockJobs[0]).subscribe(data =>{
  //  expect(data.length).toBe(1);
   // expect(data).toEqual(mockJobs[0]);

    const request = httpMock.expectOne('http://localhost:8080/jobs/xxx')
    expect(request.request.method).toBe('PUT');

    request.flush(mockJobs[0]);//
})
})

/*
Test DELETE job method.
*/
it('Should DELETE one job from API.', ()=>{
   
    const mockJobs: Job[] = [{
    id: "xxx",
    trade: "xxx",
    description: "xxx",
    customer: "xxx",
    requests: "xxx",
    complete: false,
    location: "xxx",
    date: "xxx",
    accepted: false,
    contact: "xxx",
    customerName: "xxx"},
{
    id: "yyy",
    trade: "yyy",
    description: "yyy",
    customer: "yyy",
    requests: "yyy",
    complete: false,
    location: "yyy",
    date: "yyy",
    accepted: false,
    contact: "yyy",
    customerName: "yyy"}
] 

jobService.deleteJob(mockJobs[0]).subscribe(data =>{
  //  expect(data.length).toBe(1);
   // expect(data).toEqual(mockJobs[0]);

    const request = httpMock.expectOne('http://localhost:8080/jobs/xxx')
    expect(request.request.method).toBe('DELETE');

    request.flush(mockJobs[0]);//
})
})

/*
----- Testing the Customers service http client.
*/

it('should create Customer Service.', inject([ CustomersService ], (service: CustomersService)=>{
    expect(service).toBeTruthy();
}))

/*
Test the GET customers method.
*/
it('Should GET customers from API.', ()=>{
    const mockCustomers: Customer[] = [{
        id: "xxx",
        firstName: "xxx",
        secondName: "xxx",
        address: "xxx",
        age: 0,
        firebaseUid: "xxx"},
{
        id: "yyy",
        firstName: "yyy",
        secondName: "yyy",
        address: "yyy",
        age: 0,
        firebaseUid: "yyy"}
]

customerService.getCustomers().subscribe(data =>{
    expect(data.length).toBe(33);
    expect(data).toEqual(mockCustomers);

    const request = httpMock.expectOne('http://localhost:8080/customers/')
    expect(request.request.method).toBe('GET');

    request.flush(mockCustomers);
})
})


/*
Test the GET Customer method.
*/

it('Should GET one customer from API.', ()=>{
   
    const mockCustomers: Customer[] = [{
        id: "xxx",
        firstName: "xxx",
        secondName: "xxx",
        address: "xxx",
        age: 0,
        firebaseUid: "xxx"},
{
        id: "yyy",
        firstName: "yyy",
        secondName: "yyy",
        address: "yyy",
        age: 0,
        firebaseUid: "yyy"}
]

customerService.getCustomer("xxx").subscribe(data =>{
  //  expect(data.length).toBe(1);
    expect(data).toEqual(mockCustomers[0]);

    const request = httpMock.expectOne('http://localhost:8080/customers/xxx')
    expect(request.request.method).toBe('GET');

    request.flush(mockCustomers);
})
})

/*
Test POST customer method.
*/
it('Should POST one customer to API.', ()=>{
   
    const mockCustomers: Customer[] = [{
        id: "xxx",
        firstName: "xxx",
        secondName: "xxx",
        address: "xxx",
        age: 0,
        firebaseUid: "xxx"},
{
        id: "yyy",
        firstName: "yyy",
        secondName: "yyy",
        address: "yyy",
        age: 0,
        firebaseUid: "yyy"}
]

customerService.postCustomer(mockCustomers[0]).subscribe(data =>{
  //  expect(data.length).toBe(1);
   // expect(data).toEqual(mockJobs[0]);

    const request = httpMock.expectOne('http://localhost:8080/customers/')
    expect(request.request.method).toBe('POST');

    request.flush(mockCustomers[0]);
})
})

/*
----- Testing the Workers service http client.
*/

it('should create Workers Service.', inject([ WorkersService ], (service: WorkersService)=>{
    expect(service).toBeTruthy();
}))

/*
Test the GET workers method.
*/
it('Should GET workers from API.', ()=>{
    const mockWorkers: Worker[] = [{
        id: "xxx",
        firstName: "xxx",
        secondName: "xxx",
        address: "xxx",
        //age: number;
        trade: "xxx",
        rating: "xxx",
        phoneNumber: "xxx",
        email: "xxx",
        website: "xxx",
        firebaseUid: "xxx",
        // photoPath?: string;
        jobsRequested: "xxx",
        jobsAccepted: "xxx",
        displayedRating: "xxx"},
{
        id: "yyy",
        firstName: "yyy",
        secondName: "yyy",
        address: "yyy",
        //age: number;
        trade: "yyy",
        rating: "yyy",
        phoneNumber: "yyy",
        email: "yyy",
        website: "yyy",
        firebaseUid: "yyy",
        // photoPath?: string;
        jobsRequested: "yyy",
        jobsAccepted: "yyy",
        displayedRating: "yyy"}
]

workerService.getWorkers().subscribe(data =>{
    expect(data.length).toBe(33);
    expect(data).toEqual(mockWorkers);

    const request = httpMock.expectOne('http://localhost:8080/workers/')
    expect(request.request.method).toBe('GET');

    request.flush(mockWorkers);
})
})


/*
Test the GET Worker method.
*/

it('Should GET one worker from API.', ()=>{
   
    const mockWorkers: Worker[] = [{
        id: "xxx",
        firstName: "xxx",
        secondName: "xxx",
        address: "xxx",
        //age: number;
        trade: "xxx",
        rating: "xxx",
        phoneNumber: "xxx",
        email: "xxx",
        website: "xxx",
        firebaseUid: "xxx",
        // photoPath?: string;
        jobsRequested: "xxx",
        jobsAccepted: "xxx",
        displayedRating: "xxx"},
{
        id: "yyy",
        firstName: "yyy",
        secondName: "yyy",
        address: "yyy",
        //age: number;
        trade: "yyy",
        rating: "yyy",
        phoneNumber: "yyy",
        email: "yyy",
        website: "yyy",
        firebaseUid: "yyy",
        // photoPath?: string;
        jobsRequested: "yyy",
        jobsAccepted: "yyy",
        displayedRating: "yyy"}
]

workerService.getWorker("xxx").subscribe(data =>{
  //  expect(data.length).toBe(1);
    expect(data).toEqual(mockWorkers[0]);

    const request = httpMock.expectOne('http://localhost:8080/workers/xxx')
    expect(request.request.method).toBe('GET');

    request.flush(mockWorkers);
})
})


/*
Test POST worker method.
*/
it('Should POST one worker to API.', ()=>{
   
    const mockWorkers: Worker[] = [{
        id: "xxx",
        firstName: "xxx",
        secondName: "xxx",
        address: "xxx",
        //age: number;
        trade: "xxx",
        rating: "xxx",
        phoneNumber: "xxx",
        email: "xxx",
        website: "xxx",
        firebaseUid: "xxx",
        // photoPath?: string;
        jobsRequested: "xxx",
        jobsAccepted: "xxx",
        displayedRating: "xxx"},
{
        id: "yyy",
        firstName: "yyy",
        secondName: "yyy",
        address: "yyy",
        //age: number;
        trade: "yyy",
        rating: "yyy",
        phoneNumber: "yyy",
        email: "yyy",
        website: "yyy",
        firebaseUid: "yyy",
        // photoPath?: string;
        jobsRequested: "yyy",
        jobsAccepted: "yyy",
        displayedRating: "yyy"}
]

workerService.postWorker(mockWorkers[0]).subscribe(data =>{
  //  expect(data.length).toBe(1);
   // expect(data).toEqual(mockJobs[0]);

    const request = httpMock.expectOne('http://localhost:8080/workers/')
    expect(request.request.method).toBe('POST');

    request.flush(mockWorkers[0]);
})


})

/*
Test PUT worker method.
*/
it('Should PUT one worker from API.', ()=>{
   
    const mockWorkers: Worker[] = [{
        id: "xxx",
        firstName: "xxx",
        secondName: "xxx",
        address: "xxx",
        //age: number;
        trade: "xxx",
        rating: "xxx",
        phoneNumber: "xxx",
        email: "xxx",
        website: "xxx",
        firebaseUid: "xxx",
        // photoPath?: string;
        jobsRequested: "xxx",
        jobsAccepted: "xxx",
        displayedRating: "xxx"},
{
        id: "yyy",
        firstName: "yyy",
        secondName: "yyy",
        address: "yyy",
        //age: number;
        trade: "yyy",
        rating: "yyy",
        phoneNumber: "yyy",
        email: "yyy",
        website: "yyy",
        firebaseUid: "yyy",
        // photoPath?: string;
        jobsRequested: "yyy",
        jobsAccepted: "yyy",
        displayedRating: "yyy"}
]

workerService.putWorker(mockWorkers[0]).subscribe(data =>{
  //  expect(data.length).toBe(1);
   // expect(data).toEqual(mockJobs[0]);

    const request = httpMock.expectOne('http://localhost:8080/worker/xxx')
    expect(request.request.method).toBe('PUT');

    request.flush(mockWorkers[0]);//
})
})



})