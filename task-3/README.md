# Task 3: Advanced CSS Styling and Responsive Design
**Cognifyz Technologies Full Stack Development Internship – Level 2 (Intermediate)**

---

## Objective
Enhance CSS styling, build a professional multi-section layout with animations and transitions, integrate Bootstrap 5, and ensure flawless responsiveness across mobile, tablet, and desktop viewports.

## Requirements Satisfied
1. **Professional Multi-Section Layout**:
   - Navigation Bar with sticky position, branding, and mobile hamburger collapse.
   - Hero / Dashboard Section featuring dark linear gradients, sprint velocity summary, and call-to-actions.
   - Task Statistics Section displaying 4 key metrics with responsive layout and animated metric cards.
   - Task Cards Grid presenting priority badges, status bars, progress tracks, assignees, and due dates.
   - Semantic Accessible Footer with responsive copyright and internship quick links.
2. **Advanced CSS Properties**:
   - CSS Variables (`:root` design tokens for colors, shadows, and radii).
   - Glassmorphism effects with `backdrop-filter: blur()`.
   - CSS Grid and Flexbox for precision element alignment.
3. **Hover Effects and Transitions**:
   - Interactive card elevation (`transform: translateY(-5px)`).
   - Smooth timing functions (`cubic-bezier(0.4, 0, 0.2, 1)`).
   - Stat icon scale and rotation on hover (`transform: scale(1.1) rotate(5deg)`).
4. **Subtle Keyframe Animations**:
   - `@keyframes fadeInScale` on hero entrance.
   - `@keyframes pulseGlow` highlighting urgent priority tasks.
5. **Bootstrap 5 Framework**:
   - Utilizes Bootstrap 5 grid (`col-12 col-md-6 col-lg-4`), modals, badges, and utility classes.
6. **Device Responsiveness**:
   - Fully tested and verified across Desktop (>1024px), Tablet (768px–1024px), and Mobile (<768px).
7. **Accessibility & Visual Hierarchy**:
   - Complies with WCAG AA color contrast, ARIA roles, semantic landmarks, and clear typography.

## Endpoints
- `GET /tasks/task-3`: Serves the advanced responsive styling showcase.

## File Map
- **Controller**: `server/controllers/task3Controller.js`
- **View Template**: `views/tasks/task-3.ejs`
- **Stylesheet**: `public/css/task3.css`
- **Route**: Mounted in `server/routes/taskRoutes.js` at `/tasks/task-3`
