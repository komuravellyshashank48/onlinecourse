# ⚙️ SemiconTech Academy - Standalone Backend

This is the enterprise REST API backend for **SemiconTech Academy LMS**, built with **Spring Boot 3**, **Spring Security (JWT)**, and **Spring Data JPA**.

---

## 📁 Backend Architecture & Files

```
src/main/java/com/semicontech/lms/
├── CourseManagementApplication.java       # Main entrypoint & Database seeder
├── config/
│   ├── SecurityConfig.java                # Spring Security filter chain & password encoding
│   ├── JwtTokenProvider.java              # JWT generation, validation & claims
│   ├── JwtAuthenticationFilter.java       # Bearer token request interceptor
│   └── WebConfig.java                     # Global CORS configuration (Allows frontend origins)
├── controller/
│   ├── AuthController.java                # /api/auth (login, register, users directory)
│   ├── CourseController.java              # /api/courses (catalog, filtering, create)
│   ├── EnrollmentController.java          # /api/enrollments (enroll, my enrollments, cancel)
│   ├── LessonController.java              # /api/lessons (syllabus, progress tracking)
│   ├── QuizController.java                # /api/quizzes (questions, submission, grading)
│   ├── CertificateController.java         # /api/certificates (verification, code generation)
│   ├── InstructorController.java          # /api/instructor (faculty dashboard)
│   └── AdminController.java               # /api/admin (platform statistics & management)
├── service/
│   ├── CourseService.java                 # Business logic for courses & real enrollment counts
│   ├── AuthService.java                   # User registration, authentication & password verification
│   ├── EnrollmentService.java             # Enrollment workflows, progress calculation
│   ├── LessonService.java                 # Lesson management
│   ├── QuizService.java                   # Quiz scoring engine
│   └── CertificateService.java            # Certificate generation & validation
├── repository/                            # Spring Data JPA Repositories
│   ├── CourseRepository.java
│   ├── UserRepository.java
│   ├── EnrollmentRepository.java
│   ├── LessonRepository.java
│   └── QuizRepository.java
├── entity/                                # JPA Database Entities (H2 / MySQL)
│   ├── Course.java
│   ├── User.java
│   ├── Enrollment.java
│   ├── Lesson.java
│   ├── Quiz.java
│   └── Certificate.java
├── dto/                                   # Data Transfer Objects
└── exception/                             # Global error handlers
```

---

## 🚀 How to Run the Backend

### Prerequisites
- Java 17 or higher
- Maven 3.8+ (or use `./mvnw`)

### Start the Server
```bash
mvn spring-boot:run
```
The server will start on port `8080`.
- **API Base URL**: `http://localhost:8080/api`
- **H2 In-Memory Database Console**: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:lmsdb`
  - Username: `sa`
  - Password: `password`

---

## 🔑 Key API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/courses` | List all courses with real verified enrolled student counts |
| `POST` | `/api/courses` | Create/Insert a new course (Faculty / Admin) |
| `POST` | `/api/auth/login` | Authenticate user & return JWT token |
| `POST` | `/api/auth/register` | Register new student or faculty account |
| `GET` | `/api/auth/users` | Real registered users directory |
| `GET` | `/api/enrollments/my` | Get courses enrolled by authenticated student |
| `POST` | `/api/courses/{id}/enroll` | Enroll current user into course |
| `DELETE` | `/api/enrollments/{id}` | Cancel course enrollment |
| `GET` | `/api/certificates/verify/{code}` | Verify authenticity of issued certificate |
