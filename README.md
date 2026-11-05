# Employee management

Two projects:

| Folder | What it is | Runs on |
|---|---|---|
| `backend/` | Spring Boot 3 REST API, Java 17, in-memory H2, OpenAPI (Swagger UI) | http://localhost:8080 |
| `frontend/` | Angular 18 app that calls the API | http://localhost:4200 |

## 1. Start the API

```bash
cd backend
mvn spring-boot:run
```

- Swagger UI: http://localhost:8080/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/v3/api-docs
- H2 console: http://localhost:8080/h2-console (JDBC URL `jdbc:h2:mem:employeesdb`, user `sa`, empty password)

Three sample employees are loaded at startup. Data is lost when the app stops.

Run the API tests with `mvn test`.

## 2. Start the Angular app

```bash
cd frontend
npm install
npm start
```

Then open http://localhost:4200.

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| POST | `/api/employees` | Add an employee (201 on success, 400 if invalid, 409 if the email exists) |
| GET | `/api/employees` | List employees, sorted by last name |
| GET | `/api/employees/{id}` | View one employee (404 if not found) |

Example body for `POST /api/employees`:

```json
{
  "firstName": "Amara",
  "lastName": "Okafor",
  "email": "amara.okafor@example.com",
  "department": "Engineering",
  "jobTitle": "Software Engineer",
  "salary": 4500.00,
  "hireDate": "2024-02-12"
}
```

CORS is enabled for `http://localhost:4200` in `backend/.../config/WebConfig.java`.
