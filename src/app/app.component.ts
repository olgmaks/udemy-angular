import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  currentRoute = 'recipes';

  onRouteSelected(routeEventData)
  {
    this.currentRoute = routeEventData.route;
  }
}
