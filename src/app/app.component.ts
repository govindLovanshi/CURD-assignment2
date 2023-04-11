import { Component , OnInit , ViewChild } from '@angular/core';
import {FormGroup , FormBuilder, FormControl} from '@angular/forms'
import { Employee } from './models/employee.model';
import { EmployeeService } from './service/employee.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // @ViewChild('fileInput') fileInput : any;
  @ViewChild('addEmployeeButton') addEmployeeButton : any;
  
  title = 'EmployeeCrud';

  employeeForm! : FormGroup;

  employees! : Employee[];
  employeesToDisplay!: Employee[];


  educationOptions = [
    '10th pass',
    'diploma',
    'graduate',
    'post graduate',
    'PhD',
  ]

  constructor( private fb : FormBuilder , private employeeService : EmployeeService ){
    this.employeeForm = fb.group({});
    this.employees = [];
    this.employeesToDisplay = this.employees;
  }
  
  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName : this.fb.control(''),
      lastName : this.fb.control(''),
      birthday : this.fb.control(''),
      gender : this.fb.control(''),
      education : this.fb.control(''),
      company : this.fb.control(''),
      jobExperience : this.fb.control(''),
      salary : this.fb.control(''),

    });

    this.employeeService.getEmployees().subscribe(res => {
      for(let emp of res){
        this.employees.unshift(emp)
      }
      this.employeesToDisplay = this.employees;
      console.log(this.employeesToDisplay)
    })
  }

  addEmployee(){
    let employee : Employee = {
      firstName: this.FirstName.value,
      lastName: this.LastName.value,
      birthday: this.BirthDate.value,
      gender: this.Gender.value,
      education: this.educationOptions[parseInt(this.Education.value)],
      company: this.Company.value,
      jobExperience: this.JobExperience.value,
      salary: this.Salary.value,
      // profile: this.fileInput.nativeElement.files[0]?.name,
    }

    this.employeeService.postEmployees(employee).subscribe((data)=>{
      this.employees.unshift(data[0])  
      console.log("data===>" , data[0])
      window.location.reload() 
      this.clearForm();
    })

  }

  removeEmployee(event : any){
    console.log("delete api is called")
      this.employees.forEach((val ,index)=>{
        if(val.id == parseInt(event)){
          this.employeeService.deleteEmployee(event).subscribe((res)=>{
            this.employees.splice(index , 1);
          })
        }
      })
      
  }

  editEmployee(event : any){
    // it will set here in this form
    console.log("edit api is called")
    this.employees.forEach((val , ind )=>{
      if(val.id == event){
        this.setForm(val);
      }
    })
    this.removeEmployee(event);
    this.addEmployeeButton.nativeElement.click();
    
  }
  
  searchEmployee(event : any){
    let filteredEmployees : Employee[] = [];

    if(event == ''){
      this.employeesToDisplay = this.employees;
    }else{
      filteredEmployees = this.employees.filter((val , index)=>{
        let targetKey = val.firstName.toLowerCase() + '' + val.lastName.toLocaleLowerCase();
        let searchKey =  event.toLowerCase();
        return targetKey.includes(searchKey);
      })
      this.employeesToDisplay = filteredEmployees;
    }

  }

  setForm(emp : Employee){
    this.FirstName.setValue(emp.firstName);
    this.LastName.setValue(emp.lastName);
    this.BirthDate.setValue(emp.birthday);
    this.Gender.setValue(emp.gender);

    let educationIndex = 0;
    this.educationOptions.forEach((val, index)=>{
      if(val == emp.education) educationIndex = index
    })
    this.Education.setValue(educationIndex)

    this.Company.setValue(emp.company);
    this.JobExperience.setValue(emp.jobExperience);
    this.Salary.setValue(emp.salary);
    // this.fileInput.nativeElement.value = '';

  }

  // to clear the form after submitting
  clearForm(){
    this.FirstName.setValue('');
    this.LastName.setValue('');
    this.BirthDate.setValue('');
    this.Gender.setValue('');
    this.Education.setValue('');
    this.Company.setValue('');
    this.JobExperience.setValue('');
    this.Salary.setValue('');
    // this.fileInput.nativeElement.value = '';
  }

// to access with the controls
  public get FirstName() : FormControl{
    return this.employeeForm.get('firstName') as FormControl
  }
  public get LastName() : FormControl{
    return this.employeeForm.get('lastName') as FormControl
  }
  public get BirthDate() : FormControl{
    return this.employeeForm.get('birthday') as FormControl
  }
  public get Gender() : FormControl{
    return this.employeeForm.get('gender') as FormControl
  }
  public get Education() : FormControl{
    return this.employeeForm.get('education') as FormControl
  }
  public get Company() : FormControl{
    return this.employeeForm.get('company') as FormControl
  }
  public get JobExperience() : FormControl{
    return this.employeeForm.get('jobExperience') as FormControl
  }
  public get Salary() : FormControl{
    return this.employeeForm.get('salary') as FormControl
  }

}
