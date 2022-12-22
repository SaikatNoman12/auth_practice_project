import { AuthenticationService } from './authService/authentication.service';
import { AddEmployee } from './../appInterface/add-employee';
import { config } from './../appConfig/config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take } from 'rxjs';
import { SignUpResponse } from '../appInterface/authInterface/sign-up-responce';
import { User } from '../appModal/user.modal';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  databaseUrl: string = `${config.API}/users.json`;
  singleDBUrl: string = `${config.API}/users`;

  constructor(
    private http: HttpClient,
    private _authService: AuthenticationService
  ) { }


  // database post data:-
  postDataInDB(userData: any) {
    return this.http.post<AddEmployee>(this.databaseUrl, userData);
  }

  // get data in database:-
  getDataInDB() {
    return this._authService.user.pipe(
      take(1),
      exhaustMap(
        (user: any) => {
          return this.http.get<SignUpResponse>(this.databaseUrl, {
            params: new HttpParams().set('auth', user.token)
          });
        }
      )
      , map(
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
    );
  }

  // use for get single data:-
  getSingleData(userId: string) {

    return this._authService.user.pipe(
      take(1),
      exhaustMap(
        (user: any) => {
          return this.http.get(`${this.singleDBUrl}/${userId}.json`, {
            params: new HttpParams().set('auth', user.token)
          })
        }
      )
    )

    // return this.http.get(`${this.singleDBUrl}/${userId}.json`);
  }

  // use for delete db data:-
  deleteDataBaseData(userId: string) {
    return this.http.delete(`${this.singleDBUrl}/${userId}.json`);
  }

}
