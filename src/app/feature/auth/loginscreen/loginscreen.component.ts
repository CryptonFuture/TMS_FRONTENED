import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.services';

@Component({
    // moduleId: module.id,
    selector: 'loginscreen',
    templateUrl: 'loginscreen.component.html',
    styleUrls: ['loginscreen.component.scss']
})
export class LoginscreenComponent {

    loginForm:FormGroup | any;
    loginError : String |null = null;

    constructor(private fb:FormBuilder, private routes:Router, private authServices:AuthService){

        this.loginForm = this.fb.group({
            email:['',(Validators.required)],
            password:['',(Validators.required)],

        })
    }





    submit(){
        debugger
        if(this.loginForm.valid){
            const {email , password} = this.loginForm.value;

            this.authServices.login({email,password}).subscribe(

            (response:any)=>{
                alert('Login Successfully')
                this.loginError = null;

                localStorage.setItem('loginUserInfo',JSON.stringify({authToken : response.user?._id , user : response.user,}));
                this.routes.navigateByUrl('/app/dashboard');
            },
            (error:any)=>{
                this.loginError = 'Invalid email and password';
            }
        )

    }


        }

    }


