import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, NewEmployee } from './employee.model';

/** Spring Boot API base URL. Change this if the backend runs elsewhere. */
export const API_URL = 'http://localhost:8080/api/employees';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly http = inject(HttpClient);

  list(): Observable<Employee[]> {
    return this.http.get<Employee[]>(API_URL);
  }

  get(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${API_URL}/${id}`);
  }

  add(employee: NewEmployee): Observable<Employee> {
    return this.http.post<Employee>(API_URL, employee);
  }
}
