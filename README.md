# 🎓 SemiconTech Academy - Online Course Management System

A modern, full-stack, enterprise-grade Online Course Management System built with **React.js**, **Java Spring Boot 3**, **Spring Security (JWT)**, and **MySQL / Spring Data JPA**.

The platform is designed specifically for a technical training institute specializing in **VLSI & Semiconductor Design** and **Programming & Systems Software Engineering**.

---

## 🚀 Key Highlights & Features

### 1. 👨🎓 Student (User Side) Dashboard
- **Authentication & Security:** Register, secure JWT login, profile customization, password reset.
- **Student Dashboard Metrics:** Total enrolled courses, courses in progress, completed courses, and overall learning percentage (pre-seeded with Rahul's 4 enrolled courses, 2 in-progress, 2 completed at 81% overall progress).
- **Course Catalog & Filtering:** Search by name/keywords, filter by Category (*VLSI and Semiconductor Design*, *Programming and Computer Science*) and Level (*Beginner, Intermediate, Advanced*).
- **Course Enrollment:** 1-click enroll, track active seats, cancel enrollment.
- **Interactive Lesson Player:** Embedded video player, rich study notes with code syntax, downloadable resources, and live "Mark as Completed" button.
- **Real-Time Progress Tracking:** Automatic recalculation of progress percentage as lessons are completed; automatically transitions course to `COMPLETED` when reaching 100%.
- **Online MCQ Quiz Engine:** Multiple-choice assessments, automated grading, instant score card (e.g. 8/10), pass/fail status, review of correct answers and technical explanations.
- **Accredited Certificate Generation:** Automatic certificate issuance with a unique verifiable code (`STA-2026-CERT-XXXXX`), honors grade, and printable/PDF export.

### 2. 👨🏫 Instructor Dashboard
- **Course Management:** View assigned technical courses, add new courses with duration, level, prerequisites, and syllabus.
- **Lesson & Material Management:** Upload lesson videos, study notes, and organize lesson sequences.
- **Quiz Authoring:** Create quizzes and add MCQ questions with explanations.
- **Student Monitoring:** Inspect enrolled students and their live percentage progress in each course.
- **Course Announcements:** Publish updates and broadcast announcements to enrolled students.

### 3. 👨💼 Admin Dashboard
- **Platform Analytics & KPIs:** Total Students (250+), Total Instructors (15), Total Courses (13), Total Enrollments (600+), Published vs. Draft modules, Platform average rating.
- **User Management (RBAC):** Search and filter students and instructors, activate/deactivate accounts, and delete user profiles.
- **Course Catalog Moderation:** Publish, unpublish, edit, or delete courses.
- **System Activity & Audit Logs:** Real-time stream of student registrations, course creations, completions, and certificate verifications.
- **Public Certificate Verification:** Live verification tool accessible by employers and students to validate authentic diploma codes.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend** | React 18, HTML5, CSS3, JavaScript | Single Page Application with Tailwind CSS, Lucide icons, responsive layout |
| **Backend** | Java (JDK 21/27), Spring Boot 3.3.5 | RESTful APIs, Spring MVC, Centralized Exception Handling |
| **Security** | Spring Security 6, JJWT (0.12.6) | Stateless JWT authentication, BCrypt hashing, Role-Based Access Control |
| **Database** | MySQL 8.0 & Embedded H2 | Hibernate ORM, Spring Data JPA, automatic DDL creation & `schema.sql` |
| **Build Tool** | Apache Maven 3.9+ | Standard dependency and lifecycle management |

---

## 📚 Essential Technical Courses Included

### A. VLSI and Semiconductor Design
1. **Verilog HDL and RTL Design** (Beginner, 8 Weeks)
2. **SystemVerilog and Functional Verification** (Intermediate, 10 Weeks)
3. **UVM Verification (Universal Verification Methodology)** (Advanced, 12 Weeks)
4. **Physical Design and Static Timing Analysis (STA)** (Advanced, 14 Weeks)
5. **Design for Testability (DFT)** (Intermediate, 8 Weeks)
6. **ASIC Design Flow & SoC Architecture** (Intermediate, 8 Weeks)
7. **Digital Electronics and CMOS Fundamentals** (Beginner, 6 Weeks)
8. **FPGA Design with Xilinx Vivado** (Intermediate, 8 Weeks)
9. **Tcl and Python Scripting for VLSI Automation** (Beginner, 6 Weeks)

### B. Programming and Computer Science
10. **C Programming: From Fundamentals to Embedded Systems** (Beginner, 8 Weeks)
11. **Java Programming: Full Stack Enterprise Edition** (Intermediate, 10 Weeks)
12. **Python Programming: Zero to Production** (Beginner, 8 Weeks)
13. **Data Structures and Algorithms (DSA) in Java** (Intermediate, 12 Weeks)

---

## 🔑 Pre-Configured Demo Credentials

You can use the 1-click demo buttons in the navigation bar or log in manually with:

| Role | Name | Email | Password |
|---|---|---|---|
| **Student** | Rahul Sharma | `rahul@lms.com` | `Student@123` |
| **Student** | Priya Patel | `priya@lms.com` | `Student@123` |
| **Instructor** | Dr. Vikram Raman | `vikram@lms.com` | `Instructor@123` |
| **Instructor** | Ananya Deshmukh | `ananya@lms.com` | `Instructor@123` |
| **Admin** | Dr. Elena Rostova | `admin@lms.com` | `Admin@123` |

---

## 🏃 Running the Application

### Option 1: Out-of-the-Box Execution (H2 Embedded Database)
The application is pre-configured with embedded H2 database for immediate, zero-configuration execution:

```powershell
cd C:\Users\ettam\.gemini\antigravity\scratch\course-management-system
mvn spring-boot:run
```

Once started:
- Open your browser to: **`http://localhost:8080`**
- H2 Web Console (optional): **`http://localhost:8080/h2-console`** (JDBC URL: `jdbc:h2:mem:coursedb`, User: `sa`, Password: empty)

---

### Option 2: MySQL Database Execution
1. Ensure your MySQL Server is running (e.g. port 3307 or 3306).
2. Configure credentials in `src/main/resources/application-mysql.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3307/course_management_db?createDatabaseIfNotExist=true&useSSL=false
   spring.datasource.username=root
   spring.datasource.password=YOUR_PASSWORD
   ```
3. Run the application activating the MySQL profile:
   ```powershell
   mvn spring-boot:run -Dspring-boot.run.profiles=mysql
   ```

---

## 📡 REST API Endpoints Overview

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create student or instructor account
- `POST /api/auth/login` - Authenticate and retrieve JWT token
- `GET /api/auth/me` - Get profile of authenticated user
- `PUT /api/auth/profile` - Update profile information
- `POST /api/auth/reset-password` - Reset account password

### Courses (`/api/courses`)
- `GET /api/courses` - Browse published courses with search & category filters
- `GET /api/courses/{id}` - Get full course details, syllabus, and instructor info
- `GET /api/categories` - Get distinct category list
- `POST /api/courses` - Create new course (*Instructor/Admin*)
- `PUT /api/courses/{id}` - Update course details (*Instructor/Admin*)
- `DELETE /api/courses/{id}` - Delete course (*Instructor/Admin*)
- `PATCH /api/courses/{id}/toggle-status` - Toggle between `PUBLISHED` and `DRAFT`

### Lessons & Materials (`/api`)
- `GET /api/courses/{courseId}/lessons` - Retrieve lessons with user completion status
- `GET /api/lessons/{id}` - Get single lesson details & study notes
- `POST /api/courses/{courseId}/lessons` - Add new lesson (*Instructor/Admin*)
- `PUT /api/lessons/{id}` - Update lesson (*Instructor/Admin*)
- `DELETE /api/lessons/{id}` - Delete lesson (*Instructor/Admin*)

### Enrollments & Progress (`/api`)
- `POST /api/courses/{courseId}/enroll` - Enroll in course (*Student*)
- `GET /api/enrollments/my` - Get all enrolled courses for logged-in student
- `DELETE /api/enrollments/{courseId}` - Cancel course enrollment
- `POST /api/lessons/{lessonId}/complete` - Mark lesson as completed and recalculate progress %
- `GET /api/student/dashboard-stats` - Get student dashboard analytics

### Quizzes (`/api/quizzes`)
- `GET /api/courses/{courseId}/quizzes` - List quizzes for a course
- `GET /api/quizzes/{id}/questions` - Get questions for a quiz
- `POST /api/quizzes/{id}/submit` - Submit answers; auto-scores and returns technical feedback
- `GET /api/quizzes/my-attempts` - View past quiz attempts and scores

### Certificates (`/api/certificates`)
- `POST /api/courses/{courseId}/certificate/generate` - Issue certificate upon 100% course completion
- `GET /api/certificates/my` - List student's earned certificates
- `GET /api/certificates/verify/{certificateCode}` - Public verification of certificate authenticity

### Admin Operations (`/api/admin`)
- `GET /api/admin/stats` - Total users, courses, enrollments, activities
- `GET /api/admin/users` - List all users with search and role filters
- `PATCH /api/admin/users/{id}/toggle-status` - Activate or deactivate user account
- `DELETE /api/admin/users/{id}` - Remove user account

### Instructor Operations (`/api/instructor`)
- `GET /api/instructor/courses` - View assigned courses
- `GET /api/instructor/courses/{courseId}/students` - View enrolled students and progress %
- `POST /api/instructor/courses/{courseId}/announcements` - Post course announcement
