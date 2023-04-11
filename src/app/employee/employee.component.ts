import { Component , OnInit , Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @Input() employee : Employee;
  @Output() onRemoveEmployee = new EventEmitter<number>();
  @Output() onEditEmployee = new EventEmitter<number>();

  constructor(){
    this.employee ={
      firstName : '' ,
      lastName : '',
      birthday : '' ,
      gender : '' ,
      education : '' ,
      company : '' ,
      jobExperience : '',
      salary : '' ,

    }
  }

  ngOnInit(): void {
      console.log("here is data ===>",this.employee)
  }

  deleteEmployeeClicked(){
    this.onRemoveEmployee.emit(this.employee.id);
  }

  editEmployeeClicked(){
    this.onEditEmployee.emit(this.employee.id)
  }

}
