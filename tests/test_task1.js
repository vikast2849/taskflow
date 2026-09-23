const http = require('http');
const app = require('../server/app');

const server = http.createServer(app);

server.listen(3001, async () => {
  console.log('[Test] Server listening on port 3001 for Task 1 tests...');
  try {
    // Test 1: GET /tasks/task-1
    const getRes = await fetch('http://localhost:3001/tasks/task-1');
    const getHtml = await getRes.text();
    if (getRes.status !== 200) throw new Error(`GET /tasks/task-1 expected 200, got ${getRes.status}`);
    if (!getHtml.includes('HTML Structure and Basic Server Interaction')) throw new Error('Task 1 title missing in GET HTML');
    console.log('✔ Task 1: GET /tasks/task-1 rendered form successfully (200 OK)');

    // Test 2: POST /tasks/task-1 with valid data
    const postData = new URLSearchParams({
      title: 'Design Wireframes',
      description: 'Create initial UI mockups in Figma'
    });
    const postRes = await fetch('http://localhost:3001/tasks/task-1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: postData.toString()
    });
    const postHtml = await postRes.text();
    if (postRes.status !== 201) throw new Error(`POST /tasks/task-1 expected 201, got ${postRes.status}`);
    if (!postHtml.includes('Design Wireframes')) throw new Error('Submitted task title not found in SSR HTML');
    if (!postHtml.includes('Create initial UI mockups in Figma')) throw new Error('Submitted task description not found in SSR HTML');
    console.log('✔ Task 1: POST /tasks/task-1 submitted and rendered task via EJS (201 Created)');

    // Test 3: POST /tasks/task-1 with empty data (validation error)
    const emptyPost = new URLSearchParams({ title: '', description: '' });
    const emptyRes = await fetch('http://localhost:3001/tasks/task-1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: emptyPost.toString()
    });
    const emptyHtml = await emptyRes.text();
    if (emptyRes.status !== 400) throw new Error(`POST /tasks/task-1 empty title expected 400, got ${emptyRes.status}`);
    if (!emptyHtml.includes('Task title is required.')) throw new Error('Expected validation error message not found');
    console.log('✔ Task 1: POST /tasks/task-1 empty input properly rejected with 400 Bad Request');

    console.log('\n🎉 ALL TASK 1 TESTS PASSED SUCCESSFULLY!\n');
    server.close();
  } catch (err) {
    console.error('❌ Task 1 Test Failed:', err);
    server.close();
    process.exitCode = 1;
  }
});
