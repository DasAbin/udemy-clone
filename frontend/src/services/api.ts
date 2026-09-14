import { User, Course, EnrolledCourse, StreakInfo, Order, CartItem, CertificateData, Section } from '../types';

const API_BASE = '/api';

export const api = {
  async getUser(): Promise<{ user: User | null }> {
    const res = await fetch(`${API_BASE}/auth/me`);
    return res.json();
  },

  async login(email?: string, name?: string): Promise<{ user: User; message: string }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name })
    });
    return res.json();
  },

  async signup(name: string, email: string): Promise<{ user: User; message: string }> {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });
    return res.json();
  },

  async logout(): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST'
    });
    return res.json();
  },

  async updateUser(updates: Partial<User>): Promise<{ user: User }> {
    const res = await fetch(`${API_BASE}/users/profile`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return res.json();
  },

  async getCourses(category?: string, query?: string): Promise<{ courses: Course[] }> {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (query) params.set('q', query);
    const res = await fetch(`${API_BASE}/courses?${params.toString()}`);
    return res.json();
  },

  async getCourseBySlug(slug: string): Promise<{ course: Course }> {
    const res = await fetch(`${API_BASE}/courses/${slug}`);
    return res.json();
  },

  async getMyLearning(): Promise<{ enrolledCourses: EnrolledCourse[]; streak: StreakInfo }> {
    const res = await fetch(`${API_BASE}/my-learning`);
    return res.json();
  },

  async getPublicProfile(username?: string): Promise<{ user: User; enrolledCourses: EnrolledCourse[] }> {
    const url = username ? `${API_BASE}/users/profile/${username}` : `${API_BASE}/users/public`;
    const res = await fetch(url);
    return res.json();
  },

  async getCurriculum(slug: string): Promise<{
    courseId: string;
    courseTitle: string;
    sections: Section[];
    progress: Record<string, boolean>;
  }> {
    const res = await fetch(`${API_BASE}/courses/${slug}/curriculum`);
    return res.json();
  },

  async toggleLecture(courseId: string, lectureId: string): Promise<{
    isCompleted: boolean;
    progressPercent: number;
    completedCount: number;
    totalCount: number;
  }> {
    const res = await fetch(`${API_BASE}/courses/${courseId}/lectures/${lectureId}/toggle`, {
      method: 'POST'
    });
    return res.json();
  },

  async getPurchases(): Promise<{ orders: Order[] }> {
    const res = await fetch(`${API_BASE}/purchases`);
    return res.json();
  },

  async getReceipt(orderId: string): Promise<{ receipt: any }> {
    const res = await fetch(`${API_BASE}/purchases/${orderId}/receipt`);
    return res.json();
  },

  async getInvoice(orderId: string): Promise<{ invoice: any }> {
    const res = await fetch(`${API_BASE}/purchases/${orderId}/invoice`);
    return res.json();
  },

  async getCertificate(courseSlug: string): Promise<{ certificate: CertificateData }> {
    const res = await fetch(`${API_BASE}/certificates/${courseSlug}`);
    return res.json();
  },

  async getCart(): Promise<{ items: CartItem[]; total: number }> {
    const res = await fetch(`${API_BASE}/cart`);
    return res.json();
  },

  async addToCart(courseId: string): Promise<{ items: CartItem[]; total: number; message: string }> {
    const res = await fetch(`${API_BASE}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId })
    });
    return res.json();
  },

  async removeFromCart(courseId: string): Promise<{ items: CartItem[]; total: number }> {
    const res = await fetch(`${API_BASE}/cart/${courseId}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  async checkout(paymentMethod: string): Promise<{ order: Order; message: string }> {
    const res = await fetch(`${API_BASE}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentMethod })
    });
    return res.json();
  },

  async getReceiptByOrderNumber(orderNumber: string): Promise<{ receipt: any }> {
    const res = await fetch(`${API_BASE}/receipt/${orderNumber}`);
    return res.json();
  },

  async getSupabaseStatus(): Promise<{ success: boolean; connected: boolean; mode: string; message: string }> {
    const res = await fetch(`${API_BASE}/supabase/status`);
    return res.json();
  },

  async syncSupabase(): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/supabase/sync`, { method: 'POST' });
    return res.json();
  }
};

