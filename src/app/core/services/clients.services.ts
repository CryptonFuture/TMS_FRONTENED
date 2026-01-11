import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment';
import { clientsFormInterface } from 'src/app/shared/interface/clients.interface';

@Injectable({
    providedIn: 'root'
})
export class ClientsServices {
    
    getSignUpData() {
        throw new Error('Method not implemented.');
    }

    baseUrl = environment.apiUrl + '/api/Clients/'
    constructor(private http: HttpClient) { }



    getClientsData(): Observable<clientsFormInterface[]> {
        return this.http.get<clientsFormInterface[]>(`${this.baseUrl}getall`);
    }

    getClientsById(id: string): Observable<clientsFormInterface> {
        return this.http.get<clientsFormInterface>(`${this.baseUrl}getbyid/` + id);
    }


    addClientsData(body: clientsFormInterface): Observable<clientsFormInterface> {
        delete body._id;
        return this.http.post<clientsFormInterface>(`${this.baseUrl}create`, body);
    }
    editClientsData(id: string, body: clientsFormInterface): Observable<clientsFormInterface> {
        delete body._id;
        return this.http.put<clientsFormInterface>(`${this.baseUrl}update/` + id, body);
    }

    deleteClientsById(id: string): Observable<clientsFormInterface> {
        return this.http.delete<clientsFormInterface>(`${this.baseUrl}delete/` + id);
    }
}

