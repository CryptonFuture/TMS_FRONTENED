import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { assignEmployeeForm } from 'src/app/shared/interface/assignEmployee.interface';

@Injectable({
  providedIn: 'root'
})
export class AssignFormService {

  baseUrl = environment.apiUrl + '/api/assignForm/';

  constructor(private http: HttpClient) { }

  addAssignFormData(body: assignEmployeeForm): Observable<any> {
    if ((body as any)._id) delete (body as any)._id;

    return this.http.post<any>(`${this.baseUrl}create`, body).pipe(
      catchError((err) => {
        const message = err.error?.message || 'Something went wrong';
        return throwError(() => new Error(message));
      })
    );
  }


  getAssignData(): Observable<assignEmployeeForm[]> {
    return this.http.get<assignEmployeeForm[]>(`${this.baseUrl}getall`);
  }

  getAssignById(id: string): Observable<assignEmployeeForm> {
    return this.http.get<assignEmployeeForm>(`${this.baseUrl}getbyid/` + id);
  }



  editAssignData(id: string, body: assignEmployeeForm): Observable<assignEmployeeForm> {
    delete body._id;
    return this.http.put<assignEmployeeForm>(`${this.baseUrl}update/` + id, body);
  }

  deleteAssignById(id: string): Observable<assignEmployeeForm> {
    return this.http.delete<assignEmployeeForm>(`${this.baseUrl}delete/` + id);
  }

}
