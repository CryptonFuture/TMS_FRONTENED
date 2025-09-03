import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment';
import { TaskFormInterface } from 'src/app/shared/interface/task.interface';
@Injectable({
    providedIn: 'root'
})
export class TaskService {
    getSignUpData() {
        throw new Error('Method not implemented.');
    }

    baseUrl = environment.apiUrl + '/api/Task/'
    constructor(private http: HttpClient) { }



    getTaskData(): Observable<TaskFormInterface> {
        return this.http.get<TaskFormInterface>(`${this.baseUrl}getall`);
    }

    getTaskById(id: string): Observable<TaskFormInterface> {
        return this.http.get<TaskFormInterface>(`${this.baseUrl}getbyid/` + id);
    }


    addTaskData(body: TaskFormInterface): Observable<TaskFormInterface> {
        delete body._id;
        return this.http.post<TaskFormInterface>(`${this.baseUrl}create`, body);
    }
    editTaskData(id: string, body: TaskFormInterface): Observable<TaskFormInterface> {
        delete body._id;
        return this.http.put<TaskFormInterface>(`${this.baseUrl}update/` + id, body);
    }

    deleteTaskById(id: string): Observable<TaskFormInterface> {
        return this.http.delete<TaskFormInterface>(`${this.baseUrl}delete/` + id);
    }
}

