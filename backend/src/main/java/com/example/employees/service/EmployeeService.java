package com.example.employees.service;

import com.example.employees.dto.EmployeeRequest;
import com.example.employees.dto.EmployeeResponse;
import com.example.employees.exception.DuplicateEmailException;
import com.example.employees.exception.EmployeeNotFoundException;
import com.example.employees.model.Employee;
import com.example.employees.repository.EmployeeRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public EmployeeResponse add(EmployeeRequest request) {
        String email = request.email().trim();
        if (repository.existsByEmailIgnoreCase(email)) {
            throw new DuplicateEmailException(email);
        }
        Employee saved = repository.save(new Employee(
                request.firstName().trim(), request.lastName().trim(), email,
                request.department().trim(), request.jobTitle().trim(),
                request.salary(), request.hireDate()));
        return EmployeeResponse.from(saved);
    }

    public List<EmployeeResponse> list() {
        return repository.findAll(Sort.by("lastName", "firstName")).stream()
                .map(EmployeeResponse::from)
                .toList();
    }

    public EmployeeResponse get(Long id) {
        return repository.findById(id)
                .map(EmployeeResponse::from)
                .orElseThrow(() -> new EmployeeNotFoundException(id));
    }
}
