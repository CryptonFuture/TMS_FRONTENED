import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router,) { }

    canActivate(): boolean {
        const getLoginUserInfo = localStorage.getItem('loginUserInfo');
        if (getLoginUserInfo) {

            return true;

        } else {
            this.router.navigateByUrl('feature/login');
            return false;
        }
    }



}