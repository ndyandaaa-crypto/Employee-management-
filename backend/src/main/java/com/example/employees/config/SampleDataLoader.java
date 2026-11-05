package com.example.employees.config;

import com.example.employees.model.Employee;
import com.example.employees.repository.EmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/** Seeds a few employees so the list isn't empty on first run. */
@Configuration
public class SampleDataLoader {

    @Bean
    CommandLineRunner seed(EmployeeRepository repository) {
        return args -> {
            if (repository.count() > 0) return;
            repository.saveAll(List.of(
                    new Employee("Amara", "Okafor", "amara.okafor@example.com", "Engineering", "Software Engineer", new BigDecimal("4500.00"), LocalDate.of(2023, 2, 13)),
                    new Employee("Tendai", "Moyo", "tendai.moyo@example.com", "Finance", "Financial Analyst", new BigDecimal("3800.00"), LocalDate.of(2022, 8, 1)),
                    new Employee("Lindiwe", "Dube", "lindiwe.dube@example.com", "People", "HR Partner", new BigDecimal("3400.00"), LocalDate.of(2024, 5, 20))
            ));
        };
    }
}
