import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const storePaths = [
  path.join(rootDir, 'backend', 'data', 'store.json'),
  path.join(rootDir, 'data', 'store.json')
];

const newCourses = [
  {
    id: 'c_webdev_angela',
    slug: 'the-complete-web-development-bootcamp',
    title: 'The Complete Full-Stack Web Development Bootcamp',
    subtitle: 'Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps',
    instructorName: 'Dr. Angela Yu',
    instructorOrg: 'Developer and Lead Instructor',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    price: 499.00,
    originalPrice: 3199.00,
    rating: 4.7,
    ratingsCount: 474464,
    studentsCount: 1250000,
    totalHours: 65,
    isBestseller: true,
    isPremium: true,
    category: 'Development',
    sections: [
      {
        id: 'sec_angela_1',
        title: 'Section 1: Frontend Web Development Foundations',
        order: 1,
        lectures: [
          { id: 'lec_a_1', lectureNumber: 1, title: 'Introduction to Web Architecture', durationMinutes: 15, hasResources: true, isCompleted: true },
          { id: 'lec_a_2', lectureNumber: 2, title: 'HTML5 Semantic Layouts and Elements', durationMinutes: 22, hasResources: true, isCompleted: true },
          { id: 'lec_a_3', lectureNumber: 3, title: 'CSS3 Styling, Flexbox, and Modern Grid', durationMinutes: 30, hasResources: true, isCompleted: true }
        ]
      },
      {
        id: 'sec_angela_2',
        title: 'Section 2: Node.js, Express, React & Fullstack Deployment',
        order: 2,
        lectures: [
          { id: 'lec_a_4', lectureNumber: 4, title: 'Building RESTful APIs with Node and Express', durationMinutes: 28, hasResources: true, isCompleted: true },
          { id: 'lec_a_5', lectureNumber: 5, title: 'Connecting React with Backend Microservices', durationMinutes: 35, hasResources: true, isCompleted: true }
        ]
      }
    ]
  },
  {
    id: 'c_webdev_hitesh',
    slug: 'complete-web-development-course',
    title: 'Complete web development course',
    subtitle: 'Only web development course that you will need. Covers HTML, CSS, Tailwind, Node, React, MongoDB, Prisma, Deployment etc',
    instructorName: 'Hitesh Choudhary',
    instructorOrg: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&auto=format&fit=crop&q=80',
    price: 499.00,
    originalPrice: 3179.00,
    rating: 4.5,
    ratingsCount: 22525,
    studentsCount: 85159,
    totalHours: 100,
    isBestseller: false,
    isPremium: true,
    category: 'Development',
    sections: [
      {
        id: 'sec_h_1',
        title: 'Section 1: Modern Web Foundations & Tailwind CSS',
        order: 1,
        lectures: [
          { id: 'lec_h_1', lectureNumber: 1, title: 'Web Architecture & Developer Roadmap', durationMinutes: 18, hasResources: true, isCompleted: true },
          { id: 'lec_h_2', lectureNumber: 2, title: 'Tailwind CSS Mastery from Scratch', durationMinutes: 24, hasResources: true, isCompleted: true }
        ]
      },
      {
        id: 'sec_h_2',
        title: 'Section 2: React, Node, Express, MongoDB & Prisma',
        order: 2,
        lectures: [
          { id: 'lec_h_3', lectureNumber: 3, title: 'Building Interactive UIs with React and Hooks', durationMinutes: 28, hasResources: true, isCompleted: true },
          { id: 'lec_h_4', lectureNumber: 4, title: 'Prisma ORM & Fullstack Production Deployment', durationMinutes: 32, hasResources: true, isCompleted: true }
        ]
      }
    ]
  },
  {
    id: 'c_js_jonas',
    slug: 'the-complete-javascript-course',
    title: 'The Complete JavaScript Course 2025: From Zero to Expert!',
    subtitle: 'The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory. Many courses in one!',
    instructorName: 'Jonas Schmedtmann',
    instructorOrg: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579468118864-ddb813ec7167?w=600&auto=format&fit=crop&q=80',
    price: 549.00,
    originalPrice: 3549.00,
    rating: 4.7,
    ratingsCount: 234032,
    studentsCount: 920000,
    totalHours: 69,
    isBestseller: true,
    isPremium: true,
    category: 'Development',
    sections: [
      {
        id: 'sec_j_1',
        title: 'Section 1: JavaScript Fundamentals & Deep Dive',
        order: 1,
        lectures: [
          { id: 'lec_j_1', lectureNumber: 1, title: 'JavaScript Engine, Execution Context & Call Stack', durationMinutes: 20, hasResources: true, isCompleted: true },
          { id: 'lec_j_2', lectureNumber: 2, title: 'DOM Manipulation, Events and Async JS', durationMinutes: 30, hasResources: true, isCompleted: true }
        ]
      }
    ]
  },
  {
    id: 'c_fastapi_eric',
    slug: 'fastapi-the-complete-course-2026',
    title: 'FastAPI - The Complete Course 2026 (Beginner + Advanced)',
    subtitle: 'Master modern, fast (high-performance), web frameworks for building APIs with Python 3.10+ and ASGI servers',
    instructorName: 'Eric Roby',
    instructorOrg: 'Chad Darby',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    price: 539.00,
    originalPrice: 3439.00,
    rating: 4.5,
    ratingsCount: 13682,
    studentsCount: 58000,
    totalHours: 21,
    isBestseller: true,
    isPremium: true,
    category: 'Development',
    sections: [
      {
        id: 'sec_f_1',
        title: 'Section 1: FastAPI Core Concepts & Pydantic',
        order: 1,
        lectures: [
          { id: 'lec_f_1', lectureNumber: 1, title: 'Introduction to FastAPI & Async Python', durationMinutes: 16, hasResources: true, isCompleted: true },
          { id: 'lec_f_2', lectureNumber: 2, title: 'Pydantic Schemas and Validation', durationMinutes: 22, hasResources: true, isCompleted: true }
        ]
      }
    ]
  },
  {
    id: 'c_angular_max',
    slug: 'angular-the-complete-guide',
    title: 'Angular - The Complete Guide',
    subtitle: 'Master Angular (formerly Angular 2) and build awesome, reactive web apps with the successor of Angular.js',
    instructorName: 'Maximilian Schwarzmüller',
    instructorOrg: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    price: 499.00,
    originalPrice: 3199.00,
    rating: 4.7,
    ratingsCount: 224668,
    studentsCount: 750000,
    totalHours: 36,
    isBestseller: true,
    isPremium: true,
    category: 'Development'
  },
  {
    id: 'c_ai_brad',
    slug: 'coding-with-ai-planning-to-production',
    title: 'Coding With AI - Planning To Production',
    subtitle: 'Learn how to leverage AI tools, LLMs, GitHub Copilot, and AI workflows from design planning to production deployment',
    instructorName: 'Brad Traversy',
    instructorOrg: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    price: 479.00,
    originalPrice: 799.00,
    rating: 4.8,
    ratingsCount: 1037,
    studentsCount: 12500,
    totalHours: 14,
    isBestseller: true,
    isPremium: true,
    category: 'Development'
  },
  {
    id: 'c_react_jonas',
    slug: 'the-ultimate-react-course-2025',
    title: 'The Ultimate React Course 2025: React, Next.js, Redux & More',
    subtitle: 'Master React 19, Next.js 15, Redux Toolkit, Tailwind, React Query and build real-world production web applications',
    instructorName: 'Jonas Schmedtmann',
    instructorOrg: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80',
    price: 499.00,
    originalPrice: 799.00,
    rating: 4.7,
    ratingsCount: 27011,
    studentsCount: 110000,
    totalHours: 67,
    isBestseller: true,
    isPremium: true,
    category: 'Development'
  }
];

const selectedCourseEnrollmentsForVivek = [
  {
    userId: 'usr_vivek_01',
    courseId: 'c_spring_boot_01',
    enrolledAt: '2026-02-26T10:30:00Z',
    completedAt: '2026-03-02T16:45:00Z',
    userRating: 5
  },
  {
    userId: 'usr_vivek_01',
    courseId: 'c_webdev_hitesh',
    enrolledAt: '2026-03-05T09:15:00Z',
    completedAt: '2026-03-10T18:30:00Z',
    userRating: 5
  },
  {
    userId: 'usr_vivek_01',
    courseId: 'c_webdev_angela',
    enrolledAt: '2026-03-12T11:00:00Z',
    completedAt: '2026-03-25T14:20:00Z',
    userRating: 5
  },
  {
    userId: 'usr_vivek_01',
    courseId: 'c_js_jonas',
    enrolledAt: '2026-04-01T08:00:00Z',
    completedAt: '2026-04-18T16:00:00Z',
    userRating: 5
  },
  {
    userId: 'usr_vivek_01',
    courseId: 'c_fastapi_eric',
    enrolledAt: '2026-04-20T10:00:00Z',
    completedAt: '2026-05-02T17:45:00Z',
    userRating: 5
  }
];

for (const targetPath of storePaths) {
  if (!fs.existsSync(targetPath)) continue;

  const data = JSON.parse(fs.readFileSync(targetPath, 'utf-8'));

  // 1. Update Spring Boot course prices to match screenshot
  const springBoot = data.courses.find(c => c.id === 'c_spring_boot_01');
  if (springBoot) {
    springBoot.price = 569.00;
    springBoot.originalPrice = 3639.00;
    springBoot.ratingsCount = 45717;
  }

  // 2. Add or update new courses
  for (const nc of newCourses) {
    const existingIndex = data.courses.findIndex(c => c.id === nc.id || c.slug === nc.slug);
    if (existingIndex >= 0) {
      data.courses[existingIndex] = { ...data.courses[existingIndex], ...nc };
    } else {
      data.courses.unshift(nc);
    }
  }

  // 3. Add enrollments for Vivek with 100% completion
  for (const enr of selectedCourseEnrollmentsForVivek) {
    const existingIndex = data.enrolledCourseIds.findIndex(e => e.userId === enr.userId && e.courseId === enr.courseId);
    if (existingIndex >= 0) {
      data.enrolledCourseIds[existingIndex] = { ...data.enrolledCourseIds[existingIndex], ...enr };
    } else {
      data.enrolledCourseIds.push(enr);
    }
  }

  // 4. Also ensure other users (e.g. Abindas P) enrollments are 100% complete
  data.enrolledCourseIds.forEach(e => {
    if (!e.completedAt) {
      e.completedAt = '2026-09-12T07:00:00Z';
    }
    if (!e.userRating) {
      e.userRating = 5;
    }
  });

  // 5. Ensure lectureProgress has all lectures marked complete for enrolled courses
  for (const course of data.courses) {
    if (course.sections) {
      for (const sec of course.sections) {
        for (const lec of sec.lectures) {
          data.lectureProgress[`usr_vivek_01_${course.id}_${lec.id}`] = true;
        }
      }
    }
  }

  fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Successfully updated store at: ${targetPath}`);
}
