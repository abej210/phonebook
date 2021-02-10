import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Entry } from '../app.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [AppService]
})
export class SearchComponent {
  loadedEntries: Entry[] = [];
  isFetching = false;
  error = null;

  constructor(private appService: AppService) {}

  onSearchEntry(postData: Entry) {
    this.isFetching = true;
    this.appService.searchEntry(postData.name).subscribe(
      entries => {
        this.isFetching = false;
        this.loadedEntries = entries;
        console.log(entries);
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
        console.log(error);
      }
    );
  }

  onFetchEntries() {
    this.isFetching = true;
    this.appService.fetchEntries().subscribe(
      entries => {
        this.isFetching = false;
        this.loadedEntries = entries;
        console.log(entries);
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

