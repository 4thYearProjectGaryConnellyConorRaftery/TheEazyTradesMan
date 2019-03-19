import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs';



//declare var require: any;
//const request = require("request");
//import * as request from 'request';
//const cheerio = require("cheerio");
//import * as cheerio from 'cheerio';

// Write Headers
//writeStream.write(`Title,Link,Date \n`);

@Component({
  selector: 'web-scrape',
  templateUrl: './webScrape.component.html'
})
export class WebScrapeComponent implements OnInit {

  theUrl: string = 'https://jsonplaceholder.typicode.com/post';
  res = [];
  //private httpClient: HttpClient;
  constructor(private httpClient: HttpClient) { }

  httpGetAsync()
  {
      var t = this.httpClient.get(this.theUrl).subscribe((res) => {
        console.log(res);
      });

      return t

  }

  ngOnInit() {
    /*
    request('http://codedemos.com/sampleblog', (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        console.log(html);
    
        $('.post-preview').each((i, el) => {
          const title = $(el)
            .find('.post-title')
            .text()
            .replace(/\s\s+/g, '');
          const link = $(el)
            .find('a')
            .attr('href');
          const date = $(el)
            .find('.post-date')
            .text()
            .replace(/,/, '');

          //Write Row To CSV
        //writeStream.write(`${title}, ${link}, ${date} \n`);
        });
    
        console.log('Scraping Done...');
      }
    });
*/



  }
  
}