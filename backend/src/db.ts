import fs from 'fs';
import path from 'path';
import { User, Course, Order, CartItem, EnrolledCourse, CertificateData } from './types.js';
import { supabaseDb, isSupabaseConnected } from './supabase.js';

interface DatabaseSchema {
  users: User[];
  activeUserId: string | null;
  courses: Course[];
  enrolledCourseIds: {
    userId: string;
    courseId: string;
    enrolledAt: string;
    completedAt?: string;
    userRating?: number;
  }[];
  lectureProgress: Record<string, boolean>; // key: `${userId}_${courseId}_${lectureId}` => completed
  orders: Order[];
  certificates?: CertificateData[];
  cart: string[]; // array of courseIds
  streak: {
    currentStreakWeeks: number;
    courseMinutesWatched: number;
    courseMinutesGoal: number;
    visitsCount: number;
    visitsGoal: number;
    dateRange: string;
  };
}

const DB_FILE = path.join(process.cwd(), 'data', 'store.json');

const INITIAL_DATA: DatabaseSchema = {
  users: [
    {
      id: 'usr_vivek_01',
      name: 'Vivek singh',
      firstName: 'Vivek',
      lastName: 'singh',
      email: 'viveksikarwar121204@gmail.com',
      headline: 'Manager, Software Development',
      biography: 'Software engineering leader passionate about enterprise Java, Spring ecosystem, reactive architectures, and cloud-native AI platforms.',
      language: 'English (US)',
      website: 'https://github.com/viveksikarwar',
      role: 'LEARNER',
      avatarInitials: 'VS',
      occupation: 'Manager, Software Development'
    }
  ],
  activeUserId: null, // Start logged out by default for general public experience!
  streak: {
    currentStreakWeeks: 0,
    courseMinutesWatched: 0,
    courseMinutesGoal: 30,
    visitsCount: 1,
    visitsGoal: 1,
    dateRange: 'Sep 6 - 12'
  },
  cart: [],
  enrolledCourseIds: [], // Cleared for now as requested
  lectureProgress: {},
  orders: [
    {
      id: 'ord_20260226_469',
      orderNumber: 'AD-666D4B735A484B686B71694659673D3D',
      date: 'Feb. 27, 2026',
      courseId: 'c_spring_boot_01',
      courseTitle: 'Java Spring Framework, Spring Boot, Spring AI - Gen AI',
      totalPrice: 469.00,
      paymentType: '₹469.00 UPI',
      status: 'COMPLETED',
      invoiceNumber: 'IN2026-02-3848672',
      transactionRef: 'UPI/405781920391/vivek@okaxis',
      subtotal: 397.46,
      tax: 71.54,
      couponCode: 'MT260223G1B'
    }
  ],
  certificates: [
    {
      id: 'UC-48d475b3-3dd7-443d-bfef-ab611f8f1937',
      userId: 'usr_vivek_01',
      courseId: 'c_spring_boot_01',
      studentName: 'Vivek singh',
      courseTitle: 'Java Spring Framework, Spring Boot, Spring AI - Gen AI',
      instructorName: 'Navin Reddy, Telusko Edutech',
      issuedDate: 'March 26, 2026',
      totalHours: 55,
      totalLectures: 500,
      certificateNumber: 'UC-48d475b3-3dd7-443d-bfef-ab611f8f1937',
      certificateUrl: 'ude.my/UC-48d475b3-3dd7-443d-bfef-ab611f8f1937',
      referenceNumber: '0004',
      pdfUrl: '/certificates/UC-48d475b3-3dd7-443d-bfef-ab611f8f1937.pdf'
    }
  ],
  courses: [
    {
      id: 'c_spring_boot_01',
      slug: 'spring-5-with-spring-boot-2',
      title: 'Java Spring Framework, Spring Boot, Spring AI - Gen AI',
      subtitle: 'Master Java, Spring and Spring Boot, Spring Security, Spring AI, Docker and Microservices with Telusko',
      instructorName: 'Navin Reddy',
      instructorOrg: 'Telusko Edutech',
      thumbnailUrl: '/images/thumbnails/spring-framework-navin.png',
      price: 569.00,
      originalPrice: 3639.00,
      rating: 4.5,
      ratingsCount: 45717,
      studentsCount: 291681,
      totalHours: 55,
      isBestseller: true,
      isPremium: true,
      category: 'Development',
      sections: [
        {
          id: 'sec_1',
          title: 'Section 1: Introduction to Spring Framework',
          order: 1,
          lectures: [
            { id: 'lec_101', lectureNumber: 1, title: 'Introduction to Spring & Dependency Injection', durationMinutes: 12, hasResources: true, isCompleted: true },
            { id: 'lec_102', lectureNumber: 2, title: 'Spring Core Architecture & IoC Container', durationMinutes: 15, hasResources: true, isCompleted: true }
          ]
        },
        {
          id: 'sec_2',
          title: 'Section 14: Database Connectivity, JDBC & Postgres',
          order: 14,
          lectures: [
            { id: 'lec_122', lectureNumber: 122, title: '122. Postgres Setup', durationMinutes: 9, hasResources: true, isCompleted: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
            { id: 'lec_123', lectureNumber: 123, title: '123. JDBC Steps', durationMinutes: 5, hasResources: true, isCompleted: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
            { id: 'lec_124', lectureNumber: 124, title: '124. Postgres Library jar', durationMinutes: 4, hasResources: true, isCompleted: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
            { id: 'lec_125', lectureNumber: 125, title: '125. Connecting Java and DB', durationMinutes: 9, hasResources: true, isCompleted: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
            { id: 'lec_126', lectureNumber: 126, title: '126. Execute and Process', durationMinutes: 11, hasResources: true, isCompleted: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
            { id: 'lec_127', lectureNumber: 127, title: '127. Fetching all Records', durationMinutes: 6, hasResources: true, isCompleted: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4' },
            { id: 'lec_128', lectureNumber: 128, title: '128. Crud operations', durationMinutes: 8, hasResources: true, isCompleted: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
            { id: 'lec_129', lectureNumber: 129, title: '129. Problems with Statement', durationMinutes: 5, hasResources: true, isCompleted: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' },
            { id: 'lec_130', lectureNumber: 130, title: '130. PreparedStatement', durationMinutes: 5, hasResources: true, isCompleted: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4' },
            { id: 'quiz_6', lectureNumber: 131, title: 'Quiz 6: Quiz 6', durationMinutes: 10, hasResources: false, isCompleted: true, isQuiz: true }
          ]
        }
      ]
    },
    {
      id: 'c_spring_darby_01',
      slug: 'spring-hibernate-tutorial',
      title: 'Spring Boot 4, Spring 7 & Hibernate for Beginners',
      subtitle: 'Spring Boot 4: Learn Spring 7, Spring Core, Spring REST, Spring Security, JPA, Hibernate, Swagger, Spring MVC, MySQL',
      instructorName: 'Chad Darby',
      instructorOrg: 'Luv2Code',
      thumbnailUrl: '/images/thumbnails/spring-boot-darby.png',
      price: 4229.00,
      originalPrice: 4229.00,
      rating: 4.6,
      ratingsCount: 95324,
      studentsCount: 465653,
      totalHours: 33.5,
      isBestseller: true,
      isHighestRated: true,
      isPremium: true,
      category: 'Development'
    },
    {
      id: 'c_angular_spring_darby',
      slug: 'full-stack-angular-spring-boot-tutorial',
      title: 'Full Stack: Angular and Java Spring Boot E-Commerce Website',
      subtitle: 'Build a Full Stack E-Commerce website with Angular and Java Spring Boot (includes Stripe Credit Card Payments)',
      instructorName: 'Chad Darby, Harinath Kuntamukkala',
      thumbnailUrl: '/images/thumbnails/angular-spring-darby.png',
      price: 4319.00,
      originalPrice: 4319.00,
      rating: 4.6,
      ratingsCount: 11698,
      studentsCount: 120844,
      totalHours: 36.5,
      isBestseller: true,
      isPremium: true,
      category: 'Development'
    },
    {
      id: 'c_ai_engineer_donner',
      slug: 'llm-engineering-master-ai-and-large-language-models',
      title: 'AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents',
      subtitle: 'Become an LLM Engineer in 8 weeks: Build and deploy 8 LLM apps, mastering Generative AI, RAG, LoRA and AI Agents.',
      instructorName: 'Ligency, Ed Donner',
      thumbnailUrl: '/images/thumbnails/ai-engineer-core-donner.png',
      price: 3289.00,
      originalPrice: 3289.00,
      rating: 4.7,
      ratingsCount: 41466,
      studentsCount: 342869,
      totalHours: 33.5,
      isBestseller: true,
      isHighestRated: true,
      isPremium: true,
      category: 'Development'
    },
    {
      id: 'c_python_bootcamp_angela',
      slug: '100-days-of-code',
      title: '100 Days of Code™: The Complete Python Pro Bootcamp',
      subtitle: 'Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!',
      instructorName: 'Dr. Angela Yu',
      instructorOrg: 'Developer and Lead Instructor',
      thumbnailUrl: '/images/thumbnails/python-bootcamp-angela.png',
      price: 3199.00,
      originalPrice: 3199.00,
      rating: 4.7,
      ratingsCount: 435841,
      studentsCount: 1879109,
      totalHours: 56.8,
      isBestseller: true,
      isPremium: true,
      category: 'Development'
    },
    {
      id: 'c_google_flow_rev',
      slug: 'the-complete-google-flow-course-beginner-to-pro',
      title: 'The Complete Google Flow Course: Beginner to Pro',
      subtitle: 'The ultimate guide to FLOW video production. Master VEO, OMNI, Nano Banana, Agent, AI TOOLS and more.',
      instructorName: 'Coding Revolution',
      thumbnailUrl: '/images/thumbnails/google-flow-coding-rev.png',
      price: 1239.00,
      originalPrice: 1239.00,
      rating: 4.7,
      ratingsCount: 63,
      studentsCount: 368,
      totalHours: 7.8,
      isBestseller: false,
      isHighestRated: true,
      isNew: true,
      category: 'Development'
    },
    {
      id: 'c_rec_01',
      slug: 'industry-ready-java-spring-boot-cloud-spring-ai',
      title: 'Industry-Ready Java Spring Boot: Cloud, and Spring AI',
      subtitle: 'Build production-grade microservices with Spring Cloud, Docker, Kubernetes and Spring AI LLM orchestrations',
      instructorName: 'Navin Reddy',
      instructorOrg: 'Telusko Edutech, Hyder...',
      thumbnailUrl: '/images/thumbnails/spring-cloud-ai-navin.png',
      price: 449.00,
      originalPrice: 1919.00,
      rating: 4.5,
      ratingsCount: 521,
      studentsCount: 14200,
      totalHours: 38,
      isBestseller: true,
      isPremium: true,
      category: 'Development'
    },
    {
      id: 'c_rec_02',
      slug: 'spring-spring-boot-ai-security-docker-cloud',
      title: 'Spring & Spring Boot: AI, Security, Docker, Cloud',
      subtitle: 'Comprehensive Spring Boot 3 masterclass featuring OAuth2, Spring Security 6, and production containerization',
      instructorName: 'Navin Reddy',
      instructorOrg: 'Telusko Edutech',
      thumbnailUrl: '/images/thumbnails/spring-ai-security-navin.png',
      price: 509.00,
      originalPrice: 2949.00,
      rating: 4.6,
      ratingsCount: 1127,
      studentsCount: 32000,
      totalHours: 42,
      isPremium: true,
      category: 'Development'
    },
    {
      id: 'c_rec_03',
      slug: 'full-stack-java-dev-jsp-spring-boot-js-react',
      title: 'FULL STACK JAVA DEV: JAVA + JSP + SPRING + BOOT + JS + REACT',
      subtitle: 'End-to-end full stack architecture from core Java fundamentals to full blown React frontend with Spring REST API',
      instructorName: 'StudyEasy Organization',
      instructorOrg: 'Chaand...',
      thumbnailUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&auto=format&fit=crop&q=80',
      price: 609.00,
      originalPrice: 4229.00,
      rating: 4.4,
      ratingsCount: 13308,
      studentsCount: 88500,
      totalHours: 64,
      isBestseller: true,
      isPremium: true,
      category: 'Development'
    },
    {
      id: 'c_rec_04',
      slug: 'java-spring-boot-full-stack-ecommerce-project-masterclass',
      title: 'Java Spring Boot Full Stack: eCommerce Project Masterclass',
      subtitle: 'Build and deploy a real-world multi-vendor ecommerce portal with Stripe payments, AWS S3 and Spring Boot',
      instructorName: 'Faisal Memon (EmbarkX)',
      instructorOrg: 'EmbarkX...',
      thumbnailUrl: '/images/thumbnails/spring-ecommerce-embarkx.png',
      price: 499.00,
      originalPrice: 3319.00,
      rating: 4.5,
      ratingsCount: 3623,
      studentsCount: 24800,
      totalHours: 31,
      isBestseller: true,
      isPremium: true,
      category: 'Development'
    },
    {
      id: 'c_rec_05',
      slug: 'become-a-java-full-stack-developer-with-react-spring-boot',
      title: 'Become a Java Full Stack Developer with React & Spring Boot',
      subtitle: 'Hands-on guide to mastering Java backend, Spring Data JPA, JWT authentication, and modern React with hooks',
      instructorName: 'Madan Reddy',
      instructorOrg: 'Eazy Bytes',
      thumbnailUrl: '/images/thumbnails/java-fullstack-react-madan.png',
      price: 479.00,
      originalPrice: 799.00,
      rating: 4.6,
      ratingsCount: 1199,
      studentsCount: 19400,
      totalHours: 49,
      isBestseller: true,
      isPremium: true,
      category: 'Development'
    },
    {
      id: 'c_rec_06',
      slug: 'full-stack-java-developer-with-java-spring-boot-react',
      title: 'Full Stack Java Developer with Java, Spring boot + React',
      subtitle: 'From zero to full-stack engineer: build modular single-page applications connected to enterprise microservices',
      instructorName: 'Kasi Gopi',
      thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80',
      price: 449.00,
      originalPrice: 1669.00,
      rating: 4.8,
      ratingsCount: 32,
      studentsCount: 1450,
      totalHours: 28,
      isHighestRated: true,
      category: 'Development'
    },
    {
      id: 'c_rec_07',
      slug: 'full-stack-java-developer-with-react-spring-boot-and-ai',
      title: 'Full Stack Java Developer with React & Spring Boot and AI',
      subtitle: 'Integrate generative AI capabilities into Java fullstack web applications using LangChain4j and Spring AI',
      instructorName: 'Raj Kumar Thokala',
      thumbnailUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
      price: 449.00,
      originalPrice: 799.00,
      rating: 4.8,
      ratingsCount: 30,
      studentsCount: 1200,
      totalHours: 35,
      category: 'Development'
    },
    {
      id: 'c_rec_08',
      slug: 'java-full-stack-developer-with-react-spring-boot-course',
      title: 'Java Full Stack Developer with React & Spring Boot Course',
      subtitle: 'Practical enterprise projects covering Spring Data, Spring Security, REST APIs and responsive UI design',
      instructorName: 'Raj Kumar Thokala',
      thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
      price: 449.00,
      originalPrice: 799.00,
      rating: 4.9,
      ratingsCount: 27,
      studentsCount: 950,
      totalHours: 32,
      isHighestRated: true,
      category: 'Development'
    },
    {
      id: 'c_rec_09',
      slug: 'build-an-java-full-stack-project-ai-powered-job-portal',
      title: 'Build an Java Full Stack Project: AI Powered Job Portal',
      subtitle: 'Create a smart candidate-matching portal using Spring Boot 3, React 18, and vector search with OpenAI embeddings',
      instructorName: 'Ashok Zarmariya',
      thumbnailUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format&fit=crop&q=80',
      price: 449.00,
      originalPrice: 1919.00,
      rating: 4.1,
      ratingsCount: 10,
      studentsCount: 650,
      totalHours: 24,
      isNew: true,
      isPremium: true,
      category: 'Development'
    },
    {
      id: 'c_rec_10',
      slug: 'java-full-stack-spring-boot-and-react-inc-jwt-router-redux',
      title: 'Java Full stack Spring Boot and React (Inc JWT,Router,Redux)',
      subtitle: 'Deep dive into state management, JWT auth tokens, interceptors, and Spring Boot REST web services',
      instructorName: 'Senol Atac',
      thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
      price: 489.00,
      originalPrice: 2559.00,
      rating: 4.1,
      ratingsCount: 109,
      studentsCount: 4200,
      totalHours: 26,
      category: 'Development'
    },
    {
      id: 'c_rec_11',
      slug: 'fundamentals-of-backend-engineering',
      title: 'Fundamentals of Backend Engineering',
      subtitle: 'Protocols, system architecture, database internals, threading models, TLS, HTTP/2/3, proxies and caching',
      instructorName: 'Hussein Nasser',
      thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
      price: 449.00,
      originalPrice: 2299.00,
      rating: 4.7,
      ratingsCount: 12400,
      studentsCount: 82000,
      totalHours: 19,
      isPremium: true,
      category: 'Development'
    },
    {
      id: 'c_rec_12',
      slug: 'fundamentals-of-database-engineering',
      title: 'Fundamentals of Database Engineering',
      subtitle: 'Indexing algorithms, ACID transactions, partitioning, sharding, replication, concurrency control and engines',
      instructorName: 'Hussein Nasser',
      thumbnailUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80',
      price: 449.00,
      originalPrice: 2299.00,
      rating: 4.8,
      ratingsCount: 18200,
      studentsCount: 110000,
      totalHours: 23,
      isPremium: true,
      category: 'Development'
    },
    {
      id: 'c_rec_13',
      slug: 'from-java-dev-to-ai-engineer-spring-ai-fast-track',
      title: 'From Java Dev to AI Engineer: Spring AI Fast Track',
      subtitle: 'Bridge traditional Java expertise into AI engineering: RAG, function calling, agents, and multi-model routing',
      instructorName: 'Madan Reddy',
      instructorOrg: 'Eazy Bytes',
      thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      price: 449.00,
      originalPrice: 1999.00,
      rating: 4.6,
      ratingsCount: 450,
      studentsCount: 3800,
      totalHours: 18,
      isPremium: true,
      category: 'Development'
    },
    {
      id: 'c_rec_14',
      slug: 'understanding-deployment-core-concepts',
      title: 'Understanding Deployment: Core Concepts',
      subtitle: 'CI/CD pipelines, Docker containers, Kubernetes pods, Helm charts, Nginx reverse proxies and cloud rollouts',
      instructorName: 'Joseph Heidari',
      thumbnailUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&q=80',
      price: 449.00,
      originalPrice: 1799.00,
      rating: 4.5,
      ratingsCount: 880,
      studentsCount: 6500,
      totalHours: 15,
      isPremium: true,
      category: 'Development'
    },
    {
      id: 'c_rec_15',
      slug: 'software-architecture-design-of-modern-large-scale-systems',
      title: 'Software Architecture & Design of Modern Large Scale Systems',
      subtitle: 'Enterprise design patterns, high availability, event-driven microservices, CAP theorem, and Kafka streaming',
      instructorName: 'Michael Pogrebinsky',
      thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
      price: 499.00,
      originalPrice: 3499.00,
      rating: 4.7,
      ratingsCount: 31200,
      studentsCount: 165000,
      totalHours: 33,
      isPremium: true,
      category: 'Development'
    },
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
      thumbnailUrl: '/images/thumbnails/webdev-hitesh.png',
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
      thumbnailUrl: 'https://images.unsplash.com/photo-1579468118864-ddb813ec7167?w=600&auto=format&fit=crop&q=80',
      price: 549.00,
      originalPrice: 3549.00,
      rating: 4.7,
      ratingsCount: 234032,
      studentsCount: 920000,
      totalHours: 69,
      isBestseller: true,
      isPremium: true,
      category: 'Development'
    },
    {
      id: 'c_fastapi_eric',
      slug: 'fastapi-the-complete-course-2026',
      title: 'FastAPI - The Complete Course 2026 (Beginner + Advanced)',
      subtitle: 'Master modern, fast (high-performance), web frameworks for building APIs with Python 3.10+ and ASGI servers',
      instructorName: 'Eric Roby, Chad Darby',
      thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
      price: 539.00,
      originalPrice: 3439.00,
      rating: 4.5,
      ratingsCount: 13682,
      studentsCount: 58000,
      totalHours: 21,
      isBestseller: true,
      isPremium: true,
      category: 'Development'
    },
    {
      id: 'c_angular_max',
      slug: 'angular-the-complete-guide',
      title: 'Angular - The Complete Guide',
      subtitle: 'Master Angular (formerly Angular 2) and build awesome, reactive web apps with the successor of Angular.js',
      instructorName: 'Maximilian Schwarzmüller',
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
  ]
};

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.ensureDirectory();
    this.data = this.load();
  }

  private getDbPath(): string {
    const cwd = process.cwd();
    const possiblePaths = [
      path.join(cwd, 'data', 'store.json'),
      path.join(cwd, 'backend', 'data', 'store.json'),
      path.join(path.dirname(cwd), 'data', 'store.json'),
      path.join(path.dirname(cwd), 'backend', 'data', 'store.json')
    ];
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) return p;
    }
    return path.join(cwd, 'data', 'store.json');
  }

  private ensureDirectory() {
    const dbPath = this.getDbPath();
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  private load(): DatabaseSchema {
    try {
      const dbPath = this.getDbPath();
      if (fs.existsSync(dbPath)) {
        const raw = fs.readFileSync(dbPath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.users && parsed.courses) {
          // Merge missing courses from INITIAL_DATA
          INITIAL_DATA.courses.forEach(initCourse => {
            if (!parsed.courses.some((c: Course) => c.id === initCourse.id)) {
              parsed.courses.unshift(initCourse);
            }
          });
          // Merge missing enrollments from INITIAL_DATA
          INITIAL_DATA.enrolledCourseIds.forEach(initEnroll => {
            const existing = parsed.enrolledCourseIds.find((e: any) => e.userId === initEnroll.userId && e.courseId === initEnroll.courseId);
            if (!existing) {
              parsed.enrolledCourseIds.push(initEnroll);
            } else if (!existing.completedAt) {
              existing.completedAt = initEnroll.completedAt;
              existing.userRating = 5;
            }
          });
          // Ensure Vivek's course prices are updated
          const spring = parsed.courses.find((c: Course) => c.id === 'c_spring_boot_01');
          if (spring) {
            spring.price = 569.00;
            spring.originalPrice = 3639.00;
            spring.ratingsCount = 45717;
          }
          this.persist(parsed);
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading DB file, fallback to initial data:', e);
    }
    this.persist(INITIAL_DATA);
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }

  private persist(data: DatabaseSchema) {
    const targets = [
      path.join(process.cwd(), 'data', 'store.json'),
      path.join(process.cwd(), 'backend', 'data', 'store.json'),
      path.join(path.dirname(process.cwd()), 'data', 'store.json'),
      path.join(path.dirname(process.cwd()), 'backend', 'data', 'store.json')
    ];
    targets.forEach(p => {
      try {
        const dir = path.dirname(p);
        if (fs.existsSync(dir)) {
          fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf-8');
        }
      } catch (err) {
        // ignore
      }
    });
  }

  public getUser(): User | null {
    if (!this.data.activeUserId) return null;
    return this.data.users.find(u => u.id === this.data.activeUserId) || null;
  }

  public login(email?: string): User {
    // If specific email or demo, find or fallback to Vivek
    let user = this.data.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
    if (!user) {
      user = this.data.users[0]; // Vivek singh
    }
    this.data.activeUserId = user.id;
    this.persist(this.data);
    return user;
  }

  public signup(name: string, email: string): User {
    const names = name.trim().split(' ');
    const firstName = names[0] || 'User';
    const lastName = names.slice(1).join(' ') || '';
    const initials = (firstName[0] + (lastName[0] || firstName[1] || '')).toUpperCase();

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      firstName,
      lastName,
      email,
      headline: 'Learner at Udemy',
      biography: '',
      language: 'English (US)',
      website: '',
      role: 'LEARNER',
      avatarInitials: initials,
      occupation: 'Learner'
    };

    this.data.users.push(newUser);
    this.data.activeUserId = newUser.id;
    this.persist(this.data);
    return newUser;
  }

  public logout(): void {
    this.data.activeUserId = null;
    this.persist(this.data);
  }

  public updateUser(updates: Partial<User>): User {
    const current = this.getUser();
    if (!current) throw new Error('Not authenticated');

    const index = this.data.users.findIndex(u => u.id === current.id);
    const updated = {
      ...current,
      ...updates,
      name: updates.firstName && updates.lastName 
        ? `${updates.firstName} ${updates.lastName}` 
        : (updates.name || current.name)
    };

    this.data.users[index] = updated;
    this.persist(this.data);

    if (isSupabaseConnected()) {
      supabaseDb.upsertProfile(updated).catch(err => console.warn('[Supabase Sync Error]', err));
    }

    return updated;
  }

  public getCourses(category?: string, query?: string): Course[] {
    let result = this.data.courses;
    if (category && category !== 'All') {
      result = result.filter(c => c.category.toLowerCase() === category.toLowerCase());
    }
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.subtitle.toLowerCase().includes(q) ||
        c.instructorName.toLowerCase().includes(q)
      );
    }
    return result;
  }

  public getCourseBySlug(slug: string): Course | undefined {
    return this.data.courses.find(c => c.slug === slug || c.id === slug);
  }

  public getMyLearning(targetUserId?: string): { enrolledCourses: EnrolledCourse[]; streak: DatabaseSchema['streak'] } {
    const userId = targetUserId || this.data.activeUserId || 'usr_vivek_01';
    const userEnrollments = this.data.enrolledCourseIds.filter(e => e.userId === userId);

    const enrolledCourses: EnrolledCourse[] = userEnrollments.map(e => {
      const course = this.data.courses.find(c => c.id === e.courseId) || this.data.courses[0];
      let totalLectures = 0;
      let completedLectures = 0;

      course.sections?.forEach(sec => {
        sec.lectures.forEach(lec => {
          totalLectures++;
          const isCompleted = !!this.data.lectureProgress[`${userId}_${course.id}_${lec.id}`];
          if (isCompleted) completedLectures++;
        });
      });

      const progressPercent = e.completedAt 
        ? 100 
        : (totalLectures > 0 ? Math.round((completedLectures / totalLectures) * 100) : 100);

      return {
        course,
        enrolledAt: e.enrolledAt,
        completedAt: e.completedAt || (progressPercent === 100 ? '2026-03-02T16:45:00Z' : undefined),
        progressPercent,
        userRating: e.userRating || 5,
        completedLecturesCount: totalLectures > 0 ? totalLectures : 10,
        totalLecturesCount: totalLectures > 0 ? totalLectures : 10
      };
    });

    return {
      enrolledCourses,
      streak: this.data.streak
    };
  }

  public getPublicProfile(username?: string): { user: User; enrolledCourses: EnrolledCourse[] } {
    let targetUser = this.data.users[0]; // Default Vivek singh
    if (username) {
      const lower = username.toLowerCase();
      const match = this.data.users.find(u => 
        u.id.toLowerCase() === lower || 
        u.name.toLowerCase().replace(/\s+/g, '-') === lower ||
        u.firstName.toLowerCase() === lower ||
        lower.includes('vivek')
      );
      if (match) targetUser = match;
    }
    const myLearning = this.getMyLearning(targetUser.id);
    return {
      user: targetUser,
      enrolledCourses: myLearning.enrolledCourses
    };
  }

  public toggleLecture(courseId: string, lectureId: string): { 
    isCompleted: boolean; 
    progressPercent: number; 
    completedCount: number; 
    totalCount: number 
  } {
    const userId = this.data.activeUserId || 'usr_vivek_01';
    const key = `${userId}_${courseId}_${lectureId}`;
    const nextState = !this.data.lectureProgress[key];
    this.data.lectureProgress[key] = nextState;

    const course = this.data.courses.find(c => c.id === courseId || c.slug === courseId);
    let totalCount = 0;
    let completedCount = 0;

    if (course && course.sections) {
      course.sections.forEach(sec => {
        sec.lectures.forEach(lec => {
          totalCount++;
          if (this.data.lectureProgress[`${userId}_${course.id}_${lec.id}`]) {
            completedCount++;
          }
        });
      });
    }

    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    
    // Update enrolled course completion status if 100%
    const enrollment = this.data.enrolledCourseIds.find(e => e.userId === userId && e.courseId === course?.id);
    if (enrollment) {
      if (progressPercent === 100 && !enrollment.completedAt) {
        enrollment.completedAt = new Date().toISOString();
      } else if (progressPercent < 100) {
        enrollment.completedAt = undefined;
      }
    }

    this.persist(this.data);

    if (isSupabaseConnected() && course) {
      supabaseDb.setLectureProgress(userId, course.id, lectureId, nextState).catch(err => console.warn('[Supabase Sync Error]', err));
    }

    return {
      isCompleted: nextState,
      progressPercent,
      completedCount,
      totalCount
    };
  }

  public getLectureProgress(courseId: string): Record<string, boolean> {
    const userId = this.data.activeUserId || 'usr_vivek_01';
    const res: Record<string, boolean> = {};
    const prefix = `${userId}_${courseId}_`;
    for (const [k, v] of Object.entries(this.data.lectureProgress)) {
      if (k.startsWith(prefix)) {
        res[k.replace(prefix, '')] = v;
      }
    }
    return res;
  }

  public getPurchases(): Order[] {
    return this.data.orders;
  }

  public getOrderById(orderId: string): Order | undefined {
    return this.data.orders.find(o => o.id === orderId || o.orderNumber === orderId);
  }

  public getCart(): { items: CartItem[]; total: number } {
    const items = this.data.cart
      .map(id => {
        const course = this.data.courses.find(c => c.id === id);
        return course ? { courseId: id, course, addedAt: new Date().toISOString() } : null;
      })
      .filter((item): item is CartItem => item !== null);

    const total = items.reduce((sum, i) => sum + i.course.price, 0);
    return { items, total };
  }

  public addToCart(courseId: string): boolean {
    if (!this.data.cart.includes(courseId)) {
      this.data.cart.push(courseId);
      this.persist(this.data);
      return true;
    }
    return false;
  }

  public removeFromCart(courseId: string): boolean {
    this.data.cart = this.data.cart.filter(id => id !== courseId);
    this.persist(this.data);
    return true;
  }

  public checkout(paymentMethod: string = '₹469.00 UPI'): Order {
    const { items, total } = this.getCart();
    if (items.length === 0) {
      throw new Error('Cart is empty');
    }

    const userId = this.data.activeUserId || 'usr_vivek_01';
    const firstItem = items[0];
    const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
    const tax = Math.round(total * 0.18 * 100) / 100;
    const subtotal = Math.round((total - tax) * 100) / 100;

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      courseId: firstItem.courseId,
      courseTitle: items.map(i => i.course.title).join(', '),
      totalPrice: total,
      paymentType: paymentMethod,
      status: 'COMPLETED',
      invoiceNumber,
      transactionRef: `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}/user@okaxis`,
      subtotal,
      tax
    };

    this.data.orders.unshift(newOrder);

    // Enroll in courses
    items.forEach(i => {
      if (!this.data.enrolledCourseIds.some(e => e.userId === userId && e.courseId === i.courseId)) {
        this.data.enrolledCourseIds.push({
          userId,
          courseId: i.courseId,
          enrolledAt: new Date().toISOString()
        });
      }
    });

    // Clear cart
    this.data.cart = [];
    this.persist(this.data);

    if (isSupabaseConnected()) {
      items.forEach(i => {
        supabaseDb.enrollUserCourse(userId, i.courseId).catch(err => console.warn('[Supabase Sync Error]', err));
      });
    }

    return newOrder;
  }

  public getCertificate(courseSlugOrId: string): CertificateData | null {
    const byId = this.getCertificateById(courseSlugOrId);
    if (byId) return byId;

    const course = this.getCourseBySlug(courseSlugOrId) || this.data.courses.find(c => c.id === courseSlugOrId);
    if (!course) return null;

    const stored = (this.data.certificates || []).find(c => c.courseId === course.id);
    if (stored) return stored;

    const user = this.getUser() || this.data.users[0];
    return {
      id: `UC-${course.id.toUpperCase()}-${user.id.toUpperCase()}`,
      userId: user.id,
      courseId: course.id,
      certificateNumber: `UC-${course.id.toUpperCase()}-${user.id.toUpperCase()}`,
      studentName: user.name,
      courseTitle: course.title,
      instructorName: course.instructorName,
      totalHours: course.totalHours,
      totalLectures: 500,
      issuedDate: 'March 26, 2026',
      certificateUrl: `ude.my/UC-${course.id.toUpperCase()}-${user.id.toUpperCase()}`,
      referenceNumber: '0004',
      pdfUrl: '/certificates/UC-48d475b3-3dd7-443d-bfef-ab611f8f1937.pdf'
    };
  }

  public getCertificateById(certId: string): CertificateData | null {
    if (!this.data.certificates) return null;
    return this.data.certificates.find(
      c => c.id.toLowerCase() === certId.toLowerCase() ||
           c.certificateNumber.toLowerCase() === certId.toLowerCase()
    ) || null;
  }

  public getOrderByNumber(orderNumber: string): Order | null {
    return this.data.orders.find(
      o => o.orderNumber === orderNumber || o.id === orderNumber
    ) || null;
  }
}

export const db = new Database();
