import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from "src/environments/environment";

const BACKEND_URL = environment.apiUrl +'admin/login';
const BACKEND_URL_EMP = environment.apiUrl +'employee/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient) { }

    loginAdmin = async(obj:any) => new Promise<any>((resolve, rejects) => {
    const data: any = obj;
    console.log(data);
    
    this.http.post<any>(BACKEND_URL, data)
      .subscribe(
        response => {
          resolve(response);
        },
        error => {
          rejects(error);
        }
      );
  })  


  loginEmployee = async(obj:any) => new Promise<any>((resolve, rejects) => {
    const data: any = obj;
    console.log(data);
    
    this.http.post<any>(BACKEND_URL_EMP, data)
      .subscribe(
        response => {
          resolve(response);
        },
        error => {
          rejects(error);
        }
      );
  })  

}