// Node 20 has native fetch

const BASE_URL = 'http://localhost:5001/api';

async function runTests() {
  console.log('--- STRICT AUTH FLOW TESTS ---');

  const randomSuffix = Date.now();
  const testEmail = `student_${randomSuffix}@testdomain.com`;
  const testPassword = `pass_${randomSuffix}`;
  const wrongPassword = 'totally_wrong_password';

  // 1. Attempt login with an unregistered email -> MUST FAIL WITH 401
  console.log('\n[TEST 1] Attempt login with unregistered email:', testEmail);
  const loginRes1 = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testEmail, password: testPassword })
  });
  const loginData1 = await loginRes1.json();
  console.log('Status:', loginRes1.status);
  console.log('Response:', loginData1);
  if (loginRes1.status === 401 && loginData1.message && loginData1.message.includes('Please sign up first')) {
    console.log('✅ TEST 1 PASSED: Unregistered email properly rejected.');
  } else {
    console.error('❌ TEST 1 FAILED: Expected 401 with sign up prompt.');
    process.exit(1);
  }

  // 2. Sign up with the new email -> MUST SUCCEED (200)
  console.log('\n[TEST 2] Sign up with new credentials:', testEmail);
  const signupRes = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Alex Johnson', email: testEmail, password: testPassword })
  });
  const signupData = await signupRes.json();
  console.log('Status:', signupRes.status);
  console.log('Response:', signupData);
  if (signupRes.status === 200 && signupData.success && signupData.user && signupData.user.email === testEmail) {
    console.log('✅ TEST 2 PASSED: Sign up succeeded and created user.');
  } else {
    console.error('❌ TEST 2 FAILED: Expected 200 with new user.');
    process.exit(1);
  }

  // 3. Attempt signing up again with the same email -> MUST FAIL (400)
  console.log('\n[TEST 3] Duplicate signup with existing email');
  const duplicateSignupRes = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Alex Johnson', email: testEmail, password: testPassword })
  });
  const duplicateSignupData = await duplicateSignupRes.json();
  console.log('Status:', duplicateSignupRes.status);
  console.log('Response:', duplicateSignupData);
  if (duplicateSignupRes.status === 400 && duplicateSignupData.message && duplicateSignupData.message.includes('already exists')) {
    console.log('✅ TEST 3 PASSED: Duplicate signup properly rejected.');
  } else {
    console.error('❌ TEST 3 FAILED: Expected 400 rejection for duplicate email.');
    process.exit(1);
  }

  // 4. Attempt login with WRONG password -> MUST FAIL (401)
  console.log('\n[TEST 4] Login with incorrect password');
  const wrongPassRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testEmail, password: wrongPassword })
  });
  const wrongPassData = await wrongPassRes.json();
  console.log('Status:', wrongPassRes.status);
  console.log('Response:', wrongPassData);
  if (wrongPassRes.status === 401 && wrongPassData.message && wrongPassData.message.includes('Incorrect password')) {
    console.log('✅ TEST 4 PASSED: Incorrect password properly rejected.');
  } else {
    console.error('❌ TEST 4 FAILED: Expected 401 for wrong password.');
    process.exit(1);
  }

  // 5. Attempt login with CORRECT password -> MUST SUCCEED (200)
  console.log('\n[TEST 5] Login with correct password');
  const successLoginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testEmail, password: testPassword })
  });
  const successLoginData = await successLoginRes.json();
  console.log('Status:', successLoginRes.status);
  console.log('Response:', successLoginData);
  if (successLoginRes.status === 200 && successLoginData.success && successLoginData.user && successLoginData.user.name === 'Alex Johnson') {
    console.log('✅ TEST 5 PASSED: Login with correct credentials succeeded.');
  } else {
    console.error('❌ TEST 5 FAILED: Expected 200 with user profile.');
    process.exit(1);
  }

  console.log('\n🎉 ALL 5 STRICT AUTH TESTS PASSED SUCCESSFULLY!');
}

runTests().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
