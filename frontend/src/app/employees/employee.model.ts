export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  jobTitle: string;
  salary: number;
  /** ISO date, yyyy-MM-dd */
  hireDate: string;
}

export type NewEmployee = Omit<Employee, 'id'>;

/** Error body returned by the API (RFC 7807 problem detail). */
export interface ApiProblem {
  status?: number;
  detail?: string;
  errors?: Record<string, string>;
}
