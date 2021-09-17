import {Component} from '@angular/core';
import {MainService} from './core/services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'climedo-museum-test';

  constructor(private mainService: MainService) {

  }
}
