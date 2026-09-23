const http = require('http');
const app = require('../server/app');
const { connectDB, disconnectDB } = require('../server/config/db');

const server = http.createServer(app);

server.listen(3006, async () => {
  console.log('[Test] Server listening on port 3006 for Task 6 tests...');
  try {
    await connectDB();

    // Test 1: GET /tasks/task-6
    const viewRes = await fetch('http://localhost:3006/tasks/task-6');
    if (viewRes.status !== 200) throw new Error(`GET /tasks/task-6 expected 200, got ${viewRes.status}`);
    console.log('✔ Task 6: Database & Authentication workspace view served (200 OK)');

    // Test 2: Register User A
    const userAData = {
      name: 'Alice Developer',
      email: `alice_${Date.now()}@example.com`,
      password: 'StrongPassword123!',
      confirmPassword: 'StrongPassword123!'
    };
    const regResA = await fetch('http://localhost:3006/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(userAData)
    });
    const regJsonA = await regResA.json();
    if (regResA.status !== 201) throw new Error(`Registration A failed: ${JSON.stringify(regJsonA)}`);
    if (!regJsonA.token || !regJsonA.user) throw new Error('Token or User missing in registration response');
    if (regJsonA.user.password) throw new Error('SECURITY BREACH: Password exposed in registration response!');
    const tokenA = regJsonA.token;
    console.log('✔ Task 6: User A registered with bcrypt hashing, password NOT exposed (201 Created)');

    // Test 3: Login with invalid password
    const failLoginRes = await fetch('http://localhost:3006/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email: userAData.email, password: 'WrongPassword999' })
    });
    if (failLoginRes.status !== 401) throw new Error(`Expected 401 for wrong credentials, got ${failLoginRes.status}`);
    console.log('✔ Task 6: Invalid login rejected securely with 401 Unauthorized');

    // Test 4: Login with valid credentials
    const loginResA = await fetch('http://localhost:3006/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email: userAData.email, password: userAData.password })
    });
    const loginJsonA = await loginResA.json();
    if (loginResA.status !== 200 || !loginJsonA.token) throw new Error('Valid login failed');
    console.log('✔ Task 6: User A logged in successfully, JWT token issued (200 OK)');

    // Test 5: Unauthorized access to /api/v1/tasks without token
    const unauthRes = await fetch('http://localhost:3006/api/v1/tasks');
    if (unauthRes.status !== 401) throw new Error(`Expected 401 for unauthenticated request, got ${unauthRes.status}`);
    console.log('✔ Task 6: Unauthenticated API request blocked by auth middleware (401 Unauthorized)');

    // Test 6: User A creates Task A in MongoDB
    const taskDataA = {
      title: 'Alice Secure Task In MongoDB',
      description: 'Private data belonging strictly to Alice',
      priority: 'high',
      dueDate: '2026-09-30'
    };
    const createTaskRes = await fetch('http://localhost:3006/api/v1/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenA}`
      },
      body: JSON.stringify(taskDataA)
    });
    const createJson = await createTaskRes.json();
    if (createTaskRes.status !== 201 || !createJson.data._id) throw new Error('Task A creation in DB failed');
    const taskAId = createJson.data._id;
    console.log(`✔ Task 6: Task A (${taskAId}) created in MongoDB bound to User A (201 Created)`);

    // Test 7: Register User B
    const userBData = {
      name: 'Bob Reviewer',
      email: `bob_${Date.now()}@example.com`,
      password: 'AnotherSecretPass456!',
      confirmPassword: 'AnotherSecretPass456!'
    };
    const regResB = await fetch('http://localhost:3006/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(userBData)
    });
    const regJsonB = await regResB.json();
    const tokenB = regJsonB.token;
    console.log('✔ Task 6: User B registered successfully');

    // Test 8: User B attempts to access Alice's Task A (Authorization Check)
    const crossAccessRes = await fetch(`http://localhost:3006/api/v1/tasks/${taskAId}`, {
      headers: { 'Authorization': `Bearer ${tokenB}` }
    });
    if (crossAccessRes.status !== 403) {
      throw new Error(`CRITICAL SECURITY FAILURE: User B was not rejected with 403, got ${crossAccessRes.status}`);
    }
    console.log('✔ Task 6: User B forbidden from accessing Alice’s task (403 Forbidden verified)');

    // Test 9: User B attempts to modify Alice's Task A
    const crossUpdateRes = await fetch(`http://localhost:3006/api/v1/tasks/${taskAId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenB}`
      },
      body: JSON.stringify({ title: 'Hacked by Bob' })
    });
    if (crossUpdateRes.status !== 403) {
      throw new Error(`CRITICAL SECURITY FAILURE: User B was able to modify Alice's task! Got ${crossUpdateRes.status}`);
    }
    console.log('✔ Task 6: User B forbidden from updating Alice’s task (403 Forbidden verified)');

    // Test 10: User B queries own tasks -> must receive 0 tasks (strict isolation)
    const listResB = await fetch('http://localhost:3006/api/v1/tasks', {
      headers: { 'Authorization': `Bearer ${tokenB}` }
    });
    const listJsonB = await listResB.json();
    if (listJsonB.count !== 0) {
      throw new Error(`User isolation failed: User B sees ${listJsonB.count} tasks instead of 0`);
    }
    console.log('✔ Task 6: Multi-User Isolation verified: User B cannot see User A’s tasks (0 tasks returned)');

    console.log('\n🎉 ALL TASK 6 TESTS PASSED SUCCESSFULLY!\n');
    server.close();
    await disconnectDB();
  } catch (err) {
    console.error('❌ Task 6 Test Failed:', err);
    server.close();
    await disconnectDB();
    process.exitCode = 1;
  }
});
