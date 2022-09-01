import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RegisterService } from '../services/register.service';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { EmployeeService } from '../services/employee.service';
import { TaskService } from '../services/task.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild("chart") chart: any;
  public chartOptions: any;
  constructor(private route: ActivatedRoute,
              private formBuilder:FormBuilder,
              private registerService:RegisterService,
              private employeeService:EmployeeService,
              private taskService:TaskService) {
    this.chartOptions = {
      series: this.Taskcounts,
      chart: {
        type: "donut"
      },
      labels: ["Pending", "Current", "Completed"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
   }  
  id:any;
  employeeForm:any;
  employeeList:any;
  taskForm:any;
  Taskcounts:any = [];
  taskDetails:any ;
  editTaskData:any = { employee:{user_id:"00"},task:'00'};
  status:any;
  overlay:any;
  ngOnInit(): void {
    this.overlay = document.querySelector('.overlay');
    this.overlay.style.display = 'none';
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')
    })
    this.employeeService.readEmployee("")
    .then((res)=>{ console.log(res);
      this.employeeList = res;
    })
    .catch((err)=>{console.log(err);
    })
 
    this.taskService.readTaskCount('')
    .then((res)=>{ console.log(res);
      this.Taskcounts =[res.pending,res.current,res.completed];
    })
    .catch((err)=>{console.log(err);
    })

    this.taskService.readTasks('')
    .then((res)=>{ console.log(res);
        this.taskDetails = res;
    })
    .catch((err)=>{console.log(err);
    })


    this.employeeForm = this.formBuilder.group({
      user_id:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
  })
  this.taskForm = this.formBuilder.group({
    employee:new FormControl('',Validators.required),
    task:new FormControl('',Validators.required)
})

   this.status = new FormControl("",Validators.required);
  }
  get employeeControl() 
  {
      return this.employeeForm.controls;
  }
  submitEmployee()
  {
   
    console.log(this.employeeForm.value);
    if(this.employeeForm.invalid)
    {
        console.log("error fill the form correctly");
        return   
    }
    else{
    this.registerService.registerEmployee(this.employeeForm.value)
    .then((res)=>{
        console.log(res);  
        this.ngOnInit();  
       
    })
    .catch((err)=>{
      console.log(err);
      
    })
  }


  }

  submitTask()
  {
    if(this.taskForm.invalid)
    {
        console.log("error fill the form correctly");
        return   
    }
    else{
    console.log(this.taskForm.value);
    this.taskService.createTask(this.taskForm.value)
    .then((res)=>{console.log(res)
      this.ngOnInit();
    })
    .catch((err)=>{console.log(err);
    })
  }
    
  }

  onEditStatus(taskData:any)
  {
    console.log(taskData);
    this.editTaskData = taskData;
    this.status.patchValue(taskData.status);
    this.overlay.style.display = 'flex';
  }

  closeOverlay()
  {
    this.overlay.style.display = 'none';
  }

  onupdate()
  {
    console.log({status:this.status.value});
    this.taskService.updateTask(this.editTaskData._id,{status:this.status.value})
    .then((res)=>{
      console.log(res);
      this.ngOnInit();
      
    })
    .catch((err)=>{console.log(err);
    })
    
  }

}
