import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import {Http, Response, RequestOptions, Headers, Jsonp} from '@angular/http';
//import { url } from 'inspector';
import { HttpClientModule } from '@angular/common/http';
import { getViewData } from '@angular/core/src/render3/instructions';

import * as eBay from 'ebay-node-client';

//import {require} from 'cheerio';
//declare var require: any;
//const request = require("request");
//const cheerio = require("cheerio");



@Component({
  selector: 'app-web-scrape',
  templateUrl: './web-scrape.component.html',
  styleUrls: ['./web-scrape.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class WebScrapeComponent implements OnInit {
  constructor(private http: HttpClient, private _jsonp: Jsonp, private httpClient: HttpClient) { }

  getData() {
    const url = "https://svcs.ebay.com/services/search/FindingService/v1"
    + "?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=ConorRaf-TheEazyT-PRD-d55b8f6ea-a1f297a5&GLOBAL-ID=EBAY-US&RESPONSE-DATA-FORMAT=JSON&callback=JSONP_CALLBACK&REST-PAYLOAD&keywords=harry%20potter&paginationInput.entriesPerPage=3";

    // Pass the key for your callback (in this case 'callback')
    // as the second argument to the jsonp method
    console.log(this.http.jsonp(url, 'callback').toString());
    //this.http.jsonp(url, 'callback');
    var o = this.http.jsonp(url, 'callback');
    console.log(o);
    return this.http.jsonp(url, 'callback');
  }
  
  _cb_findItemsByKeywords(root) {
    var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
    var html = [];
    html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
    for (var i = 0; i < items.length; ++i) {
      var item     = items[i];
      var title    = item.title;
      var pic      = item.galleryURL;
      var viewitem = item.viewItemURL;
      if (null != title && null != viewitem) {
        html.push('<tr><td>' + '<img src="' + pic + '" border="0">' + '</td>' +
        '<td><a href="' + viewitem + '" target="_blank">' + title + '</a></td></tr>');
      }
    }
    html.push('</tbody></table>');
    document.getElementById("results").innerHTML = html.join("");
    console.log("::::::::::::"+items);
    //return html;
  }  // End _cb_findItemsByKeywords() function


  ngOnInit() {
   // this.getData();
    

    var url = "https://svcs.ebay.com/services/search/FindingService/v1";
    url += "?OPERATION-NAME=findItemsByKeywords";
    url += "&SERVICE-VERSION=1.0.0";
    url += "&SECURITY-APPNAME=ConorRaf-TheEazyT-PRD-d55b8f6ea-a1f297a5";
    url += "&GLOBAL-ID=EBAY-US";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    url += "&callback=_cb_findItemsByKeywords";
    url += "&REST-PAYLOAD";
    url += "&keywords=harry%20potter";
    url += "&paginationInput.entriesPerPage=3";
    console.log("hello from ts");

    const ebay = new eBay();
    ebay.setApiKey('ConorRaf-TheEazyT-PRD-d55b8f6ea-a1f297a5', 'PRD-55b8f6ea26c0-044c-40b2-9e00-ec5e');
    //var x = this._cb_findItemsByKeywords;
    //console.log(x);
    //this._cb_findItemsByKeywords(url);
    //var s=document.createElement('script'); // create script element

    //this.http.get(url).subscribe(root => this._cb_findItemsByKeywords(root));
    //s.src = url;
    //console.log(s.src);
    //root => this._cb_findItemsByKeywords(root);
    //var x = new XMLHttpRequest();
    //x.open('GET', 'https://cors-anywhere.herokuapp.com/' + url);
    //x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
   // x.send();
    //console.log(x.responseXML);
    //this._jsonp.get(url).subscribe(root => this._cb_findItemsByKeywords(root));
/*
this._jsonp.get(url, { method: 'Get' }).subscribe(data=>{
  console.log('data ', data)
}, error=>{
    console.log('error ', error)
})
*/
//var svcdata;
    //this.httpClient.get("http://api.axesso.de/amz/amazon-lookup-product?url=https://www.amazon.com/dp/B07C9HFYLX&size=Medium").subscribe((data) => {
     // svcdata  =  data

 // });
  //console.log(svcdata);
   //console.log(o);
    //this.http.jsonp
    //console.log(s);
    //document.body.appendChild(s);
    
  }
}
