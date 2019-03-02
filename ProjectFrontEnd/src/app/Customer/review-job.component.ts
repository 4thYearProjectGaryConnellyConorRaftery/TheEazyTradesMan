import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-job',
  templateUrl: './review-job.component.html',
  styleUrls: ['./review-job.component.css']
})
export class ReviewJobComponent implements OnInit {

  constructor() { }

  rating: number = null;
  ngOnInit() {
  }

  showRating(){
    console.log(this.rating)
  }

}
