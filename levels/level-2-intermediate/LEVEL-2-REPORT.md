# Cognifyz Technologies – Level 2 (Intermediate) Internship Submission Report
**Internship Program:** Full Stack Web Development  
**Level:** Level 2 – Intermediate  
**Tasks Completed:** Task 3 & Task 4  
**Project:** TaskFlow – Full Stack Task Management System  
**Author / Intern:** Full Stack Development Intern (vikast2849)  
**Date:** September 2026  
**Status:** Completed & 100% Verified  

---

## 1. Level Executive Summary
This submission package represents the complete implementation and verification of **Cognifyz Technologies Level 2 (Intermediate)** curriculum:
- **Task 3:** Advanced CSS Styling and Responsive Design
- **Task 4:** Complex Form Validation and Dynamic DOM Manipulation

The objective of Level 2 is to master modern responsive UI design, advanced CSS properties (CSS variables, glassmorphism, keyframe animations, micro-interactions), clean modular JavaScript (ES Modules), complex client-side validation (including real-time password complexity evaluation), dynamic DOM manipulation without page reload, and client-side Single Page Application (SPA) routing.

---

## 2. Task 3: Advanced CSS Styling & Responsive Design

### 2.1 Objectives & Requirements
1. Design and build a professional multi-section layout:
   - Sticky Navigation Bar with branding and mobile collapse toggle
   - Hero / Dashboard Section with sprint velocity summary
   - Task Statistics Section with 4 key metrics
   - Task Cards Grid with progress tracks, priority badges, and assignees
   - Accessible Footer with credits and copyright
2. Implement advanced CSS techniques:
   - CSS custom variables (`:root` design tokens)
   - Glassmorphism effects (`backdrop-filter: blur()`)
   - CSS Grid and Flexbox layouts
3. Add interactive hover effects and transitions (`transform: translateY(-5px)`).
4. Add keyframe animations (`fadeInScale` on hero entrance, `pulseGlow` on urgent priority).
5. Integrate Bootstrap 5 for responsive layout grid.
6. Ensure verified responsiveness across Desktop, Tablet, and Mobile.
7. Maintain WCAG AA accessibility, proper typographic hierarchy, and touch spacing.

### 2.2 Technical Implementation
- **Controller:** `server/controllers/task3Controller.js`
- **Stylesheet:** `public/css/task3.css`
- **View Template:** `views/tasks/task-3.ejs`
- **Route Endpoint:** `GET /tasks/task-3`
- **Architecture Highlights:**
  - Modern design system with GPU-accelerated transforms for 60fps animations.
  - Multi-tier breakpoint structure adapting dynamically from 1 column on mobile to 2 columns on tablet and 3 columns on desktop.

### 2.3 Verification Results
- All 5 sections render cleanly on desktop, tablet, and mobile.
- Custom stylesheet `public/css/task3.css` loads with verified keyframe animations and variables.

---

## 3. Task 4: Complex Form Validation & Dynamic DOM Manipulation

### 3.1 Objectives & Requirements
1. Implement complex client-side validation:
   - Email format validation using RFC 5322 regex pattern
   - Real-time password strength analyzer with a 3-tier visual progress bar
   - Evaluation of 5 password complexity criteria (length >= 8, uppercase, lowercase, numbers, special characters)
   - Password confirmation matching
2. Dynamically mutate the DOM based on user interaction:
   - Add new tasks directly into the DOM tree without reloading
   - Mark tasks as completed with visual strike-through and status toggles
   - Change task status (Pending → In Progress → Completed)
   - Delete tasks with smooth CSS exit animations
3. Real-time dynamic search and filter pills (All, Pending, In Progress, Completed).
4. Recalculate and display live task statistics reactively on every DOM mutation.
5. Implement client-side routing using the browser hash history API (`window.location.hash`).
6. Organize frontend code into clean ES Modules rather than a monolithic script.

### 3.2 Technical Implementation
- **Controller:** `server/controllers/task4Controller.js`
- **Modules (`public/js/task4/`):**
  - `validation.js`: Regex email, password match, and 5-tier password strength analyzer.
  - `taskManager.js`: DOM manipulation, card rendering, and reactive statistics engine.
  - `router.js`: Hash-based SPA routing (`#tasks`, `#create`, `#register-demo`, `#stats`).
  - `app.js`: Main orchestrator module binding DOM listeners.
- **Stylesheet:** `public/css/task4.css`
- **View Template:** `views/tasks/task-4.ejs`
- **Route Endpoint:** `GET /tasks/task-4`

### 3.3 Verification Results
- Password strength analyzer dynamically updates meter color and criteria checklist on input.
- Tasks are added, edited, filtered, searched, and deleted in the DOM tree with zero page refreshes.
- Hash router seamlessly transitions between views.

---

## 4. Key Files in Level 2
| File Path | Description |
|---|---|
| `server/controllers/task3Controller.js` | Responsive multi-section view controller for Task 3 |
| `public/css/task3.css` | Advanced CSS styling, glassmorphism, and keyframe animations |
| `views/tasks/task-3.ejs` | Task 3 responsive dashboard template |
| `public/js/task4/validation.js` | Password strength analyzer and validation module |
| `public/js/task4/taskManager.js` | In-memory DOM manager and live statistics engine |
| `public/js/task4/router.js` | Client-side hash routing module |
| `public/js/task4/app.js` | Task 4 application orchestrator |
| `public/css/task4.css` | Password strength meter bar and SPA transitions |
| `views/tasks/task-4.ejs` | Task 4 SPA interface template |
| `task-3/README.md` | Dedicated Level 2 Task 3 documentation |
| `task-4/README.md` | Dedicated Level 2 Task 4 documentation |
| `tests/test_task3.js` | Automated test suite for Task 3 |
| `tests/test_task4.js` | Automated test suite for Task 4 |

---

## 5. How to Run & Test Level 2
```powershell
# 1. Start the server
npm start

# 2. Test Task 3 in browser:
# http://localhost:3000/tasks/task-3

# 3. Test Task 4 in browser:
# http://localhost:3000/tasks/task-4

# 4. Run automated tests for Level 2:
node tests/test_task3.js
node tests/test_task4.js
```

---

## 6. Level 2 Portal Submission Summary
*(Copy and paste into Cognifyz Submission Form for Level 2)*

```text
================================================================================
COGNIFYZ TECHNOLOGIES INTERNSHIP - LEVEL 2 (INTERMEDIATE) SUBMISSION
================================================================================
Student Name        : Full Stack Development Intern (vikast2849)
Internship Domain   : Full Stack Web Development
Level               : Level 2 – Intermediate (Tasks 3 & 4 Completed)
Project Name        : TaskFlow – Full Stack Task Management System
GitHub Repository   : https://github.com/vikast2849/taskflow
Routes              : /tasks/task-3, /tasks/task-4

Summary of Accomplishments:
1. Task 3 (Advanced CSS & Responsive Design):
   - Created professional 5-section layout: Navbar, Hero, Stats, Task Cards, Footer.
   - Built custom CSS design system with CSS variables, glassmorphism, and keyframe animations.
   - Verified seamless responsive layout on Desktop, Tablet, and Mobile using Bootstrap 5.

2. Task 4 (Complex Validation & Dynamic DOM SPA):
   - Implemented real-time password strength analyzer checking 5 security criteria with live progress bar.
   - Built dynamic DOM task manager handling add, complete, status toggle, and animated delete without page reloads.
   - Added real-time text searching, priority/status filtering, and reactive live stats calculation.
   - Implemented client-side hash routing (#tasks, #create, #register-demo, #stats) using clean ES modules.
================================================================================
```
