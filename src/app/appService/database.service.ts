import { AddEmployee } from './../appInterface/add-employee';
import { config } from './../appConfig/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  databaseUrl: string = `${config.API}/users.json`;

  constructor(
    private http: HttpClient
  ) { }


  // database post data:-
  postDataInDB(userData: any) {
    return this.http.post<AddEmployee>(this.databaseUrl, userData);
  }

  // get data in database:-
  getDataInDB() {
    return this.http.get<AddEmployee>(this.databaseUrl).pipe(
      map(
        (response: any) => {
          let dataArr = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              dataArr.push({
                userId: key,
                ...response[key]
              });
            }
          }
          return dataArr;
        }
      )
    )
  }

}
