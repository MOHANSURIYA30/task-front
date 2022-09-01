import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit  {
  registerForm:any;
  submitted:any =false;

   constructor(private formBuilder:FormBuilder,
    private registerService:RegisterService,
    private router:Router) { }
 
   ngOnInit(): void {
     this.registerForm = this.formBuilder.group({
       user_id:new FormControl('',Validators.required),
       password:new FormControl('',Validators.required),
       role:new FormControl('admin',Validators.required)
   })
   }
   get registerControl() 
   {
       return this.registerForm.controls;
   }
   onSubmit()
   {
    this.submitted=true
    let form_val = {
      user_id:this.registerForm.value.user_id,
      password:this.registerForm.value.password
    }
     console.log("SUBMIT EXECUTED");
     if(this.registerForm.invalid)
     {
         console.log("error fill the form correctly");
         return   
     }
     else{
     console.log(this.registerForm.value);
     if(this.registerForm.value.role == 'admin')
     {
      this.registerService.registerAdmin(form_val )
      .then((res)=>{
          console.log(res);    
          this.router.navigate(['admin/'+res.user_id]);
          
      })
      .catch((err)=>{
        console.log(err);
        
      })
     }

     else
     {
      this.registerService.registerEmployee(form_val )
      .then((res)=>{
          console.log(res);    
          this.router.navigate(['employee/'+res._id]);
          
      })
      .catch((err)=>{
        console.log(err);
        
      })
     }
   } 
    
     
   }
 
 }