import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  postJob(postJobForm: NgForm): void{
    console.log(postJobForm.value);
  }

}
