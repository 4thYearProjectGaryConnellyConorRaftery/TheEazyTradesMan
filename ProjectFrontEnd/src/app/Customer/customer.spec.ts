import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { ListJobsComponent } from './list-jobs.component'
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';

// src\app\Customer\list-jobs.component.ts
describe('Customer components', () =>{
    let component: ListJobsComponent;
    let fixture: ComponentFixture<ListJobsComponent>;
    //let debug: DebugElement;


    beforeEach(() =>{

        TestBed.configureTestingModule({
            declarations: [ ListJobsComponent ],
            
        })
        .compileComponents();

        fixture = TestBed.createComponent(ListJobsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        
    });

   


})//End describe.