-- Supabase Database Schema Migration for Udemy Clone Platform
-- Supports multi-user persistence keyed by ID, course progress, certificates, and invoices

-- 1. Profiles / Users Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY, -- e.g. usr_vivek_01 or auth.uid()
    name TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    email TEXT UNIQUE NOT NULL,
    headline TEXT,
    biography TEXT,
    website TEXT,
    language TEXT DEFAULT 'English (US)',
    role TEXT DEFAULT 'LEARNER',
    avatar_initials TEXT DEFAULT 'VS',
    occupation TEXT,
    password TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
    id TEXT PRIMARY KEY, -- e.g. c_spring_boot_01, c_spring_darby_01
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    headline TEXT,
    instructor_name TEXT NOT NULL,
    rating NUMERIC(3,2) DEFAULT 4.5,
    ratings_count INTEGER DEFAULT 0,
    students_count INTEGER DEFAULT 0,
    price NUMERIC(10,2) NOT NULL,
    original_price NUMERIC(10,2) NOT NULL,
    thumbnail_url TEXT,
    badge TEXT,
    total_hours NUMERIC(5,1) DEFAULT 10.0,
    total_lectures INTEGER DEFAULT 50,
    category TEXT DEFAULT 'Development',
    level TEXT DEFAULT 'All Levels',
    last_updated TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. User Enrollments Table (keyed by user_id and course_id)
CREATE TABLE IF NOT EXISTS public.user_enrollments (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    user_rating INTEGER CHECK (user_rating BETWEEN 1 AND 5),
    progress_percentage NUMERIC(5,2) DEFAULT 0.00,
    certificate_id TEXT,
    UNIQUE(user_id, course_id)
);

-- 4. User Lecture Progress Table
CREATE TABLE IF NOT EXISTS public.user_lecture_progress (
    id TEXT PRIMARY KEY, -- composite: `${user_id}_${course_id}_${lecture_id}`
    user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    lecture_id TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Orders & Invoices Table
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY, -- e.g. ord_2026_02_001
    order_number TEXT UNIQUE NOT NULL, -- e.g. AD-666D4B735A484B686B71694659673D3D
    invoice_number TEXT UNIQUE NOT NULL, -- e.g. IN2026-02-3848672
    user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    course_title TEXT NOT NULL,
    date TEXT NOT NULL,
    subtotal NUMERIC(10,2) NOT NULL,
    tax NUMERIC(10,2) NOT NULL,
    total_price NUMERIC(10,2) NOT NULL,
    payment_type TEXT NOT NULL,
    coupon_code TEXT,
    status TEXT DEFAULT 'PAID',
    hsn_code TEXT DEFAULT '9984 33',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
    id TEXT PRIMARY KEY, -- e.g. UC-48d475b3-3dd7-443d-bfef-ab611f8f1937
    user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    course_title TEXT NOT NULL,
    instructor_name TEXT NOT NULL,
    issued_date TEXT NOT NULL,
    total_hours NUMERIC(5,1) NOT NULL,
    total_lectures INTEGER NOT NULL,
    certificate_url TEXT NOT NULL,
    reference_number TEXT DEFAULT '0004',
    pdf_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lecture_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Allow public read access on courses, certificates, and profiles
CREATE POLICY "Allow public read courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Allow public read certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Allow public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public read orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public read enrollments" ON public.user_enrollments FOR SELECT USING (true);
CREATE POLICY "Allow public read lecture_progress" ON public.user_lecture_progress FOR SELECT USING (true);

-- Allow full access for anon/service_role keys
CREATE POLICY "Allow full access for service role on profiles" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Allow full access for service role on courses" ON public.courses FOR ALL USING (true);
CREATE POLICY "Allow full access for service role on user_enrollments" ON public.user_enrollments FOR ALL USING (true);
CREATE POLICY "Allow full access for service role on user_lecture_progress" ON public.user_lecture_progress FOR ALL USING (true);
CREATE POLICY "Allow full access for service role on orders" ON public.orders FOR ALL USING (true);
CREATE POLICY "Allow full access for service role on certificates" ON public.certificates FOR ALL USING (true);

-- Seed Initial User: Vivek singh (enrolled courses initially empty as requested)
INSERT INTO public.profiles (id, name, first_name, last_name, email, headline, biography, website, language, role, avatar_initials, occupation)
VALUES (
    'usr_vivek_01',
    'Vivek singh',
    'Vivek',
    'singh',
    'viveksikarwar121204@gmail.com',
    'Manager, Software Development',
    'Software engineering leader passionate about enterprise Java, Spring ecosystem, reactive architectures, and cloud-native AI platforms.',
    'https://github.com/viveksikarwar',
    'English (US)',
    'LEARNER',
    'VS',
    'Manager, Software Development'
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    email = EXCLUDED.email;

-- Seed Initial Order matching Screenshot 2026-09-14 113931.png & 114058.png
INSERT INTO public.orders (id, order_number, invoice_number, user_id, course_id, course_title, date, subtotal, tax, total_price, payment_type, coupon_code, status, hsn_code)
VALUES (
    'ord_2026_02_001',
    'AD-666D4B735A484B686B71694659673D3D',
    'IN2026-02-3848672',
    'usr_vivek_01',
    'c_spring_boot_01',
    'Java Spring Framework, Spring Boot, Spring AI - Gen AI',
    'Feb. 27, 2026',
    397.46,
    71.54,
    469.00,
    'UPI',
    'MT260223G1B',
    'PAID',
    '9984 33'
) ON CONFLICT (id) DO NOTHING;

-- Seed Initial Certificate matching Screenshot 2026-09-14 114257.png & UC-48d475b3-3dd7-443d-bfef-ab611f8f1937.pdf
INSERT INTO public.certificates (id, user_id, course_id, student_name, course_title, instructor_name, issued_date, total_hours, total_lectures, certificate_url, reference_number, pdf_url)
VALUES (
    'UC-48d475b3-3dd7-443d-bfef-ab611f8f1937',
    'usr_vivek_01',
    'c_spring_boot_01',
    'Vivek singh',
    'Java Spring Framework, Spring Boot, Spring AI - Gen AI',
    'Navin Reddy, Telusko Edutech',
    'March 26, 2026',
    55.0,
    500,
    'ude.my/UC-48d475b3-3dd7-443d-bfef-ab611f8f1937',
    '0004',
    '/certificates/UC-48d475b3-3dd7-443d-bfef-ab611f8f1937.pdf'
) ON CONFLICT (id) DO NOTHING;
