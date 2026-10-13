package com.semicontech.lms.config;

import com.semicontech.lms.entity.*;
import com.semicontech.lms.repository.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final LessonProgressRepository lessonProgressRepository;
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final CertificateRepository certificateRepository;
    private final ReviewRepository reviewRepository;
    private final PasswordEncoder passwordEncoder;

        @Value("${app.seed-demo-data:true}")
        private boolean seedDemoData;

    public DataInitializer(UserRepository userRepository,
                           CourseRepository courseRepository,
                           LessonRepository lessonRepository,
                           EnrollmentRepository enrollmentRepository,
                           LessonProgressRepository lessonProgressRepository,
                           QuizRepository quizRepository,
                           QuestionRepository questionRepository,
                           CertificateRepository certificateRepository,
                           ReviewRepository reviewRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.lessonProgressRepository = lessonProgressRepository;
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.certificateRepository = certificateRepository;
        this.reviewRepository = reviewRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
                if (!seedDemoData || userRepository.count() > 0) return;

        // 1. Create Users
        User admin = new User("Dr. Elena Rostova", "admin@lms.com", passwordEncoder.encode("Admin@123"), "ROLE_ADMIN", "Chief Academic Officer & VLSI Architect", "20+ years of semiconductor design leadership and academic direction.");
        admin.setAvatarUrl("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150");

        User inst1 = new User("Dr. Vikram Raman", "vikram@lms.com", passwordEncoder.encode("Instructor@123"), "ROLE_INSTRUCTOR", "Principal Verification Engineer (Ex-Intel/TI)", "Specialist in SystemVerilog, UVM, and protocol verification architectures.");
        inst1.setAvatarUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150");

        User inst2 = new User("Ananya Deshmukh", "ananya@lms.com", passwordEncoder.encode("Instructor@123"), "ROLE_INSTRUCTOR", "Lead Physical Design & STA Specialist (Ex-Qualcomm)", "Tapeout veteran across 5nm, 7nm, and 16nm FinFET processes.");
        inst2.setAvatarUrl("https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150");

        User inst3 = new User("Prof. Rajesh Verma", "rajesh@lms.com", passwordEncoder.encode("Instructor@123"), "ROLE_INSTRUCTOR", "Senior Software Architect & Systems Programmer", "Specializes in High Performance C/C++, Java Distributed Systems, and DSA.");
        inst3.setAvatarUrl("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150");

        User studentRahul = new User("Rahul Sharma", "rahul@lms.com", passwordEncoder.encode("Student@123"), "ROLE_STUDENT", "Graduate Semiconductor Trainee", "Aspiring ASIC verification and RTL engineer.");
        studentRahul.setAvatarUrl("https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150");

        User studentPriya = new User("Priya Patel", "priya@lms.com", passwordEncoder.encode("Student@123"), "ROLE_STUDENT", "VLSI Design Aspirant", "Interested in Physical Design, STA, and FPGA architectures.");
        studentPriya.setAvatarUrl("https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150");

        userRepository.saveAll(Arrays.asList(admin, inst1, inst2, inst3, studentRahul, studentPriya));

        // 2. Create Courses
        String catVLSI = "VLSI and Semiconductor Design";
        String catCS = "Programming and Computer Science";

        // Course 1: Verilog HDL and RTL Design
        Course c1 = new Course(
                "Verilog HDL and RTL Design",
                "Master digital synthesis, behavioral and structural Verilog, FSM modeling, synchronous FIFO design, and industrial RTL coding guidelines.",
                catVLSI, "BEGINNER", "8 Weeks (40 Hours)",
                "Digital Electronics basics, logic gates and boolean algebra",
                "1. Verilog Fundamentals & Lexical Tokens\n2. Gate & Dataflow Modeling\n3. Behavioral Modeling & Always Blocks\n4. Finite State Machines (Moore & Mealy)\n5. Synchronous & Asynchronous FIFO Design\n6. Synthesis Guidelines & Race Conditions",
                "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
                new BigDecimal("4999.00"), inst1, "PUBLISHED"
        );

        // Course 2: SystemVerilog and Functional Verification
        Course c2 = new Course(
                "SystemVerilog and Functional Verification",
                "Comprehensive SystemVerilog for verification: OOP testbenches, constrained random testing, functional coverage, SVA assertions, and DPI-C.",
                catVLSI, "INTERMEDIATE", "10 Weeks (50 Hours)",
                "Verilog HDL, basic OOP programming concepts",
                "1. OOP Constructs & Polymorphism in SV\n2. Inter-Process Communication (Mailboxes, Semaphores, Events)\n3. Constrained Random Generation\n4. Functional Coverage & Cross Coverage\n5. SystemVerilog Assertions (SVA Immediate & Concurrent)\n6. Layered Testbench Architecture",
                "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600",
                new BigDecimal("6999.00"), inst1, "PUBLISHED"
        );

        // Course 3: UVM Verification
        Course c3 = new Course(
                "UVM Verification (Universal Verification Methodology)",
                "Industry-standard UVM methodology: UVM phases, factories, drivers, monitors, scoreboards, sequencers, TLM 2.0, and RAL (Register Abstraction Layer).",
                catVLSI, "ADVANCED", "12 Weeks (60 Hours)",
                "SystemVerilog OOP, SV Testbench fundamentals",
                "1. UVM Architecture & Component Hierarchy\n2. Phasing Mechanism & Factory Pattern\n3. TLM 1.0 & 2.0 Interconnects\n4. UVM Sequence, Sequencer & Driver Interaction\n5. Scoreboard & Coverage Collectors\n6. UVM Register Abstraction Layer (RAL) Implementation",
                "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600",
                new BigDecimal("8499.00"), inst1, "PUBLISHED"
        );

        // Course 4: Physical Design and Static Timing Analysis (STA)
        Course c4 = new Course(
                "Physical Design and Static Timing Analysis (STA)",
                "Complete Netlist-to-GDSII flow: Floorplanning, Power Routing, Placement, Clock Tree Synthesis (CTS), Routing, Setup/Hold Timing Closure, and PrimeTime STA.",
                catVLSI, "ADVANCED", "14 Weeks (70 Hours)",
                "CMOS fundamentals, Digital Electronics, basic UNIX",
                "1. ASIC PD Flow Overview & Technology Files (LEF, DEF, Liberty)\n2. Floorplanning & Power Mesh Synthesis\n3. Placement & High Fanout Net Synthesis (HFNS)\n4. Clock Tree Synthesis (CTS) & Clock Skew Budgeting\n5. Global & Detailed Routing, DRC/LVS\n6. STA Constraints (SDC), Setup/Hold Analysis, On-Chip Variation (OCV)",
                "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600",
                new BigDecimal("8999.00"), inst2, "PUBLISHED"
        );

        // Course 5: Design for Testability (DFT)
        Course c5 = new Course(
                "Design for Testability (DFT)",
                "Manufacturing fault models, Scan insertion, ATPG (Automatic Test Pattern Generation), Built-In Self-Test (BIST, MBIST), and IEEE 1149.1 JTAG Boundary Scan.",
                catVLSI, "INTERMEDIATE", "8 Weeks (40 Hours)",
                "Digital Logic, Verilog RTL design",
                "1. Fault Models (Stuck-At, Transition Delay, Path Delay)\n2. Full Scan vs Partial Scan Architecture\n3. ATPG Pattern Generation & Fault Coverage Metrics\n4. Memory BIST (MBIST) Algorithms (March Tests)\n5. Logic BIST (LBIST) Principles\n6. IEEE 1149.1 JTAG Controller and TAP Architecture",
                "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600",
                new BigDecimal("5999.00"), inst2, "PUBLISHED"
        );

        // Course 6: ASIC Design Flow
        Course c6 = new Course(
                "ASIC Design Flow & SoC Architecture",
                "End-to-end SoC journey from architectural specification to tape-out: microarchitecture, logic synthesis, equivalence checking, DRC/LVS, and post-silicon validation.",
                catVLSI, "INTERMEDIATE", "8 Weeks (40 Hours)",
                "Digital design basics",
                "1. SoC Specifications & Microarchitecture Design\n2. Logic Synthesis using Synopsys Design Compiler\n3. Formal Equivalence Checking (LEC/Formality)\n4. Low Power Design using UPF/CPF\n5. Signoff Verification (STA, DRC, LVS, ERC)\n6. Packaging, Foundry Tape-Out and Silicon Bring-up",
                "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600",
                new BigDecimal("5499.00"), inst2, "PUBLISHED"
        );

        // Course 7: Digital Electronics and CMOS Fundamentals
        Course c7 = new Course(
                "Digital Electronics and CMOS Fundamentals",
                "Core physics and circuitry: NMOS/PMOS transistor operation, CMOS inverters, static/dynamic power dissipation, combinational logic gates, and layout fundamentals.",
                catVLSI, "BEGINNER", "6 Weeks (30 Hours)",
                "Basic high school physics and electric circuits",
                "1. Number Systems & Boolean Algebra Theorems\n2. CMOS Inverter VTC Curve & Noise Margins\n3. CMOS Static & Dynamic Power Dissipation\n4. Transmission Gates & Pass-Transistor Logic\n5. Latches, Flip-Flops & Metastability\n6. Euler Path & Stick Diagrams Layout",
                "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600",
                new BigDecimal("3499.00"), inst2, "PUBLISHED"
        );

        // Course 8: FPGA Design
        Course c8 = new Course(
                "FPGA Design with Xilinx Vivado",
                "Architectural implementation on modern FPGAs: LUTs, Block RAM, DSP slices, High-Level Synthesis (HLS), timing constraints, and hardware-in-the-loop debugging.",
                catVLSI, "INTERMEDIATE", "8 Weeks (40 Hours)",
                "Verilog or VHDL basics",
                "1. FPGA Architecture vs ASIC (CLBs, BRAM, DSP48)\n2. Vivado Design Suite Workflow\n3. Xilinx Constraint Files (XDC) & Timing Closure\n4. AXI4 Bus Protocol Interface\n5. Integrated Logic Analyzer (ILA) Hardware Debugging\n6. Real-time Audio/Video Processing on FPGA",
                "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
                new BigDecimal("5999.00"), inst1, "PUBLISHED"
        );

        // Course 9: Tcl and Python Scripting for VLSI
        Course c9 = new Course(
                "Tcl and Python Scripting for VLSI Automation",
                "Automate electronic design automation (EDA) tools: Tcl scripting for Synopsys/Cadence flows, report parsing with Python regex, and regression automation.",
                catVLSI, "BEGINNER", "6 Weeks (30 Hours)",
                "Basic programming or terminal exposure",
                "1. Tcl Syntax, Lists, Dictionaries & Procedures\n2. Tool Command Language in Synopsys/Cadence Environments\n3. Python for Log & Report Parsing (Regex)\n4. Automated Regression Testing Pipelines\n5. Batch Processing & Distributed Grid Submissions\n6. Building Custom EDA Productivity Utilities",
                "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600",
                new BigDecimal("3999.00"), inst1, "PUBLISHED"
        );

        // Course 10: C Programming
        Course c10 = new Course(
                "C Programming: From Fundamentals to Embedded Systems",
                "Pointers, manual dynamic memory management, bitwise manipulation, hardware register mapping, data structures in C, and systems-level programming.",
                catCS, "BEGINNER", "8 Weeks (40 Hours)",
                "No prior programming experience required",
                "1. Data Types, Control Structures & Operators\n2. Pointers, Memory Addressing & Pointer Arithmetic\n3. Bitwise Operators & Hardware Masking\n4. Dynamic Memory Allocation (malloc, free, realloc)\n5. Structs, Unions & Bit-Fields\n6. File I/O, Makefiles & GCC Compilation Stages",
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600",
                new BigDecimal("2999.00"), inst3, "PUBLISHED"
        );

        // Course 11: Java Programming
        Course c11 = new Course(
                "Java Programming: Full Stack Enterprise Edition",
                "Modern Java 21+: Object-Oriented Principles, Collections Framework, Generics, Lambdas & Streams, Multithreading & Concurrency, and Spring Boot REST architecture.",
                catCS, "INTERMEDIATE", "10 Weeks (50 Hours)",
                "Basic logic or prior programming in any language",
                "1. OOP Mastery: Inheritance, Polymorphism, Abstraction & Interfaces\n2. Java Collections Framework (List, Set, Map, Queues)\n3. Functional Programming with Lambdas & Stream API\n4. Multithreading, Synchronization & Virtual Threads\n5. Exception Handling & File I/O\n6. Spring Boot REST APIs, Spring Data JPA & MySQL",
                "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600",
                new BigDecimal("4999.00"), inst3, "PUBLISHED"
        );

        // Course 12: Python Programming
        Course c12 = new Course(
                "Python Programming: Zero to Production",
                "Core Python, idiomatic writing, OOP, file handling, unit testing, numerical computing with NumPy, and automating modern workflows.",
                catCS, "BEGINNER", "8 Weeks (40 Hours)",
                "No prior programming experience required",
                "1. Pythonic Syntax, Lists, Dicts & Comprehensions\n2. Functions, Decorators, Iterators & Generators\n3. Object-Oriented Programming in Python\n4. Exception Handling & Packaging\n5. Working with APIs, JSON & Databases\n6. Data Processing with Pandas & Matplotlib",
                "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600",
                new BigDecimal("3499.00"), inst3, "PUBLISHED"
        );

        // Course 13: Data Structures and Algorithms (DSA)
        Course c13 = new Course(
                "Data Structures and Algorithms (DSA) in Java",
                "Comprehensive algorithmic problem solving: Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Dynamic Programming, and technical interview preparation.",
                catCS, "INTERMEDIATE", "12 Weeks (60 Hours)",
                "Knowledge of Java, C, or Python syntax",
                "1. Asymptotic Complexity (Big-O, Omega, Theta Analysis)\n2. Linked Lists, Stacks, Queues & Hash Maps\n3. Binary Search Trees, AVL Trees & Heaps\n4. Graph Algorithms (BFS, DFS, Dijkstra, Kruskal)\n5. Divide & Conquer, Backtracking & Recursion\n6. Dynamic Programming Patterns (1D & 2D Memoization)",
                "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600",
                new BigDecimal("5999.00"), inst3, "PUBLISHED"
        );

        courseRepository.saveAll(Arrays.asList(c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13));

        // 3. Add Lessons for key courses
        // Lessons for Course 1: Verilog HDL
        Lesson l1_1 = new Lesson(c1, "Introduction to Hardware Description Languages & Verilog Syntax",
                "Overview of HDLs vs sequential programming languages, simulation vs synthesis.",
                "### 1. Introduction to HDLs\nHardware Description Languages describe concurrent hardware behavior rather than sequential CPU instructions.\n\n```verilog\nmodule full_adder (\n    input a, b, cin,\n    output sum, cout\n);\n    assign sum = a ^ b ^ cin;\n    assign cout = (a & b) | (b & cin) | (a & cin);\nendmodule\n```\n\n### Key Principles:\n- All `assign` statements execute concurrently.\n- Wires model physical electrical connections.",
                "https://www.youtube.com/embed/dQw4w9WgXcQ", null, 25, 1);

        Lesson l1_2 = new Lesson(c1, "Dataflow and Gate-Level Modeling",
                "Designing combinational logic blocks using primitive gates and continuous assign statements.",
                "### Continuous Assignment & Gate Primitives\nVerilog provides built-in primitives like `and`, `or`, `xor`, `buf`, and `not`.\n\n```verilog\nmodule mux2to1 (\n    input d0, d1, sel,\n    output y\n);\n    assign y = sel ? d1 : d0;\nendmodule\n```",
                "https://www.youtube.com/embed/dQw4w9WgXcQ", null, 30, 2);

        Lesson l1_3 = new Lesson(c1, "Behavioral Modeling: Always Blocks, Blocking vs Non-Blocking",
                "Crucial rules for synthesis: using <= for sequential logic and = for combinational logic.",
                "### Golden Rules of Verilog Synthesis\n1. Use **non-blocking assignments (`<=`)** inside sequential `always @(posedge clk)` blocks to avoid race conditions.\n2. Use **blocking assignments (`=`)** inside combinational `always @(*)` blocks.\n3. Never mix blocking and non-blocking assignments in the same always block.",
                "https://www.youtube.com/embed/dQw4w9WgXcQ", null, 35, 3);

        Lesson l1_4 = new Lesson(c1, "Finite State Machine (FSM) Design: Mealy vs Moore",
                "Designing robust 2-process and 3-process FSMs in Verilog with safe state encodings.",
                "### 3-Always Block FSM Template\n- Block 1: State register sequential update on clock edge.\n- Block 2: Next state combinational logic.\n- Block 3: Output combinational logic (Moore: depends only on state; Mealy: depends on state + input).",
                "https://www.youtube.com/embed/dQw4w9WgXcQ", null, 40, 4);

        // Lessons for Course 11: Java Programming
        Lesson l11_1 = new Lesson(c11, "Java Platform Architecture & OOP Fundamentals",
                "JVM, JRE, JDK internals, Bytecode execution, classes, objects, and memory heap.",
                "### Java Virtual Machine Architecture\nJava compiles source code into `.class` bytecode which runs on any JVM.\n\n```java\npublic class Engine {\n    private final String model;\n    public Engine(String model) { this.model = model; }\n    public void start() { System.out.println(\"Engine \" + model + \" started\"); }\n}\n```",
                "https://www.youtube.com/embed/dQw4w9WgXcQ", null, 20, 1);

        Lesson l11_2 = new Lesson(c11, "Collections Framework & Generics",
                "Deep dive into ArrayList, LinkedList, HashMap, HashSet, TreeMap and performance characteristics.",
                "### Java Collections Hierarchy\n- `List`: Ordered collection with indexed access.\n- `Set`: Unique elements without duplicates.\n- `Map`: Key-Value mappings with fast O(1) hashing in `HashMap`.",
                "https://www.youtube.com/embed/dQw4w9WgXcQ", null, 30, 2);

        Lesson l11_3 = new Lesson(c11, "Functional Programming with Lambdas & Streams",
                "Modern Java: Stream pipelines, filter, map, reduce, collectors, and method references.",
                "### Java Stream API\n```java\nList<String> names = List.of(\"Verilog\", \"VHDL\", \"SystemVerilog\");\nList<String> filtered = names.stream()\n    .filter(s -> s.startsWith(\"System\"))\n    .map(String::toUpperCase)\n    .collect(Collectors.toList());\n```",
                "https://www.youtube.com/embed/dQw4w9WgXcQ", null, 25, 3);

        Lesson l11_4 = new Lesson(c11, "Building Enterprise REST APIs with Spring Boot & JPA",
                "Building production-grade REST APIs, dependency injection, Spring Data JPA repositories, and MySQL connectivity.",
                "### Spring Boot REST Controller\n```java\n@RestController\n@RequestMapping(\"/api/courses\")\npublic class CourseController {\n    @GetMapping\n    public List<Course> getCourses() { return courseService.findAll(); }\n}\n```",
                "https://www.youtube.com/embed/dQw4w9WgXcQ", null, 45, 4);

        // Lessons for Course 12: Python Programming
        Lesson l12_1 = new Lesson(c12, "Python Fundamentals, Types & Data Structures",
                "Variables, dynamic typing, lists, tuples, dictionaries, and set operations.",
                "### Python Data Structures\nPython provides built-in lists, tuples, dicts, and sets with intuitive syntax.\n```python\ncourses = [\"Verilog\", \"STA\", \"UVM\"]\ncourses.append(\"DFT\")\nprint(f\"Total courses: {len(courses)}\")\n```",
                "https://www.youtube.com/embed/dQw4w9WgXcQ", null, 20, 1);

        Lesson l12_2 = new Lesson(c12, "Functions, Generators & Decorators",
                "Advanced Python functions, closures, decorators, and memory-efficient generators.",
                "### Python Decorators\n```python\ndef log_execution(func):\n    def wrapper(*args, **kwargs):\n        print(f\"Running {func.__name__}\")\n        return func(*args, **kwargs)\n    return wrapper\n```",
                "https://www.youtube.com/embed/dQw4w9WgXcQ", null, 25, 2);

        // Lessons for Course 10: C Programming
        Lesson l10_1 = new Lesson(c10, "C Pointers & Memory Architecture",
                "Direct memory manipulation, pointer arithmetic, stack vs heap allocation.",
                "### Pointer Basics in C\n```c\nint x = 42;\nint *ptr = &x;\nprintf(\"Value: %d, Address: %p\\n\", *ptr, ptr);\n```",
                "https://www.youtube.com/embed/dQw4w9WgXcQ", null, 30, 1);

        Lesson l10_2 = new Lesson(c10, "Bitwise Operations & Hardware Register Mapping",
                "Setting, clearing, and toggling bits in hardware control registers.",
                "### Bitwise Manipulation for Embedded & VLSI\n```c\n#define SET_BIT(REG, BIT)   ((REG) |= (1U << (BIT)))\n#define CLEAR_BIT(REG, BIT) ((REG) &= ~(1U << (BIT)))\n#define TOGGLE_BIT(REG, BIT)((REG) ^= (1U << (BIT)))\n```",
                "https://www.youtube.com/embed/dQw4w9WgXcQ", null, 35, 2);

        lessonRepository.saveAll(Arrays.asList(
                l1_1, l1_2, l1_3, l1_4,
                l11_1, l11_2, l11_3, l11_4,
                l12_1, l12_2,
                l10_1, l10_2
        ));

        // 4. Create Quizzes & Questions
        // Quiz for Java Programming (matching the example in user prompt!)
        Quiz qJava = new Quiz(c11, "Java Basics & Enterprise Fundamentals", "Test your knowledge of Java class keywords, OOP concepts, collections, and streams.", 70, 15);
        quizRepository.save(qJava);

        Question qj1 = new Question(qJava, "Which keyword is used to create a class in Java?",
                "method", "class", "function", "object", "B",
                "The 'class' keyword is used to declare a class definition in Java.", 1);

        Question qj2 = new Question(qJava, "Which collection class maintains unique elements without guaranteed insertion order?",
                "ArrayList", "LinkedList", "HashSet", "Vector", "C",
                "HashSet is backed by a hash table and stores only unique elements without order guarantees.", 2);

        Question qj3 = new Question(qJava, "What is the return type of the Stream.filter() method in Java?",
                "boolean", "List", "Stream", "Optional", "C",
                "Stream.filter() is an intermediate operation that returns another Stream object for chaining.", 3);

        Question qj4 = new Question(qJava, "Which Spring annotation marks a class as a RESTful web controller?",
                "@Controller", "@RestController", "@Service", "@Repository", "B",
                "@RestController combines @Controller and @ResponseBody to return JSON/XML directly.", 4);

        questionRepository.saveAll(Arrays.asList(qj1, qj2, qj3, qj4));

        // Quiz for Verilog HDL
        Quiz qVerilog = new Quiz(c1, "Verilog RTL Design Assessment", "Assess your grasp of Verilog blocking vs non-blocking assignments, synthesis rules, and FSMs.", 70, 15);
        quizRepository.save(qVerilog);

        Question qv1 = new Question(qVerilog, "Which assignment operator MUST be used for synchronous edge-triggered registers in Verilog?",
                "=", "<=", ":=", "==", "B",
                "The non-blocking assignment '<=' ensures all registers update concurrently without simulation race conditions.", 1);

        Question qv2 = new Question(qVerilog, "What does the sensitivity list `always @(*)` signify in modern Verilog?",
                "Always trigger every clock cycle", "Trigger on any input signal change in the block", "Trigger only on reset", "Never trigger", "B",
                "`@(*)` automatically includes all read signals in the sensitivity list for combinational logic.", 2);

        Question qv3 = new Question(qVerilog, "In a Moore FSM, what do the outputs depend upon?",
                "Current state and current inputs", "Current state only", "Inputs only", "Clock frequency only", "B",
                "In a Moore machine, outputs are purely a function of the current state register.", 3);

        questionRepository.saveAll(Arrays.asList(qv1, qv2, qv3));

        // 5. Pre-seed Enrollments matching user's exact specification:
        // Student Rahul Sharma:
        // Enrolled Courses: 4
        // Courses In Progress: 2 (Java Programming @ 75%, C Programming @ 50%)
        // Completed Courses: 2 (Verilog HDL @ 100%, Python Basics @ 100%)

        // Completed 1: Verilog HDL (100%)
        Enrollment e1 = new Enrollment(studentRahul, c1);
        e1.setProgressPercentage(100);
        e1.setStatus("COMPLETED");
        e1.setCompletedAt(LocalDateTime.now().minusDays(5));
        enrollmentRepository.save(e1);

        // Mark all lessons completed for c1
        lessonProgressRepository.save(new LessonProgress(studentRahul, c1, l1_1));
        lessonProgressRepository.save(new LessonProgress(studentRahul, c1, l1_2));
        lessonProgressRepository.save(new LessonProgress(studentRahul, c1, l1_3));
        lessonProgressRepository.save(new LessonProgress(studentRahul, c1, l1_4));

        // Certificate for c1
        Certificate cert1 = new Certificate("STA-2026-CERT-88412", studentRahul, c1, "Distinction with Honors");
        cert1.setIssueDate(LocalDateTime.now().minusDays(5));
        certificateRepository.save(cert1);

        // Completed 2: Python Programming (100%)
        Enrollment e2 = new Enrollment(studentRahul, c12);
        e2.setProgressPercentage(100);
        e2.setStatus("COMPLETED");
        e2.setCompletedAt(LocalDateTime.now().minusDays(2));
        enrollmentRepository.save(e2);

        lessonProgressRepository.save(new LessonProgress(studentRahul, c12, l12_1));
        lessonProgressRepository.save(new LessonProgress(studentRahul, c12, l12_2));

        Certificate cert2 = new Certificate("STA-2026-CERT-94812", studentRahul, c12, "Distinction");
        cert2.setIssueDate(LocalDateTime.now().minusDays(2));
        certificateRepository.save(cert2);

        // In Progress 1: Java Programming (75% - completed 3 of 4 lessons)
        Enrollment e3 = new Enrollment(studentRahul, c11);
        e3.setProgressPercentage(75);
        e3.setStatus("ACTIVE");
        enrollmentRepository.save(e3);

        lessonProgressRepository.save(new LessonProgress(studentRahul, c11, l11_1));
        lessonProgressRepository.save(new LessonProgress(studentRahul, c11, l11_2));
        lessonProgressRepository.save(new LessonProgress(studentRahul, c11, l11_3));

        // In Progress 2: C Programming (50% - completed 1 of 2 lessons)
        Enrollment e4 = new Enrollment(studentRahul, c10);
        e4.setProgressPercentage(50);
        e4.setStatus("ACTIVE");
        enrollmentRepository.save(e4);

        lessonProgressRepository.save(new LessonProgress(studentRahul, c10, l10_1));

        // Reviews
        reviewRepository.save(new Review(studentRahul, c1, 5, "Outstanding coverage of RTL synthesis! The FIFO design lessons were industry-grade."));
        reviewRepository.save(new Review(studentRahul, c11, 5, "Clear and comprehensive Java concepts. Highly recommend Dr. Rajesh's Spring Boot section!"));
        reviewRepository.save(new Review(studentPriya, c4, 5, "The Static Timing Analysis and CTS modules are top notch!"));
    }
}
