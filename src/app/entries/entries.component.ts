import { Component, OnInit, OnDestroy } from '@angular/core';

import { Entry } from '../app.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css'],
  providers: [AppService]
})
export class EntriesComponent implements OnInit {
  loadedEntries: Entry[] = [];
  isFetching = false;
  error = null;

  constructor(private appService: AppService) {}

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

  onHandleError() {
    this.error = null;
  }
}

