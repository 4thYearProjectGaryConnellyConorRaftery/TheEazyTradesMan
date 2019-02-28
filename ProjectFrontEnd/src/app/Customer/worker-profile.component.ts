import { Component, OnInit } from '@angular/core';
import { Worker } from '../models/worker.model';
import { Router, Params } from '@angular/router';
import { WorkersService } from '../Services/workers.service';
import { CustomersService } from '../Services/customers.service';

@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.css']
})
export class WorkerProfileComponent implements OnInit {

  constructor(
    private router:  Router,
    private workerService: WorkersService,
    private customerService: CustomersService
  ) { }

  workerid: string;
  worker: Worker;

  ngOnInit() {
    this.workerid = this.customerService.getCurrentWorker();
    
    this.workerService.getWorker(this.workerid).subscribe(data =>{
      this.worker = data
    })
  }

}
