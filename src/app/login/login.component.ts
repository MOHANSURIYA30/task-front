import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  loginForm:any;
  submitted:any =false;
  
   constructor(private formBuilder:FormBuilder,
    private loginService:LoginService,
    private router:Router) { }
 
   ngOnInit(): void {
     this.loginForm = this.formBuilder.group({
       user_id:new FormControl('',Validators.required),
       password:new FormControl('',Validators.required),
       role:new FormControl('admin',Validators.required)
   })
   }
   get loginControl() 
   {
       return this.loginForm.controls;
   }
   onSubmit()
   {
   this.submitted=true
    let form_val = {
      user_id:this.loginForm.value.user_id,
      password:this.loginForm.value.password
    }
     console.log("SUBMIT EXECUTED");
     console.log(this.loginForm);
     
  

    if(this.loginForm.invalid)
    {
        console.log("error fill the form correctly");
        return   
    }
    else{
     if(this.loginForm.value.role == 'admin')
     {
      console.log("ADMIN PART EXECUTED");
      
      this.loginService.loginAdmin(form_val)
      .then((res)=>{
          console.log(res);    
          localStorage.setItem('loggedin', 'admin');
          this.router.navigate(['admin/'+res.user_id]);
          
      })
      .catch((err)=>{
        console.log(err);
        
      })
     }

     else
     {
      console.log("EMPLOYEE PART EXECUTED");
      this.loginService.loginEmployee( {
        user_id:this.loginForm.value.user_id,
        password:this.loginForm.value.password
      })
      .then((res)=>{
          console.log(res);  
          localStorage.setItem('loggedin', 'employee');  
          this.router.navigate(['employee/'+res._id]);
          
      })
      .catch((err)=>{
        console.log(err);
        
      })
     }
     
   }
     
   }
 
 }
