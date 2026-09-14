import fs from 'fs';
import path from 'path';

const storePaths = [
  path.join(process.cwd(), 'backend', 'data', 'store.json'),
  path.join(process.cwd(), 'data', 'store.json')
];

for (const p of storePaths) {
  if (!fs.existsSync(p)) continue;
  const raw = fs.readFileSync(p, 'utf-8');
  const data = JSON.parse(raw);

  // Find active user or primary user
  const activeUser = data.users.find(u => u.id === data.activeUserId) || data.users[0] || {
    id: "usr_1789421025059",
    name: "Abindas P",
    email: "abindasp2006@gmail.com"
  };

  const userId = activeUser.id;
  const userName = activeUser.name || "Abindas P";
  const userEmail = activeUser.email || "abindasp2006@gmail.com";

  // 1. Set randomized dates across 3 years (2024, 2025, 2026) with exact matching payment amounts
  data.orders = [
    {
      id: "ord_20260227_3289",
      orderNumber: "AD-9421415025",
      date: "Feb. 27, 2026",
      courseId: "c_ai_engineer_donner",
      courseTitle: "AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents",
      totalPrice: 3289.00,
      paymentType: "₹3,289.00 UPI",
      status: "COMPLETED",
      invoiceNumber: "IN2026-02-2750101",
      transactionRef: `UPI/896975291481/${userEmail.split('@')[0]}@okaxis`,
      subtotal: 2696.98,
      tax: 592.02,
      couponCode: "MT260223G1B",
      customerName: userName,
      customerEmail: userEmail,
      supplierName: "Udemy India LLP",
      supplierAddress: "10th Floor, ResCowork 07, Tower B, Unitech Cyber Park, Sector 39, Gurgaon, Haryana, India, 122003",
      supplierWebsite: "udemy.com"
    },
    {
      id: "ord_20260115_3199",
      orderNumber: "AD-9421257826",
      date: "Jan 15, 2026",
      courseId: "c_python_bootcamp_angela",
      courseTitle: "100 Days of Code™: The Complete Python Pro Bootcamp",
      totalPrice: 3199.00,
      paymentType: "Credit / Debit Card",
      status: "COMPLETED",
      invoiceNumber: "IN2026-01-4980201",
      transactionRef: `CARD/821904024105/${userEmail.split('@')[0]}`,
      subtotal: 2623.18,
      tax: 575.82,
      couponCode: "MT260223G1B",
      customerName: userName,
      customerEmail: userEmail,
      supplierName: "Udemy India LLP",
      supplierAddress: "10th Floor, ResCowork 07, Tower B, Unitech Cyber Park, Sector 39, Gurgaon, Haryana, India, 122003",
      supplierWebsite: "udemy.com"
    },
    {
      id: "ord_20250822_4319",
      orderNumber: "AD-9421065315",
      date: "Aug 22, 2025",
      courseId: "c_angular_spring_darby",
      courseTitle: "Full Stack: Angular and Java Spring Boot E-Commerce Website",
      totalPrice: 4319.00,
      paymentType: "₹4,319.00 UPI",
      status: "COMPLETED",
      invoiceNumber: "IN2025-08-7393119",
      transactionRef: `UPI/593953914720/${userEmail.split('@')[0]}@okaxis`,
      subtotal: 3541.58,
      tax: 777.42,
      couponCode: "MT260223G1B",
      customerName: userName,
      customerEmail: userEmail,
      supplierName: "Udemy India LLP",
      supplierAddress: "10th Floor, ResCowork 07, Tower B, Unitech Cyber Park, Sector 39, Gurgaon, Haryana, India, 122003",
      supplierWebsite: "udemy.com"
    },
    {
      id: "ord_20241018_469",
      orderNumber: "AD-666D4B735A484B686B71694659673D3D",
      date: "Oct 18, 2024",
      courseId: "c_spring_boot_01",
      courseTitle: "Java Spring Framework, Spring Boot, Spring AI - Gen AI",
      totalPrice: 469.00,
      paymentType: "₹469.00 UPI",
      status: "COMPLETED",
      invoiceNumber: "IN2024-10-3848672",
      transactionRef: `UPI/405781920391/${userEmail.split('@')[0]}@okaxis`,
      subtotal: 397.46,
      tax: 71.54,
      couponCode: "MT260223G1B",
      customerName: userName,
      customerEmail: userEmail,
      supplierName: "Udemy India LLP",
      supplierAddress: "10th Floor, ResCowork 07, Tower B, Unitech Cyber Park, Sector 39, Gurgaon, Haryana, India, 122003",
      supplierWebsite: "udemy.com"
    }
  ];

  // 2. Set all 4 enrolled courses with 100% complete
  data.enrolledCourseIds = [
    {
      userId: userId,
      courseId: "c_spring_boot_01",
      enrolledAt: "2024-10-18T10:30:00.000Z",
      completedAt: "2024-11-20T16:00:00.000Z",
      userRating: 5
    },
    {
      userId: userId,
      courseId: "c_angular_spring_darby",
      enrolledAt: "2025-08-22T14:15:00.000Z",
      completedAt: "2025-09-30T18:00:00.000Z",
      userRating: 5
    },
    {
      userId: userId,
      courseId: "c_python_bootcamp_angela",
      enrolledAt: "2026-01-15T09:40:00.000Z",
      completedAt: "2026-02-14T12:00:00.000Z",
      userRating: 5
    },
    {
      userId: userId,
      courseId: "c_ai_engineer_donner",
      enrolledAt: "2026-02-27T16:20:00.000Z",
      completedAt: "2026-03-25T14:30:00.000Z",
      userRating: 5
    }
  ];

  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Updated ${p} with 4 enrolled courses (100% complete) and 4 orders spanning 2024, 2025, 2026!`);
}
