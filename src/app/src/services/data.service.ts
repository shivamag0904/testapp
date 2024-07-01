import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})


export class DataService {

  constructor(private httpClient:HttpClient) { }

  getHomes$(){
    //@todo add a real HTTP call to get home
    return this.httpClient.get<any>('../../../../assets/homes.json');
  }

  bookHome$(){
  
    return this.httpClient.post<any>('https://run.mocky.io/v3/dfaf7455-d2a1-4d60-8736-3a63b215dc9a',{});
  }
}
