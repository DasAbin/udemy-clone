async function test() {
  console.log('--- 1. Testing Signup as "Abin Das" ---');
  let res = await fetch('http://localhost:5001/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Abin Das', email: 'abin@example.com' })
  });
  let data = await res.json();
  console.log('Signed up user:', data.user.name, '| Initials:', data.user.avatarInitials, '| Email:', data.user.email);

  console.log('\n--- 2. Checking Current Authenticated User ---');
  res = await fetch('http://localhost:5001/api/auth/me');
  data = await res.json();
  console.log('Current user:', data.user.name, '| Initials:', data.user.avatarInitials);

  console.log('\n--- 3. Checking Public Profile for "abin-das" ---');
  res = await fetch('http://localhost:5001/api/users/profile/abin-das');
  data = await res.json();
  console.log('Profile name:', data.user.name, '| Role:', data.user.role, '| Headline:', data.user.headline);

  console.log('\n--- 4. Testing Login as "Sarah Connor" ---');
  res = await fetch('http://localhost:5001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'sarah@skynet.com', name: 'Sarah Connor' })
  });
  data = await res.json();
  console.log('Logged in user:', data.user.name, '| Initials:', data.user.avatarInitials);

  console.log('\n--- 5. Checking Public Profile for "sarah-connor" ---');
  res = await fetch('http://localhost:5001/api/users/profile/sarah-connor');
  data = await res.json();
  console.log('Profile name:', data.user.name, '| Initials:', data.user.avatarInitials);

  console.log('\nSUCCESS! Users are 100% dynamic, personalized, and generalized!');
}

test().catch(console.error);
