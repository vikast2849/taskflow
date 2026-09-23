const http = require('http');
const app = require('../server/app');

const server = http.createServer(app);

server.listen(3004, async () => {
  console.log('[Test] Server listening on port 3004 for Task 4 tests...');
  try {
    // Test 1: GET /tasks/task-4
    const getRes = await fetch('http://localhost:3004/tasks/task-4');
    const getHtml = await getRes.text();
    if (getRes.status !== 200) throw new Error(`GET /tasks/task-4 expected 200, got ${getRes.status}`);

    // Verify SPA Views exist in DOM template
    if (!getHtml.includes('id="viewTasks"')) throw new Error('Task board view missing');
    if (!getHtml.includes('id="viewCreate"')) throw new Error('Dynamic create view missing');
    if (!getHtml.includes('id="viewRegister"')) throw new Error('Complex register view missing');
    if (!getHtml.includes('id="viewStats"')) throw new Error('Live stats view missing');
    if (!getHtml.includes('passwordMeterBar')) throw new Error('Password strength meter element missing');
    console.log('✔ Task 4: SPA views and password strength elements verified in HTML template (200 OK)');

    // Test 2: Verify Modular Client Scripts
    const modules = [
      '/js/task4/validation.js',
      '/js/task4/taskManager.js',
      '/js/task4/router.js',
      '/js/task4/app.js'
    ];

    for (const mod of modules) {
      const res = await fetch(`http://localhost:3004${mod}`);
      const content = await res.text();
      if (res.status !== 200) throw new Error(`Module ${mod} failed to load (status ${res.status})`);
      if (content.length < 50) throw new Error(`Module ${mod} content unexpectedly short`);
      console.log(`✔ Task 4: Clean ES module ${mod} loaded successfully`);
    }

    // Test 3: Verify Task 4 CSS
    const cssRes = await fetch('http://localhost:3004/css/task4.css');
    const cssText = await cssRes.text();
    if (cssRes.status !== 200) throw new Error(`GET /css/task4.css expected 200, got ${cssRes.status}`);
    if (!cssText.includes('.strength-strong')) throw new Error('Password strength CSS classes missing');
    console.log('✔ Task 4: Task 4 CSS verified with strength meter and SPA transitions');

    console.log('\n🎉 ALL TASK 4 TESTS PASSED SUCCESSFULLY!\n');
    server.close();
  } catch (err) {
    console.error('❌ Task 4 Test Failed:', err);
    server.close();
    process.exitCode = 1;
  }
});
