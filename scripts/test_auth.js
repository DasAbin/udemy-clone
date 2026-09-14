async function run() {
  console.log('--- 1. Check Initial Auth State (should be null) ---');
  let res = await fetch('http://localhost:5001/api/auth/me');
  let data = await res.json();
  console.log('Initial Auth:', data);

  console.log('\n--- 2. Log in as Vivek (demo) ---');
  res = await fetch('http://localhost:5001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'viveksikarwar121204@gmail.com' })
  });
  data = await res.json();
  console.log('Login Result:', data.user ? { name: data.user.name, email: data.user.email } : data);

  console.log('\n--- 3. Check Current User (should be Vivek) ---');
  res = await fetch('http://localhost:5001/api/auth/me');
  data = await res.json();
  console.log('Current User:', data.user ? { name: data.user.name, email: data.user.email } : data);

  console.log('\n--- 4. Log out ---');
  res = await fetch('http://localhost:5001/api/auth/logout', { method: 'POST' });
  data = await res.json();
  console.log('Logout Result:', data);

  console.log('\n--- 5. Check Auth State (should be null again) ---');
  res = await fetch('http://localhost:5001/api/auth/me');
  data = await res.json();
  console.log('Logged Out Auth:', data);
}

run().catch(console.error);
