import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';
import { initials, toneClass } from '../shared/avatar';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent {
  private readonly service = inject(EmployeeService);

  readonly employees = signal<Employee[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly initials = initials;
  readonly toneClass = toneClass;

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.service.list().subscribe({
      next: (data) => {
        this.employees.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load employees. Check that the API is running on http://localhost:8080, then try again.');
        this.loading.set(false);
      },
    });
  }
}
