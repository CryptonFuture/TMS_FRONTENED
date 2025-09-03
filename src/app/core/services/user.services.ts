import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment';
import { UserFormInterface } from 'src/app/shared/interface/user.interface';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    getSignUpData() {
        throw new Error('Method not implemented.');
    }

    baseUrl = environment.apiUrl + '/api/User/'
    constructor(private http: HttpClient) { }



    getUserData(): Observable<UserFormInterface[]> {
        return this.http.get<UserFormInterface[]>(`${this.baseUrl}getall`);
    }

    getUserById(id: string): Observable<UserFormInterface> {
        return this.http.get<UserFormInterface>(`${this.baseUrl}getbyid/` + id);
    }


    addUserData(body: UserFormInterface): Observable<UserFormInterface> {
        delete body._id;
        return this.http.post<UserFormInterface>(`${this.baseUrl}create`, body);
    }
    editUserData(id: string, body: UserFormInterface): Observable<UserFormInterface> {
        delete body._id;
        return this.http.put<UserFormInterface>(`${this.baseUrl}update/` + id, body);
    }

    deleteUserById(id: string): Observable<UserFormInterface> {
        return this.http.delete<UserFormInterface>(`${this.baseUrl}delete/` + id);
    }
}
