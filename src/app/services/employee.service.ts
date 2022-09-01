import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from "src/environments/environment";

const BACKEND_URL_EMP = environment.apiUrl +'employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  readEmployee = async(query?:Object)=> new Promise<any>((resolve,rejects)=>{

    this.http.get(BACKEND_URL_EMP+(query?query:''))
    .subscribe(
      response => {
          resolve(response);
      },
      error => {
        rejects(error);
      }
    );

  });  
}
