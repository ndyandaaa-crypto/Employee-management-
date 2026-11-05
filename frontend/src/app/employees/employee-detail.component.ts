import { Component, inject, input, signal, effect } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';
import { initials, toneClass } from '../shared/avatar';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './employee-detail.component.html',
})
export class EmployeeDetailComponent {
  private readonly service = inject(EmployeeService);

  /** Bound from the :id route parameter (withComponentInputBinding). */
  readonly id = input.required<string>();

  readonly employee = signal<Employee | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly initials = initials;
  readonly toneClass = toneClass;

  constructor() {
    effect(() => this.load(Number(this.id())), { allowSignalWrites: true });
  }

  private load(id: number): void {
    this.loading.set(true);
    this.error.set(null);
    this.employee.set(null);
    this.service.get(id).subscribe({
      next: (e) => {
        this.employee.set(e);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(
          err.status === 404
            ? 'We couldn\u2019t find that employee. They may have been removed.'
            : 'Could not load this employee. Check that the API is running, then try again.',
        );
        this.loading.set(false);
      },
    });
  }
}
