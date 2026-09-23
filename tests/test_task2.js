const http = require('http');
const app = require('../server/app');

const server = http.createServer(app);

server.listen(3002, async () => {
  console.log('[Test] Server listening on port 3002 for Task 2 tests...');
  try {
    // Test 1: GET /tasks/task-2
    const getRes = await fetch('http://localhost:3002/tasks/task-2');
    const getHtml = await getRes.text();
    if (getRes.status !== 200) throw new Error(`GET /tasks/task-2 expected 200, got ${getRes.status}`);
    if (!getHtml.includes('Inline Styles, Basic Interaction and Server-Side Validation')) {
      throw new Error('Task 2 title missing in GET HTML');
    }
    console.log('✔ Task 2: GET /tasks/task-2 rendered extended form & storage successfully (200 OK)');

    // Test 2: POST /tasks/task-2 with invalid data (Title too short, invalid priority, past date)
    const invalidData = new URLSearchParams({
      title: 'Hi', // < 3 characters
      priority: 'invalid_priority',
      dueDate: '2020-01-01', // in the past
      description: 'Test invalid'
    });
    const invalidRes = await fetch('http://localhost:3002/tasks/task-2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: invalidData.toString()
    });
    const invalidHtml = await invalidRes.text();
    if (invalidRes.status !== 400) throw new Error(`POST /tasks/task-2 invalid expected 400, got ${invalidRes.status}`);
    if (!invalidHtml.includes('Task title must be at least 3 characters long.')) {
      throw new Error('Expected title length validation error not found');
    }
    if (!invalidHtml.includes('Please select a valid priority')) {
      throw new Error('Expected priority validation error not found');
    }
    if (!invalidHtml.includes('Due date cannot be set in the past.')) {
      throw new Error('Expected past date validation error not found');
    }
    console.log('✔ Task 2: Server-side validation properly rejected invalid submission with 400 Bad Request');

    // Test 3: POST /tasks/task-2 with valid data
    const futureDate = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];
    const validData = new URLSearchParams({
      title: 'Automated Test Task 2',
      priority: 'urgent',
      dueDate: futureDate,
      description: 'Verified through automated test suite'
    });
    const validRes = await fetch('http://localhost:3002/tasks/task-2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: validData.toString()
    });
    const validHtml = await validRes.text();
    if (validRes.status !== 201) throw new Error(`POST /tasks/task-2 valid expected 201, got ${validRes.status}`);
    if (!validHtml.includes('Automated Test Task 2')) {
      throw new Error('Valid task title not found in rendered storage');
    }
    if (!validHtml.includes('Urgent')) {
      throw new Error('Valid priority badge not found');
    }
    console.log('✔ Task 2: POST /tasks/task-2 passed validation and saved to temporary storage (201 Created)');

    console.log('\n🎉 ALL TASK 2 TESTS PASSED SUCCESSFULLY!\n');
    server.close();
  } catch (err) {
    console.error('❌ Task 2 Test Failed:', err);
    server.close();
    process.exitCode = 1;
  }
});
