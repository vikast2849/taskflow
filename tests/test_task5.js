const http = require('http');
const app = require('../server/app');

const server = http.createServer(app);

server.listen(3005, async () => {
  console.log('[Test] Server listening on port 3005 for Task 5 tests...');
  try {
    // Test 1: GET /tasks/task-5 frontend view
    const viewRes = await fetch('http://localhost:3005/tasks/task-5');
    if (viewRes.status !== 200) throw new Error(`GET /tasks/task-5 expected 200, got ${viewRes.status}`);
    console.log('✔ Task 5: Frontend UI served successfully (200 OK)');

    // Test 2: GET /api/tasks
    const getRes = await fetch('http://localhost:3005/api/tasks');
    const getJson = await getRes.json();
    if (getRes.status !== 200) throw new Error(`GET /api/tasks expected 200, got ${getRes.status}`);
    if (!getJson.success || !Array.isArray(getJson.data)) throw new Error('GET /api/tasks response format invalid');
    console.log(`✔ Task 5: GET /api/tasks returned ${getJson.count} tasks (200 OK)`);

    // Test 3: POST /api/tasks with invalid payload
    const invalidPost = await fetch('http://localhost:3005/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'A' }) // too short, missing priority/dueDate
    });
    const invalidJson = await invalidPost.json();
    if (invalidPost.status !== 400) throw new Error(`POST /api/tasks invalid expected 400, got ${invalidPost.status}`);
    if (invalidJson.success !== false || !invalidJson.errors) throw new Error('POST /api/tasks validation error missing');
    console.log('✔ Task 5: POST /api/tasks invalid payload rejected with 400 Bad Request');

    // Test 4: POST /api/tasks with valid payload (Create)
    const validPost = await fetch('http://localhost:3005/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Automated REST API Test',
        description: 'Verify full CRUD cycle via automated test script',
        priority: 'urgent',
        dueDate: '2026-09-29'
      })
    });
    const createdJson = await validPost.json();
    if (validPost.status !== 201) throw new Error(`POST /api/tasks expected 201, got ${validPost.status}`);
    if (!createdJson.data || !createdJson.data.id) throw new Error('Created task ID missing');
    const createdId = createdJson.data.id;
    console.log(`✔ Task 5: POST /api/tasks created task "${createdId}" (201 Created)`);

    // Test 5: GET /api/tasks/:id (Read single)
    const singleRes = await fetch(`http://localhost:3005/api/tasks/${createdId}`);
    const singleJson = await singleRes.json();
    if (singleRes.status !== 200) throw new Error(`GET /api/tasks/${createdId} expected 200, got ${singleRes.status}`);
    if (singleJson.data.title !== 'Automated REST API Test') throw new Error('Single task title mismatch');
    console.log(`✔ Task 5: GET /api/tasks/${createdId} retrieved successfully (200 OK)`);

    // Test 6: PUT /api/tasks/:id (Update)
    const updateRes = await fetch(`http://localhost:3005/api/tasks/${createdId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Updated REST API Test Title',
        status: 'completed'
      })
    });
    const updatedJson = await updateRes.json();
    if (updateRes.status !== 200) throw new Error(`PUT /api/tasks/${createdId} expected 200, got ${updateRes.status}`);
    if (updatedJson.data.title !== 'Updated REST API Test Title' || updatedJson.data.status !== 'completed') {
      throw new Error('Updated fields mismatch');
    }
    console.log(`✔ Task 5: PUT /api/tasks/${createdId} updated title and status (200 OK)`);

    // Test 7: DELETE /api/tasks/:id (Delete)
    const deleteRes = await fetch(`http://localhost:3005/api/tasks/${createdId}`, {
      method: 'DELETE'
    });
    const deleteJson = await deleteRes.json();
    if (deleteRes.status !== 200) throw new Error(`DELETE /api/tasks/${createdId} expected 200, got ${deleteRes.status}`);
    if (deleteJson.success !== true) throw new Error('Delete response not marked success');
    console.log(`✔ Task 5: DELETE /api/tasks/${createdId} deleted task (200 OK)`);

    // Test 8: Verify 404 for deleted task
    const checkDeleted = await fetch(`http://localhost:3005/api/tasks/${createdId}`);
    if (checkDeleted.status !== 404) throw new Error(`Expected 404 for deleted task, got ${checkDeleted.status}`);
    console.log(`✔ Task 5: Verified deleted task returns 404 Not Found`);

    console.log('\n🎉 ALL TASK 5 TESTS PASSED SUCCESSFULLY!\n');
    server.close();
  } catch (err) {
    console.error('❌ Task 5 Test Failed:', err);
    server.close();
    process.exitCode = 1;
  }
});
