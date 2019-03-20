import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

/**
 * AppComponent is the root component for this application. Once the server is started,
 * it goes straight to rendering the template for this component. The template contains
 * a jumbatron that contains the image for the app logo. It also contains the router-outlet.
 * This allows other views to be swapped in and out from underneath the jumbatron. All
 * other components get rendered inside this component. 
 */
export class AppComponent {
  title = 'ProjectFrontEnd';
}
//