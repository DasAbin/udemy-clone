import express from 'express';
import cors from 'cors';
import path from 'path';
import { db } from './db.js';
import { supabaseDb, isSupabaseConnected, getSupabase } from './supabase.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Static files for thumbnails and certificates
const frontendPublic = path.join(process.cwd(), '..', 'frontend', 'public');
app.use('/images', express.static(path.join(frontendPublic, 'images')));
app.use('/certificates', express.static(path.join(frontendPublic, 'certificates')));

// Supabase Status & Sync Endpoints
app.get('/api/supabase/status', (req, res) => {
  res.json({
    success: true,
    connected: isSupabaseConnected(),
    mode: isSupabaseConnected() ? 'SUPABASE_CLOUD' : 'LOCAL_JSON_FALLBACK',
    message: isSupabaseConnected() 
      ? 'Connected to live Supabase DB' 
      : 'Running in robust local JSON store mode. Add SUPABASE_URL and SUPABASE_KEY to .env to enable Supabase Cloud.'
  });
});

app.post('/api/supabase/sync', async (req, res) => {
  try {
    const store = (db as any).data;
    const result = await supabaseDb.syncLocalStoreToSupabase(store);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 1. Auth & User Profile
app.get('/api/auth/me', (req, res) => {
  const user = db.getUser();
  res.json({ success: true, user });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, name } = req.body;
  const user = await db.login(email, name);
  res.json({ success: true, user, message: 'Logged in successfully' });
});

app.post('/api/auth/signup', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }
  const user = await db.signup(name, email);
  res.json({ success: true, user, message: 'Account created successfully' });
});

app.post('/api/auth/logout', (req, res) => {
  db.logout();
  res.json({ success: true, message: 'Logged out successfully' });
});

app.patch('/api/users/profile', (req, res) => {
  try {
    const updated = db.updateUser(req.body);
    res.json({ success: true, user: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// 2. Courses
app.get('/api/courses', (req, res) => {
  const { category, q } = req.query;
  const courses = db.getCourses(category as string, q as string);
  res.json({ success: true, count: courses.length, courses });
});

app.get('/api/courses/:slug', (req, res) => {
  const course = db.getCourseBySlug(req.params.slug);
  if (!course) {
    return res.status(404).json({ success: false, message: 'Course not found' });
  }
  res.json({ success: true, course });
});

// 3. My Learning & Public Profile
app.get('/api/my-learning', (req, res) => {
  const myLearning = db.getMyLearning();
  res.json({ success: true, ...myLearning });
});

app.get('/api/users/profile/:username', (req, res) => {
  const { username } = req.params;
  const profile = db.getPublicProfile(username);
  res.json({ success: true, ...profile });
});

app.get('/api/users/public', (req, res) => {
  const profile = db.getPublicProfile('usr_vivek_01');
  res.json({ success: true, ...profile });
});

// 4. Curriculum & Lecture Progress
app.get('/api/courses/:slug/curriculum', (req, res) => {
  const course = db.getCourseBySlug(req.params.slug);
  if (!course) {
    return res.status(404).json({ success: false, message: 'Course not found' });
  }

  const progress = db.getLectureProgress(course.id);
  const sections = course.sections?.map(sec => ({
    ...sec,
    lectures: sec.lectures.map(lec => ({
      ...lec,
      isCompleted: progress[lec.id] !== undefined ? progress[lec.id] : lec.isCompleted
    }))
  })) || [];

  res.json({
    success: true,
    courseId: course.id,
    courseTitle: course.title,
    sections,
    progress
  });
});

app.post('/api/courses/:courseId/lectures/:lectureId/toggle', (req, res) => {
  const { courseId, lectureId } = req.params;
  const result = db.toggleLecture(courseId, lectureId);
  res.json({ success: true, ...result });
});

// 5. Purchases, Receipts & Invoices
app.get('/api/purchases', (req, res) => {
  const orders = db.getPurchases();
  res.json({ success: true, orders });
});

app.get('/api/receipt/:orderNumber', (req, res) => {
  const order = db.getOrderByNumber(req.params.orderNumber) || db.getOrderById(req.params.orderNumber);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Receipt not found' });
  }
  const user = db.getUser() || { name: 'Vivek singh', email: 'viveksikarwar121204@gmail.com' };
  res.json({
    success: true,
    receipt: {
      ...order,
      customerName: user.name,
      customerEmail: user.email,
      supplierName: 'Udemy India LLP',
      supplierAddress: '10th Floor, ResCowork 07, Tower B, Unitech Cyber Park, Sector 39, Gurgaon, Haryana, India, 122003',
      supplierWebsite: 'udemy.com',
      couponCode: order.couponCode || 'MT260223G1B'
    }
  });
});

app.get('/api/purchases/:id/receipt', (req, res) => {
  const order = db.getOrderById(req.params.id) || db.getOrderByNumber(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Receipt not found' });
  }
  const user = db.getUser() || { name: 'Vivek singh', email: 'viveksikarwar121204@gmail.com' };
  res.json({
    success: true,
    receipt: {
      ...order,
      customerName: user.name,
      customerEmail: user.email,
      supplierName: 'Udemy India LLP',
      supplierAddress: '10th Floor, ResCowork 07, Tower B, Unitech Cyber Park, Sector 39, Gurgaon, Haryana, India, 122003',
      supplierWebsite: 'udemy.com',
      couponCode: order.couponCode || 'MT260223G1B'
    }
  });
});

app.get('/api/purchases/:id/invoice', (req, res) => {
  const order = db.getOrderById(req.params.id) || db.getOrderByNumber(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Invoice not found' });
  }
  res.json({
    success: true,
    invoice: {
      ...order,
      companyName: 'Udemy India LLP',
      companyAddress: '10th Floor, ResCowork 07, Tower B, Unitech Cyber Park, Sector 39, Gurgaon, Haryana, India, 122003',
      gstin: '06AAFFU9763M1ZE',
      panNo: 'AAFFU9763M',
      recipientName: 'Vivek Pratap singh',
      recipientEmail: 'viveksikarwar121204@gmail.com',
      recipientAddress: 'Uttar Pradesh, 09, UP, India',
      hsnCode: '9984 33',
      dateOfIssue: order.date,
      paymentStatus: 'PAID'
    }
  });
});

// 6. Certificates
app.get('/api/certificates/:certId', (req, res) => {
  const cert = db.getCertificate(req.params.certId);
  if (!cert) {
    return res.status(404).json({ success: false, message: 'Certificate not found' });
  }
  res.json({ success: true, certificate: cert });
});

// 7. Cart & Checkout
app.get('/api/cart', (req, res) => {
  const cart = db.getCart();
  res.json({ success: true, ...cart });
});

app.post('/api/cart/add', (req, res) => {
  const { courseId } = req.body;
  if (!courseId) {
    return res.status(400).json({ success: false, message: 'courseId required' });
  }
  db.addToCart(courseId);
  const cart = db.getCart();
  res.json({ success: true, message: 'Added to cart', ...cart });
});

app.delete('/api/cart/:courseId', (req, res) => {
  db.removeFromCart(req.params.courseId);
  const cart = db.getCart();
  res.json({ success: true, message: 'Removed from cart', ...cart });
});

app.post('/api/checkout', (req, res) => {
  try {
    const { paymentMethod } = req.body;
    const order = db.checkout(paymentMethod || '₹469.00 UPI');
    res.json({ success: true, message: 'Order placed successfully', order });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Udemy Backend API running on port ${PORT}`);
});
