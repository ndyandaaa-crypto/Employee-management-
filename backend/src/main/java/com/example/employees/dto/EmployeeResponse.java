package com.example.employees.dto;

import com.example.employees.model.Employee;
import java.math.BigDecimal;
import java.time.LocalDate;

public record EmployeeResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        String department,
        String jobTitle,
        BigDecimal salary,
        LocalDate hireDate
) {
    public static EmployeeResponse from(Employee e) {
        return new EmployeeResponse(e.getId(), e.getFirstName(), e.getLastName(), e.getEmail(),
                e.getDepartment(), e.getJobTitle(), e.getSalary(), e.getHireDate());
    }
}
