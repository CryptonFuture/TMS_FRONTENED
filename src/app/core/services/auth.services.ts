import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment';
import { UserFormInterface } from 'src/app/shared/interface/user.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    baseUrl = environment.apiUrl + '/api/Auth/'
    constructor(private http: HttpClient) { }

 

    login(body: {email:string , password: string}): Observable<UserFormInterface> {
        return this.http.post<UserFormInterface>(`${this.baseUrl}login`, body);
    } 
}
