import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';

import {Entry} from './app.model';

@Injectable()
export class AppService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  addEntry(name: string, phoneNumber: string) {
    const postData: Entry = {name: name, phoneNumber: phoneNumber};
    this.http
      .post<{ name: string }>(
        'https://phonebook-34dc1-default-rtdb.firebaseio.com/entries.json',
        postData,
        {
          observe: 'response'
        }
      )
      .subscribe(
        responseData => {
          console.log(responseData);
        },
        error => {
          this.error.next(error.message);
        }
      );
  }

  fetchEntries() {
    return this.http.get<{ [key: string]: Entry }>(
      'https://phonebook-34dc1-default-rtdb.firebaseio.com/entries.json',
      {responseType: 'json'}).pipe(
      map(responseData => {
        const entriesArray: Entry[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            entriesArray.push({...responseData[key], id: key});
          }
        }
        return entriesArray;
      })
    );
  }

  searchEntry(name: string) {
    return this.http
      .get<{ [key: string]: Entry }>(
        'https://phonebook-34dc1-default-rtdb.firebaseio.com/entries.json',
        {
          responseType: 'json'
        }
      )
      .pipe(
        map(responseData => {
          const entriesArray: Entry[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key) && responseData[key].name === name) {
              entriesArray.push({...responseData[key], id: key});
            }
          }
          return entriesArray;
        })
      );
  }
}
