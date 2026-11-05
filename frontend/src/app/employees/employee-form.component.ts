import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { ApiProblem, NewEmployee } from './employee.model';

type FieldName = 'firstName' | 'lastName' | 'email' | 'department' | 'jobTitle' | 'salary' | 'hireDate';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(EmployeeService);
  private readonly router = inject(Router);

  readonly saving = signal(false);
  readonly formError = signal<string | null>(null);
  readonly today = new Date().toISOString().slice(0, 10);

  readonly form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.maxLength(100)]],
    lastName: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    department: ['', [Validators.required, Validators.maxLength(100)]],
    jobTitle: ['', [Validators.required, Validators.maxLength(100)]],
    salary: [null as number | null, [Validators.required, Validators.min(0.01)]],
    hireDate: ['', [Validators.required]],
  });

  /** True when a field is invalid and the person has touched it or tried to submit. */
  showError(name: FieldName): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || c.dirty);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.formError.set(null);

    const value = this.form.getRawValue();
    const payload: NewEmployee = { ...value, salary: Number(value.salary) };

    this.service.add(payload).subscribe({
      next: (created) => this.router.navigate(['/employees', created.id]),
      error: (err: HttpErrorResponse) => {
        this.saving.set(false);
        const problem = err.error as ApiProblem | null;
        if (err.status === 0) {
          this.formError.set('Could not reach the API. Check that it is running on http://localhost:8080.');
        } else if (err.status === 400 && problem?.errors) {
          this.formError.set(Object.values(problem.errors).join('. ') + '.');
        } else {
          this.formError.set(problem?.detail ?? 'Could not save the employee. Try again.');
        }
      },
    });
  }
}
