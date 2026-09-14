export interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  headline: string;
  biography: string;
  language: string;
  website: string;
  role: 'LEARNER' | 'INSTRUCTOR' | 'ADMIN';
  avatarInitials: string;
  occupation: string;
  password?: string;
}

export interface Lecture {
  id: string;
  lectureNumber: number;
  title: string;
  durationMinutes: number;
  videoUrl?: string;
  hasResources: boolean;
  isCompleted: boolean;
  isQuiz?: boolean;
}

export interface Section {
  id: string;
  title: string;
  order: number;
  lectures: Lecture[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  instructorName: string;
  instructorOrg?: string;
  thumbnailUrl: string;
  price: number;
  originalPrice: number;
  rating: number;
  ratingsCount: number;
  studentsCount: number;
  totalHours: number;
  isBestseller?: boolean;
  isHighestRated?: boolean;
  isPremium?: boolean;
  isNew?: boolean;
  category: string;
  sections?: Section[];
  description?: string;
  requirements?: string[];
  whatYouWillLearn?: string[];
}

export interface EnrolledCourse {
  course: Course;
  enrolledAt: string;
  completedAt?: string;
  progressPercent: number;
  userRating?: number;
  completedLecturesCount: number;
  totalLecturesCount: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  courseId: string;
  courseTitle: string;
  totalPrice: number;
  paymentType: string;
  status: 'COMPLETED' | 'PENDING' | 'REFUNDED';
  invoiceNumber: string;
  transactionRef: string;
  subtotal: number;
  tax: number;
  couponCode?: string;
  customerName?: string;
  customerEmail?: string;
  supplierName?: string;
  supplierAddress?: string;
  supplierWebsite?: string;
}

export interface CartItem {
  courseId: string;
  course: Course;
  addedAt: string;
}

export interface CertificateData {
  id: string;
  userId: string;
  courseId: string;
  studentName: string;
  courseTitle: string;
  instructorName: string;
  issuedDate: string;
  totalHours: number;
  totalLectures: number;
  certificateNumber: string;
  certificateUrl: string;
  referenceNumber: string;
  pdfUrl: string;
}
