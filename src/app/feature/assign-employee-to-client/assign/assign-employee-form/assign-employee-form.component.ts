import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AssignFormService } from 'src/app/core/services/assignForm.services';
import { UserService } from 'src/app/core/services/user.services';
import { assignEmployeeForm } from 'src/app/shared/interface/assignEmployee.interface';
import { UserFormInterface } from 'src/app/shared/interface/user.interface';

@Component({
    // moduleId: module.id,
    selector: 'assign-employee-form',
    templateUrl: 'assign-employee-form.component.html',
    styleUrls: ['assign-employee-form.component.scss']
})
export class AssignEmployeeFormComponent {
     employeeActiveList : UserFormInterface[] = [];
    assignForm : FormGroup | any;

    constructor(private routes:Router, private userServices:UserService, private fb:FormBuilder, private assignFormServices:AssignFormService){}


    ngOnInit():void{
        this.loadEmployeeActiveList();
        this.initialize();
        
        
    }
     
    initialize():void{
        this.assignForm = this.fb.group({
            _id :[''],
            userEmployeeId:['',Validators.required],
            description:[''],

        })
    }

   

   
    onSubmit(){
        debugger;
        if(this.assignForm.invalid){
            console.log('Form is Invalid');
            this.assignForm.markAllAsTouched();
            return;



        }   

         
        const formData = this.assignForm.value


    const payload: assignEmployeeForm = {
   _id: formData._id,
    userEmployeeId:formData.userEmployeeId,
    description: formData.description,

  };
    
            this.assignFormServices.addAssignFormData(payload).subscribe({
                next : (respone)=>{
                    console.log(' AssignEmployeeData added Successfully',respone);
                    this.assignForm.reset();
                    
                },
                error :(error)=>{
                    console.log(' Error adding AssignEmployeeData:',error)
        
                }
        })
        
        


    }

    
    loadEmployeeActiveList() {
  this.userServices.getUserData().subscribe(
    (data:any) => {
      this.employeeActiveList = data.filter(
        (user: UserFormInterface) => user.status !== 'unactive'
      );
      console.log('Active Employees =>', this.employeeActiveList);
    },
    (error: any) => {
      console.log('Fetching Error', error);
    }
  );
}


   
    









}
