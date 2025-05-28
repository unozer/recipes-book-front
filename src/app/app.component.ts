import { Component } from '@angular/core';
import { RealTimeService } from './core/services/real-time.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'recipes-book-front';

  constructor(private realTimeService: RealTimeService) {
    console.log('realTimeService');
    realTimeService.connect();
  }
}
