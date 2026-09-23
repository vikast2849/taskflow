const http = require('http');
const app = require('../server/app');

const server = http.createServer(app);

server.listen(3003, async () => {
  console.log('[Test] Server listening on port 3003 for Task 3 tests...');
  try {
    // Test 1: GET /tasks/task-3
    const getRes = await fetch('http://localhost:3003/tasks/task-3');
    const getHtml = await getRes.text();
    if (getRes.status !== 200) throw new Error(`GET /tasks/task-3 expected 200, got ${getRes.status}`);

    // Verify 5 sections
    if (!getHtml.includes('navbar-taskflow')) throw new Error('Navbar section missing');
    if (!getHtml.includes('t3-hero')) throw new Error('Hero section missing');
    if (!getHtml.includes('stats-section')) throw new Error('Statistics section missing');
    if (!getHtml.includes('task-grid')) throw new Error('Task cards section missing');
    if (!getHtml.includes('footer-taskflow')) throw new Error('Footer section missing');
    console.log('✔ Task 3: Multi-section layout (Navbar, Hero, Stats, Task Cards, Footer) successfully rendered (200 OK)');

    // Test 2: Verify CSS asset is served
    const cssRes = await fetch('http://localhost:3003/css/task3.css');
    const cssContent = await cssRes.text();
    if (cssRes.status !== 200) throw new Error(`GET /css/task3.css expected 200, got ${cssRes.status}`);
    if (!cssContent.includes('@keyframes pulseGlow')) throw new Error('CSS keyframe animations missing in stylesheet');
    if (!cssContent.includes('--t3-hero-bg')) throw new Error('CSS custom variables missing in stylesheet');
    console.log('✔ Task 3: Advanced CSS stylesheet verified with custom properties, animations, and transitions');

    console.log('\n🎉 ALL TASK 3 TESTS PASSED SUCCESSFULLY!\n');
    server.close();
  } catch (err) {
    console.error('❌ Task 3 Test Failed:', err);
    server.close();
    process.exitCode = 1;
  }
});
