import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employees/employee-list.component';
import { EmployeeFormComponent } from './employees/employee-form.component';
import { EmployeeDetailComponent } from './employees/employee-detail.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'employees' },
  { path: 'employees', component: EmployeeListComponent, title: 'Team directory' },
  // 'new' must come before ':id' so it isn't read as an id
  { path: 'employees/new', component: EmployeeFormComponent, title: 'Add employee' },
  { path: 'employees/:id', component: EmployeeDetailComponent, title: 'Employee profile' },
  { path: '**', redirectTo: 'employees' },
];
