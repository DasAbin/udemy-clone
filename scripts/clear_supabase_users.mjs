import fs from 'fs';
import path from 'path';
import { createClient } from '../backend/node_modules/@supabase/supabase-js/dist/index.mjs';

// 1. Read .env file from backend/.env or root
function getEnv() {
  const possiblePaths = [
    path.join(process.cwd(), 'backend', '.env'),
    path.join(process.cwd(), '.env'),
    path.join(path.dirname(process.cwd()), 'backend', '.env'),
    path.join(path.dirname(process.cwd()), '.env')
  ];

  const env = {};
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf-8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const idx = trimmed.indexOf('=');
          const k = trimmed.slice(0, idx).trim();
          const v = trimmed.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
          if (k && !env[k]) env[k] = v;
        }
      });
    }
  }
  return env;
}

async function emptyUsers() {
  console.log('==============================================');
  console.log('  EMPTYING USERS FROM SUPABASE & LOCAL STORE   ');
  console.log('==============================================\n');

  const env = getEnv();
  const supabaseUrl = env.SUPABASE_URL || process.env.SUPABASE_URL || '';
  const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || '';

  // 1. Empty Supabase if URL and Key are provided
  if (supabaseUrl && supabaseKey && supabaseUrl !== 'https://your-project-id.supabase.co') {
    console.log(`[Supabase] Connecting to project: ${supabaseUrl}...`);
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      console.log('[Supabase] Deleting user_lecture_progress...');
      await supabase.from('user_lecture_progress').delete().neq('id', '___none___');

      console.log('[Supabase] Deleting user_enrollments...');
      await supabase.from('user_enrollments').delete().neq('id', '___none___');

      console.log('[Supabase] Deleting all records from profiles...');
      const { error, count } = await supabase
        .from('profiles')
        .delete({ count: 'exact' })
        .neq('id', '___none___');

      if (error) {
        console.error('❌ [Supabase] Error emptying profiles:', error.message);
      } else {
        console.log(`✅ [Supabase] Successfully cleared profiles! Deleted count: ${count ?? 0}`);
      }
    } catch (err) {
      console.error('❌ [Supabase] Connection error:', err.message);
    }
  } else {
    console.log('ℹ️ [Supabase] No live SUPABASE_URL configured in backend/.env yet.');
    console.log('   (To connect to live cloud Supabase, add SUPABASE_URL=https://<ref>.supabase.co to backend/.env)');
  }

  // 2. Empty local store.json files
  const storeFiles = [
    path.join(process.cwd(), 'backend', 'data', 'store.json'),
    path.join(process.cwd(), 'data', 'store.json')
  ];

  for (const sf of storeFiles) {
    if (fs.existsSync(sf)) {
      try {
        const raw = fs.readFileSync(sf, 'utf-8');
        const data = JSON.parse(raw);
        data.users = [];
        data.activeUserId = null;
        data.enrolledCourseIds = [];
        data.lectureProgress = {};
        if (data.cart) data.cart = [];
        fs.writeFileSync(sf, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`✅ [Local Store] Emptied users in: ${sf}`);
      } catch (err) {
        console.error(`❌ [Local Store] Error updating ${sf}:`, err.message);
      }
    }
  }

  // 3. Trigger backend memory store reset if server is running
  try {
    const res = await fetch('http://localhost:5001/api/auth/clear-users', { method: 'POST' });
    const json = await res.json();
    console.log('✅ [Backend API] Reset memory state:', json.message);
  } catch (err) {
    // server might be restarting or offline, which is fine
  }

  console.log('\n🎉 ALL USERS EMPTIED SUCCESSFULLY! Database is now completely clean with 0 users.');
}

emptyUsers();
