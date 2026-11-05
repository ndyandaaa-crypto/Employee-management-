package com.example.employees.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Schema(description = "Details needed to add an employee")
public record EmployeeRequest(
        @Schema(example = "Amara") @NotBlank(message = "First name is required") @Size(max = 100) String firstName,
        @Schema(example = "Okafor") @NotBlank(message = "Last name is required") @Size(max = 100) String lastName,
        @Schema(example = "amara.okafor@example.com") @NotBlank(message = "Email is required") @Email(message = "Enter a valid email address") @Size(max = 200) String email,
        @Schema(example = "Engineering") @NotBlank(message = "Department is required") @Size(max = 100) String department,
        @Schema(example = "Software Engineer") @NotBlank(message = "Job title is required") @Size(max = 100) String jobTitle,
        @Schema(example = "4500.00") @NotNull(message = "Salary is required") @Positive(message = "Salary must be greater than zero") @Digits(integer = 10, fraction = 2) BigDecimal salary,
        @Schema(example = "2024-02-12") @NotNull(message = "Hire date is required") @PastOrPresent(message = "Hire date cannot be in the future") LocalDate hireDate
) {
}
