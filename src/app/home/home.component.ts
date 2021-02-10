import {Component} from '@angular/core';

import {Entry} from '../app.model';
import {AppService} from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AppService]
})
export class HomeComponent {

  constructor(private appService: AppService) {
  }

  onAddEntry(postData: Entry) {
    this.appService.addEntry(postData.name, postData.phoneNumber);
  }
}
