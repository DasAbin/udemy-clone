async function verify() {
  console.log('=== Checking API /api/users/profile/vivek-pratap-singh-101 ===');
  const res = await fetch('http://localhost:5001/api/users/profile/vivek-pratap-singh-101');
  const data = await res.json();
  console.log('User Name:', data.user?.name);
  console.log('Role:', data.user?.role);
  console.log('Enrolled Courses Count:', data.enrolledCourses?.length);
  data.enrolledCourses?.forEach((e, idx) => {
    console.log(`  [${idx + 1}] ${e.course.title}`);
    console.log(`      Progress: ${e.progressPercent}%, CompletedAt: ${e.completedAt}`);
    console.log(`      Sale Price: ₹${e.course.price}, Full Price: ₹${e.course.originalPrice}`);
  });

  console.log('\n=== Checking API /api/courses ===');
  const res2 = await fetch('http://localhost:5001/api/courses');
  const data2 = await res2.json();
  console.log('Total Courses Count:', data2.count);
  const angela = data2.courses?.find(c => c.id === 'c_webdev_angela');
  const hitesh = data2.courses?.find(c => c.id === 'c_webdev_hitesh');
  const jonas = data2.courses?.find(c => c.id === 'c_js_jonas');
  const fastapi = data2.courses?.find(c => c.id === 'c_fastapi_eric');
  console.log('Found Angela Yu:', !!angela, 'Price:', angela?.price, 'Original:', angela?.originalPrice);
  console.log('Found Hitesh Choudhary:', !!hitesh, 'Price:', hitesh?.price, 'Original:', hitesh?.originalPrice);
  console.log('Found Jonas JavaScript:', !!jonas, 'Price:', jonas?.price, 'Original:', jonas?.originalPrice);
  console.log('Found FastAPI:', !!fastapi, 'Price:', fastapi?.price, 'Original:', fastapi?.originalPrice);

  console.log('\n=== Checking Frontend Server Response ===');
  const res3 = await fetch('http://localhost:5173/user/vivek-pratap-singh-101');
  console.log('Frontend /user/vivek-pratap-singh-101 Status:', res3.status);
  const res4 = await fetch('http://localhost:5173/');
  console.log('Frontend / Status:', res4.status);
}

verify().catch(console.error);
