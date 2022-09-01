import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from "src/environments/environment";

const BACKEND_URL = environment.apiUrl +'task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  createTask = async(obj:any) => new Promise<any>((resolve, rejects) => {
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

  readTasks = async(query?:Object)=> new Promise<any>((resolve,rejects)=>{

    this.http.get(BACKEND_URL+(query?query:''))
    .subscribe(
      response => {
          resolve(response);
      },
      error => {
        rejects(error);
      }
    );

  });  

  updateTask =async(id:string,obj:any) =>new Promise<any>((resolve,reject)=>{
    const taskData:any =obj;
    
    this.http.put<any>(BACKEND_URL+"/"+id,taskData)
    .subscribe(
     response =>{resolve(response);},
     error =>{reject(error);}
    );
  })

  readTaskCount = async(query?:Object)=> new Promise<any>((resolve,rejects)=>{
    console.log(BACKEND_URL+'/count'+(query?query:''));
    
    this.http.get(BACKEND_URL+'/count'+(query?query:''))
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
