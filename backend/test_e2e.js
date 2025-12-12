// Native fetch is available in Node 20+
// If native fetch is not available, we might need to install node-fetch or use http module.
// Let's assume Node 18+ for now which has global fetch.

async function testFlow() {
  const baseUrl = 'http://localhost:4000';

  console.log('--- Starting E2E Test ---');

  // 1. Create User
  console.log('\n1. Creating User...');
  const userRes = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'E2E Test User' })
  });
  
  if (!userRes.ok) {
    console.error('Failed to create user:', await userRes.text());
    return;
  }
  
  const user = await userRes.json();
  console.log('✅ User Created:', user);

  // 2. Create Streak
  console.log('\n2. Creating Streak...');
  const streakRes = await fetch(`${baseUrl}/streaks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'E2E Test Streak',
      frequency: 'WEEKLY',
      createdById: user.id
    })
  });

  if (!streakRes.ok) {
    console.error('Failed to create streak:', await streakRes.text());
    return;
  }

  const streakData = await streakRes.json();
  console.log('✅ Streak Created:', streakData);
  
  console.log('\n--- Test Completed Successfully ---');
}

testFlow().catch(console.error);
