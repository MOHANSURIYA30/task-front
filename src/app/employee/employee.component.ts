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
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @ViewChild("chart") chart: any;
  public chartOptions: any;
  constructor(private route: ActivatedRoute,
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
  empName:any = 'EMPLOYEE';
  ngOnInit(): void {
    this.overlay = document.querySelector('.overlay');
    this.overlay.style.display = 'none';
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')
    })
  
 
   this.taskService.readTaskCount(`?employee=${this.id}`)
    .then((res)=>{ console.log(res);
      this.Taskcounts =[res.pending,res.current,res.completed];
    })
    .catch((err)=>{console.log(err);
    })

    this.taskService.readTasks(`?employee=${this.id}`)
    .then((res)=>{ console.log(res);
        this.taskDetails = res;
        this.empName = this.taskDetails[0].employee.user_id;
    })
    .catch((err)=>{console.log(err);
    })




   this.status = new FormControl("",Validators.required);
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
