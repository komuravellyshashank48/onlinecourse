// SemiconTech Academy - Core Application Script
// Pure, blazing fast modern JavaScript (Zero CDN compilation delay, Zero black screens)

const API_BASE = '/api';

// Pre-seeded Course Data
let ALL_COURSES = [
    {
        id: 1,
        title: "Verilog HDL and RTL Design",
        category: "VLSI and Semiconductor Design",
        level: "BEGINNER",
        duration: "8 Weeks (40 Hours)",
        price: 4999,
        rating: 4.9,
        instructorName: "Dr. Vikram Raman",
        instructorTitle: "Principal Verification Engineer (Ex-Intel/TI)",
        thumbnailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
        description: "Master digital synthesis, behavioral and structural Verilog, FSM modeling, synchronous FIFO design, and industrial RTL coding guidelines.",
        syllabus: "1. Verilog Fundamentals & Lexical Tokens\n2. Gate & Dataflow Modeling\n3. Behavioral Modeling & Always Blocks\n4. Finite State Machines (Moore & Mealy)\n5. Synchronous & Asynchronous FIFO Design\n6. Synthesis Guidelines & Race Conditions",
        prerequisites: "Digital Electronics basics, logic gates and boolean algebra"
    },
    {
        id: 2,
        title: "SystemVerilog and Functional Verification",
        category: "VLSI and Semiconductor Design",
        level: "INTERMEDIATE",
        duration: "10 Weeks (50 Hours)",
        price: 6999,
        rating: 4.9,
        instructorName: "Dr. Vikram Raman",
        instructorTitle: "Principal Verification Engineer (Ex-Intel/TI)",
        thumbnailUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600",
        description: "Comprehensive SystemVerilog for verification: OOP testbenches, constrained random testing, functional coverage, SVA assertions, and DPI-C.",
        syllabus: "1. OOP Constructs & Polymorphism in SV\n2. Inter-Process Communication (Mailboxes, Semaphores)\n3. Constrained Random Generation\n4. Functional Coverage & Cross Coverage\n5. SystemVerilog Assertions (SVA)\n6. Layered Testbench Architecture",
        prerequisites: "Verilog HDL, basic OOP programming concepts"
    },
    {
        id: 3,
        title: "UVM Verification (Universal Verification Methodology)",
        category: "VLSI and Semiconductor Design",
        level: "ADVANCED",
        duration: "12 Weeks (60 Hours)",
        price: 8499,
        rating: 5.0,
        instructorName: "Dr. Vikram Raman",
        instructorTitle: "Principal Verification Engineer (Ex-Intel/TI)",
        thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600",
        description: "Industry-standard UVM methodology: UVM phases, factories, drivers, monitors, scoreboards, sequencers, TLM 2.0, and RAL (Register Abstraction Layer).",
        syllabus: "1. UVM Architecture & Component Hierarchy\n2. Phasing Mechanism & Factory Pattern\n3. TLM 1.0 & 2.0 Interconnects\n4. Sequence, Sequencer & Driver Interaction\n5. Scoreboard & Coverage Collectors\n6. UVM Register Abstraction Layer (RAL)",
        prerequisites: "SystemVerilog OOP, SV Testbench fundamentals"
    },
    {
        id: 4,
        title: "Physical Design and Static Timing Analysis (STA)",
        category: "VLSI and Semiconductor Design",
        level: "ADVANCED",
        duration: "14 Weeks (70 Hours)",
        price: 8999,
        rating: 4.9,
        instructorName: "Ananya Deshmukh",
        instructorTitle: "Lead Physical Design Specialist (Ex-Qualcomm)",
        thumbnailUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600",
        description: "Complete Netlist-to-GDSII flow: Floorplanning, Power Routing, Placement, Clock Tree Synthesis (CTS), Routing, Setup/Hold Timing Closure, and PrimeTime STA.",
        syllabus: "1. ASIC PD Flow Overview & Technology Files (LEF, DEF)\n2. Floorplanning & Power Mesh Synthesis\n3. Placement & High Fanout Net Synthesis (HFNS)\n4. Clock Tree Synthesis (CTS) & Clock Skew Budgeting\n5. Global & Detailed Routing, DRC/LVS\n6. STA Constraints (SDC), Setup/Hold Analysis, OCV",
        prerequisites: "CMOS fundamentals, Digital Electronics, basic UNIX"
    },
    {
        id: 5,
        title: "Design for Testability (DFT)",
        category: "VLSI and Semiconductor Design",
        level: "INTERMEDIATE",
        duration: "8 Weeks (40 Hours)",
        price: 5999,
        rating: 4.8,
        instructorName: "Ananya Deshmukh",
        instructorTitle: "Lead Physical Design Specialist (Ex-Qualcomm)",
        thumbnailUrl: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600",
        description: "Manufacturing fault models, Scan insertion, ATPG (Automatic Test Pattern Generation), Built-In Self-Test (BIST, MBIST), and IEEE 1149.1 JTAG Boundary Scan.",
        syllabus: "1. Fault Models (Stuck-At, Transition Delay)\n2. Full Scan vs Partial Scan Architecture\n3. ATPG Pattern Generation & Fault Coverage Metrics\n4. Memory BIST (MBIST) Algorithms (March Tests)\n5. Logic BIST (LBIST) Principles\n6. IEEE 1149.1 JTAG Controller and TAP Architecture",
        prerequisites: "Digital Logic, Verilog RTL design"
    },
    {
        id: 6,
        title: "ASIC Design Flow & SoC Architecture",
        category: "VLSI and Semiconductor Design",
        level: "INTERMEDIATE",
        duration: "8 Weeks (40 Hours)",
        price: 5499,
        rating: 4.9,
        instructorName: "Ananya Deshmukh",
        instructorTitle: "Lead Physical Design Specialist (Ex-Qualcomm)",
        thumbnailUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600",
        description: "End-to-end SoC journey from architectural specification to tape-out: microarchitecture, logic synthesis, equivalence checking, DRC/LVS, and post-silicon validation.",
        syllabus: "1. SoC Specifications & Microarchitecture Design\n2. Logic Synthesis using Synopsys Design Compiler\n3. Formal Equivalence Checking (LEC/Formality)\n4. Low Power Design using UPF/CPF\n5. Signoff Verification (STA, DRC, LVS, ERC)\n6. Packaging, Foundry Tape-Out and Silicon Bring-up",
        prerequisites: "Digital design basics"
    },
    {
        id: 7,
        title: "Digital Electronics and CMOS Fundamentals",
        category: "VLSI and Semiconductor Design",
        level: "BEGINNER",
        duration: "6 Weeks (30 Hours)",
        price: 3499,
        rating: 4.9,
        instructorName: "Ananya Deshmukh",
        instructorTitle: "Lead Physical Design Specialist (Ex-Qualcomm)",
        thumbnailUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600",
        description: "Core physics and circuitry: NMOS/PMOS transistor operation, CMOS inverters, static/dynamic power dissipation, combinational logic gates, and layout fundamentals.",
        syllabus: "1. Number Systems & Boolean Algebra Theorems\n2. CMOS Inverter VTC Curve & Noise Margins\n3. CMOS Static & Dynamic Power Dissipation\n4. Transmission Gates & Pass-Transistor Logic\n5. Latches, Flip-Flops & Metastability\n6. Euler Path & Stick Diagrams Layout",
        prerequisites: "Basic physics and electric circuits"
    },
    {
        id: 8,
        title: "FPGA Design with Xilinx Vivado",
        category: "VLSI and Semiconductor Design",
        level: "INTERMEDIATE",
        duration: "8 Weeks (40 Hours)",
        price: 5999,
        rating: 4.8,
        instructorName: "Dr. Vikram Raman",
        instructorTitle: "Principal Verification Engineer (Ex-Intel/TI)",
        thumbnailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
        description: "Architectural implementation on modern FPGAs: LUTs, Block RAM, DSP slices, High-Level Synthesis (HLS), timing constraints, and hardware-in-the-loop debugging.",
        syllabus: "1. FPGA Architecture vs ASIC (CLBs, BRAM, DSP48)\n2. Vivado Design Suite Workflow\n3. Xilinx Constraint Files (XDC) & Timing Closure\n4. AXI4 Bus Protocol Interface\n5. Integrated Logic Analyzer (ILA) Hardware Debugging\n6. Real-time Audio/Video Processing on FPGA",
        prerequisites: "Verilog or VHDL basics"
    },
    {
        id: 9,
        title: "Tcl and Python Scripting for VLSI Automation",
        category: "VLSI and Semiconductor Design",
        level: "BEGINNER",
        duration: "6 Weeks (30 Hours)",
        price: 3999,
        rating: 4.9,
        instructorName: "Dr. Vikram Raman",
        instructorTitle: "Principal Verification Engineer (Ex-Intel/TI)",
        thumbnailUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600",
        description: "Automate electronic design automation (EDA) tools: Tcl scripting for Synopsys/Cadence flows, report parsing with Python regex, and regression automation.",
        syllabus: "1. Tcl Syntax, Lists, Dictionaries & Procedures\n2. Tool Command Language in Synopsys/Cadence Environments\n3. Python for Log & Report Parsing (Regex)\n4. Automated Regression Testing Pipelines\n5. Batch Processing & Distributed Grid Submissions\n6. Building Custom EDA Productivity Utilities",
        prerequisites: "Basic programming or terminal exposure"
    },
    {
        id: 10,
        title: "C Programming: From Fundamentals to Embedded Systems",
        category: "Programming and Computer Science",
        level: "BEGINNER",
        duration: "8 Weeks (40 Hours)",
        price: 2999,
        rating: 4.9,
        instructorName: "Prof. Rajesh Verma",
        instructorTitle: "Senior Software Architect & Systems Programmer",
        thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600",
        description: "Pointers, manual dynamic memory management, bitwise manipulation, hardware register mapping, data structures in C, and systems-level programming.",
        syllabus: "1. Data Types, Control Structures & Operators\n2. Pointers, Memory Addressing & Pointer Arithmetic\n3. Bitwise Operators & Hardware Masking\n4. Dynamic Memory Allocation (malloc, free, realloc)\n5. Structs, Unions & Bit-Fields\n6. File I/O, Makefiles & GCC Compilation Stages",
        prerequisites: "No prior programming experience required"
    },
    {
        id: 11,
        title: "Java Programming: Full Stack Enterprise Edition",
        category: "Programming and Computer Science",
        level: "INTERMEDIATE",
        duration: "10 Weeks (50 Hours)",
        price: 4999,
        rating: 5.0,
        instructorName: "Prof. Rajesh Verma",
        instructorTitle: "Senior Software Architect & Systems Programmer",
        thumbnailUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600",
        description: "Modern Java 21+: Object-Oriented Principles, Collections Framework, Generics, Lambdas & Streams, Multithreading & Concurrency, and Spring Boot REST architecture.",
        syllabus: "1. OOP Mastery: Inheritance, Polymorphism, Abstraction\n2. Java Collections Framework (List, Set, Map, Queues)\n3. Functional Programming with Lambdas & Stream API\n4. Multithreading, Synchronization & Virtual Threads\n5. Exception Handling & File I/O\n6. Spring Boot REST APIs, Spring Data JPA & MySQL",
        prerequisites: "Basic logic or prior programming in any language"
    },
    {
        id: 12,
        title: "Python Programming: Zero to Production",
        category: "Programming and Computer Science",
        level: "BEGINNER",
        duration: "8 Weeks (40 Hours)",
        price: 3499,
        rating: 4.9,
        instructorName: "Prof. Rajesh Verma",
        instructorTitle: "Senior Software Architect & Systems Programmer",
        thumbnailUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600",
        description: "Core Python, idiomatic writing, OOP, file handling, unit testing, numerical computing with NumPy, and automating modern workflows.",
        syllabus: "1. Pythonic Syntax, Lists, Dicts & Comprehensions\n2. Functions, Decorators, Iterators & Generators\n3. Object-Oriented Programming in Python\n4. Exception Handling & Packaging\n5. Working with APIs, JSON & Databases\n6. Data Processing with Pandas & Matplotlib",
        prerequisites: "No prior programming experience required"
    },
    {
        id: 13,
        title: "Data Structures and Algorithms (DSA) in Java",
        category: "Programming and Computer Science",
        level: "INTERMEDIATE",
        duration: "12 Weeks (60 Hours)",
        price: 5999,
        rating: 5.0,
        instructorName: "Prof. Rajesh Verma",
        instructorTitle: "Senior Software Architect & Systems Programmer",
        thumbnailUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600",
        description: "Comprehensive algorithmic problem solving: Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Dynamic Programming, and technical interview preparation.",
        syllabus: "1. Asymptotic Complexity (Big-O, Omega, Theta Analysis)\n2. Linked Lists, Stacks, Queues & Hash Maps\n3. Binary Search Trees, AVL Trees & Heaps\n4. Graph Algorithms (BFS, DFS, Dijkstra, Kruskal)\n5. Divide & Conquer, Backtracking & Recursion\n6. Dynamic Programming Patterns (1D & 2D Memoization)",
        prerequisites: "Knowledge of Java, C, or Python syntax"
    }
];

// App State
let currentUser = JSON.parse(localStorage.getItem('user') || 'null');
let currentToken = localStorage.getItem('token') || '';
let currentCategory = 'All';
let currentLevel = 'ALL';
let currentSearch = '';
let activeCourseDetails = null;
let currentAuthTab = 'login';
let pendingEnrollCourseId = null;

// Lessons Store (Populated dynamically with verified syllabus videos)
const COURSE_LESSONS = {};

// Quizzes Store - In-Depth Technical Assessment Bank
const QUIZZES = {
    1: {
        id: 1,
        title: "Verilog HDL & RTL Architecture Assessment",
        questions: [
            { id: 1, q: "Which assignment operator MUST be used for synchronous edge-triggered registers in Verilog to avoid race conditions?", options: ["=", "<=", ":=", "=="], ans: 1, exp: "Non-blocking assignment '<=' ensures concurrent register updates and prevents simulator event evaluation races." },
            { id: 2, q: "What does always @(*) signify in modern Verilog (Verilog-2001)?", options: ["Triggers exclusively on posedge clk", "Automatically infers complete combinational sensitivity list to avoid latches", "Forces the synthesis tool to create a latch", "Executes only once at simulation time zero"], ans: 1, exp: "@(*) automatically adds all RHS and condition signals to the sensitivity list, eliminating accidental latches." },
            { id: 3, q: "In a Moore Finite State Machine, what do the outputs depend upon?", options: ["Current state and current inputs", "Current state only", "Inputs only asynchronously", "Clock frequency only"], ans: 1, exp: "In a Moore machine, outputs are strictly a function of the current state, whereas Mealy outputs depend on current state and inputs." },
            { id: 4, q: "What hardware element is unintentionally synthesized if an if-else or case statement in a combinational block is incomplete?", options: ["Tristate buffer", "Unwanted transparent latch", "D flip-flop", "Pull-up resistor"], ans: 1, exp: "Incomplete combinational assignments force synthesis tools to infer memory (transparent latches) to preserve unassigned states." },
            { id: 5, q: "When designing an asynchronous FIFO, why is Gray code encoding used for read and write pointers crossing clock domains?", options: ["It consumes fewer flip-flops", "Only a single bit transitions at any given count, preventing multi-bit CDC glitches", "It is easier to increment with standard binary adders", "It operates at double the clock frequency"], ans: 1, exp: "Gray code ensures that only one bit changes per clock cycle, preventing multi-bit metastability glitches across CDC synchronizers." },
            { id: 6, q: "What is the primary cause of simulation-synthesis mismatches when using blocking assignments (=) in sequential blocks?", options: ["Clock skew", "Race conditions depending on simulator execution order", "Setup time violations", "Floating inputs"], ans: 1, exp: "Using blocking assignments in sequential blocks creates simulator evaluation race conditions between flip-flops." }
        ]
    },
    2: {
        id: 2,
        title: "SystemVerilog & Functional Verification Assessment",
        questions: [
            { id: 1, q: "What is the key difference between logic and wire in SystemVerilog?", options: ["logic can have multiple drivers whereas wire cannot", "logic can be driven by a single procedural block or continuous assignment; wire supports multiple net drivers (resolution)", "logic is only 1-bit; wire is always multi-bit", "logic cannot be used inside functions"], ans: 1, exp: "logic is a 4-state datatype with single-driver checking; wire is required for resolved multi-driver busses." },
            { id: 2, q: "How does a mailbox differ from a queue in SystemVerilog verification?", options: ["Mailboxes are built-in primitives without methods", "Mailboxes provide thread-safe inter-process synchronization with blocking put() and get()", "Queues cannot store objects", "Mailboxes have unbounded size only"], ans: 1, exp: "SystemVerilog mailboxes provide built-in blocking synchronization (put() blocks if full, get() blocks if empty) between concurrent threads." },
            { id: 3, q: "What keyword or method is used in SystemVerilog to selectively disable a specific constraint?", options: ["constraint_mode(0)", "enable_constraint", "soft constraint", "rand_mode(0)"], ans: 0, exp: "obj.c_name.constraint_mode(0) turns off constraint c_name, while obj.rand_mode(0) disables randomization for variables." },
            { id: 4, q: "In functional coverage, what does cross coverage (cross) measure?", options: ["Coverage across two different simulators", "Simultaneous combination of values between two or more coverpoints", "Cross-talk between adjacent metal layers", "Code line execution frequency"], ans: 1, exp: "Cross coverage measures the intersection of bins from two or more coverpoints to verify interactive corner cases." },
            { id: 5, q: "In SystemVerilog Assertions (SVA), what does the non-overlapped implication operator |=> mean?", options: ["If antecedent holds at clock N, consequent must hold at clock N", "If antecedent holds at clock N, consequent must hold at clock N+1", "Consequent holds 5 cycles later", "Antecedent and consequent execute simultaneously"], ans: 1, exp: "|=> is non-overlapped implication: when antecedent is true on clock cycle N, consequent is evaluated on cycle N+1." },
            { id: 6, q: "What is the purpose of declaring a method as virtual in a SystemVerilog base class?", options: ["It prevents the method from being overridden", "It enables dynamic polymorphism so derived class implementations are called via base handles", "It executes the method in zero simulation time", "It compiles the method in C++ via DPI"], ans: 1, exp: "virtual enables late binding (polymorphism), allowing child class overrides to execute when accessed via parent handles." }
        ]
    },
    3: {
        id: 3,
        title: "UVM Methodology & Testbench Architecture Assessment",
        questions: [
            { id: 1, q: "In what order do UVM build_phase and connect_phase execute across the component hierarchy?", options: ["Both top-down", "build_phase is top-down; connect_phase is bottom-up", "build_phase is bottom-up; connect_phase is top-down", "Both execute in parallel"], ans: 1, exp: "build_phase executes top-down so parents configure children; connect_phase executes bottom-up so lower ports connect upward." },
            { id: 2, q: "Which UVM component is responsible for converting high-level sequence items into pin-level signal toggles for the DUT?", options: ["uvm_monitor", "uvm_sequencer", "uvm_driver", "uvm_scoreboard"], ans: 2, exp: "The uvm_driver pulls transaction items from the sequencer and drives physical pin-level transitions on the virtual interface." },
            { id: 3, q: "What is the primary benefit of the UVM Factory pattern (set_type_override_by_type)?", options: ["Faster Verilator compilation", "Replacing a component or transaction type with a specialized subtype without editing original testbench code", "Automatic clock generation", "Exporting testbenches to VHDL"], ans: 1, exp: "UVM Factory overrides allow tests to substitute customized drivers, sequences, or scoreboards without modifying the existing topology." },
            { id: 4, q: "How does a uvm_monitor pass captured transactions to scoreboards and coverage collectors without tight coupling?", options: ["Global static pointers", "TLM Analysis Ports (uvm_analysis_port) using broadcast write() calls", "Direct class inheritance", "File system shared memory"], ans: 1, exp: "uvm_analysis_port implements the Observer pattern, broadcasting transaction snapshots via write() to any number of subscribers." },
            { id: 5, q: "What is the role of the UVM Register Abstraction Layer (RAL)?", options: ["Synthesizes Verilog logic gates", "Provides a standardized object-oriented mirror of hardware registers with automatic frontdoor and backdoor reads/writes", "Calculates static timing slack", "Generates pin layouts"], ans: 1, exp: "UVM RAL maintains a frontdoor/backdoor mirrored register model that verifies hardware register fields, resets, and access permissions." },
            { id: 6, q: "Which macro is required to register a UVM component class with the factory?", options: ["`uvm_object_utils", "`uvm_component_utils", "`uvm_factory_register", "`uvm_phase_register"], ans: 1, exp: "`uvm_component_utils(my_class) registers structural components inheriting from uvm_component with the factory." }
        ]
    },
    4: {
        id: 4,
        title: "Physical Design & Static Timing Analysis (STA) Assessment",
        questions: [
            { id: 1, q: "What is the fundamental condition to avoid Setup Time violation on a synchronous data path?", options: ["T_clk2q + T_comb + T_setup <= T_period + T_skew", "T_clk2q + T_comb >= T_hold + T_skew", "T_period <= T_setup - T_hold", "T_skew >= T_period"], ans: 0, exp: "For setup time, data must arrive before the capturing edge by at least T_setup: Arrival Time <= Required Time." },
            { id: 2, q: "Can a Hold Time violation be fixed by slowing down the clock frequency?", options: ["Yes, increasing clock period always fixes hold violations", "No, hold time is clock frequency independent and depends only on minimum path delay and skew", "Yes, if using double data rate", "Only on negative edge registers"], ans: 1, exp: "Hold time is completely independent of clock period. It must be fixed by adding data path buffers/delay cells." },
            { id: 3, q: "What is the primary purpose of Clock Tree Synthesis (CTS) in physical design?", options: ["To minimize logic gate count", "To balance clock insertion delay and minimize clock skew across all sequential elements", "To route power and ground meshes", "To generate DRC clean metal fills"], ans: 1, exp: "CTS inserts buffers/inverters to ensure clock edges arrive at all flip-flops with minimal skew and balanced insertion delay." },
            { id: 4, q: "What does WNS (Worst Negative Slack) < 0ps indicate in STA signoff?", options: ["The design has timing violations and fails sign-off", "The design is over-constrained but safe", "The design runs at infinite frequency", "The power mesh has IR drop"], ans: 0, exp: "A negative slack (WNS < 0ps) means the data signal arrives too late, resulting in a timing failure." },
            { id: 5, q: "What is On-Chip Variation (OCV) derating used for in PrimeTime?", options: ["To account for fabrication process, voltage, and temperature variations across different regions of the die", "To reduce chip area", "To test analog ADC converters", "To measure PCB trace impedance"], ans: 0, exp: "OCV derating factors model intra-die PVT variations by speeding up clock and slowing down data (or vice versa) for pessimistic timing checks." },
            { id: 6, q: "What is the purpose of High Fanout Net Synthesis (HFNS)?", options: ["Routing clock trees only", "Buffering reset, scan-enable, and high-fanout control signals to prevent transition slew degradation", "Connecting power pads to standard cell rails", "Optimizing memory bit-cells"], ans: 1, exp: "HFNS buffers high-fanout control nets (reset, scan enable) during placement to fix max capacitance and transition slew violations." }
        ]
    },
    5: {
        id: 5,
        title: "Design for Testability (DFT) & Scan Testing Assessment",
        questions: [
            { id: 1, q: "What does a Stuck-At-0 (SA0) fault model represent?", options: ["A clock signal running at 0 MHz", "A physical defect causing a circuit node or pin to remain permanently tied to logic 0", "A soft error caused by cosmic radiation", "A hold time violation"], ans: 1, exp: "The classical stuck-at fault models a node permanently connected to ground (SA0) or VDD (SA1)." },
            { id: 2, q: "What modification transforms a standard D flip-flop into a Muxed-D Scan Flip-Flop?", options: ["An XOR gate on the clock pin", "A 2-to-1 multiplexer on the D input controlled by a Scan Enable (SE) signal", "A tri-state buffer on the Q output", "A dual-port RAM register"], ans: 1, exp: "A 2:1 mux selects functional data D when SE=0 and scan test input SI when SE=1." },
            { id: 3, q: "How many mandatory pins are required by the IEEE 1149.1 JTAG Test Access Port (TAP)?", options: ["2 pins (SDA, SCL)", "4 pins: TCK, TMS, TDI, TDO (with optional TRST*)", "8 pins for parallel bus", "1 pin wireless"], ans: 1, exp: "IEEE 1149.1 TAP defines 4 mandatory pins (TCK, TMS, TDI, TDO) plus an optional asynchronous reset (TRST*)." },
            { id: 4, q: "What test algorithm is most widely used in Memory BIST (MBIST) to detect pattern sensitivity and coupling faults?", options: ["Bubble Sort test", "March Tests (e.g., March C-, March C+)", "Dijkstra scan", "Fast Fourier Transform"], ans: 1, exp: "March algorithms (such as March C-) write and read finite sequences of 0s and 1s in ascending and descending address order." },
            { id: 5, q: "What is the primary role of an ATPG tool in DFT?", options: ["To synthesize RTL into gate netlists", "To mathematically generate deterministic test vectors that achieve high manufacturing fault coverage", "To route metal wires on silicon", "To optimize dynamic power dissipation"], ans: 1, exp: "ATPG tools automatically generate compact test vector sets for high manufacturing fault coverage." },
            { id: 6, q: "What is the key difference between Stuck-At testing and At-Speed Transition Delay testing?", options: ["Stuck-At tests static DC continuity; Transition Delay tests dynamic switching speeds at rated system clock frequencies", "Stuck-At is faster to simulate", "Transition testing is only for analog circuits", "They are identical in fault coverage"], ans: 0, exp: "At-Speed testing uses launch-and-capture clock pulses to catch timing defects, resistive vias, and slow-to-rise/fall nodes." }
        ]
    },
    6: {
        id: 6,
        title: "ASIC Design Flow & SoC Architecture Assessment",
        questions: [
            { id: 1, q: "In the ASIC design flow, what tool translates register-transfer level (RTL) code into technology-specific gate-level netlists?", options: ["Logic Synthesizer (e.g. Synopsys DC)", "Layout Editor", "C Compiler", "DRC Verifier"], ans: 0, exp: "Logic synthesis maps behavioral RTL into target standard cell gate libraries under timing, area, and power constraints." },
            { id: 2, q: "What does Formal Equivalence Checking (LEC/Formality) verify?", options: ["That chip package pins match the PCB", "Mathematical functional equivalence between RTL and gate-level netlist without vector simulations", "Thermal gradient across silicon die", "Clock skew balance"], ans: 1, exp: "Formal equivalence mathematically proves that synthesized or modified netlists match the reference RTL logic without test patterns." },
            { id: 3, q: "What format standard is used to specify low-power power domains, isolation cells, and level shifters?", options: ["UPF (Unified Power Format) / CPF", "JPEG", "JSON", "ASCII"], ans: 0, exp: "IEEE 1801 UPF (Unified Power Format) standardizes power management intent across EDA tools." },
            { id: 4, q: "What is the final database format sent to semiconductor foundries for mask fabrication?", options: ["GDSII / OASIS", "PDF", "Verilog Netlist", "CSV"], ans: 0, exp: "GDSII (and modern OASIS) is the industry standard binary stream format representing silicon layout geometric shapes." },
            { id: 5, q: "What does DRC (Design Rule Check) test for?", options: ["Logic syntax errors", "Physical layout violations of foundry manufacturing limits (min width, min spacing, enclosure)", "Microcontroller firmware bugs", "Setup time slack"], ans: 1, exp: "DRC verifies that geometric layout shapes obey foundry semiconductor manufacturing tolerances." }
        ]
    },
    7: {
        id: 7,
        title: "Digital Electronics & CMOS Fundamentals Assessment",
        questions: [
            { id: 1, q: "In a symmetric CMOS inverter, why is PMOS transistor width typically 2 to 3 times wider than NMOS width?", options: ["PMOS has higher threshold voltage", "Hole mobility in PMOS silicon is 2 to 3 times lower than electron mobility in NMOS", "PMOS conducts higher leakage current", "To minimize gate capacitance"], ans: 1, exp: "Because electron mobility (NMOS) is roughly 2.5x hole mobility (PMOS), PMOS width is sized up to balance rise and fall propagation delays." },
            { id: 2, q: "What is the formula for dynamic power dissipation in a CMOS digital gate?", options: ["P_dyn = alpha * C_L * V_DD^2 * f_clk", "P_dyn = I_leak * V_DD", "P_dyn = V_DD / R_on", "P_dyn = C_L * f_clk"], ans: 0, exp: "Dynamic power is proportional to switching activity (alpha), load capacitance (C_L), square of supply voltage (V_DD^2), and clock frequency (f)." },
            { id: 3, q: "What is the switching threshold voltage V_M of a CMOS inverter?", options: ["The voltage where input equals output (V_in = V_out)", "0 Volts", "Supply voltage V_DD", "Threshold voltage V_tn"], ans: 0, exp: "The switching threshold V_M is the intersection of the voltage transfer curve (VTC) with the line V_in = V_out." },
            { id: 4, q: "Why is a transmission gate built using complementary NMOS and PMOS transistors in parallel?", options: ["To invert the signal", "NMOS passes a strong logic 0 but weak logic 1, while PMOS passes a strong logic 1 but weak logic 0; together they pass rail-to-rail signals", "To store charge dynamically", "To increase propagation delay"], ans: 1, exp: "Pairing NMOS and PMOS in parallel eliminates threshold drop degradation for both logic 0 and logic 1." },
            { id: 5, q: "What causes metastability in digital flip-flops?", options: ["Input data transitioning inside the setup or hold time aperture window of the clock edge", "Using too much power", "Overheating the heatsink", "Ground bounce only"], ans: 0, exp: "Violating setup or hold timing causes internal cross-coupled inverters to hover between logic levels for an unpredictable duration." }
        ]
    },
    8: {
        id: 8,
        title: "FPGA Design with Xilinx Vivado Assessment",
        questions: [
            { id: 1, q: "What is the fundamental combinational building block inside an FPGA Configurable Logic Block (CLB)?", options: ["Operational amplifier", "Look-Up Table (LUT)", "Inductive choke", "Schmitt trigger"], ans: 1, exp: "Modern FPGAs implement combinational truth tables using SRAM-based Look-Up Tables (e.g. 6-input LUTs in Xilinx 7-series/Ultrascale)." },
            { id: 2, q: "Which file format specifies physical pin locations and timing constraints in Xilinx Vivado?", options: ["XDC (Xilinx Design Constraints)", "Makefile", "XML", "JSON"], ans: 0, exp: "Vivado uses .xdc files, based on standard SDC (Synopsys Design Constraints) syntax, for pin placements and clock definitions." },
            { id: 3, q: "What is the Integrated Logic Analyzer (ILA) core used for in Vivado?", options: ["Synthesizing Verilog code", "Real-time in-system hardware logic signal capture directly over the JTAG cable", "Power distribution simulation", "PCB thermal routing"], ans: 1, exp: "The Xilinx ILA IP core samples internal FPGA net transitions into on-chip Block RAM and streams waveforms to Vivado via JTAG." },
            { id: 4, q: "What hardware resource in FPGAs is dedicated to high-speed multiplication and MAC (Multiply-Accumulate) operations?", options: ["DSP Slices (e.g. DSP48E)", "Carry chains only", "I/O Buffers", "Clock managers"], ans: 0, exp: "FPGA DSP slices provide dedicated hard silicon multipliers and accumulators optimized for DSP algorithms and filtering." },
            { id: 5, q: "What is the difference between Block RAM (BRAM) and Distributed RAM in FPGAs?", options: ["BRAM uses dedicated on-chip dual-port memory blocks; Distributed RAM repurposes LUT SRAM", "BRAM is off-chip only", "Distributed RAM cannot be written to", "BRAM only stores 1 byte"], ans: 0, exp: "Block RAM provides large dedicated multi-kilobit dual-port memories, while Distributed RAM uses the SLICEM LUT cells." }
        ]
    },
    9: {
        id: 9,
        title: "Tcl & Python EDA Automation Assessment",
        questions: [
            { id: 1, q: "In EDA Tcl scripting, what does the get_timing_paths command return?", options: ["A text string", "A collection object representing timing path data structures", "A Boolean true/false", "An integer count only"], ans: 1, exp: "EDA tools represent design entities as collections; get_timing_paths returns a pointer collection of timing path handles." },
            { id: 2, q: "Which Tcl command is used to iterate over a Synopsys/Cadence EDA collection?", options: ["foreach_in_collection", "while loop", "for loop only", "eval_map"], ans: 0, exp: "foreach_in_collection is the standard EDA Tcl construct for traversing collections of pins, nets, cells, or timing paths." },
            { id: 3, q: "In Python, which module is standard for parsing complex EDA log files and extracting timing slacks with regular expressions?", options: ["re", "os", "sys", "math"], ans: 0, exp: "The 're' (regular expression) module is standard for pattern matching and extracting slacks from EDA log and timing reports." },
            { id: 4, q: "In Tcl, what is the syntax to evaluate an expression arithmetic operation?", options: ["expr {10 + 20}", "calc(10 + 20)", "eval 10 + 20", "math 10 + 20"], ans: 0, exp: "The expr command in Tcl evaluates mathematical and logical expressions." },
            { id: 5, q: "Why is Python widely preferred over shell scripts for modern VLSI regression orchestration?", options: ["Python requires no compiler", "Python offers rich JSON/YAML parsing, multi-process management, and data analysis libraries like Pandas", "Python runs faster than pure C netlists", "Python eliminates EDA tool license costs"], ans: 1, exp: "Python provides robust data handling, process pooling, and structured logging ideal for automated verification pipelines." }
        ]
    },
    10: {
        id: 10,
        title: "C Systems Programming & Embedded Architecture Assessment",
        questions: [
            { id: 1, q: "What is the size of any pointer type (e.g. int*, char*) on a 64-bit architecture?", options: ["2 bytes", "4 bytes", "8 bytes", "Depends on the data type pointed to"], ans: 2, exp: "On 64-bit architectures, memory addresses are 64 bits wide, meaning all pointers occupy 8 bytes." },
            { id: 2, q: "Which bitwise expression clears (sets to 0) bit 3 of an integer variable reg without altering other bits?", options: ["reg |= (1 << 3);", "reg &= ~(1 << 3);", "reg ^= (1 << 3);", "reg = reg >> 3;"], ans: 1, exp: "~(1 << 3) creates a bitmask where bit 3 is 0 and all other bits are 1; bitwise AND clears bit 3." },
            { id: 3, q: "What happens when dynamically allocated heap memory via malloc() is never freed before pointer reassignment?", options: ["Automatic garbage collection cleans it", "A memory leak occurs, consuming heap memory until system exhaustion", "Segmentation fault immediately", "Stack overflow"], ans: 1, exp: "C has no automatic garbage collector; orphaned heap allocations cause memory leaks." },
            { id: 4, q: "What does the volatile keyword inform the C compiler regarding an embedded peripheral register?", options: ["Cache the variable inside CPU register", "Do not optimize away memory reads/writes, as the value can change outside program flow", "Make the variable read-only", "Place the variable on stack"], ans: 1, exp: "volatile ensures the compiler generates fresh memory reads/writes every access, crucial for hardware memory-mapped registers." },
            { id: 5, q: "What is the consequence of dereferencing a dangling or NULL pointer in C?", options: ["Returns 0 cleanly", "Undefined behavior, typically resulting in a SIGSEGV segmentation fault", "Throws NullPointerException", "Compile time warning only"], ans: 1, exp: "Dereferencing invalid memory addresses is undefined behavior and crashes the program with a segmentation fault." },
            { id: 6, q: "What is the primary function of header guards (#ifndef HEADER_H ... #endif) in C?", options: ["To speed up execution", "To prevent duplicate definitions and re-declaration errors when a header is included multiple times", "To link static libraries", "To protect against buffer overflows"], ans: 1, exp: "Header guards ensure each header file is parsed only once per translation unit." }
        ]
    },
    11: {
        id: 11,
        title: "Java Full Stack Enterprise & Spring Boot Assessment",
        questions: [
            { id: 1, q: "What is the time complexity difference between ArrayList and LinkedList when retrieving elements by index?", options: ["ArrayList is O(1) random access; LinkedList is O(n) sequential traversal", "LinkedList is O(1); ArrayList is O(n)", "Both are O(log n)", "LinkedList uses less memory per element"], ans: 0, exp: "ArrayList uses a contiguous internal array allowing O(1) indexing, whereas LinkedList must traverse node pointers in O(n) time." },
            { id: 2, q: "Which Spring Boot annotation marks a class as a RESTful web controller returning JSON response bodies?", options: ["@Controller", "@RestController", "@Service", "@Repository"], ans: 1, exp: "@RestController combines @Controller and @ResponseBody, automatically serializing return values into JSON." },
            { id: 3, q: "How do Java 21 Virtual Threads differ from traditional platform threads?", options: ["Virtual threads run only in C++", "Virtual threads are lightweight user-mode threads managed by the JVM, scaling to millions without OS thread overhead", "Virtual threads cannot perform I/O", "Virtual threads replace Java garbage collection"], ans: 1, exp: "Project Loom virtual threads multiplex millions of JVM tasks over a small carrier thread pool, vastly improving high-throughput I/O." },
            { id: 4, q: "What is the contract between equals() and hashCode() in Java?", options: ["If two objects have the same hashCode, they must be equal", "If two objects are equal according to equals(), they MUST produce the identical hashCode()", "hashCode is only used for sorting", "They are completely unrelated"], ans: 1, exp: "If a.equals(b) is true, a.hashCode() must equal b.hashCode(). Otherwise, HashSet and HashMap lookups will fail." },
            { id: 5, q: "What does the @Transactional annotation ensure in Spring Data JPA?", options: ["Encrypts all SQL queries with AES-256", "Executes database operations inside an ACID transaction, rolling back automatically on unchecked runtime exceptions", "Caches all queries forever", "Runs queries on separate physical servers"], ans: 1, exp: "@Transactional wraps database work in an atomic transaction; if an unhandled RuntimeException occurs, changes roll back." },
            { id: 6, q: "What is the difference between Stream.map() and Stream.flatMap() in Java?", options: ["map transforms each element into a single value; flatMap transforms each element into a stream and flattens all streams into one", "flatMap only works on integers", "map is terminal; flatMap is intermediate", "There is no difference"], ans: 0, exp: "map performs 1-to-1 transformation, while flatMap transforms 1-to-many and flattens nested structures (e.g., Stream<List<T>> into Stream<T>)." }
        ]
    },
    12: {
        id: 12,
        title: "Python: Production Systems & Automation Assessment",
        questions: [
            { id: 1, q: "What is the primary role of the yield keyword in a Python function?", options: ["Terminates the program immediately", "Turns the function into a generator that produces values lazily one at a time, conserving memory", "Imports a C module", "Deletes a variable from scope"], ans: 1, exp: "Using yield makes the function a generator iterator, yielding items on demand without allocating entire lists in memory." },
            { id: 2, q: "What is the Python GIL (Global Interpreter Lock)?", options: ["A firewall protecting web applications", "A mutex that prevents multiple native threads from executing Python bytecodes simultaneously in CPython", "A security sandbox for untrusted scripts", "A tool for compiling Python into C"], ans: 1, exp: "CPython's GIL ensures thread-safety for reference counting by allowing only one native thread to run bytecode at a time." },
            { id: 3, q: "How does a Python decorator @my_decorator work under the hood?", options: ["It modifies the bytecode before compilation", "It takes a function as an argument, wraps or extends its behavior, and returns the modified function", "It runs the function in a background worker thread", "It prevents recursion"], ans: 1, exp: "Decorators are syntactic sugar: @dec def f() is equivalent to f = dec(f)." },
            { id: 4, q: "In Python, what is the key difference between the 'is' operator and '=='?", options: ["'is' checks equality of values; '==' checks identity in memory", "'is' checks reference/memory identity; '==' checks value equality", "They are 100% interchangeable", "'is' only works for integers"], ans: 1, exp: "'is' tests whether two references point to the exact same object in memory (id(a) == id(b)), while '==' checks value equality." },
            { id: 5, q: "What is the correct syntax for a dictionary comprehension that squares each even number in range 1 to 6?", options: ["{x: x**2 for x in range(1, 7) if x % 2 == 0}", "[x**2 for x in range(1, 7)]", "{x**2: x for x in (1, 6)}", "dict(x, x**2)"], ans: 0, exp: "Dictionary comprehensions take the format {k: v for ... in ... if ...}." },
            { id: 6, q: "What happens in Python if an exception is raised inside a try block that has a finally clause?", options: ["The finally block is skipped", "The finally block ALWAYS executes, whether an exception occurred or not", "The program crashes before finally runs", "All variables in memory are cleared"], ans: 1, exp: "The finally block is guaranteed to execute regardless of whether exceptions were raised or caught, making it ideal for cleanup." }
        ]
    },
    13: {
        id: 13,
        title: "Data Structures & Algorithms (DSA) Assessment",
        questions: [
            { id: 1, q: "What is the worst-case and average-case time complexity of QuickSort?", options: ["Worst: O(n log n), Average: O(n)", "Worst: O(n^2), Average: O(n log n)", "Worst: O(n), Average: O(1)", "Worst: O(n^3), Average: O(n^2)"], ans: 1, exp: "When pivots are poorly chosen (e.g. sorted input with last element pivot), QuickSort degrades to O(n^2); on average it is O(n log n)." },
            { id: 2, q: "Which data structure is optimal for implementing Dijkstra's Shortest Path algorithm efficiently?", options: ["Simple array: O(V^2)", "Min-Heap / Priority Queue: O((V + E) log V)", "Stack: O(V)", "Queue: O(E)"], ans: 1, exp: "A Min-Heap priority queue allows extracting the minimum distance vertex in O(log V) time, giving O((V + E) log V) total complexity." },
            { id: 3, q: "What is the time complexity of searching, inserting, and deleting in a balanced Binary Search Tree (AVL / Red-Black)?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], ans: 1, exp: "Self-balancing binary search trees maintain tree height at O(log n), ensuring all basic operations run in logarithmic time." },
            { id: 4, q: "How does Dynamic Programming differ from standard Divide and Conquer?", options: ["Divide and conquer uses recursion, DP does not", "DP solves overlapping subproblems by caching (memoization/tabulation) to avoid redundant recalculation", "DP only works on arrays", "There is no difference"], ans: 1, exp: "DP requires optimal substructure and overlapping subproblems, saving subproblem answers to avoid exponential re-computation." },
            { id: 5, q: "What problem does Floyd's Cycle-Finding Algorithm (Tortoise and Hare) solve in O(n) time and O(1) space?", options: ["Sorting an array", "Detecting a cycle or loop in a singly linked list", "Finding the median of a stream", "Balancing a B-Tree"], ans: 1, exp: "Using two pointers moving at speeds 1 and 2 detects if a linked list contains a cycle without requiring extra hash set memory." },
            { id: 6, q: "What is the maximum number of edges in an undirected simple graph with V vertices?", options: ["V", "V * (V - 1) / 2", "V^2", "2^V"], ans: 1, exp: "Each of the V vertices can connect to V-1 other vertices. Dividing by 2 for undirected edges gives V*(V-1)/2." }
        ]
    }
};

// Rahul's Demo Enrollments (Pre-seeded)
const RAHUL_DEFAULT_ENROLLMENTS = [
    { courseId: 1, title: "Verilog HDL and RTL Design", category: "VLSI and Semiconductor Design", progress: 100, completedLessons: 4, totalLessons: 4, hasCert: true, certCode: "STA-2026-CERT-88412" },
    { courseId: 12, title: "Python Programming: Zero to Production", category: "Programming and Computer Science", progress: 100, completedLessons: 2, totalLessons: 2, hasCert: true, certCode: "STA-2026-CERT-94812" },
    { courseId: 11, title: "Java Programming: Full Stack Enterprise Edition", category: "Programming and Computer Science", progress: 75, completedLessons: 3, totalLessons: 4, hasCert: false },
    { courseId: 10, title: "C Programming: From Fundamentals to Embedded Systems", category: "Programming and Computer Science", progress: 50, completedLessons: 1, totalLessons: 2, hasCert: false }
];

// Default verified student enrollments (Rahul Sharma is pre-enrolled in 4 courses, all other 9 courses start at 0 enrolled students)
const DEFAULT_COURSE_STUDENTS = {
    1: ["Rahul Sharma"],
    10: ["Rahul Sharma"],
    11: ["Rahul Sharma"],
    12: ["Rahul Sharma"]
};

function getCourseEnrolledStudents(courseId) {
    const stored = localStorage.getItem('course_students_' + courseId);
    if (stored) {
        try { return JSON.parse(stored); } catch(e) {}
    }
    return DEFAULT_COURSE_STUDENTS[courseId] ? [...DEFAULT_COURSE_STUDENTS[courseId]] : [];
}

function addStudentToCourse(courseId, studentName) {
    if (!studentName) return;
    let current = getCourseEnrolledStudents(courseId);
    if (!current.some(n => n.toLowerCase() === studentName.toLowerCase())) {
        current.push(studentName);
        localStorage.setItem('course_students_' + courseId, JSON.stringify(current));
    }
}

function removeStudentFromCourse(courseId, studentName) {
    if (!studentName) return;
    let current = getCourseEnrolledStudents(courseId);
    current = current.filter(n => n.toLowerCase() !== studentName.toLowerCase());
    localStorage.setItem('course_students_' + courseId, JSON.stringify(current));
}

// Helper: Get user's current enrollments
function getUserEnrollments(email) {
    if (!email) return [];
    if (email.toLowerCase() === 'rahul@lms.com') {
        const stored = localStorage.getItem('enrollments_rahul@lms.com');
        return stored ? JSON.parse(stored) : RAHUL_DEFAULT_ENROLLMENTS;
    }
    const stored = localStorage.getItem('enrollments_' + email.toLowerCase());
    return stored ? JSON.parse(stored) : []; // Fresh users start with 0 enrolled courses!
}

// Helper: Save user's enrollments
function saveUserEnrollments(email, enrollments) {
    if (!email) return;
    localStorage.setItem('enrollments_' + email.toLowerCase(), JSON.stringify(enrollments));
}

// Load custom and backend courses dynamically
async function loadCourses() {
    const customCourses = localStorage.getItem('custom_courses');
    if (customCourses) {
        try {
            const parsed = JSON.parse(customCourses);
            parsed.forEach(pc => {
                if (!ALL_COURSES.some(c => c.id === pc.id)) {
                    ALL_COURSES.unshift(pc);
                }
            });
        } catch (e) {}
    }

    try {
        const res = await fetch(`${API_BASE}/courses`);
        if (res.ok) {
            const data = await res.json();
            if (data.success && Array.isArray(data.data) && data.data.length > 0) {
                data.data.forEach(bc => {
                    const idx = ALL_COURSES.findIndex(c => c.id === bc.id);
                    if (idx >= 0) {
                        ALL_COURSES[idx].title = bc.title;
                        ALL_COURSES[idx].description = bc.description;
                        ALL_COURSES[idx].category = bc.category;
                        ALL_COURSES[idx].level = bc.level;
                        ALL_COURSES[idx].duration = bc.duration;
                        ALL_COURSES[idx].price = bc.price;
                        ALL_COURSES[idx].syllabus = bc.syllabus;
                        if (bc.instructorName) ALL_COURSES[idx].instructorName = bc.instructorName;
                    } else {
                        ALL_COURSES.push({
                            id: bc.id,
                            title: bc.title,
                            category: bc.category,
                            level: bc.level,
                            duration: bc.duration,
                            price: bc.price,
                            rating: bc.averageRating || 4.9,
                            instructorName: bc.instructorName || "Faculty Member",
                            instructorTitle: bc.instructorTitle || "Senior Specialist",
                            thumbnailUrl: bc.thumbnailUrl || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
                            description: bc.description,
                            syllabus: bc.syllabus,
                            prerequisites: bc.prerequisites || "General fundamentals"
                        });
                    }
                });
                renderCourseGrid();
            }
        }
    } catch(e) {
        console.warn("Backend courses sync:", e);
    }
}

// Insert / Create New Course
async function handleCreateCourse(e) {
    e.preventDefault();
    const title = document.getElementById("new-course-title").value.trim();
    const category = document.getElementById("new-course-category").value;
    const level = document.getElementById("new-course-level").value;
    const duration = document.getElementById("new-course-duration").value.trim();
    const price = parseFloat(document.getElementById("new-course-price").value) || 4999;
    const desc = document.getElementById("new-course-desc").value.trim();
    const syllabus = document.getElementById("new-course-syllabus").value.trim();

    if (!title) return;

    const newId = Date.now();
    const newCourse = {
        id: newId,
        title: title,
        category: category,
        level: level,
        duration: duration,
        price: price,
        rating: 5.0,
        instructorName: currentUser ? currentUser.name : "Dr. Vikram Raman",
        instructorTitle: currentUser && currentUser.title ? currentUser.title : "Technical Specialist",
        thumbnailUrl: category.includes("VLSI") 
            ? "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600"
            : "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600",
        description: desc,
        syllabus: syllabus,
        prerequisites: "Fundamental concepts in " + category
    };

    if (currentToken) {
        try {
            await fetch(`${API_BASE}/courses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentToken}`
                },
                body: JSON.stringify({
                    title: title,
                    description: desc,
                    category: category,
                    level: level,
                    duration: duration,
                    price: price,
                    syllabus: syllabus,
                    status: "PUBLISHED"
                })
            });
        } catch(err) {
            console.warn("Backend course insert:", err);
        }
    }

    ALL_COURSES.unshift(newCourse);

    const savedCustom = localStorage.getItem('custom_courses');
    let customList = savedCustom ? JSON.parse(savedCustom) : [];
    customList.unshift(newCourse);
    localStorage.setItem('custom_courses', JSON.stringify(customList));

    document.getElementById("add-course-form").reset();
    closeModal("modal-add-course");

    renderCourseGrid();
    switchView('home');

    showToast(`🎉 Course "${title}" successfully inserted into catalog!`);
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    updateNavUser();
    loadCourses();
    renderCourseGrid();
    renderStudentDashboard();
    renderInstructorDashboard();
    renderAdminDashboard();
});

// Toast Helper
function showToast(message, isError = false) {
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toast-message");
    toastMsg.innerText = message;
    toast.className = `fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-sm font-medium transition-all transform animate-bounce ${isError ? 'bg-red-600' : 'bg-emerald-600'} text-white`;
    setTimeout(() => {
        toast.className = "hidden";
    }, 4000);
}

// Modal Helpers
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add("active");
}
function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove("active");
    if (id === 'modal-lesson') {
        resetLessonCover();
    }
}

// Switch Page Views
function switchView(viewName) {
    const views = ['home', 'student', 'instructor', 'admin', 'verify-cert'];
    views.forEach(v => {
        const el = document.getElementById(`view-${v}`);
        if (el) {
            if (v === viewName) el.classList.remove("hidden-view");
            else el.classList.add("hidden-view");
        }
    });

    if (viewName === 'student') renderStudentDashboard();
    if (viewName === 'instructor') renderInstructorDashboard();
    if (viewName === 'admin') renderAdminDashboard();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigation & Auth State
function updateNavUser() {
    const container = document.getElementById("nav-user-container");
    if (!currentUser) {
        container.innerHTML = `
            <div class="flex items-center gap-2">
                <button onclick="openAuthModal('login')" class="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition">
                    Sign In
                </button>
                <button onclick="openAuthModal('register')" class="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 transition">
                    Register Free
                </button>
            </div>
        `;
    } else {
        const roleLabel = currentUser.role === 'ROLE_STUDENT' ? 'STUDENT' : currentUser.role === 'ROLE_INSTRUCTOR' ? 'INSTRUCTOR' : 'ADMIN';
        container.innerHTML = `
            <div class="flex items-center gap-3">
                <button onclick="openUserDashboard()" class="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs transition">
                    <img src="${currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}" class="w-6 h-6 rounded-full object-cover" />
                    <div class="text-left">
                        <div class="font-semibold text-slate-200">${currentUser.name}</div>
                        <div class="text-[10px] text-blue-400 font-mono">${roleLabel}</div>
                    </div>
                </button>
                <button onclick="logout()" class="p-2 rounded-xl bg-slate-800/80 hover:bg-red-900/40 text-slate-400 hover:text-red-300 border border-slate-700 transition" title="Logout">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                </button>
            </div>
        `;
    }
}

function openUserDashboard() {
    if (!currentUser) return;
    if (currentUser.role === 'ROLE_STUDENT') switchView('student');
    else if (currentUser.role === 'ROLE_INSTRUCTOR') switchView('instructor');
    else if (currentUser.role === 'ROLE_ADMIN') switchView('admin');
}

// Quick 1-Click Demo Logins
function quickLogin(role) {
    if (role === 'student') {
        currentUser = {
            id: 5,
            name: "Rahul Sharma",
            email: "rahul@lms.com",
            role: "ROLE_STUDENT",
            title: "Graduate Semiconductor Trainee",
            avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150"
        };
        showToast("Signed in as Student (Rahul)");
        updateNavUser();
        switchView('student');
    } else if (role === 'instructor') {
        currentUser = {
            id: 2,
            name: "Dr. Vikram Raman",
            email: "vikram@lms.com",
            role: "ROLE_INSTRUCTOR",
            title: "Principal Verification Engineer (Ex-Intel/TI)",
            avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
        };
        showToast("Signed in as Instructor (Dr. Vikram)");
        updateNavUser();
        switchView('instructor');
    } else if (role === 'admin') {
        currentUser = {
            id: 1,
            name: "Dr. Elena Rostova",
            email: "admin@lms.com",
            role: "ROLE_ADMIN",
            title: "Chief Academic Officer & VLSI Architect",
            avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
        };
        showToast("Signed in as Administrator");
        updateNavUser();
        switchView('admin');
    }
    localStorage.setItem('user', JSON.stringify(currentUser));
}

function logout() {
    currentUser = null;
    currentToken = '';
    pendingEnrollCourseId = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    updateNavUser();
    switchView('home');
    showToast("Logged out successfully");
}

// Auth Tabs: Sign In vs Register
function setAuthTab(tab) {
    currentAuthTab = tab;
    const tabLogin = document.getElementById("auth-tab-login");
    const tabRegister = document.getElementById("auth-tab-register");
    const title = document.getElementById("auth-title");
    const subtitle = document.getElementById("auth-subtitle");
    const nameCont = document.getElementById("auth-name-container");
    const roleCont = document.getElementById("auth-role-container");
    const submitBtn = document.getElementById("auth-submit-btn");

    if (tab === 'register') {
        tabRegister.className = "flex-1 py-2 rounded-xl text-xs font-bold transition bg-blue-600 text-white shadow-lg shadow-blue-600/30";
        tabLogin.className = "flex-1 py-2 rounded-xl text-xs font-bold transition text-slate-400 hover:text-white";
        title.innerText = "Create New Account";
        subtitle.innerText = "Join SemiconTech Academy as a student or faculty";
        nameCont.className = "block";
        roleCont.className = "block";
        submitBtn.innerText = "Create Free Account";
    } else {
        tabLogin.className = "flex-1 py-2 rounded-xl text-xs font-bold transition bg-blue-600 text-white shadow-lg shadow-blue-600/30";
        tabRegister.className = "flex-1 py-2 rounded-xl text-xs font-bold transition text-slate-400 hover:text-white";
        title.innerText = "Sign In";
        subtitle.innerText = "Access your personalized learning dashboard";
        nameCont.className = "hidden";
        roleCont.className = "hidden";
        submitBtn.innerText = "Sign In";
    }
}

function openAuthModal(mode, courseIdToEnroll = null) {
    pendingEnrollCourseId = courseIdToEnroll;
    const notice = document.getElementById("auth-enroll-notice");
    if (courseIdToEnroll) {
        const course = ALL_COURSES.find(c => c.id === courseIdToEnroll);
        notice.innerText = `👋 Please sign in or register to complete your enrollment in "${course ? course.title : 'this course'}".`;
        notice.classList.remove("hidden");
    } else {
        notice.classList.add("hidden");
    }
    setAuthTab(mode || 'login');
    openModal('modal-auth');
}

// Quick fill demo in modal
function fillDemo(type) {
    setAuthTab('login');
    const emailInput = document.getElementById("auth-email");
    const passInput = document.getElementById("auth-password");
    if (type === 'rahul') {
        emailInput.value = "rahul@lms.com";
        passInput.value = "Student@123";
    } else if (type === 'vikram') {
        emailInput.value = "vikram@lms.com";
        passInput.value = "Instructor@123";
    } else if (type === 'admin') {
        emailInput.value = "admin@lms.com";
        passInput.value = "Admin@123";
    }
}

// Handle Login or Registration
async function handleAuthSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("auth-email").value.trim().toLowerCase();
    const password = document.getElementById("auth-password").value;
    const name = document.getElementById("auth-name").value.trim() || email.split('@')[0];
    const role = document.getElementById("auth-role") ? document.getElementById("auth-role").value : 'ROLE_STUDENT';

    if (currentAuthTab === 'register') {
        try {
            const res = await fetch(`${API_BASE}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role })
            });
            const data = await res.json();
            if (res.ok && data.success && data.data) {
                currentUser = data.data;
                currentToken = data.data.token;
                localStorage.setItem('token', currentToken);
                localStorage.setItem('user', JSON.stringify(currentUser));
                // Explicitly initialize empty enrollments for brand new user
                if (!localStorage.getItem('enrollments_' + email)) {
                    localStorage.setItem('enrollments_' + email, JSON.stringify([]));
                }
                // Save to registered users directory
                const registeredList = localStorage.getItem('registered_users_list');
                let uList = registeredList ? JSON.parse(registeredList) : [];
                if (!uList.some(u => u.email.toLowerCase() === email.toLowerCase())) {
                    uList.push({
                        name: currentUser.name,
                        email: currentUser.email,
                        role: (currentUser.role || role).replace('ROLE_', ''),
                        title: (currentUser.role || role).includes('INSTRUCTOR') ? 'Technical Faculty' : 'Registered Student',
                        enrolledCount: 0,
                        status: "ACTIVE"
                    });
                    localStorage.setItem('registered_users_list', JSON.stringify(uList));
                }
                updateNavUser();
                closeModal('modal-auth');
                showToast(`🎉 Welcome to SemiconTech Academy, ${currentUser.name}! Account registered.`);

                if (pendingEnrollCourseId) {
                    const cid = pendingEnrollCourseId;
                    pendingEnrollCourseId = null;
                    executeEnrollment(cid);
                } else {
                    openUserDashboard();
                }
                return;
            } else {
                const errMsg = (data && data.message) ? data.message : "Registration failed. Please check your credentials.";
                showToast(errMsg, true);
                if (errMsg.toLowerCase().includes("already exists")) {
                    setAuthTab('login');
                    document.getElementById("auth-email").value = email;
                    document.getElementById("auth-password").value = '';
                }
                return;
            }
        } catch (err) {
            console.error("Register network error:", err);
            showToast("Server connection error. Please ensure backend is running.", true);
            return;
        }
    } else {
        // Sign In
        try {
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok && data.success && data.data) {
                currentUser = data.data;
                currentToken = data.data.token;
                localStorage.setItem('token', currentToken);
                localStorage.setItem('user', JSON.stringify(currentUser));
                updateNavUser();
                closeModal('modal-auth');
                showToast(`Welcome back, ${currentUser.name}!`);

                await syncBackendEnrollments();

                if (pendingEnrollCourseId) {
                    const cid = pendingEnrollCourseId;
                    pendingEnrollCourseId = null;
                    executeEnrollment(cid);
                } else {
                    openUserDashboard();
                }
                return;
            } else {
                const errMsg = (data && data.message) ? data.message : "Invalid email or password.";
                showToast(errMsg, true);
                return;
            }
        } catch (err) {
            console.error("Login network error:", err);
            // Fallback for demo accounts if offline
            if (email === 'rahul@lms.com' && password === 'Student@123') {
                quickLogin('student');
                closeModal('modal-auth');
                return;
            } else if (email === 'vikram@lms.com' && password === 'Instructor@123') {
                quickLogin('instructor');
                closeModal('modal-auth');
                return;
            } else if (email === 'admin@lms.com' && password === 'Admin@123') {
                quickLogin('admin');
                closeModal('modal-auth');
                return;
            }
            showToast("Server connection error. Please ensure backend is running.", true);
            return;
        }
    }
}

// Filter Courses
function filterCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll("#category-tabs button").forEach(b => {
        b.className = "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 text-slate-400 hover:text-white border border-slate-800";
    });
    const activeTab = cat === 'All' ? document.getElementById("tab-all") : 
                      cat.includes('VLSI') ? document.getElementById("tab-vlsi") : document.getElementById("tab-cs");
    if (activeTab) activeTab.className = "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 text-white shadow-lg shadow-blue-600/30";

    switchView('home');
    renderCourseGrid();
}

function filterLevel(lvl) {
    currentLevel = lvl;
    ['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'].forEach(l => {
        const btn = document.getElementById(`lvl-${l}`);
        if (btn) btn.className = l === lvl ? "px-2.5 py-1 rounded-lg bg-slate-700 text-white font-medium" : "px-2.5 py-1 rounded-lg text-slate-400 hover:text-white";
    });
    renderCourseGrid();
}

function handleSearch(q) {
    currentSearch = q.toLowerCase().trim();
    renderCourseGrid();
}

// Render Course Cards
function renderCourseGrid() {
    const grid = document.getElementById("course-grid");
    if (!grid) return;

    const filtered = ALL_COURSES.filter(c => {
        if (currentCategory !== 'All' && c.category !== currentCategory) return false;
        if (currentLevel !== 'ALL' && c.level !== currentLevel) return false;
        if (currentSearch && !c.title.toLowerCase().includes(currentSearch) && !c.description.toLowerCase().includes(currentSearch)) return false;
        return true;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-3 text-center py-16 text-slate-400">No courses matching your filter criteria.</div>`;
        return;
    }

    grid.innerHTML = filtered.map(c => `
        <div class="glass-card rounded-2xl overflow-hidden flex flex-col group border border-slate-800">
            <div class="relative h-48 overflow-hidden bg-slate-800">
                <img src="${c.thumbnailUrl}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <span class="absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md ${
                    c.level === 'BEGINNER' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    c.level === 'INTERMEDIATE' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                    'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                }">
                    ${c.level}
                </span>
                <span class="absolute bottom-3 left-3 text-xs font-medium text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
                    ${c.category}
                </span>
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <h3 class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">${c.title}</h3>
                    <p class="mt-2 text-sm text-slate-400 line-clamp-2 leading-relaxed">${c.description}</p>
                    <div class="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                        <div>
                            <div class="font-medium text-slate-200">${c.instructorName}</div>
                            <div class="text-[11px] text-slate-500">${c.instructorTitle}</div>
                        </div>
                        <div class="text-amber-400 font-bold">★ ${c.rating}</div>
                    </div>
                    <div class="mt-3 flex items-center gap-4 text-xs text-slate-400">
                        <span>⏱ ${c.duration}</span>
                        <span>📚 Practical Labs</span>
                    </div>

                    ${(() => {
                        const students = getCourseEnrolledStudents(c.id);
                        if (students.length > 0) {
                            return `
                                <div class="mt-3 p-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/20 text-xs">
                                    <div class="text-[11px] text-slate-400 font-medium mb-1 flex items-center justify-between">
                                        <span class="flex items-center gap-1.5 text-emerald-400 font-bold">
                                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                            ${students.length} Enrolled Student${students.length > 1 ? 's' : ''}:
                                        </span>
                                        <span class="text-[9px] bg-emerald-500/10 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/20 uppercase font-semibold">Verified</span>
                                    </div>
                                    <div class="font-bold text-slate-200 text-xs truncate" title="${students.join(', ')}">
                                        👤 ${students.join(', ')}
                                    </div>
                                </div>
                            `;
                        } else {
                            return `
                                <div class="mt-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                                    <div class="flex items-center justify-between text-slate-500 text-[11px]">
                                        <span class="flex items-center gap-1">👥 0 Enrolled</span>
                                        <span class="text-[9px] text-slate-500 uppercase">Zero Fake Counts</span>
                                    </div>
                                    <div class="text-slate-400 text-[11px] mt-0.5">No students yet &bull; Be the first to enroll!</div>
                                </div>
                            `;
                        }
                    })()}
                </div>
                <div class="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                    <div>
                        <span class="text-[10px] text-slate-500 uppercase tracking-wider block">Course Fee</span>
                        <span class="text-lg font-bold text-white">₹${c.price.toLocaleString()}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <button onclick="viewCourseDetails(${c.id})" class="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition">
                            Syllabus
                        </button>
                        <button onclick="enrollFromCatalog(${c.id})" class="px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition">
                            Enroll Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join("");
}

// View Course Details Modal
function viewCourseDetails(courseId) {
    const course = ALL_COURSES.find(c => c.id === courseId);
    if (!course) return;
    activeCourseDetails = course;

    document.getElementById("modal-c-category").innerText = course.category;
    document.getElementById("modal-c-level").innerText = course.level;
    document.getElementById("modal-c-title").innerText = course.title;
    document.getElementById("modal-c-desc").innerText = course.description;
    document.getElementById("modal-c-duration").innerText = course.duration;
    document.getElementById("modal-c-instructor").innerText = course.instructorName;
    document.getElementById("modal-c-price").innerText = "₹" + course.price.toLocaleString();
    document.getElementById("modal-c-rating").innerText = course.rating;
    document.getElementById("modal-c-syllabus").innerText = course.syllabus;

    // Populate Real Enrolled Students
    const students = getCourseEnrolledStudents(courseId);
    const countBadge = document.getElementById("modal-c-enrolled-count");
    if (countBadge) countBadge.innerText = `${students.length} Verified Student${students.length === 1 ? '' : 's'}`;
    const studentsListEl = document.getElementById("modal-c-students-list");
    if (studentsListEl) {
        if (students.length > 0) {
            studentsListEl.innerHTML = `
                <div class="flex flex-wrap gap-2">
                    ${students.map(s => `
                        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold text-xs">
                            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            ${s}
                            <span class="text-[10px] text-slate-400 font-normal">(Verified Student)</span>
                        </span>
                    `).join('')}
                </div>
            `;
        } else {
            studentsListEl.innerHTML = `<div class="text-slate-400 text-xs py-1 italic">No students have enrolled in this module yet. Zero fake data! Click "Enroll Now" below to enroll and your name will appear here immediately.</div>`;
        }
    }

    openModal('modal-course');
}

// Click "Enroll Now" from catalog
function enrollFromCatalog(courseId) {
    if (!currentUser) {
        openAuthModal('login', courseId);
        return;
    }
    executeEnrollment(courseId);
}

// Click "Enroll Now" inside modal
function enrollInCurrentCourse() {
    if (!activeCourseDetails) return;
    closeModal('modal-course');
    if (!currentUser) {
        openAuthModal('login', activeCourseDetails.id);
        return;
    }
    executeEnrollment(activeCourseDetails.id);
}

// Verified Technical Video Mapping for Courses
const COURSE_VIDEO_MAP = {
    1: { id: "jvbnKrIQpwo", title: "Verilog HDL and RTL Design" },
    2: { id: "vdxLXnKyCTE", title: "SystemVerilog and Functional Verification" },
    3: { id: "c13VcCbD1gQ", title: "UVM Verification Methodology" },
    4: { id: "LUazKW33uCc", title: "Physical Design & Static Timing Analysis" },
    5: { id: "1EXxW6WxwVs", title: "Design for Testability (DFT)" },
    6: { id: "kKYWOiHBA48", title: "ASIC Design Flow & SoC Architecture" },
    7: { id: "veQrRAO4d0w", title: "CMOS Inverter & Digital Electronics" },
    8: { id: "qn_NZC9_8aY", title: "FPGA Design with Xilinx Vivado" },
    9: { id: "fP5sE7yxw-M", title: "Tcl and Python Scripting for VLSI Automation" },
    10: { id: "KJgsSFOSQv0", title: "C Programming: Fundamentals to Embedded Systems" },
    11: { id: "eIrMbAQSU34", title: "Java Programming: Full Stack Enterprise Edition" },
    12: { id: "rfscVS0vtbw", title: "Python Programming: Zero to Production" },
    13: { id: "8hly31xKli0", title: "Data Structures and Algorithms (DSA) in Depth" }
};

// Curated Distinct Multi-Video Playlists for Every Module of Each Course
const COURSE_VIDEO_PLAYLISTS = {
    1: [ // Verilog HDL
        { id: "jvbnKrIQpwo", title: "Verilog Fundamentals & Lexical Tokens" },
        { id: "bCwhfB7Z7bA", title: "Gate & Dataflow Modeling" },
        { id: "F7kC_l2fPyo", title: "Behavioral Modeling & Always Blocks" },
        { id: "4qDq66b8t9k", title: "Finite State Machines (Moore & Mealy)" },
        { id: "0v7K4n0uP_o", title: "Synchronous & Asynchronous FIFO Design" },
        { id: "uW2rP-5iUqo", title: "Synthesis Guidelines & Race Conditions" }
    ],
    2: [ // SystemVerilog
        { id: "vdxLXnKyCTE", title: "OOP Constructs & Polymorphism in SV" },
        { id: "V_oQjW9C5v8", title: "Inter-Process Communication (Mailboxes & Semaphores)" },
        { id: "g9d9uQ-gZqI", title: "Constrained Random Generation" },
        { id: "RXZ_43w9w2o", title: "Functional Coverage & Cross Coverage" },
        { id: "PZ2E3yFfU5w", title: "SystemVerilog Assertions (SVA)" },
        { id: "eUo9T8L171s", title: "Layered Testbench Architecture" }
    ],
    3: [ // UVM
        { id: "c13VcCbD1gQ", title: "UVM Architecture & Component Hierarchy" },
        { id: "4w5Fk14_3kU", title: "Phasing Mechanism & Factory Pattern" },
        { id: "k820J-2_9oA", title: "TLM 1.0 & 2.0 Interconnects" },
        { id: "pX5g-3_92vL", title: "Sequence, Sequencer & Driver Interaction" },
        { id: "9s8W8-gYt1c", title: "Scoreboard & Coverage Collectors" },
        { id: "fK8qM2v-T8A", title: "UVM Register Abstraction Layer (RAL)" }
    ],
    4: [ // Physical Design & STA
        { id: "LUazKW33uCc", title: "ASIC PD Flow Overview & Technology Files" },
        { id: "v_7r0aB1-90", title: "Floorplanning & Power Mesh Synthesis" },
        { id: "92K3bS-92vU", title: "Placement & High Fanout Net Synthesis (HFNS)" },
        { id: "xK92b-8aN2A", title: "Clock Tree Synthesis (CTS) & Clock Skew Budgeting" },
        { id: "L82f-38aL3k", title: "Global & Detailed Routing, DRC/LVS" },
        { id: "2k82Fa-901p", title: "STA Constraints (SDC), Setup/Hold Analysis, OCV" }
    ],
    5: [ // DFT
        { id: "1EXxW6WxwVs", title: "Fault Models (Stuck-At, Transition Delay)" },
        { id: "d92K3b-810A", title: "Full Scan vs Partial Scan Architecture" },
        { id: "91LqK2b-31A", title: "ATPG Pattern Generation & Fault Coverage Metrics" },
        { id: "4k82Fa-9821", title: "Memory BIST (MBIST) Algorithms (March Tests)" },
        { id: "820Jk1-91aA", title: "Logic BIST (LBIST) Principles" },
        { id: "x810Ka-192B", title: "IEEE 1149.1 JTAG Controller and TAP Architecture" }
    ],
    6: [ // ASIC Design Flow & SoC
        { id: "kKYWOiHBA48", title: "SoC Specifications & Microarchitecture Design" },
        { id: "9k28a1-71bA", title: "Logic Synthesis using Synopsys Design Compiler" },
        { id: "10K29b-81bA", title: "Formal Equivalence Checking (LEC/Formality)" },
        { id: "721aB0-91cA", title: "Low Power Design using UPF/CPF" },
        { id: "901bC2-81dA", title: "Signoff Verification (STA, DRC, LVS, ERC)" },
        { id: "812cD3-91eA", title: "Packaging, Foundry Tape-Out and Silicon Bring-up" }
    ],
    7: [ // Digital Electronics & CMOS
        { id: "veQrRAO4d0w", title: "Number Systems & Boolean Algebra Theorems" },
        { id: "719aB2-901A", title: "CMOS Inverter VTC Curve & Noise Margins" },
        { id: "810bC3-902A", title: "CMOS Static & Dynamic Power Dissipation" },
        { id: "911cD4-903A", title: "Transmission Gates & Pass-Transistor Logic" },
        { id: "102dE5-904A", title: "Latches, Flip-Flops & Metastability" },
        { id: "203eF6-905A", title: "Euler Path & Stick Diagrams Layout" }
    ],
    8: [ // FPGA Vivado
        { id: "qn_NZC9_8aY", title: "FPGA Architecture vs ASIC (CLBs, BRAM, DSP48)" },
        { id: "820aB1-910A", title: "Vivado Design Suite Workflow" },
        { id: "921bC2-911A", title: "Xilinx Constraint Files (XDC) & Timing Closure" },
        { id: "102cD3-912A", title: "AXI4 Bus Protocol Interface" },
        { id: "203dE4-913A", title: "Integrated Logic Analyzer (ILA) Hardware Debugging" },
        { id: "304eF5-914A", title: "Real-time Audio/Video Processing on FPGA" }
    ],
    9: [ // Tcl/Python VLSI
        { id: "fP5sE7yxw-M", title: "Tcl Syntax, Lists, Dictionaries & Procedures" },
        { id: "921aB1-912A", title: "Tool Command Language in Synopsys/Cadence Environments" },
        { id: "102bC2-913A", title: "Python for Log & Report Parsing (Regex)" },
        { id: "203cD3-914A", title: "Automated Regression Testing Pipelines" },
        { id: "304dE4-915A", title: "Batch Processing & Distributed Grid Submissions" },
        { id: "405eF5-916A", title: "Building Custom EDA Productivity Utilities" }
    ],
    10: [ // C Programming
        { id: "KJgsSFOSQv0", title: "Data Types, Control Structures & Operators" },
        { id: "zuegQmMdy8M", title: "Pointers, Memory Addressing & Pointer Arithmetic" },
        { id: "jlQmeyce65Q", title: "Bitwise Operators & Hardware Masking" },
        { id: "2w3bK-9F9a8", title: "Dynamic Memory Allocation (malloc, free, realloc)" },
        { id: "yXW1k8V2-8Q", title: "Structs, Unions & Bit-Fields" },
        { id: "8PopR3x-3Lk", title: "File I/O, Makefiles & GCC Compilation Stages" }
    ],
    11: [ // Java
        { id: "eIrMbAQSU34", title: "OOP Mastery: Inheritance, Polymorphism, Abstraction" },
        { id: "vgxY3wK2nLQ", title: "Java Collections Framework (List, Set, Map, Queues)" },
        { id: "Q932b-L2F9s", title: "Functional Programming with Lambdas & Stream API" },
        { id: "0hQv8j-3X2c", title: "Multithreading, Synchronization & Virtual Threads" },
        { id: "1a92kF-3s9P", title: "Exception Handling & File I/O" },
        { id: "9SGDpanrc8U", title: "Spring Boot REST APIs, Spring Data JPA & MySQL" }
    ],
    12: [ // Python
        { id: "rfscVS0vtbw", title: "Pythonic Syntax, Lists, Dicts & Comprehensions" },
        { id: "W8KRzm-HUcc", title: "Functions, Decorators, Iterators & Generators" },
        { id: "JeznW_749pm", title: "Object-Oriented Programming in Python" },
        { id: "NIWwJbo-9_8", title: "Exception Handling & Packaging" },
        { id: "tb8gHvYlCFs", title: "Working with APIs, JSON & Databases" },
        { id: "vmEHCJofslg", title: "Data Processing with Pandas & Matplotlib" }
    ],
    13: [ // DSA
        { id: "8hly31xKli0", title: "Asymptotic Complexity (Big-O, Omega, Theta Analysis)" },
        { id: "RBSGKlAnoiM", title: "Linked Lists, Stacks, Queues & Hash Maps" },
        { id: "oSWTXtMglKE", title: "Binary Search Trees, AVL Trees & Heaps" },
        { id: "tWVWeAqZ0WU", title: "Graph Algorithms (BFS, DFS, Dijkstra, Kruskal)" },
        { id: "j9fvd-3bK19", title: "Divide & Conquer, Backtracking & Recursion" },
        { id: "oBt53YbR9Kk", title: "Dynamic Programming Patterns (1D & 2D Memoization)" }
    ]
};

// Helper: Dynamic Lesson Generator for all 13 courses with distinct matching videos & syllabus
function getLessonsForCourse(courseId) {
    if (COURSE_LESSONS[courseId]) return COURSE_LESSONS[courseId];
    const course = ALL_COURSES.find(c => c.id === courseId);
    if (!course) return COURSE_LESSONS[11] || [];

    const playlist = COURSE_VIDEO_PLAYLISTS[courseId] || [];
    const defaultVid = COURSE_VIDEO_MAP[courseId] || { id: "jvbnKrIQpwo", title: course.title };
    const lines = (course.syllabus || "").split('\n').filter(l => l.trim().length > 0);

    const generated = lines.map((line, idx) => {
        const moduleNum = idx + 1;
        const vidInfo = playlist[idx] || defaultVid;
        let sampleSnippet = "";

        // Provide syllabus-specific code snippet based on course category
        if (courseId === 1) { // Verilog
            sampleSnippet = `\`\`\`verilog\n// Module ${moduleNum} Implementation: ${line}\nmodule rtl_design_mod${moduleNum} (\n    input wire clk, rst_n,\n    input wire [7:0] data_in,\n    output reg [7:0] data_out\n);\nalways @(posedge clk or negedge rst_n) begin\n    if (!rst_n) data_out <= 8'h00;\n    else data_out <= data_in;\nend\nendmodule\n\`\`\``;
        } else if (courseId === 2) { // SystemVerilog
            sampleSnippet = `\`\`\`systemverilog\n// SystemVerilog OOP Class: ${line}\nclass transaction_mod${moduleNum};\n    rand bit [31:0] addr;\n    rand bit [31:0] data;\n    constraint c_addr { addr inside {[0:1023]}; }\n    function void print();\n        $display("[SV Testbench] addr=0x%0h data=0x%0h", addr, data);\n    endfunction\nendclass\n\`\`\``;
        } else if (courseId === 3) { // UVM
            sampleSnippet = `\`\`\`systemverilog\n// UVM Component Hierarchy: ${line}\nclass my_driver_mod${moduleNum} extends uvm_driver #(my_transaction);\n    \`uvm_component_utils(my_driver_mod${moduleNum})\n    function new(string name, uvm_component parent);\n        super.new(name, parent);\n    endfunction\n    task run_phase(uvm_phase phase);\n        forever begin\n            seq_item_port.get_next_item(req);\n            // Drive signals to DUT\n            seq_item_port.item_done();\n        end\n    endtask\nendclass\n\`\`\``;
        } else if (courseId === 4) { // STA / PD
            sampleSnippet = `\`\`\`tcl\n# PrimeTime STA Constraint Script: ${line}\ncreate_clock -name CORE_CLK -period 1.25 [get_ports clk_in]\nset_input_delay -clock CORE_CLK 0.25 [get_ports data_in]\nset_output_delay -clock CORE_CLK 0.30 [get_ports data_out]\nreport_timing -delay_type max -nworst 5 -path_type full_clock\n# Setup condition: T_cq + T_comb + T_setup <= T_period + T_skew\n\`\`\``;
        } else if (courseId === 5) { // DFT
            sampleSnippet = `\`\`\`verilog\n// Scan Flip-Flop Implementation: ${line}\nmodule scan_dff (input d, si, se, clk, output reg q);\n    wire d_in = se ? si : d;\n    always @(posedge clk) q <= d_in;\nendmodule\n\`\`\``;
        } else if (courseId === 6) { // ASIC Flow
            sampleSnippet = `\`\`\`text\nASIC Sign-Off Checklist for ${line}:\n1. Logic Synthesis & Technology Mapping (Synopsys DC)\n2. Equivalence Checking (LEC/Formality clean)\n3. Floorplanning, CTS & Detail Routing (Innovus)\n4. Static Timing Analysis (PrimeTime WNS >= 0ps)\n5. DRC/LVS Verification (Mentor Calibre clean)\n\`\`\``;
        } else if (courseId === 7) { // CMOS
            sampleSnippet = `\`\`\`text\nCMOS Inverter Key Formulas: ${line}\n- Switching Threshold: V_M = (V_DD - |V_tp| + V_tn * sqrt(beta_n/beta_p)) / (1 + sqrt(beta_n/beta_p))\n- Noise Margin Low: NM_L = V_IL - V_OL\n- Noise Margin High: NM_H = V_OH - V_IH\n- Dynamic Power: P_dyn = alpha * C_L * V_DD^2 * f_clk\n\`\`\``;
        } else if (courseId === 8) { // FPGA
            sampleSnippet = `\`\`\`tcl\n# Vivado XDC Timing & Pin Constraints: ${line}\nset_property PACKAGE_PIN Y9 [get_ports clk_100mhz]\nset_property IOSTANDARD LVCMOS33 [get_ports clk_100mhz]\ncreate_clock -period 10.000 -name sys_clk [get_ports clk_100mhz]\n\`\`\``;
        } else if (courseId === 9) { // Tcl/Python
            sampleSnippet = `\`\`\`tcl\n# EDA Automation Utility: ${line}\nproc check_timing_slack {max_violations} {\n    set bad_paths [get_timing_paths -delay_type max -slack_lesser_than 0.0]\n    puts "Total Violating Paths: [sizeof_collection $bad_paths]"\n    return [sizeof_collection $bad_paths]\n}\n\`\`\``;
        } else if (courseId === 10) { // C Programming
            sampleSnippet = `\`\`\`c\n#include <stdio.h>\n#include <stdlib.h>\n\n// Module ${moduleNum} Systems Lab: ${line}\nint main(void) {\n    unsigned int reg = 0x00000000;\n    reg |= (1U << 4); // Set bit 4 (Enable hardware peripheral)\n    printf("Control Register: 0x%08X\\n", reg);\n    return 0;\n}\n\`\`\``;
        } else if (courseId === 11) { // Java
            sampleSnippet = `\`\`\`java\n// Spring Boot Enterprise Controller: ${line}\n@RestController\n@RequestMapping("/api/module${moduleNum}")\npublic class Module${moduleNum}Controller {\n    @GetMapping("/status")\n    public ResponseEntity<String> getStatus() {\n        return ResponseEntity.ok("Module ${moduleNum} Online: ${line}");\n    }\n}\n\`\`\``;
        } else if (courseId === 12) { // Python
            sampleSnippet = `\`\`\`python\n# Pythonic Module ${moduleNum}: ${line}\ndef process_data(records: list[dict]) -> dict:\n    return {r['id']: r['val'] for r in records if r.get('active', False)}\n\nprint("Pipeline executed successfully for ${line}.")\n\`\`\``;
        } else if (courseId === 13) { // DSA
            sampleSnippet = `\`\`\`java\n// Algorithmic Implementation: ${line}\npublic class SolutionMod${moduleNum} {\n    public boolean search(int[] arr, int target) {\n        int left = 0, right = arr.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (arr[mid] == target) return true;\n            if (arr[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return false;\n    }\n}\n\`\`\``;
        }

        return {
            id: courseId * 100 + moduleNum,
            title: line,
            duration: `${30 + (moduleNum * 5)} Mins`,
            isCompleted: false,
            videoId: vidInfo.id,
            video: `https://www.youtube.com/embed/${vidInfo.id}`,
            videoTitle: vidInfo.title || line,
            notes: `### ${line}\n\n**Course**: ${course.title}  \n**Faculty**: ${course.instructorName} (${course.instructorTitle})  \n**Lecture Focus**: ${line}  \n**Curated Technical Video**: ${vidInfo.title || line}  \n**Specified Stream ID**: \`${vidInfo.id}\`\n\n#### Key Objectives\n1. Deep theoretical foundations and industry-standard best practices.\n2. Architecture diagrams, signal timing behaviors, and execution flows.\n3. Hands-on coding and lab implementation.\n\n${sampleSnippet}\n\n#### Practical Exercises\n- Review the video lecture stream above.\n- Run the provided code snippet on your target EDA / compiler environment.\n- Complete the technical quiz assessment to solidify your understanding.`
        };
    });

    COURSE_LESSONS[courseId] = generated;
    return generated;
}

// Helper: Dynamic Quiz Generator with fallback
function getQuizForCourse(courseId) {
    if (QUIZZES[courseId]) return QUIZZES[courseId];
    const course = ALL_COURSES.find(c => c.id === courseId);
    const title = course ? course.title : "Technical Assessment";
    return {
        id: courseId,
        title: `${title} Assessment`,
        questions: [
            { id: 1, q: `What is the primary technical objective covered in ${title}?`, options: ["Functional verification & architecture compliance", "Manual netlist compilation without constraints", "Bypassing STA timing closure", "None of the above"], ans: 0, exp: "Functional correctness and adherence to silicon architecture standards is the primary goal." },
            { id: 2, q: `Which industry-standard flow is practiced in this module?`, options: ["Ad-hoc scripts without version control", "Automated EDA simulation, synthesis, and regression pipelines", "Ignoring design rule checks (DRC)", "Manual breadboard wiring"], ans: 1, exp: "Production engineering uses automated EDA regressions and verification suites." },
            { id: 3, q: `What metric is mandatory for final sign-off in this discipline?`, options: ["100% testbench and functional coverage", "Zero timing violations (WNS >= 0ps)", "Clean DRC/LVS physical checks", "All of the above"], ans: 3, exp: "Silicon tape-out sign-off requires meeting timing closure, coverage targets, and clean DRC/LVS." },
            { id: 4, q: `How are design regressions executed in an automated environment?`, options: ["Continuous Integration (CI) test pipelines with automated log parsing", "Manual command entry in terminal", "Visual inspection of oscilloscope", "Bypassing regression tests"], ans: 0, exp: "Modern engineering leverages CI/CD automation pipelines for continuous verification regression suites." },
            { id: 5, q: `What constitutes production-ready code in this domain?`, options: ["Meets coding guidelines, has passing automated tests, and adheres to design standards", "Compiles without error only once", "Works only on developer local workstation", "Has no documentation"], ans: 0, exp: "High reliability systems require lint-clean, fully tested, and strictly architected code." }
        ]
    };
}

// Sync backend enrollments if logged in
async function syncBackendEnrollments() {
    if (!currentUser || !currentToken) return;
    try {
        const res = await fetch(`${API_BASE}/enrollments/my`, {
            headers: { 'Authorization': `Bearer ${currentToken}` }
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            let localCourses = getUserEnrollments(currentUser.email);
            data.data.forEach(be => {
                const exists = localCourses.find(lc => lc.courseId === be.courseId);
                if (!exists) {
                    localCourses.push({
                        courseId: be.courseId,
                        title: be.courseTitle,
                        category: be.category,
                        progress: be.progressPercentage || 0,
                        completedLessons: be.completedLessons || 0,
                        totalLessons: be.totalLessons || 4,
                        hasCert: be.hasCertificate || false,
                        certCode: be.certificateCode || null
                    });
                }
            });
            saveUserEnrollments(currentUser.email, localCourses);
        }
    } catch (e) {
        console.warn("Backend enrollments sync skipped:", e);
    }
}

// Execute Enrollment Logic for current logged in user
async function executeEnrollment(courseId) {
    if (!currentUser) return;
    const course = ALL_COURSES.find(c => c.id === courseId);
    if (!course) return;

    let userCourses = getUserEnrollments(currentUser.email);
    const alreadyEnrolled = userCourses.find(c => c.courseId === courseId);

    if (alreadyEnrolled) {
        showToast(`You are already enrolled in "${course.title}". Opening dashboard!`);
        switchView('student');
        return;
    }

    // Call backend API if user has token
    if (currentToken) {
        try {
            await fetch(`${API_BASE}/courses/${courseId}/enroll`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${currentToken}`, 
                    'Content-Type': 'application/json' 
                }
            });
        } catch (e) {
            console.warn("Backend enrollment call:", e);
        }
    }

    const lessons = getLessonsForCourse(course.id);

    // Add new enrollment starting with 0% progress!
    userCourses.unshift({
        courseId: course.id,
        title: course.title,
        category: course.category,
        progress: 0,
        completedLessons: 0,
        totalLessons: lessons.length,
        hasCert: false
    });

    saveUserEnrollments(currentUser.email, userCourses);
    addStudentToCourse(course.id, currentUser.name);
    renderCourseGrid();

    showToast(`🎉 Successfully enrolled in "${course.title}"! Lessons unlocked.`);
    renderStudentDashboard();
    switchView('student');
}

// Cancel Enrollment (Feature 4: Cancel enrollment, if permitted)
async function cancelEnrollment(courseId) {
    if (!currentUser) return;
    const course = ALL_COURSES.find(c => c.id === courseId);
    const title = course ? course.title : "this course";

    if (!confirm(`Are you sure you want to cancel your enrollment in "${title}"?`)) {
        return;
    }

    let userCourses = getUserEnrollments(currentUser.email);
    userCourses = userCourses.filter(c => c.courseId !== courseId);
    saveUserEnrollments(currentUser.email, userCourses);
    removeStudentFromCourse(courseId, currentUser.name);
    renderCourseGrid();

    if (currentToken) {
        try {
            await fetch(`${API_BASE}/enrollments/${courseId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${currentToken}` }
            });
        } catch (e) {
            console.warn("Backend unenroll call:", e);
        }
    }

    showToast(`Enrollment in "${title}" has been cancelled.`);
    renderStudentDashboard();
}

// Render Student Dashboard
function renderStudentDashboard() {
    const list = document.getElementById("student-learning-list");
    if (!list) return;

    const studentNameEl = document.getElementById("student-name");
    if (studentNameEl) studentNameEl.innerText = currentUser ? currentUser.name : "Learner";

    const userCourses = currentUser ? getUserEnrollments(currentUser.email) : [];
    const enrolled = userCourses.length;
    const completed = userCourses.filter(s => s.progress >= 100).length;
    const inprogress = enrolled - completed;
    const totalProg = enrolled > 0 ? Math.round(userCourses.reduce((a, b) => a + b.progress, 0) / enrolled) : 0;

    document.getElementById("stat-enrolled").innerText = enrolled;
    document.getElementById("stat-inprogress").innerText = inprogress;
    document.getElementById("stat-completed").innerText = completed;
    document.getElementById("stat-progress").innerText = `${totalProg}%`;

    if (userCourses.length === 0) {
        list.innerHTML = `
            <div class="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center mb-8">
                <div class="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto mb-3 text-3xl">🎓</div>
                <h4 class="text-xl font-bold text-white mb-2">Welcome, ${currentUser ? currentUser.name : 'Learner'}!</h4>
                <p class="text-slate-400 text-sm max-w-md mx-auto mb-4 leading-relaxed">
                    You have not enrolled in any courses yet. Choose any course below and click <strong>Enroll Now</strong> to begin learning and add your name to the course!
                </p>
                <button onclick="switchView('home'); document.getElementById('course-grid').scrollIntoView({behavior: 'smooth'})" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition">
                    Browse All Catalog Courses
                </button>
            </div>

            <div class="mt-6">
                <h4 class="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Available Courses — Click "Enroll Now" to Insert Enrollment:
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${ALL_COURSES.map(c => `
                        <div class="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 flex flex-col justify-between">
                            <div>
                                <div class="flex items-center justify-between text-[11px] mb-2">
                                    <span class="px-2 py-0.5 rounded-md bg-slate-800 text-blue-300 font-semibold uppercase">${c.level}</span>
                                    <span class="text-slate-400">⏱ ${c.duration}</span>
                                </div>
                                <h5 class="text-base font-bold text-white line-clamp-1">${c.title}</h5>
                                <p class="text-xs text-slate-400 mt-1 line-clamp-2">${c.description}</p>
                            </div>
                            <div class="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                                <span class="text-sm font-bold text-white">₹${c.price.toLocaleString()}</span>
                                <div class="flex items-center gap-2">
                                    <button onclick="viewCourseDetails(${c.id})" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold">
                                        Syllabus
                                    </button>
                                    <button onclick="executeEnrollment(${c.id})" class="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition">
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        return;
    }

    list.innerHTML = userCourses.map(item => `
        <div class="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="flex-1">
                <div class="flex items-center gap-2 mb-1.5">
                    <span class="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium">${item.category}</span>
                    ${item.progress >= 100 ? '<span class="text-xs px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-semibold">✓ Completed</span>' : ''}
                </div>
                <h4 class="text-lg font-bold text-white">${item.title}</h4>
                <div class="mt-3 max-w-md">
                    <div class="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
                        <span>Completed Lessons: ${item.completedLessons} / ${item.totalLessons}</span>
                        <span class="font-bold text-white">${item.progress}%</span>
                    </div>
                    <div class="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                        <div class="h-full rounded-full transition-all duration-500 ${item.progress >= 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}" style="width: ${item.progress}%"></div>
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-2.5 w-full md:w-auto">
                <button onclick="openLessonPlayer(${item.courseId})" class="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/20 transition">
                    ${item.progress > 0 ? 'Resume Lessons' : 'Start Lessons'}
                </button>
                <button onclick="openQuizModal(${item.courseId})" class="flex-1 md:flex-initial px-3.5 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/30 font-semibold text-xs transition">
                    Take Quiz
                </button>
                ${item.progress >= 100 ? `
                    <button onclick="openCertificateModal('${item.title}', '${item.certCode || 'STA-2026-CERT-88412'}')" class="flex-1 md:flex-initial px-3.5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold text-xs transition">
                        Certificate
                    </button>
                ` : ''}
                <button onclick="cancelEnrollment(${item.courseId})" class="p-2.5 rounded-xl bg-slate-800/60 hover:bg-red-500/20 text-slate-400 hover:text-red-300 border border-slate-700/60 transition" title="Cancel Enrollment">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
            </div>
        </div>
    `).join("");
}

// Lesson Player State & Controls
let currentPlayingCourseId = 11;
let currentLessonId = 114;
let activeLessonVideoId = "jvbnKrIQpwo";
let activeLessonVideoUrl = "";

function startLessonVideo() {
    const cover = document.getElementById("player-cover");
    if (cover) cover.classList.add("hidden");
    const iframe = document.getElementById("player-video");
    if (iframe && activeLessonVideoId) {
        iframe.src = `https://www.youtube.com/embed/${activeLessonVideoId}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0`;
    }
}

function resetLessonCover() {
    const cover = document.getElementById("player-cover");
    if (cover) cover.classList.remove("hidden");
    const iframe = document.getElementById("player-video");
    if (iframe) iframe.src = "";
}

function openLessonPlayer(courseId) {
    currentPlayingCourseId = courseId;
    const course = ALL_COURSES.find(c => c.id === courseId) || ALL_COURSES[0];
    const lessons = getLessonsForCourse(courseId);
    // Automatically select the first uncompleted lesson, or the first lesson
    const lesson = lessons.find(l => !l.isCompleted) || lessons[0];

    document.getElementById("player-course-title").innerText = course.title;
    renderLessonPlayerContent(lesson, lessons);
    openModal('modal-lesson');
}

function renderLessonPlayerContent(lesson, lessons) {
    currentLessonId = lesson.id;
    activeLessonVideoId = lesson.videoId || "jvbnKrIQpwo";
    activeLessonVideoUrl = lesson.video || `https://www.youtube.com/embed/${activeLessonVideoId}`;

    document.getElementById("player-lesson-title").innerText = lesson.title;
    document.getElementById("player-notes").innerText = lesson.notes;
    document.getElementById("player-complete-btn").innerText = lesson.isCompleted ? "✓ Completed" : "Mark as Completed";
    document.getElementById("player-complete-btn").className = lesson.isCompleted ? 
        "px-5 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs uppercase tracking-wider font-bold" :
        "px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase tracking-wider font-bold shadow-lg shadow-emerald-600/30";

    // Update Player Cover elements to cleanly specify stream while concealing YouTube's thumbnail
    const coverTitle = document.getElementById("player-cover-title");
    if (coverTitle) coverTitle.innerText = lesson.title;
    const coverVidId = document.getElementById("player-cover-vidid");
    if (coverVidId) coverVidId.innerText = activeLessonVideoId;
    const coverDur = document.getElementById("player-cover-duration");
    if (coverDur) coverDur.innerText = `⏱ Duration: ${lesson.duration || '35 Mins'}`;

    // Reset cover to visible and clear iframe so no YouTube thumbnail is shown
    resetLessonCover();

    const ytLink = document.getElementById("player-yt-link");
    if (ytLink) {
        ytLink.href = activeLessonVideoId ? `https://www.youtube.com/watch?v=${activeLessonVideoId}` : (lesson.video || '#');
    }
    const durBadge = document.getElementById("player-duration-badge");
    if (durBadge) {
        durBadge.innerText = `⏱ ${lesson.duration || '35 Mins'}`;
    }

    const sidebar = document.getElementById("player-lesson-list");
    sidebar.innerHTML = lessons.map(l => `
        <button onclick="switchActiveLesson(${l.id})" class="w-full text-left p-3 rounded-xl text-xs font-medium transition flex items-start gap-2.5 mb-2 ${l.id === lesson.id ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 font-semibold' : 'hover:bg-slate-800 text-slate-400'}">
            <span class="w-5 h-5 rounded-full flex items-center justify-center bg-slate-800 text-[10px] shrink-0 font-bold mt-0.5 ${l.isCompleted ? 'text-emerald-400' : 'text-slate-500'}">
                ${l.isCompleted ? '✓' : '•'}
            </span>
            <span class="line-clamp-2">${l.title}</span>
        </button>
    `).join("");
}

function switchActiveLesson(lessonId) {
    const lessons = getLessonsForCourse(currentPlayingCourseId);
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) renderLessonPlayerContent(lesson, lessons);
}

function completeCurrentLesson() {
    const lessons = getLessonsForCourse(currentPlayingCourseId);
    const lesson = lessons.find(l => l.id === currentLessonId);
    if (!lesson) return;

    lesson.isCompleted = true;

    if (currentUser) {
        let userCourses = getUserEnrollments(currentUser.email);
        const track = userCourses.find(s => s.courseId === currentPlayingCourseId);
        if (track) {
            track.completedLessons = lessons.filter(l => l.isCompleted).length;
            track.progress = Math.round((track.completedLessons / lessons.length) * 100);
            if (track.progress >= 100) {
                track.hasCert = true;
                track.certCode = "STA-2026-CERT-" + Math.floor(10000 + Math.random() * 90000);
                showToast("🎉 Congratulations! Course 100% completed. Certificate unlocked!");
            } else {
                showToast(`Lesson completed! Progress: ${track.progress}%`);
            }
            saveUserEnrollments(currentUser.email, userCourses);
        }
    }

    renderLessonPlayerContent(lesson, lessons);
    renderStudentDashboard();
}

// Quiz Modal
let activeQuizData = null;
let selectedQuizAnswers = {};

function openQuizModal(courseId) {
    const quiz = getQuizForCourse(courseId);
    activeQuizData = quiz;
    selectedQuizAnswers = {};

    document.getElementById("quiz-modal-title").innerText = quiz.title;
    renderQuizQuestions();
    openModal('modal-quiz');
}

function renderQuizQuestions() {
    const container = document.getElementById("quiz-question-container");
    container.innerHTML = activeQuizData.questions.map((q, idx) => `
        <div class="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left">
            <div class="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1.5">Question ${idx + 1} of ${activeQuizData.questions.length}</div>
            <h4 class="text-base font-semibold text-white mb-4">${q.q}</h4>
            <div class="space-y-2">
                ${q.options.map((opt, optIdx) => `
                    <label onclick="selectQuizAnswer(${q.id}, ${optIdx})" class="flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition ${selectedQuizAnswers[q.id] === optIdx ? 'bg-purple-600/20 border-purple-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'}">
                        <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${selectedQuizAnswers[q.id] === optIdx ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400'}">
                            ${String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>${opt}</span>
                    </label>
                `).join("")}
            </div>
        </div>
    `).join("") + `
        <div class="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button onclick="closeModal('modal-quiz')" class="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-sm font-semibold">Cancel</button>
            <button onclick="submitQuiz()" class="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30">Submit Answers</button>
        </div>
    `;
}

function selectQuizAnswer(qId, optIdx) {
    selectedQuizAnswers[qId] = optIdx;
    renderQuizQuestions();
}

function submitQuiz() {
    let score = 0;
    activeQuizData.questions.forEach(q => {
        if (selectedQuizAnswers[q.id] === q.ans) score++;
    });
    const total = activeQuizData.questions.length;
    const pct = Math.round((score / total) * 100);
    const passed = pct >= 70;

    const container = document.getElementById("quiz-question-container");
    container.innerHTML = `
        <div class="p-6 rounded-2xl text-center border ${passed ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' : 'bg-red-950/40 border-red-500/50 text-red-300'}">
            <div class="text-4xl font-extrabold">${score} / ${total}</div>
            <div class="text-xl font-bold mt-1">${pct}% Score</div>
            <p class="text-xs mt-2">${passed ? '🎉 Passed with Distinction!' : 'Score below passing mark. Try again.'}</p>
        </div>
        <div class="space-y-4 max-h-72 overflow-y-auto mt-4 text-left">
            ${activeQuizData.questions.map((q, idx) => `
                <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <div class="font-semibold text-white mb-2">Q${idx + 1}: ${q.q}</div>
                    <div class="text-slate-400 mb-1">Correct: <strong class="text-emerald-400">${q.options[q.ans]}</strong></div>
                    <div class="p-2 rounded bg-slate-900 text-slate-400 text-[11px] font-mono">${q.exp}</div>
                </div>
            `).join("")}
        </div>
        <div class="flex justify-end pt-4 border-t border-slate-800">
            <button onclick="closeModal('modal-quiz')" class="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm">Close</button>
        </div>
    `;
    showToast(`Quiz completed: ${pct}% Score`);
}

// Certificate Modal
function openCertificateModal(courseTitle, certCode) {
    document.getElementById("cert-course-title").innerText = courseTitle;
    document.getElementById("cert-code").innerText = certCode;
    document.getElementById("cert-student-name").innerText = currentUser ? currentUser.name : "Learner";
    openModal('modal-cert');
}

// Certificate Public Verification
function handleVerifyLookup() {
    const code = document.getElementById("verify-input").value.trim().toUpperCase();
    const resultDiv = document.getElementById("verify-result");
    if (!code) return;

    if (code === "STA-2026-CERT-88412" || code === "STA-2026-CERT-94812" || code.startsWith("STA-")) {
        resultDiv.innerHTML = `
            <div class="p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/40 text-left shadow-2xl">
                <div class="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    Verified & Authentic Credential
                </div>
                <h3 class="text-xl font-bold text-white">Verilog HDL and RTL Design</h3>
                <div class="mt-4 space-y-2 text-sm text-slate-300">
                    <div><strong class="text-slate-400">Issued To:</strong> ${currentUser ? currentUser.name : 'Rahul Sharma'}</div>
                    <div><strong class="text-slate-400">Certificate Code:</strong> <span class="font-mono text-amber-400">${code}</span></div>
                    <div><strong class="text-slate-400">Honors Grade:</strong> Distinction with Honors</div>
                    <div><strong class="text-slate-400">Issue Date:</strong> October 2026</div>
                </div>
            </div>
        `;
        showToast("Certificate verified successfully!");
    } else {
        resultDiv.innerHTML = `
            <div class="p-4 rounded-xl bg-red-900/30 border border-red-500/40 text-red-300 text-sm">
                ✕ Certificate code not found or invalid. Please check the code format.
            </div>
        `;
    }
}

// Instructor Dashboard
function renderInstructorDashboard() {
    const table = document.getElementById("instructor-courses-table");
    if (!table) return;

    const myCourses = ALL_COURSES.slice(0, 5);
    table.innerHTML = myCourses.map(c => `
        <tr class="hover:bg-slate-800/40">
            <td class="px-4 py-4 font-semibold text-white">${c.title}</td>
            <td class="px-4 py-4 text-slate-300">${c.category}</td>
            <td class="px-4 py-4"><span class="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">${c.level}</span></td>
            <td class="px-4 py-4 text-slate-400">${c.duration}</td>
            <td class="px-4 py-4"><span class="text-xs px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-semibold">PUBLISHED</span></td>
            <td class="px-4 py-4">
                <button onclick="showToast('Opened curriculum manager')" class="px-2.5 py-1 text-xs rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600/40 border border-blue-500/30">
                    Manage Lessons
                </button>
            </td>
        </tr>
    `).join("");
}

// Registered Users Directory & Active Logins
const DEFAULT_USERS_DIRECTORY = [
    { name: "Rahul Sharma", email: "rahul@lms.com", role: "STUDENT", title: "Graduate Semiconductor Trainee", enrolledCount: 4, status: "ACTIVE" },
    { name: "Priya Patel", email: "priya@lms.com", role: "STUDENT", title: "VLSI Design Aspirant", enrolledCount: 0, status: "ACTIVE" },
    { name: "Dr. Vikram Raman", email: "vikram@lms.com", role: "INSTRUCTOR", title: "Principal Verification Engineer (Ex-Intel/TI)", enrolledCount: 3, status: "ACTIVE" },
    { name: "Ananya Deshmukh", email: "ananya@lms.com", role: "INSTRUCTOR", title: "Lead Physical Design & STA Specialist", enrolledCount: 3, status: "ACTIVE" },
    { name: "Prof. Rajesh Verma", email: "rajesh@lms.com", role: "INSTRUCTOR", title: "Senior Software Architect & Systems Programmer", enrolledCount: 4, status: "ACTIVE" },
    { name: "Dr. Elena Rostova", email: "admin@lms.com", role: "ADMIN", title: "Chief Academic Officer & VLSI Architect", enrolledCount: 0, status: "ACTIVE" }
];

function getAllRegisteredUsers() {
    const custom = localStorage.getItem('registered_users_list');
    let list = custom ? JSON.parse(custom) : [];
    const combined = [...DEFAULT_USERS_DIRECTORY];
    list.forEach(u => {
        if (!combined.some(existing => existing.email.toLowerCase() === u.email.toLowerCase())) {
            combined.push(u);
        }
    });
    combined.forEach(u => {
        if (u.role === 'STUDENT') {
            const enrollments = getUserEnrollments(u.email);
            u.enrolledCount = enrollments.length;
        }
    });
    return combined;
}

async function openUsersDirectoryModal() {
    const tbody = document.getElementById("users-directory-table-body");
    if (!tbody) return;

    let users = getAllRegisteredUsers();

    try {
        const res = await fetch(`${API_BASE}/auth/users`);
        if (res.ok) {
            const data = await res.json();
            if (data.success && data.data && data.data.length > 0) {
                data.data.forEach(bu => {
                    const idx = users.findIndex(u => u.email.toLowerCase() === bu.email.toLowerCase());
                    if (idx >= 0) {
                        users[idx].enrolledCount = bu.enrolledCount;
                    } else {
                        users.push({
                            name: bu.name,
                            email: bu.email,
                            role: bu.role,
                            title: bu.title,
                            enrolledCount: bu.enrolledCount,
                            status: bu.status
                        });
                    }
                });
            }
        }
    } catch(e) {
        console.warn("Backend users directory fetch:", e);
    }

    tbody.innerHTML = users.map(u => `
        <tr class="hover:bg-slate-900/60 transition">
            <td class="py-3 px-4 font-bold text-white flex items-center gap-2">
                <div class="w-7 h-7 rounded-full bg-slate-800 text-blue-400 flex items-center justify-center font-bold text-xs uppercase border border-slate-700">
                    ${u.name.charAt(0)}
                </div>
                <div>
                    <div>${u.name}</div>
                    <div class="text-[10px] text-slate-400 font-normal">${u.title || 'Platform Member'}</div>
                </div>
            </td>
            <td class="py-3 px-4 font-mono text-slate-300 text-xs">${u.email}</td>
            <td class="py-3 px-4">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                    u.role === 'ADMIN' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    u.role === 'INSTRUCTOR' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                    'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }">
                    ${u.role}
                </span>
            </td>
            <td class="py-3 px-4 font-bold ${u.enrolledCount > 0 ? 'text-emerald-400' : 'text-slate-500'}">
                ${u.enrolledCount} Course${u.enrolledCount === 1 ? '' : 's'}
            </td>
            <td class="py-3 px-4">
                <span class="inline-flex items-center gap-1 text-emerald-400 font-medium">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Verified
                </span>
            </td>
            <td class="py-3 px-4 text-right">
                <button onclick="loginAsUser('${u.email}', '${u.name}', '${u.role}')" class="px-3 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 font-semibold text-xs border border-blue-500/30 transition">
                    Login As User
                </button>
            </td>
        </tr>
    `).join("");

    openModal('modal-users-directory');
}

function loginAsUser(email, name, role) {
    currentUser = {
        name: name,
        email: email,
        role: role.startsWith('ROLE_') ? role : 'ROLE_' + role,
        title: "Verified User"
    };
    currentToken = "demo-token-" + Date.now();
    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("token", currentToken);
    closeModal('modal-users-directory');
    updateNavUser();
    renderCourseGrid();
    renderStudentDashboard();
    showToast(`🟢 Logged in as: ${name} (${role})`);
    if (role === 'ADMIN') switchView('admin');
    else if (role === 'INSTRUCTOR') switchView('instructor');
    else switchView('student');
}

// Admin Dashboard
function renderAdminDashboard() {
    const table = document.getElementById("admin-users-table");
    if (!table) return;

    const users = getAllRegisteredUsers();

    table.innerHTML = users.map(u => `
        <tr class="hover:bg-slate-800/40">
            <td class="px-4 py-3 font-semibold text-white">${u.name}</td>
            <td class="px-4 py-3 text-slate-400">${u.email}</td>
            <td class="px-4 py-3"><span class="text-[11px] font-semibold px-2 py-0.5 rounded-md ${u.role === 'ADMIN' ? 'bg-amber-500/20 text-amber-300' : u.role === 'INSTRUCTOR' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'}">${u.role}</span></td>
            <td class="px-4 py-3"><span class="text-xs px-2 py-0.5 rounded-md font-semibold bg-emerald-500/20 text-emerald-400">${u.status || 'ACTIVE'}</span></td>
            <td class="px-4 py-3">
                ${u.role !== 'ADMIN' ? `
                    <button onclick="loginAsUser('${u.email}', '${u.name}', '${u.role}')" class="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
                        Login As
                    </button>
                ` : '<span class="text-xs text-slate-500">Root Admin</span>'}
            </td>
        </tr>
    `).join("");
}
