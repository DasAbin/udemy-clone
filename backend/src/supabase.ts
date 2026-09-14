import { createClient, SupabaseClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Automatically load .env from backend/.env or root .env
function loadEnv() {
  const possiblePaths = [
    path.join(process.cwd(), '.env'),
    path.join(process.cwd(), 'backend', '.env'),
    path.join(path.dirname(process.cwd()), '.env'),
    path.join(path.dirname(process.cwd()), 'backend', '.env')
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      try {
        const content = fs.readFileSync(p, 'utf-8');
        content.split('\n').forEach(line => {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
            const idx = trimmed.indexOf('=');
            const key = trimmed.slice(0, idx).trim();
            const val = trimmed.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
            if (key && !process.env[key]) {
              process.env[key] = val;
            }
          }
        });
      } catch (err) {
        // ignore
      }
    }
  }
}
loadEnv();

let supabaseInstance: SupabaseClient | null = null;

export function initSupabase(): SupabaseClient | null {
  loadEnv();
  const supabaseUrl = process.env.SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || '';

  if (supabaseUrl && supabaseKey && supabaseUrl !== 'https://your-project-id.supabase.co') {
    try {
      supabaseInstance = createClient(supabaseUrl, supabaseKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        }
      });
      console.log('[Supabase] Client connected successfully to:', supabaseUrl);
      return supabaseInstance;
    } catch (err) {
      console.warn('[Supabase] Client initialization error:', err);
      supabaseInstance = null;
    }
  } else {
    supabaseInstance = null;
  }
  return supabaseInstance;
}

initSupabase();

export const getSupabase = (): SupabaseClient | null => {
  if (!supabaseInstance) {
    initSupabase();
  }
  return supabaseInstance;
};

export const isSupabaseConnected = (): boolean => getSupabase() !== null;

// Database helper functions keyed by user ID
export const supabaseDb = {
  // 1. Get or create user profile by ID
  async getProfile(userId: string) {
    if (!supabaseInstance) return null;
    const { data, error } = await supabaseInstance
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) {
      console.warn('[Supabase] Error fetching profile for', userId, error.message);
      return null;
    }
    return data;
  },

  async getProfileByEmail(email: string) {
    if (!supabaseInstance) return null;
    const { data, error } = await supabaseInstance
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single();
    if (error) {
      return null;
    }
    return data;
  },

  async upsertProfile(profile: any) {
    if (!supabaseInstance) return null;
    const { data, error } = await supabaseInstance
      .from('profiles')
      .upsert({
        id: profile.id,
        name: profile.name,
        first_name: profile.firstName,
        last_name: profile.lastName,
        email: profile.email,
        headline: profile.headline,
        biography: profile.biography,
        website: profile.website,
        language: profile.language || 'English (US)',
        role: profile.role || 'LEARNER',
        avatar_initials: profile.avatarInitials || 'VS',
        occupation: profile.occupation || profile.headline,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    if (error) {
      console.warn('[Supabase] Error upserting profile:', error.message);
    }
    return data;
  },

  // 2. User Enrollments (keyed by userId)
  async getUserEnrollments(userId: string) {
    if (!supabaseInstance) return null;
    const { data, error } = await supabaseInstance
      .from('user_enrollments')
      .select('*, courses(*)')
      .eq('user_id', userId);
    if (error) {
      console.warn('[Supabase] Error fetching user enrollments:', error.message);
      return null;
    }
    return data;
  },

  async enrollUserCourse(userId: string, courseId: string) {
    if (!supabaseInstance) return null;
    const { data, error } = await supabaseInstance
      .from('user_enrollments')
      .upsert({
        user_id: userId,
        course_id: courseId,
        enrolled_at: new Date().toISOString(),
        progress_percentage: 0
      })
      .select();
    if (error) {
      console.warn('[Supabase] Error enrolling course in supabase:', error.message);
    }
    return data;
  },

  async clearUserEnrollments(userId: string) {
    if (!supabaseInstance) return null;
    const { error } = await supabaseInstance
      .from('user_enrollments')
      .delete()
      .eq('user_id', userId);
    if (error) {
      console.warn('[Supabase] Error clearing enrollments:', error.message);
    }
    return true;
  },

  // 3. User Lecture Progress
  async getLectureProgress(userId: string, courseId?: string) {
    if (!supabaseInstance) return null;
    let query = supabaseInstance
      .from('user_lecture_progress')
      .select('*')
      .eq('user_id', userId);
    if (courseId) {
      query = query.eq('course_id', courseId);
    }
    const { data, error } = await query;
    if (error) {
      console.warn('[Supabase] Error getting lecture progress:', error.message);
      return null;
    }
    return data;
  },

  async setLectureProgress(userId: string, courseId: string, lectureId: string, isCompleted: boolean) {
    if (!supabaseInstance) return null;
    const compositeId = `${userId}_${courseId}_${lectureId}`;
    const { data, error } = await supabaseInstance
      .from('user_lecture_progress')
      .upsert({
        id: compositeId,
        user_id: userId,
        course_id: courseId,
        lecture_id: lectureId,
        is_completed: isCompleted,
        completed_at: isCompleted ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      })
      .select();
    if (error) {
      console.warn('[Supabase] Error updating lecture progress:', error.message);
    }
    return data;
  },

  // 4. Orders keyed by userId
  async getUserOrders(userId: string) {
    if (!supabaseInstance) return null;
    const { data, error } = await supabaseInstance
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) {
      console.warn('[Supabase] Error fetching user orders:', error.message);
      return null;
    }
    return data;
  },

  // 5. Certificates
  async getCertificate(certificateId: string) {
    if (!supabaseInstance) return null;
    const { data, error } = await supabaseInstance
      .from('certificates')
      .select('*')
      .eq('id', certificateId)
      .single();
    if (error) {
      console.warn('[Supabase] Error fetching certificate:', error.message);
      return null;
    }
    return data;
  },

  // 6. Push full initial store data to Supabase
  async syncLocalStoreToSupabase(store: any) {
    if (!supabaseInstance) {
      return { success: false, message: 'Supabase is not configured yet. Set SUPABASE_URL and SUPABASE_KEY in .env' };
    }
    try {
      // Upsert profiles
      if (store.users && store.users.length > 0) {
        for (const u of store.users) {
          await this.upsertProfile(u);
        }
      }

      // Upsert courses
      if (store.courses && store.courses.length > 0) {
        for (const c of store.courses) {
          await supabaseInstance.from('courses').upsert({
            id: c.id,
            slug: c.slug || c.id,
            title: c.title,
            subtitle: c.subtitle || '',
            headline: c.headline || '',
            instructor_name: c.instructor?.name || 'Instructor',
            rating: c.rating || 4.5,
            ratings_count: c.ratingsCount || 0,
            students_count: c.studentsCount || 0,
            price: c.price || 469,
            original_price: c.originalPrice || 3639,
            thumbnail_url: c.thumbnailUrl || '',
            badge: c.badge || null,
            total_hours: c.totalHours || 10,
            total_lectures: c.totalLectures || 50,
            category: c.category || 'Development'
          });
        }
      }

      // Sync orders
      if (store.orders && store.orders.length > 0) {
        for (const o of store.orders) {
          await supabaseInstance.from('orders').upsert({
            id: o.id,
            order_number: o.orderNumber,
            invoice_number: o.invoiceNumber,
            user_id: 'usr_vivek_01',
            course_id: o.courseId,
            course_title: o.courseTitle,
            date: o.date,
            subtotal: o.subtotal,
            tax: o.tax,
            total_price: o.totalPrice,
            payment_type: o.paymentType,
            coupon_code: 'MT260223G1B',
            status: 'PAID',
            hsn_code: '9984 33'
          });
        }
      }

      return { success: true, message: 'Local store synced successfully to Supabase!' };
    } catch (err: any) {
      console.error('[Supabase] Sync failed:', err);
      return { success: false, error: err.message };
    }
  }
};
