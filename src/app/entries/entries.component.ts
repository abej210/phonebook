import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Entry } from './app.model';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  loadedEntries: Entry[] = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient, private appService: AppService) {}

  ngOnInit() {
    this.isFetching = true;
    this.appService.fetchEntries().subscribe(
      entries => {
        this.isFetching = false;
        this.loadedEntries = entries;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
  }

  onAddEntry(postData: Entry) {
    this.appService.addEntry(postData.name, postData.phoneNumber);
  }

  onFetchEntries() {
    this.isFetching = true;
    this.appService.fetchEntries().subscribe(
      entries => {
        this.isFetching = false;
        this.loadedEntries = entries;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
        console.log(error);
      }
    );
  }

  onHandleError() {
    this.error = null;
  }
}

