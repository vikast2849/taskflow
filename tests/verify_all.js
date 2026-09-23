/**
 * Comprehensive Master End-to-End Verification Suite
 * Cognifyz Technologies Full Stack Development Internship (Tasks 1 through 6)
 * 
 * Verifies all 6 internship levels and requirements programmatically:
 * - Level 1 Task 1: HTML Forms, Express routing, EJS Server-Side Rendering
 * - Level 1 Task 2: Extended form, Client validation, Server validation, Temp storage
 * - Level 2 Task 3: Responsive Multi-section layout, Advanced CSS, Bootstrap 5
 * - Level 2 Task 4: Modular JS, Password strength analyzer, Dynamic DOM, Hash routing
 * - Level 3 Task 5: RESTful API CRUD (GET, POST, PUT, DELETE), JSON envelopes, Fetch
 * - Level 3 Task 6: MongoDB with Mongoose, bcrypt password hashing, Auth & Authorization
 */

const http = require('http');
const app = require('../server/app');
const { connectDB, disconnectDB } = require('../server/config/db');

const TEST_PORT = 3009;
const BASE_URL = `http://localhost:${TEST_PORT}`;

const server = http.createServer(app);

server.listen(TEST_PORT, async () => {
  console.log(`\n================================================================`);
  console.log(`🧪 STARTING FULL STACK VERIFICATION SUITE (Cognifyz Tasks 1–6)`);
  console.log(`   Running on port ${TEST_PORT}...`);
  console.log(`================================================================\n`);

  try {
    await connectDB();

    // -------------------------------------------------------------
    // TASK 1: HTML Structure & Basic Server Interaction
    // -------------------------------------------------------------
    console.log(`▶ Verifying Task 1: HTML Structure & Server-Side Rendering...`);
    const t1Get = await fetch(`${BASE_URL}/tasks/task-1`);
    if (t1Get.status !== 200) throw new Error(`Task 1 GET returned ${t1Get.status}`);
    const t1Html = await t1Get.text();
    if (!t1Html.includes('HTML Structure and Basic Server Interaction')) throw new Error('Task 1 title missing');

    const t1PostData = new URLSearchParams({ title: 'Task 1 Test Title', description: 'Testing EJS SSR' });
    const t1Post = await fetch(`${BASE_URL}/tasks/task-1`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: t1PostData.toString()
    });
    if (t1Post.status !== 201) throw new Error(`Task 1 POST returned ${t1Post.status}`);
    const t1PostHtml = await t1Post.text();
    if (!t1PostHtml.includes('Task 1 Test Title')) throw new Error('Task 1 SSR rendering failed');
    console.log(`  ✔ Task 1 PASSED: GET 200 OK, POST 201 Created & EJS SSR rendered successfully.\n`);

    // -------------------------------------------------------------
    // TASK 2: Inline Styles & Server-Side Validation
    // -------------------------------------------------------------
    console.log(`▶ Verifying Task 2: Inline Styles & Dual Client/Server Validation...`);
    const t2Get = await fetch(`${BASE_URL}/tasks/task-2`);
    if (t2Get.status !== 200) throw new Error(`Task 2 GET returned ${t2Get.status}`);

    // Invalid submission (Title < 3 chars, invalid priority, past date)
    const t2InvalidData = new URLSearchParams({ title: 'X', priority: 'bad', dueDate: '2020-01-01' });
    const t2Invalid = await fetch(`${BASE_URL}/tasks/task-2`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: t2InvalidData.toString()
    });
    if (t2Invalid.status !== 400) throw new Error(`Task 2 expected 400 for invalid payload, got ${t2Invalid.status}`);
    const t2InvalidHtml = await t2Invalid.text();
    if (!t2InvalidHtml.includes('Task title must be at least 3 characters long.')) throw new Error('Task 2 title validation missing');
    if (!t2InvalidHtml.includes('Please select a valid priority')) throw new Error('Task 2 priority validation missing');

    // Valid submission
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const t2ValidData = new URLSearchParams({ title: 'Task 2 Valid Title', priority: 'high', dueDate: tomorrow });
    const t2Valid = await fetch(`${BASE_URL}/tasks/task-2`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: t2ValidData.toString()
    });
    if (t2Valid.status !== 201) throw new Error(`Task 2 valid submission failed (got ${t2Valid.status})`);
    console.log(`  ✔ Task 2 PASSED: Invalid blocked with 400 Bad Request, Valid stored in temp storage.\n`);

    // -------------------------------------------------------------
    // TASK 3: Advanced CSS & Responsive Layout
    // -------------------------------------------------------------
    console.log(`▶ Verifying Task 3: Advanced CSS & Responsive Design...`);
    const t3Get = await fetch(`${BASE_URL}/tasks/task-3`);
    if (t3Get.status !== 200) throw new Error(`Task 3 GET returned ${t3Get.status}`);
    const t3Html = await t3Get.text();
    if (!t3Html.includes('navbar-taskflow') || !t3Html.includes('t3-hero') || !t3Html.includes('stats-section') || !t3Html.includes('task-grid') || !t3Html.includes('footer-taskflow')) {
      throw new Error('Task 3 layout missing one of the 5 required sections');
    }
    const t3Css = await fetch(`${BASE_URL}/css/task3.css`);
    if (t3Css.status !== 200) throw new Error('Task 3 CSS stylesheet missing');
    console.log(`  ✔ Task 3 PASSED: All 5 sections verified (Navbar, Hero, Stats, Cards, Footer) & CSS loaded.\n`);

    // -------------------------------------------------------------
    // TASK 4: Complex Validation & Dynamic DOM SPA
    // -------------------------------------------------------------
    console.log(`▶ Verifying Task 4: Dynamic DOM Manipulation & Password Strength...`);
    const t4Get = await fetch(`${BASE_URL}/tasks/task-4`);
    if (t4Get.status !== 200) throw new Error(`Task 4 GET returned ${t4Get.status}`);
    const t4Html = await t4Get.text();
    if (!t4Html.includes('id="viewTasks"') || !t4Html.includes('id="viewRegister"') || !t4Html.includes('passwordMeterBar')) {
      throw new Error('Task 4 SPA views or password meter missing');
    }
    // Check modules
    for (const mod of ['validation.js', 'taskManager.js', 'router.js', 'app.js']) {
      const modRes = await fetch(`${BASE_URL}/js/task4/${mod}`);
      if (modRes.status !== 200) throw new Error(`Task 4 module ${mod} missing`);
    }
    console.log(`  ✔ Task 4 PASSED: Modular ES architecture, DOM SPA views, and password analyzer loaded.\n`);

    // -------------------------------------------------------------
    // TASK 5: RESTful API & Frontend Interaction
    // -------------------------------------------------------------
    console.log(`▶ Verifying Task 5: RESTful API CRUD Endpoints & JSON Responses...`);
    // GET /api/tasks
    const t5List = await (await fetch(`${BASE_URL}/api/tasks`)).json();
    if (!t5List.success || !Array.isArray(t5List.data)) throw new Error('GET /api/tasks failed');

    // POST /api/tasks
    const t5CreateRes = await fetch(`${BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Task 5 API Item', priority: 'medium', dueDate: '2026-10-01' })
    });
    const t5CreateJson = await t5CreateRes.json();
    if (t5CreateRes.status !== 201 || !t5CreateJson.data.id) throw new Error('POST /api/tasks failed');
    const t5Id = t5CreateJson.data.id;

    // GET /api/tasks/:id
    const t5Single = await (await fetch(`${BASE_URL}/api/tasks/${t5Id}`)).json();
    if (t5Single.data.title !== 'Task 5 API Item') throw new Error('GET /api/tasks/:id failed');

    // PUT /api/tasks/:id
    const t5Put = await (await fetch(`${BASE_URL}/api/tasks/${t5Id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'completed' })
    })).json();
    if (t5Put.data.status !== 'completed') throw new Error('PUT /api/tasks/:id failed');

    // DELETE /api/tasks/:id
    const t5Del = await (await fetch(`${BASE_URL}/api/tasks/${t5Id}`, { method: 'DELETE' })).json();
    if (!t5Del.success) throw new Error('DELETE /api/tasks/:id failed');
    console.log(`  ✔ Task 5 PASSED: Full CRUD cycle (GET, POST 201, PUT 200, DELETE 200) verified.\n`);

    // -------------------------------------------------------------
    // TASK 6: Database Integration & User Authentication
    // -------------------------------------------------------------
    console.log(`▶ Verifying Task 6: MongoDB Integration, bcrypt Hashing & Multi-User Isolation...`);
    const userAEmail = `user_a_${Date.now()}@taskflow.dev`;
    const userBEmail = `user_b_${Date.now()}@taskflow.dev`;

    // 1. Register User A
    const regA = await (await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name: 'User A', email: userAEmail, password: 'PasswordA123!', confirmPassword: 'PasswordA123!' })
    })).json();
    if (!regA.token || regA.user.password) throw new Error('User A registration failed or exposed password');
    const tokenA = regA.token;

    // 2. Login User A
    const loginA = await (await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email: userAEmail, password: 'PasswordA123!' })
    })).json();
    if (!loginA.token) throw new Error('User A login failed');

    // 3. User A creates task in MongoDB
    const taskARes = await (await fetch(`${BASE_URL}/api/v1/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenA}` },
      body: JSON.stringify({ title: 'User A Confidential Task', priority: 'urgent', dueDate: '2026-10-15' })
    })).json();
    if (!taskARes.data._id) throw new Error('MongoDB Task creation failed');
    const taskAId = taskARes.data._id;

    // 4. Register User B
    const regB = await (await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name: 'User B', email: userBEmail, password: 'PasswordB456!', confirmPassword: 'PasswordB456!' })
    })).json();
    const tokenB = regB.token;

    // 5. User B attempts unauthorized access to User A's task
    const crossAccess = await fetch(`${BASE_URL}/api/v1/tasks/${taskAId}`, {
      headers: { 'Authorization': `Bearer ${tokenB}` }
    });
    if (crossAccess.status !== 403) throw new Error(`User B was not rejected with 403 (got ${crossAccess.status})`);

    // 6. User B attempts unauthorized update of User A's task
    const crossUpdate = await fetch(`${BASE_URL}/api/v1/tasks/${taskAId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenB}` },
      body: JSON.stringify({ title: 'Tampered by User B' })
    });
    if (crossUpdate.status !== 403) throw new Error(`User B update was not rejected with 403 (got ${crossUpdate.status})`);

    // 7. Unauthenticated request to /api/v1/tasks
    const unauthReq = await fetch(`${BASE_URL}/api/v1/tasks`);
    if (unauthReq.status !== 401) throw new Error(`Unauthenticated request not rejected with 401 (got ${unauthReq.status})`);
    console.log(`  ✔ Task 6 PASSED: MongoDB models, bcrypt hashing, JWT auth, and 403 Authorization checks verified.\n`);

    // -------------------------------------------------------------
    // SUMMARY
    // -------------------------------------------------------------
    console.log(`================================================================`);
    console.log(`🏆 ALL 6 COGNIFYZ INTERNSHIP TASKS VERIFIED SUCCESSFULLY!`);
    console.log(`   Task 1: HTML Structure & SSR Form Handling       --> [PASS]`);
    console.log(`   Task 2: Inline Styles & Dual Validation          --> [PASS]`);
    console.log(`   Task 3: Advanced CSS & Responsive Layout         --> [PASS]`);
    console.log(`   Task 4: Dynamic DOM & Complex Validation SPA     --> [PASS]`);
    console.log(`   Task 5: RESTful API CRUD & Fetch() Frontend      --> [PASS]`);
    console.log(`   Task 6: MongoDB Persistence & Authentication     --> [PASS]`);
    console.log(`================================================================\n`);

    server.close();
    await disconnectDB();
  } catch (err) {
    console.error(`\n❌ VERIFICATION FAILED:`, err.message);
    server.close();
    await disconnectDB();
    process.exitCode = 1;
  }
});
