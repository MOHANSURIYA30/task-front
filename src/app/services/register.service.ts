import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from "src/environments/environment";

const BACKEND_URL = environment.apiUrl +'admin/register';
const BACKEND_URL_EMP = environment.apiUrl +'employee/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

    registerAdmin = async(obj:any) => new Promise<any>((resolve, rejects) => {
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

  registerEmployee = async(obj:any) => new Promise<any>((resolve, rejects) => {
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
