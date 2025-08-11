import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent {
  constructor(private router: Router) {}

  goToActiveEmployeeList() {
  this.router.navigate(['app/user-managment/employee/employeeListActive']);
}
onSubmit(form: NgForm) {
  if (form.valid) {
    const existingData = JSON.parse(localStorage.getItem('employees') || '[]');

    existingData.push(form.value);

    localStorage.setItem('employees', JSON.stringify(existingData));
    this.router.navigate(['app/user-managment/employee/employeeListActive'])

    console.log("Employee Saved:", form.value);

    form.reset();
  } else {
    alert("Please fill all required fields.");
  }
}


}
