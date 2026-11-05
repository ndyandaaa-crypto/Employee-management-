package com.example.employees.exception;

public class DuplicateEmailException extends RuntimeException {
    public DuplicateEmailException(String email) {
        super("An employee with the email " + email + " already exists");
    }
}
