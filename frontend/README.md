# 🌐 SemiconTech Academy - Standalone Frontend

This folder contains the complete, decoupled frontend application for **SemiconTech Academy LMS**.

---

## 📁 File Structure

```
frontend/
├── index.html          # Main single-page application (UI, Modals, Dashboards, Video Player)
├── css/
│   └── style.css       # Custom stylesheets & animations
├── js/
│   └── app.js          # Core client logic, API communication, Quizzes, Playlists & State
└── package.json        # Node.js npm scripts for running standalone
```

---

## 🚀 How to Run the Frontend Separately

The frontend is a lightweight, zero-build modern web application. You can run it on any static server or even open `index.html` directly:

### Option 1: Using Node.js / NPX
```bash
cd frontend
npx serve -l 3000 .
```
Then open: **`http://localhost:3000`**

### Option 2: Using Python
```bash
cd frontend
python -m http.server 3000
```
Then open: **`http://localhost:3000`**

### Option 3: VS Code Live Server
- Open the `frontend` folder in VS Code.
- Right click `index.html` -> **"Open with Live Server"**.

---

## 🔗 Backend Connectivity

The frontend automatically connects to the backend API:
- If hosted together with Spring Boot on port 8080: uses `/api`
- If hosted separately on port 3000 or elsewhere: automatically connects to **`http://localhost:8080/api`**

Make sure the Spring Boot backend is running on `http://localhost:8080` so database operations and authentication work seamlessly.
