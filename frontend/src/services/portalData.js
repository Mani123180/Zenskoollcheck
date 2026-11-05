
export const defaultPortalSchools = [
  {
    id: 'SCHOOL002',
    name: 'Sri Sankara Vidhyasala Girls High School',
    code: 'SSV-KOD',
    city: 'Kodumudi',
    phone: '+91 98456 12301',
    email: 'info@ssvgirlsschool.edu',
    principal: 'Dr. Savithri Raman',
    academicYear: '2026-2027',
    admin: 'admin@ssvschool.com',
    adminName: 'Mrs. Savithri Raman',
    username: 'admin_ssv',
    adminUsername: 'admin_ssv',
    password: 'Admin@12345',
    adminPassword: 'Admin@12345',
    financeUsername: 'finance_ssv',
    financePassword: 'Finance@12345',
    financeEmail: 'finance@ssvschool.com',
    financeName: 'School Finance Manager',
    status: 'Active',
    studentsCount: 482,
    teachersCount: 34,
    parentsCount: 460,
    subscription: 'Enterprise Plan',
    createdDate: '2026-02-15',
    board: 'State Board (Tamil Nadu)',
  },
  {
    id: 'SCHOOL001',
    name: 'ABC Matriculation School',
    code: 'ABC-CHE',
    city: 'Chennai',
    phone: '+91 94433 11223',
    email: 'contact@abcschool.com',
    principal: 'Dr. K. Ramanathan',
    academicYear: '2026-2027',
    admin: 'admin@abcschool.com',
    adminName: 'Admin Rajesh',
    username: 'admin_abcche',
    adminUsername: 'admin_abcche',
    password: 'Admin@12345',
    adminPassword: 'Admin@12345',
    financeUsername: 'finance_abcche',
    financePassword: 'Finance@12345',
    financeEmail: 'finance@abcschool.com',
    financeName: 'Finance Manager (ABC)',
    status: 'Active',
    studentsCount: 520,
    teachersCount: 28,
    parentsCount: 480,
    subscription: 'Pro Plan',
    createdDate: '2026-01-10',
    board: 'Matriculation',
  },
  {
    id: 'SCHOOL003',
    name: 'St. Marys Academy',
    code: 'STM-ERD',
    city: 'Erode',
    phone: '+91 97890 45678',
    email: 'office@stmarys.edu',
    principal: 'Fr. Thomas Varghese',
    academicYear: '2026-2027',
    admin: 'admin@stmarys.com',
    adminName: 'Admin Joseph',
    username: 'admin_stmerd',
    adminUsername: 'admin_stmerd',
    password: 'Admin@12345',
    adminPassword: 'Admin@12345',
    financeUsername: 'finance_stmerd',
    financePassword: 'Finance@12345',
    financeEmail: 'finance@stmerd.edu',
    financeName: 'Finance Manager (St. Marys)',
    status: 'Active',
    studentsCount: 650,
    teachersCount: 42,
    parentsCount: 620,
    subscription: 'Pro Plan',
    createdDate: '2026-03-01',
    board: 'ICSE',
  },
  {
    id: 'SCHOOL004',
    name: 'Delhi Public World School',
    code: 'DPW-CBE',
    city: 'Coimbatore',
    phone: '+91 94888 23456',
    email: 'contact@dpwschool.edu',
    principal: 'Mrs. Anitha Sharma',
    academicYear: '2026-2027',
    admin: 'admin@dpwschool.edu',
    adminName: 'Admin Anitha',
    username: 'admin_dpwcbe',
    adminUsername: 'admin_dpwcbe',
    password: 'Admin@12345',
    adminPassword: 'Admin@12345',
    financeUsername: 'finance_dpwcbe',
    financePassword: 'Finance@12345',
    financeEmail: 'finance@dpwschool.edu',
    financeName: 'Finance Manager (DPW)',
    status: 'Active',
    studentsCount: 710,
    teachersCount: 45,
    parentsCount: 680,
    subscription: 'Enterprise Plan',
    createdDate: '2026-02-01',
    board: 'CBSE',
  },
  {
    id: 'SCHOOL005',
    name: 'Oxford International Academy',
    code: 'OXF-CHN',
    city: 'Chennai',
    phone: '+91 91234 56789',
    email: 'admin@oxford.edu',
    principal: 'Mr. David Paul',
    academicYear: '2026-2027',
    admin: 'admin@oxford.edu',
    adminName: 'Admin Vikram',
    username: 'admin_oxfchn',
    adminUsername: 'admin_oxfchn',
    password: 'Admin@12345',
    adminPassword: 'Admin@12345',
    financeUsername: 'finance_oxfchn',
    financePassword: 'Finance@12345',
    financeEmail: 'finance@oxford.edu',
    financeName: 'Finance Manager (Oxford)',
    status: 'Active',
    studentsCount: 320,
    teachersCount: 22,
    parentsCount: 310,
    subscription: 'Basic Plan',
    createdDate: '2025-08-12',
    board: 'CBSE',
  },
];

export const defaultPortalUsers = [
  { id: 'USR001', name: 'Super Administrator', email: 'superadmin@zenschool.com', phone: '+91 98401 11001', username: 'superadmin', password: 'SuperAdmin@123', role: 'superadmin', schoolId: 'ALL', schoolName: 'Zenith Central Trust', status: 'Active', aliases: ['superadmin'] },
  { id: 'USR002', name: 'School Administrator (SSV)', email: 'admin@ssvschool.com', phone: '+91 98401 22002', username: 'admin_ssv', password: 'Admin@12345', role: 'schooladmin', schoolId: 'SCHOOL002', schoolName: 'Sri Sankara Vidhyasala Girls High School', status: 'Active', aliases: ['admin_ssv', 'admin_ssvkod', 'admin@ssvschool.com'] },
  { id: 'USR005', name: 'School Finance Manager (SSV)', email: 'finance@ssvschool.com', phone: '+91 98401 22005', username: 'finance_ssv', password: 'Finance@12345', role: 'finance', schoolId: 'SCHOOL002', schoolName: 'Sri Sankara Vidhyasala Girls High School', status: 'Active', aliases: ['finance_ssv', 'finance_ssvkod', 'finance@ssvschool.com'] },
  { id: 'USR_ABC_ADM', name: 'Admin Rajesh (ABC School)', email: 'admin@abcschool.com', phone: '+91 98401 33003', username: 'admin_abcche', password: 'Admin@12345', role: 'schooladmin', schoolId: 'SCHOOL001', schoolName: 'ABC Matriculation School', status: 'Active', aliases: ['admin_abcche', 'admin_abc', 'admin@abcschool.com'] },
  { id: 'USR012', name: 'Finance Manager (ABC School)', email: 'finance@abcschool.com', phone: '+91 98401 33012', username: 'finance_abcche', password: 'Finance@12345', role: 'finance', schoolId: 'SCHOOL001', schoolName: 'ABC Matriculation School', status: 'Active', aliases: ['finance_abcche', 'finance_abc', 'finance@abcschool.com'] },
  { id: 'USR004', name: 'Admin Joseph (St. Marys)', email: 'admin@stmarys.com', phone: '+91 98401 44004', username: 'admin_stmerd', password: 'Admin@12345', role: 'schooladmin', schoolId: 'SCHOOL003', schoolName: 'St. Marys Academy', status: 'Active', aliases: ['admin_stmerd', 'admin_stm', 'admin@stmarys.com'] },
  { id: 'USR014', name: 'Finance Manager (St. Marys)', email: 'finance@stmerd.edu', phone: '+91 98401 44014', username: 'finance_stmerd', password: 'Finance@12345', role: 'finance', schoolId: 'SCHOOL003', schoolName: 'St. Marys Academy', status: 'Active', aliases: ['finance_stmerd', 'finance_stm', 'finance@stmerd.edu'] },
  { id: 'USR006', name: 'Admin Anitha (DPW School)', email: 'admin@dpwschool.edu', phone: '+91 98401 55004', username: 'admin_dpwcbe', password: 'Admin@12345', role: 'schooladmin', schoolId: 'SCHOOL004', schoolName: 'Delhi Public World School', status: 'Active', aliases: ['admin_dpwcbe', 'admin_dpw', 'admin@dpwschool.edu'] },
  { id: 'USR016', name: 'Finance Manager (DPW School)', email: 'finance@dpwschool.edu', phone: '+91 98401 55016', username: 'finance_dpwcbe', password: 'Finance@12345', role: 'finance', schoolId: 'SCHOOL004', schoolName: 'Delhi Public World School', status: 'Active', aliases: ['finance_dpwcbe', 'finance_dpw', 'finance@dpwschool.edu'] },
  { id: 'USR005', name: 'Admin Vikram (Oxford)', email: 'admin@oxford.edu', phone: '+91 98401 55005', username: 'admin_oxfchn', password: 'Admin@12345', role: 'schooladmin', schoolId: 'SCHOOL005', schoolName: 'Oxford International Academy', status: 'Active', aliases: ['admin_oxfchn', 'admin_oxf', 'admin@oxford.edu'] },
  { id: 'USR015', name: 'Finance Manager (Oxford)', email: 'finance@oxford.edu', phone: '+91 98401 55015', username: 'finance_oxfchn', password: 'Finance@12345', role: 'finance', schoolId: 'SCHOOL005', schoolName: 'Oxford International Academy', status: 'Active', aliases: ['finance_oxfchn', 'finance_oxf', 'finance@oxford.edu'] },
];





const defaultData = {
  schools: defaultPortalSchools,
  teachers: [
    {
      id: 'T01',
      name: 'Mrs. Priya Krishnan',
      roleType: 'Teacher',
      phone: '+91 98401 23451',
      email: 'priya.k@ssvschool.com',
      address: '14, Gandhi Road, Chennai, Tamil Nadu - 600028',
      bloodGroup: 'O+',
      qualification: 'M.Sc., B.Ed',
      subject: 'Mathematics',
      onboardSubject: 'Mathematics',
      class: 'Grade 10-A',
      schoolId: 'SCHOOL002',
      status: 'Active'
    },
    {
      id: 'T02',
      name: 'Dr. Anandhi Rajan',
      roleType: 'Teacher',
      phone: '+91 98401 23452',
      email: 'anandhi.r@ssvschool.com',
      address: '88, Anna Salai, Chennai, Tamil Nadu - 600002',
      bloodGroup: 'A+',
      qualification: 'Ph.D., M.Sc., B.Ed',
      subject: 'Physics',
      onboardSubject: 'Physics',
      class: 'Grade 11-B',
      schoolId: 'SCHOOL002',
      status: 'Active'
    },
    {
      id: 'T03',
      name: 'Mrs. Selvi Murugan',
      roleType: 'Teacher',
      phone: '+91 98401 23455',
      email: 'selvi.m@ssvschool.com',
      address: '22, Kamaraj Nagar, Chennai, Tamil Nadu - 600041',
      bloodGroup: 'B+',
      qualification: 'M.Sc. Chemistry, B.Ed',
      subject: 'Chemistry',
      onboardSubject: 'Chemistry',
      class: 'Grade 9-A',
      schoolId: 'SCHOOL002',
      status: 'Active'
    }
  ],

  students: [
    {
      roll: 'S101',
      name: 'Aishwarya Kumar',
      class: 'Grade 10-A',
      schoolId: 'SCHOOL002',
      attendance: '96%',
      performance: 'Outstanding',
      parentName: 'Mr. Kumarasamy (Father)',
      parentPhone: '+91 98401 55210',
      marks: [
        { subject: 'Mathematics', max: 100, scored: 98, grade: 'A+' },
        { subject: 'Physics', max: 100, scored: 92, grade: 'A+' },
        { subject: 'Chemistry', max: 100, scored: 86, grade: 'A' },
        { subject: 'Tamil', max: 100, scored: 94, grade: 'A+' },
        { subject: 'English', max: 100, scored: 90, grade: 'A+' }
      ]
    },
    {
      roll: 'S102',
      name: 'Kavitha Selvam',
      class: 'Grade 10-A',
      schoolId: 'SCHOOL002',
      attendance: '92%',
      performance: 'Very Good',
      parentName: 'Mr. Selvam Raman (Father)',
      parentPhone: '+91 94440 88731',
      marks: [
        { subject: 'Mathematics', max: 100, scored: 88, grade: 'A' },
        { subject: 'Physics', max: 100, scored: 84, grade: 'A' },
        { subject: 'Chemistry', max: 100, scored: 90, grade: 'A+' },
        { subject: 'Tamil', max: 100, scored: 85, grade: 'A' },
        { subject: 'English', max: 100, scored: 82, grade: 'A' }
      ]
    },
    {
      roll: 'S103',
      name: 'Sandhya Ramesh',
      class: 'Grade 10-A',
      schoolId: 'SCHOOL002',
      attendance: '88%',
      performance: 'Good',
      parentName: 'Mrs. Geetha Ramesh (Mother)',
      parentPhone: '+91 98840 12399',
      marks: [
        { subject: 'Mathematics', max: 100, scored: 74, grade: 'B' },
        { subject: 'Physics', max: 100, scored: 78, grade: 'B' },
        { subject: 'Chemistry', max: 100, scored: 'AB', grade: 'AB' },
        { subject: 'Tamil', max: 100, scored: 80, grade: 'A' },
        { subject: 'English', max: 100, scored: 76, grade: 'B' }
      ]
    },
    {
      roll: 'S104',
      name: 'Deepa Venkatesh',
      class: 'Grade 10-A',
      schoolId: 'SCHOOL002',
      attendance: '94%',
      performance: 'Outstanding',
      parentName: 'Mr. Venkatesh R (Father)',
      parentPhone: '+91 97910 65421',
      marks: [
        { subject: 'Mathematics', max: 100, scored: 95, grade: 'A+' },
        { subject: 'Physics', max: 100, scored: 91, grade: 'A+' },
        { subject: 'Chemistry', max: 100, scored: 89, grade: 'A' },
        { subject: 'Tamil', max: 100, scored: 92, grade: 'A+' },
        { subject: 'English', max: 100, scored: 88, grade: 'A' }
      ]
    },
    {
      roll: 'S105',
      name: 'Meena Natarajan',
      class: 'Grade 10-A',
      schoolId: 'SCHOOL002',
      attendance: '90%',
      performance: 'Very Good',
      parentName: 'Mrs. Lakshmi Natarajan (Mother)',
      parentPhone: '+91 94451 77209',
      marks: [
        { subject: 'Mathematics', max: 100, scored: 82, grade: 'A' },
        { subject: 'Physics', max: 100, scored: 85, grade: 'A' },
        { subject: 'Chemistry', max: 100, scored: 80, grade: 'A' },
        { subject: 'Tamil', max: 100, scored: 'AB', grade: 'AB' },
        { subject: 'English', max: 100, scored: 86, grade: 'A' }
      ]
    },
    {
      roll: 'S106',
      name: 'Priyadarshini Sundaram',
      class: 'Grade 11-B',
      schoolId: 'SCHOOL002',
      attendance: '95%',
      performance: 'Outstanding',
      parentName: 'Mr. Sundaram Pillai (Father)',
      parentPhone: '+91 98412 33418',
      marks: [
        { subject: 'Mathematics', max: 100, scored: 96, grade: 'A+' },
        { subject: 'Physics', max: 100, scored: 94, grade: 'A+' },
        { subject: 'Chemistry', max: 100, scored: 90, grade: 'A+' }
      ]
    }
  ],

  classes: [
    { name: 'Grade 10-A', teacher: 'Mrs. Priya Krishnan', strength: 38, room: 'A-102', schoolId: 'SCHOOL002' },
    { name: 'Grade 10-B', teacher: 'Mr. K. Manickam', strength: 36, room: 'A-104', schoolId: 'SCHOOL002' },
    { name: 'Grade 11-B', teacher: 'Dr. Anandhi Rajan', strength: 40, room: 'B-204', schoolId: 'SCHOOL002' }
  ],

  classTimetables: [
    { className: 'Grade 10-A', day: 'Monday', period: 1, subject: 'Mathematics', teacherName: 'Mrs. Priya Krishnan', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-A', day: 'Monday', period: 2, subject: 'Tamil', teacherName: 'Mr. K. Manickam', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-A', day: 'Monday', period: 3, subject: 'English', teacherName: 'Mrs. Priya Krishnan', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-A', day: 'Monday', period: 4, subject: 'Social Science', teacherName: 'Mrs. Selvi Murugan', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-A', day: 'Monday', period: 5, subject: 'Biology', teacherName: 'Dr. Savithri Raman', schoolId: 'SCHOOL002' },

    { className: 'Grade 10-A', day: 'Tuesday', period: 1, subject: 'Tamil', teacherName: 'Mr. K. Manickam', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-A', day: 'Tuesday', period: 2, subject: 'Physics', teacherName: 'Dr. Anandhi Rajan', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-A', day: 'Tuesday', period: 3, subject: 'Mathematics', teacherName: 'Mrs. Priya Krishnan', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-A', day: 'Tuesday', period: 4, subject: 'Social Science', teacherName: 'Mrs. Selvi Murugan', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-A', day: 'Tuesday', period: 5, subject: 'English', teacherName: 'Mrs. Priya Krishnan', schoolId: 'SCHOOL002' },

    { className: 'Grade 10-A', day: 'Wednesday', period: 1, subject: 'Mathematics', teacherName: 'Mrs. Priya Krishnan', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-A', day: 'Wednesday', period: 2, subject: 'Chemistry', teacherName: 'Mrs. Selvi Murugan', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-A', day: 'Wednesday', period: 3, subject: 'Physics', teacherName: 'Dr. Anandhi Rajan', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-A', day: 'Wednesday', period: 4, subject: 'Biology', teacherName: 'Dr. Savithri Raman', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-A', day: 'Wednesday', period: 5, subject: 'Tamil', teacherName: 'Mr. K. Manickam', schoolId: 'SCHOOL002' },

    { className: 'Grade 10-A', day: 'Thursday', period: 1, subject: 'English', teacherName: 'Mrs. Priya Krishnan', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-A', day: 'Thursday', period: 2, subject: 'Physics', teacherName: 'Dr. Anandhi Rajan', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-A', day: 'Thursday', period: 3, subject: 'Mathematics', teacherName: 'Mrs. Priya Krishnan', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-A', day: 'Thursday', period: 4, subject: 'Chemistry', teacherName: 'Mrs. Selvi Murugan', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-A', day: 'Thursday', period: 5, subject: 'Social Science', teacherName: 'Mrs. Selvi Murugan', schoolId: 'SCHOOL002' },

    { className: 'Grade 10-A', day: 'Friday', period: 1, subject: 'Mathematics', teacherName: 'Mrs. Priya Krishnan', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-A', day: 'Friday', period: 2, subject: 'Tamil', teacherName: 'Mr. K. Manickam', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-A', day: 'Friday', period: 3, subject: 'English', teacherName: 'Mrs. Priya Krishnan', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-A', day: 'Friday', period: 4, subject: 'Biology', teacherName: 'Dr. Savithri Raman', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-A', day: 'Friday', period: 5, subject: 'Computer Science', teacherName: 'Dr. Anandhi Rajan', schoolId: 'SCHOOL002' },

    { className: 'Grade 11-B', day: 'Monday', period: 1, subject: 'Computer Science', teacherName: 'Dr. Anandhi Rajan', schoolId: 'SCHOOL002' },
    { className: 'Grade 11-B', day: 'Monday', period: 2, subject: 'Physics', teacherName: 'Dr. Anandhi Rajan', schoolId: 'SCHOOL002' },
    { className: 'Grade 11-B', day: 'Tuesday', period: 3, subject: 'Chemistry', teacherName: 'Mrs. Selvi Murugan', schoolId: 'SCHOOL002' },
    { className: 'Grade 11-B', day: 'Wednesday', period: 1, subject: 'Physics', teacherName: 'Dr. Anandhi Rajan', schoolId: 'SCHOOL002' },
    { className: 'Grade 11-B', day: 'Thursday', period: 2, subject: 'Chemistry', teacherName: 'Mrs. Selvi Murugan', schoolId: 'SCHOOL002' },
    { className: 'Grade 11-B', day: 'Friday', period: 3, subject: 'Computer Science', teacherName: 'Dr. Anandhi Rajan', schoolId: 'SCHOOL002' },

    { className: 'Grade 10-B', day: 'Monday', period: 1, subject: 'Tamil', teacherName: 'Mr. K. Manickam', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-B', day: 'Monday', period: 2, subject: 'Mathematics', teacherName: 'Mrs. Priya Krishnan', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-B', day: 'Monday', period: 3, subject: 'Physics', teacherName: 'Dr. Anandhi Rajan', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-B', day: 'Tuesday', period: 1, subject: 'Mathematics', teacherName: 'Mrs. Priya Krishnan', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-B', day: 'Tuesday', period: 2, subject: 'Chemistry', teacherName: 'Mrs. Selvi Murugan', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-B', day: 'Wednesday', period: 1, subject: 'English', teacherName: 'Mrs. Priya Krishnan', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-B', day: 'Wednesday', period: 2, subject: 'Biology', teacherName: 'Dr. Savithri Raman', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-B', day: 'Thursday', period: 1, subject: 'Tamil', teacherName: 'Mr. K. Manickam', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-B', day: 'Thursday', period: 2, subject: 'Social Science', teacherName: 'Mrs. Selvi Murugan', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-B', day: 'Friday', period: 1, subject: 'Mathematics', teacherName: 'Mrs. Priya Krishnan', schoolId: 'SCHOOL002' },
    { className: 'Grade 10-B', day: 'Friday', period: 2, subject: 'Computer Science', teacherName: 'Dr. Anandhi Rajan', schoolId: 'SCHOOL002' }
  ],

  subjects: [
    { code: 'MAT-10', name: 'Mathematics', grade: 'Grade 10-A', teacher: 'Mrs. Priya Krishnan', periodsPerWeek: 6, room: 'A-102', schoolId: 'SCHOOL002' },
    { code: 'PHY-11', name: 'Physics', grade: 'Grade 11-B', teacher: 'Dr. Anandhi Rajan', periodsPerWeek: 5, room: 'Lab-1', schoolId: 'SCHOOL002' },
    { code: 'CHE-09', name: 'Chemistry', grade: 'Grade 9-A', teacher: 'Mrs. Selvi Murugan', periodsPerWeek: 5, room: 'Lab-2', schoolId: 'SCHOOL002' },
    { code: 'BIO-10', name: 'Biology & Life Sciences', grade: 'Grade 10-A', teacher: 'Dr. Savithri Raman', periodsPerWeek: 4, room: 'Bio-Lab', schoolId: 'SCHOOL002' },
    { code: 'TAM-10', name: 'Tamil (Language I)', grade: 'Grade 10-A', teacher: 'Mr. K. Manickam', periodsPerWeek: 6, room: 'A-102', schoolId: 'SCHOOL002' },
    { code: 'ENG-10', name: 'English (Language II)', grade: 'Grade 10-A', teacher: 'Mrs. Priya Krishnan', periodsPerWeek: 5, room: 'A-102', schoolId: 'SCHOOL002' },
    { code: 'CSC-11', name: 'Computer Science & Coding', grade: 'Grade 11-B', teacher: 'Dr. Anandhi Rajan', periodsPerWeek: 4, room: 'Comp-Lab', schoolId: 'SCHOOL002' },
    { code: 'SOC-10', name: 'Social Science & History', grade: 'Grade 10-A', teacher: 'Mrs. Selvi Murugan', periodsPerWeek: 4, room: 'A-102', schoolId: 'SCHOOL002' }
  ],

  assignments: [
    { id: 'HW01', title: 'Algebra Equations Exercise', givenDate: '2026-07-20', due: '2026-07-28', grade: 'Grade 10-A', subject: 'Mathematics', instructions: 'Solve exercises 3.1 to 3.4 in trigonometry notebook.', assignedBy: 'Mrs. Priya Krishnan', schoolId: 'SCHOOL002', assignedDate: '2026-07-20' },
    { id: 'HW02', title: 'Newtonian Laws Essay', givenDate: '2026-07-22', due: '2026-07-30', grade: 'Grade 11-B', subject: 'Physics', instructions: 'Read chapter on kinetic energy laws and write 500 words essay.', assignedBy: 'Dr. Anandhi Rajan', schoolId: 'SCHOOL002', assignedDate: '2026-07-22' }
  ],

  studyMaterials: [
    { id: 'MAT-01', title: 'Trigonometry & Heights Formulas Sheet', grade: 'Grade 10-A', subject: 'Mathematics', fileName: 'Trigonometry_Complete_Guide.pdf', fileSize: '2.4 MB', fileType: 'PDF', uploadedBy: 'Mrs. Priya Krishnan', date: '2026-10-18', description: 'Comprehensive formula summary, identities, and angle values table.' },
    { id: 'MAT-02', title: 'Quadratic Equations Practice Problems Set', grade: 'Grade 10-A', subject: 'Mathematics', fileName: 'Quadratic_Equations_Problems.pdf', fileSize: '1.8 MB', fileType: 'PDF', uploadedBy: 'Mrs. Priya Krishnan', date: '2026-10-20', description: '50 previous board exam solved problems with step-by-step methods.' },
    { id: 'MAT-03', title: 'Coordinate Geometry Visual Notes', grade: 'Grade 10-A', subject: 'Mathematics', fileName: 'Coordinate_Geometry_Charts.pdf', fileSize: '3.1 MB', fileType: 'PDF', uploadedBy: 'Mrs. Priya Krishnan', date: '2026-10-22', description: 'Section formula, distance equation diagrams and practical questions.' },
    { id: 'MAT-04', title: 'Physics Light & Optics Chapter Handbook', grade: 'Grade 11-B', subject: 'Physics', fileName: 'Ray_Optics_Notes.pdf', fileSize: '4.2 MB', fileType: 'PDF', uploadedBy: 'Dr. Anandhi Rajan', date: '2026-10-21', description: 'Lenses, refraction and mirror formulas with colored ray diagrams.' },
  ],

  exams: [
    { id: 'EX-101', name: 'Midterm Examination 2026', subject: 'Mathematics (Paper-I)', grade: 'Grade 10-A', date: '2026-09-10', time: '09:30 AM - 12:30 PM', room: 'Hall A-1', maxMarks: 100, passMarks: 35, status: 'Scheduled', uploadedBy: 'Principal Office' },
    { id: 'EX-102', name: 'Midterm Examination 2026', subject: 'Science & Experiments', grade: 'Grade 10-A', date: '2026-09-12', time: '09:30 AM - 12:30 PM', room: 'Science Lab 1', maxMarks: 100, passMarks: 35, status: 'Scheduled', uploadedBy: 'Mrs. Priya Krishnan' },
    { id: 'EX-103', name: 'Midterm Examination 2026', subject: 'Tamil Language', grade: 'Grade 10-A', date: '2026-09-14', time: '09:30 AM - 12:30 PM', room: 'Hall A-1', maxMarks: 100, passMarks: 35, status: 'Scheduled', uploadedBy: 'Principal Office' },
    { id: 'EX-104', name: 'Midterm Examination 2026', subject: 'English (Language & Lit)', grade: 'Grade 10-A', date: '2026-09-16', time: '09:30 AM - 12:30 PM', room: 'Hall A-1', maxMarks: 100, passMarks: 35, status: 'Scheduled', uploadedBy: 'Principal Office' },
    { id: 'EX-105', name: 'Midterm Examination 2026', subject: 'Social Science & History', grade: 'Grade 10-A', date: '2026-09-18', time: '09:30 AM - 12:30 PM', room: 'Hall A-1', maxMarks: 100, passMarks: 35, status: 'Scheduled', uploadedBy: 'Mrs. Selvi Murugan' },
    { id: 'EX-106', name: 'Quarterly Unit Test', subject: 'Physics (Theory & Lab)', grade: 'Grade 11-B', date: '2026-09-22', time: '10:00 AM - 01:00 PM', room: 'Physics Lab', maxMarks: 70, passMarks: 25, status: 'Scheduled', uploadedBy: 'Dr. Anandhi Rajan' },
    { id: 'EX-107', name: 'Quarterly Unit Test', subject: 'Computer Science Practical', grade: 'Grade 11-B', date: '2026-09-24', time: '10:00 AM - 01:00 PM', room: 'Comp Lab 2', maxMarks: 50, passMarks: 18, status: 'Scheduled', uploadedBy: 'Dr. Anandhi Rajan' },
  ],

  attendanceLogs: [
    {
      date: '2026-10-24',
      className: 'Grade 10-A',
      markedBy: 'Mrs. Priya Krishnan',
      timestamp: '2026-10-24T09:15:00.000Z',
      records: {
        S101: 'present',
        S102: 'present',
        S103: 'present',
        S104: 'present',
        S105: 'present'
      }
    },
    {
      date: '2026-10-23',
      className: 'Grade 10-A',
      markedBy: 'Mrs. Priya Krishnan',
      timestamp: '2026-10-23T09:10:00.000Z',
      records: {
        S101: 'present',
        S102: 'present',
        S103: 'absent',
        S104: 'present',
        S105: 'present'
      }
    },
    {
      date: '2026-10-22',
      className: 'Grade 10-A',
      markedBy: 'Mrs. Priya Krishnan',
      timestamp: '2026-10-22T09:12:00.000Z',
      records: {
        S101: 'present',
        S102: 'present',
        S103: 'present',
        S104: 'present',
        S105: 'present'
      }
    },
    {
      date: '2026-10-21',
      className: 'Grade 10-A',
      markedBy: 'Mrs. Priya Krishnan',
      timestamp: '2026-10-21T09:15:00.000Z',
      records: {
        S101: 'present',
        S102: 'absent',
        S103: 'present',
        S104: 'present',
        S105: 'present'
      }
    },
    {
      date: '2026-10-20',
      className: 'Grade 10-A',
      markedBy: 'Mrs. Priya Krishnan',
      timestamp: '2026-10-20T09:10:00.000Z',
      records: {
        S101: 'present',
        S102: 'present',
        S103: 'present',
        S104: 'present',
        S105: 'present'
      }
    }
  ],

  announcements: [
    {
      id: 'ANN-01',
      date: '2026-10-22',
      title: 'District Level Volleyball Championship 2026 — Finals',
      target: 'Sports Team',
      category: 'Sports',
      image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80',
      content: 'Our senior girls volleyball team has qualified for the State Division Finals! All team members report to the sports ground by 3:30 PM for final coach briefing and kit distribution.',
      author: 'Sports Department',
      priority: 'High',
      schoolId: 'SCHOOL002'
    },
    {
      id: 'ANN-02',
      date: '2026-10-18',
      title: 'Annual Science & Robotics Tech Expo 2026',
      target: 'All',
      category: 'Academic',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      content: 'Zen School is hosting the Inter-School Science and AI Innovation Expo. Students from Grades 8 to 12 can exhibit their working models in Robotics, Clean Energy, and Software Apps.',
      author: 'Academic Council',
      priority: 'Medium',
      schoolId: 'SCHOOL002'
    },
    {
      id: 'ANN-03',
      date: '2026-10-12',
      title: 'Parent-Teacher Interaction Meet (Term 1 Review)',
      target: 'Parents',
      category: 'General',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
      content: 'Term 1 progress report cards and behavioral assessment discussions will take place this Saturday between 09:30 AM and 01:00 PM. All parents are warmly invited.',
      author: 'Office of Principal',
      priority: 'High',
      schoolId: 'SCHOOL002'
    }
  ],

  principals: [
    {
      id: 'PR001',
      name: 'Dr. Savithri Raman',
      roleType: 'Principal',
      qualification: 'Ph.D., M.Ed',
      experience: '18 Years',
      phone: '+91 98401 23450',
      email: 'principal@ssvschool.com',
      address: '10, Cathedral Road, Chennai, Tamil Nadu - 600086',
      bloodGroup: 'B+',
      username: 'principal',
      status: 'Active',
      joinedDate: '2020-06-01',
      schoolId: 'SCHOOL002'
    }
  ],

  parents: [
    { id: 'PAR001', name: 'Ramesh Kumar', relationship: 'Father', phone: '+91 98401 99009', email: 'ramesh.k@gmail.com', studentName: 'Aishwarya Kumar', studentRoll: 'S101', schoolId: 'SCHOOL002' },
    { id: 'PAR002', name: 'Selvam Periasamy', relationship: 'Father', phone: '+91 98402 33445', email: 'selvam.p@gmail.com', studentName: 'Kavitha Selvam', studentRoll: 'S102', schoolId: 'SCHOOL002' },
    { id: 'PAR003', name: 'Geetha Ramesh', relationship: 'Mother', phone: '+91 98840 12399', email: 'geetha.r@gmail.com', studentName: 'Sandhya Ramesh', studentRoll: 'S103', schoolId: 'SCHOOL002' },
    { id: 'PAR004', name: 'Venkatesh R', relationship: 'Father', phone: '+91 97910 65421', email: 'venkatesh.r@gmail.com', studentName: 'Deepa Venkatesh', studentRoll: 'S104', schoolId: 'SCHOOL002' },
    { id: 'PAR005', name: 'Lakshmi Natarajan', relationship: 'Mother', phone: '+91 94451 77209', email: 'lakshmi.n@gmail.com', studentName: 'Meena Natarajan', studentRoll: 'S105', schoolId: 'SCHOOL002' },
    { id: 'PAR006', name: 'Murugan Palani', relationship: 'Father', phone: '+91 98403 66778', email: 'murugan.p@gmail.com', studentName: 'Rithanya Murugan', studentRoll: 'S107', schoolId: 'SCHOOL002' },
    { id: 'PAR007', name: 'Sundaram Pillai', relationship: 'Father', phone: '+91 98412 33418', email: 'sundaram.p@gmail.com', studentName: 'Priyadarshini Sundaram', studentRoll: 'S106', schoolId: 'SCHOOL002' }
  ],

  users: [
    ...defaultPortalUsers,
    { id: 'USR003', name: 'Dr. Savithri Raman', role: 'PRINCIPAL', phone: '+91 98401 23450', email: 'principal@ssvschool.com', username: 'principal', password: 'principal123', status: 'Active', createdDate: '2026-02-15', schoolId: 'SCHOOL002' },
    { id: 'USR004', name: 'Mrs. Priya Krishnan', role: 'TEACHER', phone: '+91 98401 23451', email: 'priya.k@ssvschool.com', username: 'teacher', password: 'teacher123', status: 'Active', createdDate: '2026-02-15', schoolId: 'SCHOOL002', aliases: ['priya', 'teacher@ssvschool.com'] },
    { id: 'USR004_TEA', name: 'Dr. Anandhi Rajan', role: 'TEACHER', phone: '+91 98401 23452', email: 'anandhi.r@ssvschool.com', username: 'anandhi', password: 'teacher123', status: 'Active', createdDate: '2026-02-15', schoolId: 'SCHOOL002' },
    { id: 'USR006', name: 'Aishwarya Kumar', role: 'STUDENT', phone: '+91 98401 23453', email: 'student@ssvschool.com', username: 'student', password: 'student123', status: 'Active', createdDate: '2026-02-15', schoolId: 'SCHOOL002', aliases: ['aishwarya', 'student@ssvschool.com'] },
    { id: 'USR006_STU', name: 'Kavitha Selvam', role: 'STUDENT', phone: '+91 98401 23454', email: 'kavitha@ssvschool.com', username: 'kavitha', password: 'student123', status: 'Active', createdDate: '2026-02-15', schoolId: 'SCHOOL002' },
    { id: 'USR008', name: 'Ramesh Kumar', role: 'PARENT', phone: '+91 98401 99009', email: 'parent@ssvschool.com', username: 'parent', password: 'parent123', status: 'Active', createdDate: '2026-02-15', schoolId: 'SCHOOL002', studentName: 'Aishwarya Kumar', studentRoll: 'S101', relationship: 'Father', aliases: ['ramesh', 'parent@ssvschool.com'] },
  ],

  nonTeachingStaff: [
    { id: 'NT01', name: 'Mr. R. Muthuraman', role: 'Head Clerk & Office Admin', department: 'Administrative Office', phone: '+91 98401 55601', status: 'On Duty', shift: '08:00 AM - 04:30 PM', workAssigned: 'Student Records, TC & Attendance Registers' },
    { id: 'NT02', name: 'Mrs. S. Gandhimathi', role: 'Chief Accountant', department: 'Accounts & Billing', phone: '+91 98401 55602', status: 'On Duty', shift: '08:30 AM - 05:00 PM', workAssigned: 'Term Fee Reconciliation & Petty Cash' },
    { id: 'NT03', name: 'Mr. K. Palanivel', role: 'Senior Lab Attender', department: 'Physics & Chemistry Labs', phone: '+91 98401 55603', status: 'On Duty', shift: '08:30 AM - 04:30 PM', workAssigned: 'Lab Equipment, Glassware & Chemical Safety' },
    { id: 'NT04', name: 'Mrs. V. Meenakshi', role: 'Librarian & Cataloguer', department: 'Central Library', phone: '+91 98401 55604', status: 'On Duty', shift: '08:30 AM - 04:30 PM', workAssigned: 'Book Lending, Library Database & Quiet Hours' },
    { id: 'NT05', name: 'Mr. G. Karuppiah', role: 'Campus Security & Gate Supervisor', department: 'Security & Safety', phone: '+91 98401 55605', status: 'On Duty', shift: '07:30 AM - 04:00 PM', workAssigned: 'Gate Pass Check, Visitor Registry & CCTV' },
    { id: 'NT06', name: 'Mrs. M. Vasantha', role: 'Office Attender / Peon', department: 'General Administration', phone: '+91 98401 55606', status: 'On Duty', shift: '08:00 AM - 04:30 PM', workAssigned: 'Circular Delivery, Staff Room & Bell Routine' },
    { id: 'NT07', name: 'Mr. T. Saravanan', role: 'Campus Maintenance & Electrician', department: 'Infrastructure & Power', phone: '+91 98401 55607', status: 'On Duty', shift: '08:00 AM - 05:00 PM', workAssigned: 'UPS/Generator Check & RO Water Audit' },
    { id: 'NT08', name: 'Mrs. K. Rajeshwari', role: 'Health & First Aid Attendant', department: 'Health Clinic', phone: '+91 98401 55608', status: 'On Leave', shift: '08:30 AM - 04:00 PM', workAssigned: 'Infirmary Log & Emergency Aid (Covered by Clinic Asst)' },
  ],

  operationsWorks: [
    { id: 'WRK-01', title: 'Daily Campus Cleanliness & Sanitation Audit', department: 'Sanitation & Hygiene', assignedTo: 'Housekeeping Team', priority: 'High', status: 'Completed', deadline: 'Today, 08:30 AM', progress: 100 },
    { id: 'WRK-02', title: 'Midterm Science Lab Chemicals & Equipment Safety Verification', department: 'Science Labs', assignedTo: 'Mr. K. Palanivel', priority: 'High', status: 'In Progress', deadline: 'Today, 01:00 PM', progress: 85 },
    { id: 'WRK-03', title: 'Library Book Returns & Missing Register Reconciliation', department: 'Central Library', assignedTo: 'Mrs. V. Meenakshi', priority: 'Medium', status: 'Completed', deadline: 'Today, 11:30 AM', progress: 100 },
    { id: 'WRK-04', title: 'RO Drinking Water Plant Filter & TDS Level Inspection', department: 'Campus Maintenance', assignedTo: 'Mr. T. Saravanan', priority: 'High', status: 'Completed', deadline: 'Today, 09:00 AM', progress: 100 },
    { id: 'WRK-05', title: 'CCTV Surveillance & Campus Boundary Gate Checks', department: 'Security & Safety', assignedTo: 'Mr. G. Karuppiah', priority: 'Urgent', status: 'Completed', deadline: 'Today, 08:00 AM', progress: 100 },
    { id: 'WRK-06', title: 'Student Fee Dues Reminder SMS Dispatch to Parents', department: 'Accounts Section', assignedTo: 'Mrs. S. Gandhimathi', priority: 'Medium', status: 'In Progress', deadline: 'Today, 03:30 PM', progress: 70 },
    { id: 'WRK-07', title: 'Quarterly Government EMIS Portal Data Sync', department: 'Administrative Office', assignedTo: 'Mr. R. Muthuraman', priority: 'High', status: 'In Progress', deadline: 'Today, 05:00 PM', progress: 60 },
    { id: 'WRK-08', title: 'Fire Safety Extinguishers & First-Aid Box Refill Verification', department: 'Health & Safety', assignedTo: 'Clinic & Maintenance', priority: 'Medium', status: 'Scheduled', deadline: 'Tomorrow, 10:00 AM', progress: 20 },
  ],

  services: [
    { id: 'SRV-01', name: 'Coding for Kids', icon: '', category: 'Technology', status: 'Active', cost: '0/yr', description: 'Interactive Python, Scratch block coding, and basic algorithmic thinking for students.', visibleRoles: ['schooladmin', 'teacher', 'student'] },
    { id: 'SRV-02', name: 'Chess Academy', icon: '', category: 'Mind Sports', status: 'Active', cost: '0/yr', description: 'Grandmaster tactics, opening strategies, and tournament training.', visibleRoles: ['schooladmin', 'principal', 'teacher', 'student', 'parent'] },
    { id: 'SRV-03', name: 'Robotics', icon: '', category: 'STEM', status: 'Active', cost: '0/yr', description: 'Arduino, sensor kits, circuit building and autonomous robot design.', visibleRoles: ['schooladmin', 'teacher', 'student'] },
    { id: 'SRV-04', name: 'Drawing & Art', icon: '', category: 'Creative Arts', status: 'Active', cost: '0/yr', description: 'Watercolors, canvas painting, sketch portraiture and digital design.', visibleRoles: ['schooladmin', 'student', 'parent'] },
    { id: 'SRV-05', name: 'Spoken English', icon: '', category: 'Communication', status: 'Active', cost: '0/yr', description: 'Vocabulary building, public speaking, pronunciation and phonics.', visibleRoles: ['schooladmin', 'principal', 'teacher', 'student', 'parent'] },
    { id: 'SRV-06', name: 'Abacus & Vedic Maths', icon: '', category: 'Mathematics', status: 'Active', cost: '0/yr', description: 'Fast mental calculation techniques, memory retention, and number speed.', visibleRoles: ['schooladmin', 'teacher', 'student', 'parent'] },
    { id: 'SRV-07', name: 'Dance & Music', icon: '', category: 'Performing Arts', status: 'Active', cost: '0/yr', description: 'Classical & contemporary dance, vocal music, keyboard and guitar lessons.', visibleRoles: ['schooladmin', 'student', 'parent'] },
    { id: 'SRV-08', name: 'Sports & Fitness', icon: '', category: 'Athletics', status: 'Active', cost: '0/yr', description: 'Football, basketball, athletics coaching, yoga and physical agility.', visibleRoles: ['schooladmin', 'principal', 'teacher', 'student', 'parent'] },
  ],

  staffLeaves: [
    { id: 'LV-101', teacher: 'Mrs. Selvi Murugan', subject: 'Chemistry', dates: '2026-10-24 to 2026-10-25', fromDate: '2026-10-24', toDate: '2026-10-25', reason: 'Family Function in Madurai', status: 'Pending', type: 'Casual Leave' },
    { id: 'LV-102', teacher: 'Dr. Anandhi Rajan', subject: 'Physics', dates: '2026-10-28', fromDate: '2026-10-28', toDate: '2026-10-28', reason: 'Medical Appointment', status: 'Pending', type: 'Medical Leave' },
    { id: 'LV-100', teacher: 'Mr. Anand Narayanan', subject: 'Physics', dates: '2026-10-15', fromDate: '2026-10-15', toDate: '2026-10-15', reason: 'Educational Conference', status: 'Approved', type: 'Duty Leave' },
    { id: 'LV-103', teacher: 'Mrs. Priya Krishnan', subject: 'Mathematics', dates: '2026-10-20 to 2026-10-21', fromDate: '2026-10-20', toDate: '2026-10-21', reason: 'Attending University Valuation Board', status: 'Approved', type: 'Duty Leave' },
  ],

  schoolServiceAssignments: [
    { id: 'SSA-01', serviceId: 'SRV-01', serviceName: 'Coding for Kids', schoolId: 'SCHOOL002', schoolName: 'Sri Sankara Vidhyasala Girls High School', status: 'Active', assignedDate: '2026-01-15', portalAccess: true, visibleRoles: ['student', 'teacher', 'parent', 'principal', 'schooladmin'] },
    { id: 'SSA-02', serviceId: 'SRV-02', serviceName: 'Chess Academy', schoolId: 'SCHOOL002', schoolName: 'Sri Sankara Vidhyasala Girls High School', status: 'Active', assignedDate: '2026-01-20', portalAccess: true, visibleRoles: ['student', 'teacher', 'parent', 'principal', 'schooladmin'] },
    { id: 'SSA-03', serviceId: 'SRV-03', serviceName: 'Robotics', schoolId: 'SCHOOL002', schoolName: 'Sri Sankara Vidhyasala Girls High School', status: 'Active', assignedDate: '2026-02-01', portalAccess: true, visibleRoles: ['student', 'teacher', 'schooladmin'] },
    { id: 'SSA-04', serviceId: 'SRV-04', serviceName: 'Drawing & Art', schoolId: 'SCHOOL001', schoolName: 'ABC Matriculation School', status: 'Active', assignedDate: '2026-01-10', portalAccess: true, visibleRoles: ['student', 'parent', 'schooladmin'] },
    { id: 'SSA-05', serviceId: 'SRV-05', serviceName: 'Spoken English', schoolId: 'SCHOOL001', schoolName: 'ABC Matriculation School', status: 'Inactive', assignedDate: '2026-01-12', portalAccess: false, visibleRoles: ['student', 'teacher', 'parent', 'principal', 'schooladmin'] },
    { id: 'SSA-06', serviceId: 'SRV-06', serviceName: 'Abacus & Vedic Maths', schoolId: 'SCHOOL003', schoolName: 'St. Marys Academy', status: 'Active', assignedDate: '2026-03-01', portalAccess: true, visibleRoles: ['student', 'teacher', 'parent', 'schooladmin'] },
  ],

  feeRecords: [
    { id: 'FEE-101', roll: 'S101', name: 'Aishwarya Kumar', class: 'Grade 10-A', parent: 'Ramesh Kumar', phone: '+91 98456 12301', totalFee: '₹28,000', paid: '₹28,000', due: '₹0', status: 'PAID', invoiceNumber: 'INV-2026-001', dueDate: '2026-10-15' },
    { id: 'FEE-102', roll: 'S102', name: 'Kavitha Selvam', class: 'Grade 10-A', parent: 'Selvam Murugan', phone: '+91 98456 12302', totalFee: '₹26,000', paid: '₹16,000', due: '₹10,000', status: 'PARTIAL', invoiceNumber: 'INV-2026-002', dueDate: '2026-10-15' },
    { id: 'FEE-103', roll: 'S103', name: 'Sandhya Ramesh', class: 'Grade 10-A', parent: 'Ramesh Krishnan', phone: '+91 98456 12303', totalFee: '₹28,500', paid: '₹0', due: '₹28,500', status: 'OVERDUE', invoiceNumber: 'INV-2026-003', dueDate: '2026-10-10' },
    { id: 'FEE-104', roll: 'S104', name: 'Deepa Venkatesh', class: 'Grade 10-A', parent: 'Venkatesh S.', phone: '+91 98456 12304', totalFee: '₹28,000', paid: '₹28,000', due: '₹0', status: 'PAID', invoiceNumber: 'INV-2026-004', dueDate: '2026-10-20' },
    { id: 'FEE-105', roll: 'S105', name: 'Meena Natarajan', class: 'Grade 10-A', parent: 'Natarajan M.', phone: '+91 98456 12305', totalFee: '₹23,000', paid: '₹11,500', due: '₹11,500', status: 'PARTIAL', invoiceNumber: 'INV-2026-005', dueDate: '2026-10-15' },
    { id: 'FEE-106', roll: 'S106', name: 'Pooja Sundaram', class: 'Grade 10-B', parent: 'Sundaram P.', phone: '+91 98456 12306', totalFee: '₹28,000', paid: '₹28,000', due: '₹0', status: 'PAID', invoiceNumber: 'INV-2026-006', dueDate: '2026-10-15' },
    { id: 'FEE-107', roll: 'S107', name: 'Swathi Rajesh', class: 'Grade 10-B', parent: 'Rajesh K.', phone: '+91 98456 12307', totalFee: '₹28,000', paid: '₹20,000', due: '₹8,000', status: 'PARTIAL', invoiceNumber: 'INV-2026-007', dueDate: '2026-10-15' },
    { id: 'FEE-108', roll: 'S108', name: 'Bhavani Chandran', class: 'Grade 9-A', parent: 'Chandran M.', phone: '+91 98456 12308', totalFee: '₹26,000', paid: '₹26,000', due: '₹0', status: 'PAID', invoiceNumber: 'INV-2026-008', dueDate: '2026-10-15' },
  ],

  platformSettings: {
    platformName: 'ZenSkooll Multi-School ERP Platform',
    contactEmail: 'superadmin@zenschool.com',
    supportPhone: '+91 98401 11001',
    currency: 'INR (₹)',
    academicYear: '2026 - 2027',
    maintenanceMode: 'Disabled',
    backupFrequency: 'Daily',
    timezone: 'Asia/Kolkata (IST +5:30)',
  },

  rolePolicySettings: {
    allowSchoolAdminCreateStaff: true,
    allowTeacherPostAnnouncements: true,
    allowStudentDownloadMaterials: true,
    allowParentChatTeachers: true,
    allowFinanceManageExpenses: true,
    minPasswordLength: 8,
    requireSpecialChar: true,
    sessionTimeout: 60,
  },

  notificationSettings: {
    emailNotifications: true,
    smsAlerts: true,
    inAppSoundAlerts: true,
    dailyDigest: false,
    systemAlertEmail: 'alerts@zenschool.com',
  },
};

const STORAGE_KEY = 'ssv_demo_data';

export function getPortalData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (!parsed.schools || parsed.schools.length === 0) {
        parsed.schools = [...defaultPortalSchools];
      } else {
        defaultPortalSchools.forEach((ds) => {
          if (!parsed.schools.some((s) => s.id === ds.id)) {
            parsed.schools.push(ds);
          }
        });
      }

      if (!parsed.users || parsed.users.length === 0) {
        parsed.users = [...defaultPortalUsers];
      } else {
        defaultPortalUsers.forEach((du) => {
          const existing = parsed.users.find((u) => u.username === du.username || (du.aliases && du.aliases.includes(u.username)));
          if (!existing) {
            parsed.users.push(du);
          } else if (!existing.password) {
            existing.password = du.password;
          }
        });
      }
      if (!parsed.staffLeaves || parsed.staffLeaves.length === 0) {
        parsed.staffLeaves = defaultData.staffLeaves;
      }
      if (!parsed.nonTeachingStaff || parsed.nonTeachingStaff.length === 0) {
        parsed.nonTeachingStaff = defaultData.nonTeachingStaff;
      }
      if (!parsed.operationsWorks || parsed.operationsWorks.length === 0) {
        parsed.operationsWorks = defaultData.operationsWorks;
      }
      if (!parsed.principals || parsed.principals.length === 0) {
        parsed.principals = defaultData.principals;
      }
      if (!parsed.subjects || parsed.subjects.length < defaultData.subjects.length) {
        parsed.subjects = defaultData.subjects;
      }
      if (!parsed.classTimetables || parsed.classTimetables.length === 0) {
        parsed.classTimetables = defaultData.classTimetables;
      } else {
        // Principals do not take class timetable teaching slots
        parsed.classTimetables = parsed.classTimetables.filter(
          (t) => !(t && t.teacherName && (
            t.teacherName.toLowerCase() === 'meena' ||
            (parsed.principals || []).some((p) => p.name && p.name.toLowerCase() === t.teacherName.toLowerCase())
          ))
        );
      }
      if (!parsed.announcements || parsed.announcements.length === 0 || !parsed.announcements[0].image) {
        parsed.announcements = defaultData.announcements;
      }
      if (!parsed.exams || parsed.exams.length === 0) {
        parsed.exams = defaultData.exams;
      }
      if (!parsed.studyMaterials || parsed.studyMaterials.length === 0) {
        parsed.studyMaterials = defaultData.studyMaterials;
      }
      if (!parsed.attendanceLogs || parsed.attendanceLogs.length === 0) {
        parsed.attendanceLogs = defaultData.attendanceLogs;
      }
      if (!parsed.feeRecords || parsed.feeRecords.length === 0) {
        parsed.feeRecords = defaultData.feeRecords;
      }
      if (!parsed.schoolServiceAssignments || parsed.schoolServiceAssignments.length === 0) {
        parsed.schoolServiceAssignments = defaultData.schoolServiceAssignments;
      } else {
        parsed.schoolServiceAssignments = parsed.schoolServiceAssignments.map((a) => ({
          ...a,
          portalAccess: a.portalAccess !== undefined ? a.portalAccess : (a.status !== 'Inactive'),
          visibleRoles: a.visibleRoles || ['student', 'teacher', 'parent', 'principal', 'schooladmin'],
        }));
      }
      if (parsed.students && parsed.students.length > 0) {
        parsed.students = parsed.students.map((s) => {
          const match = defaultData.students.find((ds) => ds.roll === s.roll);
          return {
            ...s,
            parentName: s.parentName || (match ? match.parentName : 'Mr. Parent Guardian'),
            parentPhone: s.parentPhone || (match ? match.parentPhone : '+91 98401 22334')
          };
        });
      }
      return { ...defaultData, ...parsed };
    }
  } catch (err) {
    console.warn('Portal data parsing error:', err);
  }
  return defaultData;
}

export function savePortalData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('portal_data_updated', { detail: data }));
    }
  } catch (err) {
    console.error('Portal data saving error:', err);
  }
}


export function syncBillToPortalFeeRecords(bill) {
  if (!bill) return;
  try {
    const cur = getPortalData();
    let records = Array.isArray(cur.feeRecords) ? [...cur.feeRecords] : [...defaultData.feeRecords];
    const billRoll = bill.rollNo || bill.studentId;
    const billInv = bill.invoiceNumber;

    const idx = records.findIndex(r => (billInv && r.invoiceNumber === billInv) || (billRoll && r.roll === billRoll));

    const totalAmt = Number(bill.totalFees) || 0;
    const paidAmt = Number(bill.paidAmount) || 0;
    const dueAmt = Math.max(0, totalAmt - paidAmt);
    const statusUpper = dueAmt === 0 ? 'PAID' : (paidAmt > 0 ? 'PARTIAL' : 'OVERDUE');

    const mapped = {
      id: bill._id || `FEE-${billRoll || Date.now()}`,
      roll: billRoll || 'S101',
      name: bill.studentName,
      class: `${bill.grade || 'Grade 10'}-${bill.section || 'A'}`,
      parent: bill.parentName || 'Parent / Guardian',
      phone: bill.parentPhone || '+91 98456 12301',
      totalFee: `₹${totalAmt.toLocaleString('en-IN')}`,
      paid: `₹${paidAmt.toLocaleString('en-IN')}`,
      due: `₹${dueAmt.toLocaleString('en-IN')}`,
      status: statusUpper,
      invoiceNumber: bill.invoiceNumber,
      dueDate: bill.dueDate || '2026-10-15',
      billingMonth: bill.billingMonth || 'October',
      feeItems: bill.feeItems || [],
      schoolId: bill.schoolId || 'SCHOOL002'
    };

    if (idx !== -1) {
      records[idx] = { ...records[idx], ...mapped };
    } else {
      records.unshift(mapped);
    }

    cur.feeRecords = records;
    savePortalData(cur);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('fee_records_updated', { detail: { bill, feeRecords: records } }));
    }
  } catch (e) {
    console.warn('syncBillToPortalFeeRecords error:', e);
  }
}

export function getInitialPortalData() {
  const data = getPortalData();
  savePortalData(data);
  return data;
}

export function getSchoolStatus(schoolId) {
  if (!schoolId || schoolId === 'ALL') return 'Active';
  const cleanId = String(schoolId).trim();
  try {
    const store = getPortalData() || {};
    if (store && Array.isArray(store.schools)) {
      const found = store.schools.find((s) => s.id === cleanId || s.schoolId === cleanId || s.code === cleanId);
      if (found) return found.status || 'Active';
    }
  } catch (e) {}
  return 'Active';
}

export function isSchoolActive(schoolId) {
  return getSchoolStatus(schoolId) === 'Active';
}

export function setSchoolStatusInStore(schoolId, newStatus) {
  try {
    const store = getPortalData() || {};
    if (store && Array.isArray(store.schools)) {
      store.schools = store.schools.map((s) =>
        s.id === schoolId || s.schoolId === schoolId || s.code === schoolId
          ? { ...s, status: newStatus }
          : s
      );
      savePortalData(store);
      return true;
    }
  } catch (e) {
    console.warn('setSchoolStatusInStore error:', e);
  }
  return false;
}

export function setUserStatusInStore(userId, newStatus) {
  try {
    const store = getPortalData() || {};
    if (store && Array.isArray(store.users)) {
      store.users = store.users.map((u) =>
        u.id === userId || u.userId === userId || (u.username && u.username === userId)
          ? { ...u, status: newStatus }
          : u
      );
      savePortalData(store);
      return true;
    }
  } catch (e) {
    console.warn('setUserStatusInStore error:', e);
  }
  return false;
}

export function isUserActive(userId, username) {
  try {
    const store = getPortalData() || {};
    if (store && Array.isArray(store.users)) {
      const found = store.users.find(
        (u) =>
          (userId && (u.id === userId || u.userId === userId)) ||
          (username && u.username && u.username.toLowerCase() === username.toLowerCase())
      );
      if (found) return found.status === 'Active';
    }
  } catch (e) {}
  return true;
}

export function normalizeStaffName(name) {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/^(dr|mr|mrs|ms|prof)\.?\s+/i, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

export function isDateWithinLeave(targetDate, leaveRecord) {
  if (!targetDate || !leaveRecord) return false;
  let from = leaveRecord.fromDate;
  let to = leaveRecord.toDate;
  if (!from && leaveRecord.dates) {
    if (leaveRecord.dates.includes(' to ')) {
      const parts = leaveRecord.dates.split(' to ');
      from = parts[0].trim();
      to = parts[1].trim();
    } else {
      from = leaveRecord.dates.trim();
      to = leaveRecord.dates.trim();
    }
  }
  if (!from) return false;
  if (!to) to = from;
  return targetDate >= from && targetDate <= to;
}

export function getStaffLeaveOnDate(staffName, targetDate, allLeaves = []) {
  if (!staffName || !targetDate || !Array.isArray(allLeaves)) return null;
  const targetNorm = normalizeStaffName(staffName);
  if (!targetNorm) return null;

  return (
    allLeaves.find((lv) => {
      if (!lv) return false;
      if (lv.status === 'Rejected' || lv.status === 'Declined') return false;
      const lvTeacherNorm = normalizeStaffName(lv.teacher || lv.staffName || lv.name);
      if (!lvTeacherNorm) return false;
      const isNameMatch =
        targetNorm === lvTeacherNorm ||
        targetNorm.includes(lvTeacherNorm) ||
        lvTeacherNorm.includes(targetNorm);
      if (!isNameMatch) return false;
      return isDateWithinLeave(targetDate, lv);
    }) || null
  );
}

export function getStaffDailyAttendance(staffName, dateStr, allLeaves = [], staffStatus = 'Active') {
  const d = new Date(dateStr);
  const isSun = d.getDay() === 0;
  const dayName = d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

  if (isSun) {
    return {
      dateStr,
      dayName,
      status: 'Holiday (Sun)',
      inTime: '—',
      outTime: '—',
      isLeave: false,
      isSun: true,
      leaveRecord: null
    };
  }

  const leaveRecord = getStaffLeaveOnDate(staffName, dateStr, allLeaves);
  if (leaveRecord) {
    const leaveType = leaveRecord.type || 'Casual Leave';
    const isApproved = leaveRecord.status === 'Approved';
    return {
      dateStr,
      dayName,
      status: isApproved ? `On Approved Leave (${leaveType})` : `On Leave (${leaveType} - ${leaveRecord.status || 'Applied'})`,
      inTime: '—',
      outTime: '—',
      isLeave: true,
      isSun: false,
      leaveRecord
    };
  }

  const todayStr = new Date().toISOString().split('T')[0];
  const isExplicitLeave = (staffStatus === 'On Leave' && dateStr === todayStr);
  if (isExplicitLeave) {
    return {
      dateStr,
      dayName,
      status: 'On Leave (Official Roster)',
      inTime: '—',
      outTime: '—',
      isLeave: true,
      isSun: false,
      leaveRecord: null
    };
  }

  return {
    dateStr,
    dayName,
    status: 'Present on Duty',
    inTime: '08:15 AM',
    outTime: '04:30 PM',
    isLeave: false,
    isSun: false,
    leaveRecord: null
  };
}

export function toggleStaffLeaveOnDate(staffName, dateStr, shouldBeOnLeave, leaveType = 'Casual Leave') {
  try {
    const store = getPortalData() || {};
    if (!store.staffLeaves) store.staffLeaves = [];

    if (shouldBeOnLeave) {
      const existing = getStaffLeaveOnDate(staffName, dateStr, store.staffLeaves);
      if (!existing) {
        store.staffLeaves.unshift({
          id: `LV-${Math.floor(100 + Math.random() * 900)}`,
          teacher: staffName,
          dates: dateStr,
          fromDate: dateStr,
          toDate: dateStr,
          reason: 'Authorized Leave Recorded via Attendance & Duty Log',
          status: 'Approved',
          type: leaveType,
          appliedOn: new Date().toISOString().split('T')[0]
        });
      }
    } else {
      const targetNorm = normalizeStaffName(staffName);
      store.staffLeaves = store.staffLeaves.filter((lv) => {
        const lvTeacherNorm = normalizeStaffName(lv.teacher || lv.staffName || lv.name);
        const isMatch = targetNorm === lvTeacherNorm || targetNorm.includes(lvTeacherNorm) || lvTeacherNorm.includes(targetNorm);
        if (isMatch && isDateWithinLeave(dateStr, lv)) {
          return false;
        }
        return true;
      });
    }

    savePortalData(store);
    return store.staffLeaves;
  } catch (e) {
    console.warn('toggleStaffLeaveOnDate error:', e);
    return null;
  }
}



