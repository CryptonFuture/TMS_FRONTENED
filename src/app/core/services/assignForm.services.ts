import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment';
import { assignEmployeeForm } from 'src/app/shared/interface/assignEmployee.interface';

@Injectable({
    providedIn: 'root'
})
export class AssignFormService {

    baseUrl = environment.apiUrl + '/api/assignForm/'
    constructor(private http: HttpClient) { }



    


    addAssignFormData(body: assignEmployeeForm): Observable<assignEmployeeForm> {
        debugger
        delete body._id;
        return this.http.post<assignEmployeeForm>(`${this.baseUrl}create`, body);
    }
    
}
