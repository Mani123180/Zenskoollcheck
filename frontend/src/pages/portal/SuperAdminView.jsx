import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { getPortalData, savePortalData, setSchoolStatusInStore, setUserStatusInStore } from '../../services/portalData';
import NewSchoolWizardModal from './NewSchoolWizardModal';
import SubscriptionModal from './SubscriptionModal';
import SchoolAdminView from './SchoolAdminView';
import SchoolFinanceModule from './SchoolFinanceModule';
import AcademicRolesView from './AcademicRolesView';
import ChatBox from './ChatBox';
import {
  CampusOverviewModal,
  EditSchoolModal,
  AdminProfileModal,
  AddAdminModal,
  AssignAdminModal,
  CreateInvoiceModal,
  FeedbackModal,
  ConfirmationModal,
  PrintableInvoiceModal,
  DashboardDetailModal,
} from './SuperAdminModals';
import SuperAdminSettingsView from './SuperAdminSettingsView';
import InteractiveServicePlayerModal from './InteractiveServicePlayerModal';
import { downloadInvoicePDF } from '../../services/pdfDownloadUtil';


const defaultSchools = [
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

const defaultUsers = [
  { id: 'USR001', name: 'Super Administrator', email: 'superadmin@zenschool.com', phone: '+91 98401 11001', username: 'superadmin', password: 'SuperAdmin@123', role: 'SUPER_ADMIN', schoolId: null, schoolName: '', status: 'Active', createdDate: '2025-01-01', aliases: ['superadmin'] },
  { id: 'USR003', name: 'School Administrator (SSV)', email: 'admin@ssvschool.com', phone: '+91 98401 22002', username: 'admin_ssv', password: 'Admin@12345', role: 'SCHOOL_ADMIN', schoolId: 'SCHOOL002', schoolName: 'Sri Sankara Vidhyasala Girls High School', status: 'Active', createdDate: '2026-02-15', aliases: ['admin_ssv', 'admin_ssvkod', 'admin@ssvschool.com'] },
  { id: 'USR005', name: 'School Finance Manager (SSV)', email: 'finance@ssvschool.com', phone: '+91 98401 22005', username: 'finance_ssv', password: 'Finance@12345', role: 'FINANCE', schoolId: 'SCHOOL002', schoolName: 'Sri Sankara Vidhyasala Girls High School', status: 'Active', createdDate: '2026-02-15', aliases: ['finance_ssv', 'finance_ssvkod', 'finance@ssvschool.com'] },
  { id: 'USR002', name: 'Admin Rajesh (ABC School)', email: 'admin@abcschool.com', phone: '+91 98401 33003', username: 'admin_abcche', password: 'Admin@12345', role: 'SCHOOL_ADMIN', schoolId: 'SCHOOL001', schoolName: 'ABC Matriculation School', status: 'Active', createdDate: '2026-01-10', aliases: ['admin_abcche', 'admin_abc', 'admin@abcschool.com'] },
  { id: 'USR012', name: 'Finance Manager (ABC School)', email: 'finance@abcschool.com', phone: '+91 98401 33012', username: 'finance_abcche', password: 'Finance@12345', role: 'FINANCE', schoolId: 'SCHOOL001', schoolName: 'ABC Matriculation School', status: 'Active', createdDate: '2026-01-10', aliases: ['finance_abcche', 'finance_abc', 'finance@abcschool.com'] },
  { id: 'USR004', name: 'Admin Joseph (St. Marys)', email: 'admin@stmarys.com', phone: '+91 98401 44004', username: 'admin_stmerd', password: 'Admin@12345', role: 'SCHOOL_ADMIN', schoolId: 'SCHOOL003', schoolName: 'St. Marys Academy', status: 'Active', createdDate: '2026-03-01', aliases: ['admin_stmerd', 'admin_stm', 'admin@stmarys.com'] },
  { id: 'USR014', name: 'Finance Manager (St. Marys)', email: 'finance@stmerd.edu', phone: '+91 98401 44014', username: 'finance_stmerd', password: 'Finance@12345', role: 'FINANCE', schoolId: 'SCHOOL003', schoolName: 'St. Marys Academy', status: 'Active', createdDate: '2026-03-01', aliases: ['finance_stmerd', 'finance_stm', 'finance@stmerd.edu'] },
  { id: 'USR006', name: 'Admin Anitha (DPW School)', email: 'admin@dpwschool.edu', phone: '+91 98401 55004', username: 'admin_dpwcbe', password: 'Admin@12345', role: 'SCHOOL_ADMIN', schoolId: 'SCHOOL004', schoolName: 'Delhi Public World School', status: 'Active', createdDate: '2026-02-01', aliases: ['admin_dpwcbe', 'admin_dpw', 'admin@dpwschool.edu'] },
  { id: 'USR016', name: 'Finance Manager (DPW School)', email: 'finance@dpwschool.edu', phone: '+91 98401 55016', username: 'finance_dpwcbe', password: 'Finance@12345', role: 'FINANCE', schoolId: 'SCHOOL004', schoolName: 'Delhi Public World School', status: 'Active', createdDate: '2026-02-01', aliases: ['finance_dpwcbe', 'finance_dpw', 'finance@dpwschool.edu'] },
  { id: 'USR005', name: 'Admin Vikram (Oxford)', email: 'admin@oxford.edu', phone: '+91 98401 55005', username: 'admin_oxfchn', password: 'Admin@12345', role: 'SCHOOL_ADMIN', schoolId: 'SCHOOL005', schoolName: 'Oxford International Academy', status: 'Active', createdDate: '2025-08-12', aliases: ['admin_oxfchn', 'admin_oxf', 'admin@oxford.edu'] },
  { id: 'USR015', name: 'Finance Manager (Oxford)', email: 'finance@oxford.edu', phone: '+91 98401 55015', username: 'finance_oxfchn', password: 'Finance@12345', role: 'FINANCE', schoolId: 'SCHOOL005', schoolName: 'Oxford International Academy', status: 'Active', createdDate: '2025-08-12', aliases: ['finance_oxfchn', 'finance_oxf', 'finance@oxford.edu'] },
];

const defaultServices = [
  { id: 'SRV-01', name: 'Coding for Kids', icon: '', category: 'Technology', status: 'Active', cost: '0/yr', description: 'Interactive Python, Scratch block coding, and basic algorithmic thinking for students.', visibleRoles: ['schooladmin', 'teacher', 'student'] },
  { id: 'SRV-02', name: 'Chess Academy', icon: '', category: 'Mind Sports', status: 'Active', cost: '0/yr', description: 'Grandmaster tactics, opening strategies, and tournament training.', visibleRoles: ['schooladmin', 'principal', 'teacher', 'student', 'parent'] },
  { id: 'SRV-03', name: 'Robotics', icon: '', category: 'STEM', status: 'Active', cost: '0/yr', description: 'Arduino, sensor kits, circuit building and autonomous robot design.', visibleRoles: ['schooladmin', 'teacher', 'student'] },
  { id: 'SRV-04', name: 'Drawing & Art', icon: '', category: 'Creative Arts', status: 'Active', cost: '0/yr', description: 'Watercolors, canvas painting, sketch portraiture and digital design.', visibleRoles: ['schooladmin', 'student', 'parent'] },
  { id: 'SRV-05', name: 'Spoken English', icon: '', category: 'Communication', status: 'Active', cost: '0/yr', description: 'Vocabulary building, public speaking, pronunciation and phonics.', visibleRoles: ['schooladmin', 'principal', 'teacher', 'student', 'parent'] },
  { id: 'SRV-06', name: 'Abacus & Vedic Maths', icon: '', category: 'Mathematics', status: 'Active', cost: '0/yr', description: 'Fast mental calculation techniques, memory retention, and number speed.', visibleRoles: ['schooladmin', 'teacher', 'student', 'parent'] },
  { id: 'SRV-07', name: 'Dance & Music', icon: '', category: 'Performing Arts', status: 'Active', cost: '0/yr', description: 'Classical & contemporary dance, vocal music, keyboard and guitar lessons.', visibleRoles: ['schooladmin', 'student', 'parent'] },
  { id: 'SRV-08', name: 'Sports & Fitness', icon: '', category: 'Athletics', status: 'Active', cost: '0/yr', description: 'Football, basketball, athletics coaching, yoga and physical agility.', visibleRoles: ['schooladmin', 'principal', 'teacher', 'student', 'parent'] },
];

const defaultSchoolServiceAssignments = [
  { id: 'SSA-01', serviceId: 'SRV-01', serviceName: 'Coding for Kids', schoolId: 'SCHOOL002', schoolName: 'Sri Sankara Vidhyasala Girls High School', status: 'Active', assignedDate: '2026-01-15', portalAccess: true, visibleRoles: ['student', 'teacher', 'parent', 'principal', 'schooladmin'] },
  { id: 'SSA-02', serviceId: 'SRV-02', serviceName: 'Chess Academy', schoolId: 'SCHOOL002', schoolName: 'Sri Sankara Vidhyasala Girls High School', status: 'Active', assignedDate: '2026-01-20', portalAccess: true, visibleRoles: ['student', 'teacher', 'parent', 'principal', 'schooladmin'] },
  { id: 'SSA-03', serviceId: 'SRV-03', serviceName: 'Robotics', schoolId: 'SCHOOL002', schoolName: 'Sri Sankara Vidhyasala Girls High School', status: 'Active', assignedDate: '2026-02-01', portalAccess: true, visibleRoles: ['student', 'teacher', 'schooladmin'] },
  { id: 'SSA-04', serviceId: 'SRV-04', serviceName: 'Drawing & Art', schoolId: 'SCHOOL001', schoolName: 'ABC Matriculation School', status: 'Active', assignedDate: '2026-01-10', portalAccess: true, visibleRoles: ['student', 'parent', 'schooladmin'] },
  { id: 'SSA-05', serviceId: 'SRV-05', serviceName: 'Spoken English', schoolId: 'SCHOOL001', schoolName: 'ABC Matriculation School', status: 'Inactive', assignedDate: '2026-01-12', portalAccess: false, visibleRoles: ['student', 'teacher', 'parent', 'principal', 'schooladmin'] },
  { id: 'SSA-06', serviceId: 'SRV-06', serviceName: 'Abacus & Vedic Maths', schoolId: 'SCHOOL003', schoolName: 'St. Marys Academy', status: 'Active', assignedDate: '2026-03-01', portalAccess: true, visibleRoles: ['student', 'teacher', 'parent', 'schooladmin'] },
];

const defaultPlans = [
  { id: 'PLAN-01', name: 'Basic Plan', maxStudents: 500, price: '0/yr', features: 'Attendance, Marks, Notices & Student Records' },
  { id: 'PLAN-02', name: 'Pro Plan', maxStudents: 1500, price: '0/yr', features: 'Basic + Online Fee Portal, SMS Gateway, Assignments' },
  { id: 'PLAN-03', name: 'Enterprise Plan', maxStudents: 5000, price: '0/yr', features: 'Pro + Custom Mobile App, GPS Tracking, Dedicated Support' },
];

const defaultSubscriptions = [
  { id: 'SUB-02', schoolId: 'SCHOOL002', school: 'Sri Sankara Vidhyasala Girls High School', plan: 'Enterprise Plan', startDate: '2026-02-15', endDate: '2027-02-14', status: 'ACTIVE', amount: '0/yr' },
  { id: 'SUB-01', schoolId: 'SCHOOL001', school: 'ABC Matriculation School', plan: 'Pro Plan', startDate: '2026-01-10', endDate: '2027-01-09', status: 'ACTIVE', amount: '0/yr' },
  { id: 'SUB-03', schoolId: 'SCHOOL003', school: 'St. Marys Academy', plan: 'Pro Plan', startDate: '2026-03-01', endDate: '2027-02-28', status: 'ACTIVE', amount: '0/yr' },
  { id: 'SUB-04', schoolId: 'SCHOOL005', school: 'Oxford International Academy', plan: 'Basic Plan', startDate: '2025-08-12', endDate: '2026-06-30', status: 'EXPIRED', amount: '0/yr' },
];

const defaultBills = [
  { invoiceNo: 'INV-2026-001', schoolId: 'SCHOOL002', school: 'Sri Sankara Vidhyasala Girls High School', plan: 'Enterprise Plan', amount: '0/yr', dueDate: '2026-02-20', paymentDate: '2026-02-16', status: 'PAID' },
  { invoiceNo: 'INV-2026-002', schoolId: 'SCHOOL001', school: 'ABC Matriculation School', plan: 'Pro Plan', amount: '0/yr', dueDate: '2026-01-15', paymentDate: '2026-01-12', status: 'PAID' },
  { invoiceNo: 'INV-2026-003', schoolId: 'SCHOOL003', school: 'St. Marys Academy', plan: 'Pro Plan', amount: '0/yr', dueDate: '2026-03-10', paymentDate: '2026-03-05', status: 'PAID' },
  { invoiceNo: 'INV-2026-005', schoolId: 'SCHOOL005', school: 'Oxford International Academy', plan: 'Basic Plan', amount: '0/yr', dueDate: '2026-06-15', paymentDate: null, status: 'OVERDUE' },
];

const defaultActivities = [
  { id: 'ACT-1', type: 'sub_activated', text: 'Enterprise Subscription activated for Sri Sankara Vidhyasala Girls High School', time: '1 day ago' },
  { id: 'ACT-2', type: 'payment_received', text: 'Payment received: 0/yr (Invoice INV-2026-001) from Sri Sankara Vidhyasala', time: '1 day ago' },
  { id: 'ACT-3', type: 'school_registered', text: 'New School Campus Registered: Delhi Public World School (DPW-CBE)', time: '3 days ago' },
  { id: 'ACT-4', type: 'school_activated', text: 'Campus status switched to Active for ABC Matriculation School', time: '5 days ago' },
];


export default function SuperAdminView({ activeTab = 'sa-dashboard', setActiveTab }) {
  const { impersonate } = useAuth();
  const [systemHealth, setSystemHealth] = useState({
    status: 'online',
    latency: '18ms',
    db: 'Connected (MongoDB Primary)',
    activeTenants: 5,
  });
  
  const [schools, setSchools] = useState(() => {
    try {
      const store = getPortalData();
      if (store && store.schools && store.schools.length > 0) {
        const storedIds = new Set(store.schools.map((s) => s.id));
        const remainingDefaults = defaultSchools.filter((s) => !storedIds.has(s.id));
        return [...store.schools, ...remainingDefaults];
      }
    } catch (e) {}
    return defaultSchools;
  });

  const [users, setUsers] = useState(() => {
    try {
      const store = getPortalData();
      if (store && store.users && store.users.length > 0) {
        const storedAdmins = store.users.filter((u) => { const r = (u.role || '').toLowerCase(); return r.includes('admin') || r.includes('finance'); });
        if (storedAdmins.length > 0) {
          const storedIds = new Set(storedAdmins.map((u) => u.id));
          const remainingDefaults = defaultUsers.filter((u) => !storedIds.has(u.id));
          return [...storedAdmins, ...remainingDefaults];
        }
      }
    } catch (e) {}
    return defaultUsers;
  });

  const [services, setServices] = useState(() => {
    try {
      const store = getPortalData();
      if (store && store.services && store.services.length > 0) {
        return store.services.map((s) => ({ ...s, icon: '', cost: '0/yr' }));
      }
    } catch (e) {}
    return defaultServices;
  });
  const [plans, setPlans] = useState(() => {
    try {
      const store = getPortalData();
      if (store && store.plans && store.plans.length > 0) {
        return store.plans.map((p) => ({ ...p, price: '0/yr' }));
      }
    } catch (e) {}
    return defaultPlans;
  });

  const [subscriptions, setSubscriptions] = useState(() => {
    try {
      const store = getPortalData();
      if (store && store.subscriptions && store.subscriptions.length > 0) {
        return store.subscriptions.map((s) => ({ ...s, amount: '0/yr' }));
      }
    } catch (e) {}
    return defaultSubscriptions;
  });

  const [bills, setBills] = useState(() => {
    try {
      const store = getPortalData();
      if (store && store.bills && store.bills.length > 0) {
        return store.bills.map((b) => ({ ...b, amount: '0/yr' }));
      }
    } catch (e) {}
    return defaultBills;
  });

  const [activities, setActivities] = useState(defaultActivities);

  
  const [schoolFilter, setSchoolFilter] = useState('All');
  const [schoolSearch, setSchoolSearch] = useState('');
  const [adminFilter, setAdminFilter] = useState('All');
  const [adminSearch, setAdminSearch] = useState('');
  const [serviceSearch, setServiceSearch] = useState('');
  const [selectedSchoolForServiceView, setSelectedSchoolForServiceView] = useState('All');
  const [activeInteractiveService, setActiveInteractiveService] = useState(null);
  const [subViewType, setSubViewType] = useState('subs'); 
  const [subStatusFilter, setSubStatusFilter] = useState('All');
  const [billFilter, setBillFilter] = useState('All');
  const [settingsSection, setSettingsSection] = useState('platform');
  const [servicesMainSection, setServicesMainSection] = useState('available'); 
  const [schoolServiceFilter, setSchoolServiceFilter] = useState('All'); 
  const [schoolAssignments, setSchoolAssignments] = useState(() => {
    try {
      const store = getPortalData();
      if (store && store.schoolServiceAssignments && store.schoolServiceAssignments.length > 0) {
        return store.schoolServiceAssignments.map((a) => ({
          ...a,
          portalAccess: a.portalAccess !== undefined ? a.portalAccess : (a.status !== 'Inactive'),
          visibleRoles: a.visibleRoles || ['student', 'teacher', 'parent', 'principal', 'schooladmin'],
        }));
      }
    } catch (e) {}
    return defaultSchoolServiceAssignments;
  });
  const [isAssignServiceModalOpen, setIsAssignServiceModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceFormData, setServiceFormData] = useState({
    name: '',
    icon: '',
    category: 'General',
    cost: '0/yr',
    description: '',
    status: 'Active',
    visibleRoles: ['schooladmin', 'teacher', 'student']
  });
  const [assignFormData, setAssignFormData] = useState({
    serviceId: '',
    schoolId: '',
    status: 'Active',
    portalAccess: true,
    visibleRoles: ['student', 'teacher', 'parent', 'principal', 'schooladmin']
  });

  
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [activeCampusPortal, setActiveCampusPortal] = useState(null); 
  const [activeCampusRole, setActiveCampusRole] = useState('schooladmin'); 
  const [activeCampusTab, setActiveCampusTab] = useState('school-admin-users');
  const [isEditSchoolOpen, setIsEditSchoolOpen] = useState(false);
  const [isAdminProfileOpen, setIsAdminProfileOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [isAssignAdminOpen, setIsAssignAdminOpen] = useState(false);
  const [assignInitialAdminId, setAssignInitialAdminId] = useState(null);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [subModalTab, setSubModalTab] = useState('subscription');
  const [selectedPlanObj, setSelectedPlanObj] = useState(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [feedback, setFeedback] = useState({ isOpen: false, title: '', message: '', credentials: null });
  const [cardDetailModal, setCardDetailModal] = useState({ isOpen: false, config: null });
  const [selectedInvoiceForPrint, setSelectedInvoiceForPrint] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {} });



  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schRes, plnRes, subRes, bilRes, usrRes] = await Promise.all([
          api.getSchools().catch(() => ({ success: false })),
          api.getPlans().catch(() => ({ success: false })),
          api.getSubscriptions().catch(() => ({ success: false })),
          api.getBills().catch(() => ({ success: false })),
          api.getUsers({ role: 'schooladmin' }).catch(() => ({ success: false })),
        ]);
        if (schRes.success && schRes.data && schRes.data.length > 0) {
          
          const mapped = schRes.data.map((s) => ({
            id: s.schoolId || s._id,
            name: s.name,
            code: s.code || `SCH-${s.schoolId}`,
            city: s.city || 'Tamil Nadu',
            phone: s.phone || '+91 94400 00000',
            email: s.email || 'contact@school.edu',
            principal: s.principalName || s.principal || 'Principal',
            academicYear: s.academicYear || '2026-2027',
            admin: s.email || 'admin@school.edu',
            adminName: s.principalName || 'Admin',
            status: s.status || 'Active',
            studentsCount: s.studentCount || s.studentsCount || 450,
            teachersCount: s.teacherCount || s.teachersCount || 25,
            parentsCount: s.parentsCount || 420,
            subscription: s.plan || 'Pro Plan',
            createdDate: s.joinedDate || s.createdAt?.split('T')[0] || '2026-01-15',
            board: s.board || 'State Board',
          }));
          setSchools((prev) => {
            const apiIds = new Set(mapped.map((m) => m.id));
            const localOnly = prev.filter((p) => !apiIds.has(p.id));
            return [...localOnly, ...mapped];
          });
        }
        if (plnRes.success && plnRes.data && plnRes.data.length > 0) {
          setPlans(plnRes.data.map((p) => ({
            id: p.planId || p._id,
            name: p.name,
            maxStudents: p.maxStudents || 1500,
            price: p.price.startsWith('₹') ? p.price : `₹${p.price}/yr`,
            features: Array.isArray(p.features) ? p.features.join(', ') : p.features,
          })));
        }
        if (subRes.success && subRes.data && subRes.data.length > 0) {
          const mappedSubs = subRes.data.map((sub) => ({
            id: sub.subscriptionId || sub._id,
            schoolId: sub.schoolId,
            school: sub.schoolName || 'School Campus',
            plan: sub.planName || 'Pro Plan',
            startDate: sub.startDate ? sub.startDate.split('T')[0] : '2026-01-01',
            endDate: sub.endDate ? sub.endDate.split('T')[0] : '2027-01-01',
            amount: typeof sub.amount === 'number' ? `₹${sub.amount.toLocaleString()}` : sub.amount,
            status: sub.status ? sub.status.toUpperCase() : 'ACTIVE',
          }));
          setSubscriptions((prev) => {
            const apiIds = new Set(mappedSubs.map((m) => m.id));
            const localOnly = prev.filter((p) => !apiIds.has(p.id));
            return [...localOnly, ...mappedSubs];
          });
        }
        if (bilRes.success && bilRes.data && bilRes.data.length > 0) {
          const mappedBills = bilRes.data.map((b) => ({
            invoiceNo: b.invoiceNo || b.billId,
            schoolId: b.schoolId,
            school: b.schoolName || 'School Campus',
            plan: b.planName || 'Pro Plan',
            amount: typeof b.amount === 'number' ? `₹${b.amount.toLocaleString()}` : b.amount,
            dueDate: b.dueDate ? b.dueDate.split('T')[0] : '2026-03-31',
            paymentDate: b.paymentDate ? b.paymentDate.split('T')[0] : null,
            status: b.status ? b.status.toUpperCase() : 'PENDING',
          }));
          setBills((prev) => {
            const apiIds = new Set(mappedBills.map((b) => b.invoiceNo));
            const localOnly = prev.filter((p) => !apiIds.has(p.invoiceNo));
            return [...localOnly, ...mappedBills];
          });
        }
        if (usrRes.success && usrRes.data && usrRes.data.length > 0) {
          const mappedUsers = usrRes.data.map((u) => ({
            id: u.userId || u._id,
            name: u.name,
            email: u.email,
            phone: u.phone,
            username: u.username,
            role: 'SCHOOL_ADMIN',
            schoolId: u.schoolId,
            schoolName: u.schoolName,
            status: u.status || 'Active',
            createdDate: u.createdAt ? u.createdAt.split('T')[0] : '2026-01-15',
          }));
          setUsers((prev) => {
            const apiIds = new Set(mappedUsers.map((m) => m.id));
            const localOnly = prev.filter((p) => !apiIds.has(p.id));
            return [...localOnly, ...mappedUsers];
          });
        }
      } catch (err) {
        console.warn('API sync notice:', err);
      }
    };
    fetchData();
  }, []);

  const showFeedback = (title, message, credentials = null) => {
    setFeedback({ isOpen: true, title, message, credentials });
  };

  
  const renderActivityIcon = (type) => {
    switch (type) {
      case 'sub_activated':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
        );
      case 'payment_received':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        );
      case 'school_registered':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18"></path><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path>
          </svg>
        );
      case 'school_activated':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        );
      case 'school_deactivated':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        );
      default:
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        );
    }
  };

  
  const totalSchools = schools.length;
  const activeSchools = schools.filter((s) => s.status === 'Active').length;
  const inactiveSchools = schools.filter((s) => s.status !== 'Active').length;
  const schoolAdmins = users.filter((u) => {
    const r = (u.role || '').toLowerCase().replace(/[^a-z]/g, '');
    return (r === 'schooladmin' || r === 'admin' || r === 'schooladministrator') && !r.includes('finance') && !r.includes('super');
  });
  const totalSchoolAdmins = schoolAdmins.length;
  const activeSubs = subscriptions.filter((s) => s.status === 'ACTIVE' || s.status === 'Active').length;
  const expiringSubs = subscriptions.filter((s) => s.status === 'EXPIRED' || s.status === 'PENDING').length;
  const pendingBills = bills.filter((b) => b.status === 'PENDING' || b.status === 'OVERDUE').length;
  const totalRevenue = bills
    .filter((b) => b.status === 'PAID')
    .reduce((sum, b) => {
      const raw = typeof b.amount === 'string' ? b.amount.replace(/[^0-9]/g, '') : b.amount;
      return sum + (parseInt(raw) || 0);
    }, 0);
  const totalStudents = schools.reduce((sum, s) => sum + (s.studentsCount || 0), 0);
  const totalTeachers = schools.reduce((sum, s) => sum + (s.teachersCount || 0), 0);
  const totalParents = schools.reduce((sum, s) => sum + (s.parentsCount || 0), 0);
  const totalStaff = totalTeachers + totalSchoolAdmins + schools.length;

  
  const handleToggleSchool = async (id, newStatus) => {
    // 1. Update React state immediately
    setSchools((prev) =>
      prev.map((s) => (s.id === id || s.schoolId === id ? { ...s, status: newStatus } : s))
    );

    // 2. Persist to localStorage / portalData store
    try {
      const store = getPortalData() || {};
      if (store && store.schools) {
        store.schools = store.schools.map((s) =>
          s.id === id || s.schoolId === id ? { ...s, status: newStatus } : s
        );
        savePortalData(store);
      }
      setSchoolStatusInStore(id, newStatus);
    } catch (err) {
      console.warn('Could not save school status locally:', err);
    }

    // 3. Persist to Backend API
    try {
      await api.updateSchool(id, { status: newStatus });
    } catch (apiErr) {
      console.warn('Backend updateSchool notice:', apiErr.message);
    }

    const target = schools.find((s) => s.id === id || s.schoolId === id);
    const targetName = target ? target.name : id;

    // 4. Record audit activity
    setActivities((prev) => [
      {
        id: 'ACT-' + Date.now(),
        type: newStatus === 'Active' ? 'school_activated' : 'school_deactivated',
        text: `Campus status changed to ${newStatus} for ${targetName}`,
        time: 'Just now',
      },
      ...prev,
    ]);

    // 5. Informative feedback alert
    if (newStatus === 'Active') {
      showFeedback(
        'Campus Activated',
        `Success: ${targetName} is now ACTIVE. All school portals, faculty accounts, fee collections, and student logins for this institution are fully operational.`
      );
    } else {
      showFeedback(
        'Campus Deactivated',
        `Attention: ${targetName} has been DEACTIVATED. All logins and portal access for this entire school have been locked and suspended.`
      );
    }
  };

  
  const handleToggleAdmin = async (id, newStatus) => {
    // 1. Update React state immediately
    setUsers((prev) =>
      prev.map((u) => (u.id === id || u.userId === id ? { ...u, status: newStatus } : u))
    );

    // 2. Persist to localStorage / portalData store
    try {
      const store = getPortalData() || {};
      if (store && store.users) {
        store.users = store.users.map((u) =>
          u.id === id || u.userId === id ? { ...u, status: newStatus } : u
        );
        savePortalData(store);
      }
      setUserStatusInStore(id, newStatus);
      window.dispatchEvent(new Event('portal_data_updated'));
    } catch (err) {
      console.warn('Could not save user status locally:', err);
    }

    // 3. Persist to Backend API
    try {
      await api.updateUser(id, { status: newStatus });
    } catch (apiErr) {
      console.warn('Backend updateUser notice:', apiErr.message);
    }

    const target = users.find((u) => u.id === id || u.userId === id);
    const targetName = target ? target.name : id;

    // 4. Record audit activity
    setActivities((prev) => [
      {
        id: 'ACT-' + Date.now(),
        type: newStatus === 'Active' ? 'admin_activated' : 'admin_deactivated',
        text: `Administrator ${targetName} status changed to ${newStatus}`,
        time: 'Just now',
      },
      ...prev,
    ]);

    // 5. Informative feedback alert
    if (newStatus === 'Active') {
      showFeedback(
        'Administrator Activated',
        `Success: ${targetName} is now ACTIVE. Login credentials and portal access have been fully restored.`
      );
    } else {
      showFeedback(
        'Administrator Deactivated',
        `Attention: ${targetName} has been DEACTIVATED. All logins and portal access for this administrator account are now locked and suspended.`
      );
    }
  };

  const handleTogglePortalAccess = (assignmentId) => {
    let nextVal = true;
    let targetName = 'Service';
    let targetSchool = 'School';

    setSchoolAssignments((prev) => {
      const updated = prev.map((a) => {
        if (a.id === assignmentId) {
          nextVal = a.portalAccess === false ? true : false;
          targetName = a.serviceName;
          targetSchool = a.schoolName;
          return { ...a, portalAccess: nextVal };
        }
        return a;
      });
      try {
        const store = getPortalData() || {};
        store.schoolServiceAssignments = updated;
        savePortalData(store);
      } catch (e) {}
      window.dispatchEvent(new Event('portal_data_updated'));
      return updated;
    });

    showFeedback(
      'Portal Access Updated',
      `Portal access for "${targetName}" at ${targetSchool} is now ${nextVal ? 'ENABLED (ON)' : 'DISABLED (OFF)'}.`
    );
  };

  const handleToggleServiceRole = (assignmentId, roleName) => {
    setSchoolAssignments((prev) => {
      const updated = prev.map((a) => {
        if (a.id === assignmentId) {
          const currentRoles = (a.visibleRoles || ['student', 'teacher', 'parent', 'principal', 'schooladmin']).map((r) => r.toLowerCase());
          const targetRole = roleName.toLowerCase();
          const exists = currentRoles.includes(targetRole);
          const nextRoles = exists
            ? currentRoles.filter((r) => r !== targetRole)
            : [...currentRoles, targetRole];
          return { ...a, visibleRoles: nextRoles };
        }
        return a;
      });
      try {
        const store = getPortalData() || {};
        store.schoolServiceAssignments = updated;
        savePortalData(store);
      } catch (e) {}
      window.dispatchEvent(new Event('portal_data_updated'));
      return updated;
    });
  };

  
  const handleResetAdminPassword = (adminId) => {
    const admin = users.find((u) => u.id === adminId);
    if (!admin) return;
    const newPass = 'Zen@' + Math.floor(10000 + Math.random() * 90000);
    showFeedback('Password Reset', `Temporary password for ${admin.name} (${admin.email}):\n\n${newPass}`);
  };

  
  const handleAssignAdmin = (adminId, schoolId) => {
    const admin = users.find((u) => (u.id || u.userId) === adminId);
    const school = schools.find((s) => (s.id || s.schoolId) === schoolId);
    if (admin && school) {
      setUsers((prev) =>
        prev.map((u) =>
          (u.id || u.userId) === adminId
            ? { ...u, schoolId, schoolName: school.name }
            : u
        )
      );
      setSchools((prev) =>
        prev.map((s) =>
          (s.id || s.schoolId) === schoolId
            ? { ...s, admin: admin.email, adminName: admin.name }
            : s
        )
      );
      showFeedback('Admin Reassigned', `${admin.name} is now the assigned School Admin for ${school.name}.`);
    }
  };

  
  const handleAddAdmin = async (newAdmin) => {
    setUsers((prev) => [newAdmin, ...prev]);
    if (newAdmin.schoolId) {
      setSchools((prev) =>
        prev.map((s) =>
          (s.id || s.schoolId) === newAdmin.schoolId
            ? { ...s, admin: newAdmin.email, adminName: newAdmin.name, adminUsername: newAdmin.username, adminPassword: newAdmin.password }
            : s
        )
      );
    }
    try {
      const store = getPortalData() || {};
      if (!store.users) store.users = [];
      store.users.unshift(newAdmin);
      if (newAdmin.schoolId && store.schools) {
        store.schools = store.schools.map((s) =>
          (s.id || s.schoolId) === newAdmin.schoolId
            ? { ...s, admin: newAdmin.email, adminName: newAdmin.name, adminUsername: newAdmin.username, adminPassword: newAdmin.password }
            : s
        );
      }
      savePortalData(store);
      if (typeof api !== 'undefined' && api && typeof api.createUser === 'function') {
        await api.createUser(newAdmin);
      }
    } catch (e) {}
    showFeedback('Admin Created', `Admin ${newAdmin.name} created and assigned.`);
  };

  
  const handleToggleService = (id) => {
    setServices((prev) =>
      prev.map((srv) =>
        srv.id === id
          ? { ...srv, status: srv.status === 'Active' ? 'Inactive' : 'Active' }
          : srv
      )
    );
  };

  
  const handleMarkBillPaid = (invoiceNo) => {
    const bill = bills.find((b) => b.invoiceNo === invoiceNo);
    if (bill) {
      setBills((prev) =>
        prev.map((b) =>
          b.invoiceNo === invoiceNo
            ? { ...b, status: 'PAID', paymentDate: new Date().toISOString().split('T')[0] }
            : b
        )
      );
      setActivities((prev) => [
        {
          id: 'ACT-' + Date.now(),
          type: 'payment_received',
          text: `Payment received: ${bill.amount} (${invoiceNo}) from ${bill.school}`,
          time: 'Just now',
        },
        ...prev,
      ]);
      showFeedback('Payment Recorded', `Invoice ${invoiceNo} marked as PAID.`);
    }
  };

  
  const handleSaveInvoice = (newBill) => {
    setBills((prev) => [newBill, ...prev]);
    showFeedback('Invoice Generated', `Invoice ${newBill.invoiceNo} for ${newBill.school} generated.`);
  };

  
  const handleSaveSubOrPlan = (event) => {
    if (event.type === 'subscription') {
      setSubscriptions((prev) => {
        const existingIdx = prev.findIndex(
          (s) => s.schoolId === event.data.schoolId || s.id === event.data.id || s.school === event.data.school
        );
        if (existingIdx >= 0) {
          const updated = [...prev];
          updated[existingIdx] = { ...updated[existingIdx], ...event.data };
          return updated;
        }
        return [event.data, ...prev];
      });

      
      setSchools((prev) =>
        prev.map((s) => {
          if (s.id === event.data.schoolId || s.schoolId === event.data.schoolId || s.name === event.data.school) {
            const planObj = plans.find((p) => p.name === event.data.plan);
            const maxStudents = planObj ? planObj.maxStudents : (s.studentsCount || 450);
            return {
              ...s,
              subscription: event.data.plan,
              studentsCount: s.studentsCount || Math.min(450, maxStudents),
              teachersCount: s.teachersCount || 24,
              parentsCount: s.parentsCount || 410,
            };
          }
          return s;
        })
      );

      
      const newInvoice = {
        invoiceNo: 'INV-2026-0' + Math.floor(10 + Math.random() * 90),
        schoolId: event.data.schoolId,
        school: event.data.school,
        plan: event.data.plan,
        amount: event.data.amount,
        dueDate: event.data.endDate,
        paymentDate: event.data.status === 'ACTIVE' ? new Date().toISOString().split('T')[0] : null,
        status: event.data.status === 'ACTIVE' ? 'PAID' : 'PENDING',
      };
      setBills((prev) => [newInvoice, ...prev]);

      setActivities((prev) => [
        {
          id: 'ACT-' + Date.now(),
          type: 'sub_activated',
          text: `${event.data.plan} activated for ${event.data.school}`,
          time: 'Just now',
        },
        ...prev,
      ]);

      
      try {
        const store = getPortalData();
        if (!store.subscriptions) store.subscriptions = [];
        const subIdx = store.subscriptions.findIndex(
          (s) => s.schoolId === event.data.schoolId || s.id === event.data.id || s.school === event.data.school
        );
        if (subIdx >= 0) {
          store.subscriptions[subIdx] = { ...store.subscriptions[subIdx], ...event.data };
        } else {
          store.subscriptions.unshift(event.data);
        }

        if (store.schools) {
          store.schools = store.schools.map((s) =>
            s.id === event.data.schoolId || s.name === event.data.school
              ? { ...s, subscription: event.data.plan }
              : s
          );
        }
        if (!store.bills) store.bills = [];
        store.bills.unshift(newInvoice);
        savePortalData(store);
      } catch (e) {}

      showFeedback(
        'Subscription & Payment Activated',
        `Subscription ${event.data.id} (${event.data.plan} - ${event.data.amount}) successfully activated for ${event.data.school}.\nInvoice ${newInvoice.invoiceNo} generated.`
      );
    } else if (event.type === 'plan') {
      if (event.isEdit) {
        setPlans((prev) => prev.map((p) => (p.id === event.data.id ? event.data : p)));
        showFeedback('Plan Updated', `Plan ${event.data.name} updated.`);
      } else {
        setPlans((prev) => [...prev, event.data]);
        showFeedback('Plan Created', `New plan tier ${event.data.name} added.`);
      }
    }
  };

  
  const handleUpdateSchoolCredentials = (schoolId, { role, newPassword }) => {
    if (!schoolId || !newPassword) return;

    const trimmedPassword = newPassword.trim();
    const isFinance = role === 'finance' || role === 'financemanager';

    setSelectedSchool((prev) => {
      if (!prev || (prev.id !== schoolId && prev.schoolId !== schoolId)) return prev;
      if (isFinance) {
        return { ...prev, financePassword: trimmedPassword };
      }
      return { ...prev, password: trimmedPassword, adminPassword: trimmedPassword };
    });

    setSchools((prev) =>
      prev.map((s) => {
        if (s.id === schoolId || s.schoolId === schoolId) {
          if (isFinance) {
            return { ...s, financePassword: trimmedPassword };
          }
          return { ...s, password: trimmedPassword, adminPassword: trimmedPassword };
        }
        return s;
      })
    );

    let targetUsername = '';
    setUsers((prev) =>
      prev.map((u) => {
        const matchSchool = u.schoolId === schoolId;
        const uRole = (u.role || '').toLowerCase();
        const matchRole = isFinance
          ? (uRole === 'finance' || uRole === 'financemanager')
          : (uRole === 'schooladmin' || uRole === 'school_admin');
        if (matchSchool && matchRole) {
          targetUsername = u.username;
          return { ...u, password: trimmedPassword };
        }
        return u;
      })
    );

    try {
      const store = getPortalData();
      if (store.schools) {
        store.schools = store.schools.map((s) => {
          if (s.id === schoolId || s.schoolId === schoolId) {
            if (isFinance) return { ...s, financePassword: trimmedPassword };
            return { ...s, password: trimmedPassword, adminPassword: trimmedPassword };
          }
          return s;
        });
      }
      if (store.users) {
        let foundInStore = false;
        store.users = store.users.map((u) => {
          const matchSchool = u.schoolId === schoolId;
          const uRole = (u.role || '').toLowerCase();
          const matchRole = isFinance
            ? (uRole === 'finance' || uRole === 'financemanager')
            : (uRole === 'schooladmin' || uRole === 'school_admin');
          if (matchSchool && matchRole) {
            foundInStore = true;
            if (!targetUsername) targetUsername = u.username;
            return { ...u, password: trimmedPassword };
          }
          return u;
        });

        if (!foundInStore) {
          const currentTargetSchool = (store.schools || []).find((s) => s.id === schoolId || s.schoolId === schoolId) || selectedSchool;
          const cleanCode = (currentTargetSchool?.code || 'school').toLowerCase().replace(/[^a-z0-9]/g, '');
          const newUname = isFinance
            ? (currentTargetSchool?.financeUsername || `finance_${cleanCode.substring(0, 8)}`)
            : (currentTargetSchool?.username || currentTargetSchool?.adminUsername || `admin_${cleanCode.substring(0, 8)}`);
          const newEmail = isFinance
            ? (currentTargetSchool?.financeEmail || `finance@${cleanCode}.edu`)
            : (currentTargetSchool?.admin || currentTargetSchool?.email || `admin@${cleanCode}.edu`);

          store.users.push({
            id: 'USR_' + Date.now(),
            name: isFinance ? 'School Finance Manager' : (currentTargetSchool?.adminName || 'School Administrator'),
            username: newUname,
            email: newEmail,
            password: trimmedPassword,
            role: isFinance ? 'finance' : 'schooladmin',
            schoolId: schoolId,
            schoolName: currentTargetSchool?.name || 'Campus',
            status: 'Active',
            createdDate: new Date().toISOString().split('T')[0],
          });
          if (!targetUsername) targetUsername = newUname;
        }
      }
      savePortalData(store);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('portal_data_updated', { detail: store }));
      }
    } catch (e) {
      console.warn('Error saving updated credentials to local store:', e);
    }

    try {
      if (api && typeof api.syncAuthUser === 'function') {
        const currentTargetSchool = schools.find((s) => s.id === schoolId || s.schoolId === schoolId) || selectedSchool;
        const cleanCode = (currentTargetSchool?.code || 'school').toLowerCase().replace(/[^a-z0-9]/g, '');
        const fallbackUsername = isFinance ? `finance_${cleanCode.substring(0, 8)}` : `admin_${cleanCode.substring(0, 8)}`;
        const finalUsername = targetUsername || (isFinance ? currentTargetSchool?.financeUsername : (currentTargetSchool?.username || currentTargetSchool?.adminUsername)) || fallbackUsername;

        api.syncAuthUser({
          username: finalUsername,
          password: trimmedPassword,
          role: isFinance ? 'finance' : 'schooladmin',
          schoolId: schoolId,
          schoolName: currentTargetSchool?.name || 'Campus'
        }).catch(() => {});
      }
    } catch (e) {}

    showFeedback(
      'Credentials Updated',
      `The ${isFinance ? 'Finance Manager' : 'School Administrator'} password for "${selectedSchool?.name || 'school'}" has been changed to "${trimmedPassword}". Login accounts have been updated in Auth Directory.`
    );
  };

  const handleSchoolOnboarded = (newSchool) => {
    setIsWizardOpen(false);

    newSchool.studentsCount = 10;
    newSchool.teachersCount = 5;
    newSchool.parentsCount = 10;

    setSchools((prev) => [newSchool, ...prev]);

    const cleanCode = (newSchool.code || 'school').toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanPrefix = (newSchool.code || 'SCH').toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 6) || 'CAMP';
    const adminEmail = newSchool.admin || newSchool.email || `admin@${cleanCode}.edu`;
    const adminUsername = newSchool.username || `admin_${cleanCode.substring(0, 8)}`;
    const adminName = newSchool.adminName || `Admin ${newSchool.name}`;
    const adminPassword = newSchool.password || 'Admin@12345';

    const financeEmail = newSchool.financeEmail || `finance@${cleanCode}.edu`;
    const financeUsername = newSchool.financeUsername || `finance_${cleanCode.substring(0, 8)}`;
    const financeName = newSchool.financeName || `Finance Manager (${newSchool.name})`;
    const financePassword = newSchool.financePassword || 'Finance@12345';

    newSchool.username = adminUsername;
    newSchool.password = adminPassword;
    newSchool.adminUsername = adminUsername;
    newSchool.adminPassword = adminPassword;
    newSchool.admin = adminEmail;
    newSchool.adminName = adminName;
    newSchool.financeEmail = financeEmail;
    newSchool.financeUsername = financeUsername;
    newSchool.financePassword = financePassword;
    newSchool.financeName = financeName;

    const createdAdmin = {
      id: 'USR0' + (users.length + 10) + Math.floor(10 + Math.random() * 89),
      name: adminName,
      email: adminEmail,
      phone: newSchool.phone || '+91 94400 00000',
      username: adminUsername,
      password: adminPassword,
      role: 'SCHOOL_ADMIN',
      schoolId: newSchool.id,
      schoolName: newSchool.name,
      status: 'Active',
      createdDate: new Date().toISOString().split('T')[0],
      aliases: [adminUsername, adminEmail]
    };

    const createdFinance = {
      id: 'USR0' + (users.length + 20) + Math.floor(10 + Math.random() * 89),
      name: financeName,
      email: financeEmail,
      phone: newSchool.phone || '+91 94400 00001',
      username: financeUsername,
      password: financePassword,
      role: 'FINANCE',
      schoolId: newSchool.id,
      schoolName: newSchool.name,
      status: 'Active',
      createdDate: new Date().toISOString().split('T')[0],
      aliases: [financeUsername, financeEmail]
    };

    setUsers((prev) => [createdAdmin, createdFinance, ...prev]);

    const pendingSub = {
      id: 'SUB-' + (newSchool.code || newSchool.id).replace(/[^A-Z0-9]/gi, '').toUpperCase() + '-01',
      schoolId: newSchool.id,
      school: newSchool.name,
      plan: 'Pending Activation',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '—',
      amount: 'Pending',
      status: 'PENDING',
    };
    setSubscriptions((prev) => [pendingSub, ...prev]);

    setActivities((prev) => [
      {
        id: 'ACT-' + Date.now(),
        type: 'school_registered',
        text: `New School Campus Onboarded: ${newSchool.name} (${newSchool.code})`,
        time: 'Just now',
      },
      ...prev,
    ]);

    const demoTeachers = [
      {
        id: `${cleanPrefix}-T01`,
        name: 'Mrs. Priya Sundaram',
        roleType: 'Teacher',
        phone: '+91 98401 23451',
        email: `priya.s@${cleanCode}.edu`,
        address: `${newSchool.city || 'Chennai'}, Tamil Nadu`,
        bloodGroup: 'O+',
        qualification: 'M.Sc., B.Ed',
        subject: 'Mathematics',
        onboardSubject: 'Mathematics',
        class: 'Grade 10-A',
        schoolId: newSchool.id,
        schoolName: newSchool.name,
        status: 'Active'
      },
      {
        id: `${cleanPrefix}-T02`,
        name: 'Dr. Anandhi Rajan',
        roleType: 'Teacher',
        phone: '+91 98401 23452',
        email: `anandhi.r@${cleanCode}.edu`,
        address: `${newSchool.city || 'Chennai'}, Tamil Nadu`,
        bloodGroup: 'A+',
        qualification: 'Ph.D., M.Sc., B.Ed',
        subject: 'Physics',
        onboardSubject: 'Physics',
        class: 'Grade 10-B',
        schoolId: newSchool.id,
        schoolName: newSchool.name,
        status: 'Active'
      },
      {
        id: `${cleanPrefix}-T03`,
        name: 'Mr. Raghu Raman',
        roleType: 'Teacher',
        phone: '+91 98401 23453',
        email: `raghu.r@${cleanCode}.edu`,
        address: `${newSchool.city || 'Chennai'}, Tamil Nadu`,
        bloodGroup: 'B+',
        qualification: 'M.Sc., M.Phil., B.Ed',
        subject: 'Chemistry',
        onboardSubject: 'Chemistry',
        class: 'Grade 11-A',
        schoolId: newSchool.id,
        schoolName: newSchool.name,
        status: 'Active'
      },
      {
        id: `${cleanPrefix}-T04`,
        name: 'Mrs. Revathi Chandran',
        roleType: 'Teacher',
        phone: '+91 98401 23454',
        email: `revathi.c@${cleanCode}.edu`,
        address: `${newSchool.city || 'Chennai'}, Tamil Nadu`,
        bloodGroup: 'AB+',
        qualification: 'M.A., M.Ed',
        subject: 'English',
        onboardSubject: 'English',
        class: 'Grade 11-B',
        schoolId: newSchool.id,
        schoolName: newSchool.name,
        status: 'Active'
      },
      {
        id: `${cleanPrefix}-T05`,
        name: 'Mr. Vijay Ananth',
        roleType: 'Teacher',
        phone: '+91 98401 23455',
        email: `vijay.a@${cleanCode}.edu`,
        address: `${newSchool.city || 'Chennai'}, Tamil Nadu`,
        bloodGroup: 'O+',
        qualification: 'M.C.A., B.Ed',
        subject: 'Computer Science',
        onboardSubject: 'Computer Science',
        class: 'Grade 12-A',
        schoolId: newSchool.id,
        schoolName: newSchool.name,
        status: 'Active'
      }
    ];

    const demoStudentConfigs = [
      { num: '01', name: 'Aarav Sundaram', grade: 'Grade 10', sec: 'A', gender: 'Male', parent: 'Mr. Sundaram K. (Father)', phone: '+91 98401 55101', total: 20000, paid: 20000, status: 'PAID' },
      { num: '02', name: 'Divya Prakash', grade: 'Grade 10', sec: 'A', gender: 'Female', parent: 'Mr. Prakash R. (Father)', phone: '+91 98401 55102', total: 20000, paid: 10000, status: 'PARTIAL' },
      { num: '03', name: 'Karthik Venkat', grade: 'Grade 10', sec: 'A', gender: 'Male', parent: 'Mrs. Venkat L. (Mother)', phone: '+91 98401 55103', total: 20000, paid: 0, status: 'OVERDUE' },
      { num: '04', name: 'Harini Saravanan', grade: 'Grade 10', sec: 'B', gender: 'Female', parent: 'Mr. Saravanan M. (Father)', phone: '+91 98401 55104', total: 20000, paid: 20000, status: 'PAID' },
      { num: '05', name: 'Manoj Kumar', grade: 'Grade 10', sec: 'B', gender: 'Male', parent: 'Mr. Kumarasamy (Father)', phone: '+91 98401 55105', total: 20000, paid: 5000, status: 'PARTIAL' },
      { num: '06', name: 'Nandhini R', grade: 'Grade 11', sec: 'A', gender: 'Female', parent: 'Mrs. Radha R. (Mother)', phone: '+91 98401 55106', total: 20000, paid: 20000, status: 'PAID' },
      { num: '07', name: 'Pradeep Raj', grade: 'Grade 11', sec: 'A', gender: 'Male', parent: 'Mr. Rajendran P. (Father)', phone: '+91 98401 55107', total: 20000, paid: 0, status: 'OVERDUE' },
      { num: '08', name: 'Sneha Murugan', grade: 'Grade 11', sec: 'B', gender: 'Female', parent: 'Mr. Murugan V. (Father)', phone: '+91 98401 55108', total: 20000, paid: 12000, status: 'PARTIAL' },
      { num: '09', name: 'Vigneshwaran S', grade: 'Grade 12', sec: 'A', gender: 'Male', parent: 'Mr. Sivakumar T. (Father)', phone: '+91 98401 55109', total: 20000, paid: 20000, status: 'PAID' },
      { num: '10', name: 'Varsha Balaji', grade: 'Grade 12', sec: 'A', gender: 'Female', parent: 'Mrs. Balaji K. (Mother)', phone: '+91 98401 55110', total: 20000, paid: 10000, status: 'PARTIAL' }
    ];

    const demoStudents = [];
    const demoFeeRecords = [];
    const demoParents = [];

    demoStudentConfigs.forEach((cfg) => {
      const roll = `${cleanPrefix}-S${cfg.num}`;
      const className = `${cfg.grade}-${cfg.sec}`;
      const due = Math.max(0, cfg.total - cfg.paid);
      const invoiceNo = `INV-2026-${cleanPrefix}-${cfg.num}`;

      const feeItems = [
        { feeType: 'Admission Fees', description: 'Admission & Enrollment', amount: 5000, discount: 0, fine: 0, netAmount: 5000, status: cfg.paid >= 5000 ? 'Paid' : 'Unpaid', paidAmount: cfg.paid >= 5000 ? 5000 : 0 },
        { feeType: 'Transport Fees', description: 'Campus Bus / Van', amount: 5000, discount: 0, fine: 0, netAmount: 5000, status: cfg.paid >= 10000 ? 'Paid' : (cfg.paid > 5000 ? 'Partially Paid' : 'Unpaid'), paidAmount: cfg.paid >= 10000 ? 5000 : Math.max(0, cfg.paid - 5000) },
        { feeType: 'Monthly Fees', description: 'Monthly Tuition Fee', amount: 4000, discount: 0, fine: 0, netAmount: 4000, status: cfg.paid >= 14000 ? 'Paid' : 'Unpaid', paidAmount: cfg.paid >= 14000 ? 4000 : 0 },
        { feeType: 'Co-curricular Fees', description: 'Sports & Arts Activities', amount: 3000, discount: 0, fine: 0, netAmount: 3000, status: cfg.paid >= 17000 ? 'Paid' : 'Unpaid', paidAmount: cfg.paid >= 17000 ? 3000 : 0 },
        { feeType: 'Exam Fees', description: 'Assessments & Books', amount: 3000, discount: 0, fine: 0, netAmount: 3000, status: cfg.paid === cfg.total ? 'Paid' : 'Unpaid', paidAmount: cfg.paid === cfg.total ? 3000 : 0 }
      ];

      demoStudents.push({
        roll,
        regNo: `REG-2026-${cleanPrefix}-${cfg.num}`,
        name: cfg.name,
        class: className,
        gender: cfg.gender,
        schoolId: newSchool.id,
        schoolName: newSchool.name,
        attendance: `${92 + (parseInt(cfg.num, 10) % 7)}%`,
        performance: cfg.paid === cfg.total ? 'Outstanding' : 'Very Good',
        parentName: cfg.parent,
        parentPhone: cfg.phone,
        emergencyContact: cfg.phone,
        totalFees: cfg.total,
        feeItems,
        marks: [
          { subject: 'Mathematics', max: 100, scored: 88 + (parseInt(cfg.num, 10) % 10), grade: 'A+' },
          { subject: 'Physics', max: 100, scored: 84 + (parseInt(cfg.num, 10) % 12), grade: 'A+' },
          { subject: 'Chemistry', max: 100, scored: 86 + (parseInt(cfg.num, 10) % 9), grade: 'A' },
          { subject: 'Tamil', max: 100, scored: 92 + (parseInt(cfg.num, 10) % 7), grade: 'A+' },
          { subject: 'English', max: 100, scored: 90 + (parseInt(cfg.num, 10) % 8), grade: 'A+' }
        ]
      });

      demoFeeRecords.push({
        id: `FEE-${cleanPrefix}-${cfg.num}`,
        roll,
        studentId: roll,
        name: cfg.name,
        studentName: cfg.name,
        class: className,
        grade: cfg.grade,
        section: cfg.sec,
        parent: cfg.parent,
        parentName: cfg.parent,
        phone: cfg.phone,
        parentPhone: cfg.phone,
        totalFee: `₹${cfg.total.toLocaleString('en-IN')}`,
        totalFees: cfg.total,
        paid: `₹${cfg.paid.toLocaleString('en-IN')}`,
        paidAmount: cfg.paid,
        due: `₹${due.toLocaleString('en-IN')}`,
        pendingAmount: due,
        status: cfg.status,
        paymentStatus: cfg.status === 'PAID' ? 'Paid' : (cfg.paid > 0 ? 'Partially Paid' : 'Unpaid'),
        invoiceNumber: invoiceNo,
        dueDate: '2026-11-15',
        billingMonth: 'October',
        billingDate: new Date().toISOString().split('T')[0],
        schoolId: newSchool.id,
        schoolName: newSchool.name,
        feeItems
      });

      demoParents.push({
        id: `PRNT-${cleanPrefix}-${cfg.num}`,
        name: cfg.parent,
        phone: cfg.phone,
        studentRoll: roll,
        studentName: cfg.name,
        studentClass: className,
        schoolId: newSchool.id
      });
    });

    try {
      const store = getPortalData();
      if (!store.schools) store.schools = [];
      if (!store.users) store.users = [];
      if (!store.subscriptions) store.subscriptions = [];
      if (!store.teachers) store.teachers = [];
      if (!store.students) store.students = [];
      if (!store.feeRecords) store.feeRecords = [];
      if (!store.parents) store.parents = [];

      store.schools.unshift(newSchool);
      store.users.unshift(createdAdmin);
      store.users.unshift(createdFinance);
      store.subscriptions.unshift(pendingSub);

      demoTeachers.forEach((t) => store.teachers.unshift(t));
      demoStudents.forEach((s) => store.students.unshift(s));
      demoFeeRecords.forEach((f) => store.feeRecords.unshift(f));
      demoParents.forEach((p) => store.parents.unshift(p));

      if (!store.salaries) store.salaries = [];
      const demoSalaries = demoTeachers.map((t, idx) => ({
        _id: `sal_${t.id}`,
        salarySlipNo: `SLIP-2026-10-0${idx + 1}`,
        schoolId: newSchool.id,
        schoolName: newSchool.name,
        staffId: t.id,
        staffName: t.name,
        staffType: 'Teaching',
        designation: `${t.subject || 'Faculty'} Teacher`,
        department: t.subject || 'General',
        salaryMonth: 'October',
        salaryYear: 2026,
        basicSalary: 32000,
        hra: 10000,
        allowances: 3000,
        grossSalary: 45000,
        pfDeduction: 3840,
        netSalary: 41160,
        paymentStatus: idx % 2 === 0 ? 'Paid' : 'Pending',
        paymentDate: idx % 2 === 0 ? '2026-10-31' : null
      }));
      demoSalaries.forEach((s) => store.salaries.unshift(s));

      if (!store.expenses) store.expenses = [];
      const demoExpenses = [
        {
          _id: `exp_${cleanPrefix}_01`,
          expenseId: `EXP-2026-${cleanPrefix}-01`,
          schoolId: newSchool.id,
          schoolName: newSchool.name,
          expenseCategory: 'Electricity and Utilities',
          expenseName: 'Campus Power & Water Utilities',
          description: 'EB grid power and campus water supply',
          vendorName: 'State Electricity Board',
          invoiceNumber: `EB-OCT-${cleanPrefix}`,
          expenseDate: '2026-10-10',
          amount: 25000,
          paidAmount: 25000,
          pendingAmount: 0,
          paymentStatus: 'Paid',
          paymentMethod: 'NetBanking'
        },
        {
          _id: `exp_${cleanPrefix}_02`,
          expenseId: `EXP-2026-${cleanPrefix}-02`,
          schoolId: newSchool.id,
          schoolName: newSchool.name,
          expenseCategory: 'Maintenance',
          expenseName: 'Lab Kits & Campus Infrastructure',
          description: 'Computer maintenance and laboratory replenishment',
          vendorName: 'Campus Tech Supplies',
          invoiceNumber: `TECH-OCT-${cleanPrefix}`,
          expenseDate: '2026-10-14',
          amount: 15000,
          paidAmount: 10000,
          pendingAmount: 5000,
          paymentStatus: 'Pending',
          paymentMethod: 'Cheque'
        }
      ];
      demoExpenses.forEach((x) => store.expenses.unshift(x));

      savePortalData(store);

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('portal_data_updated', { detail: store }));
        window.dispatchEvent(new CustomEvent('fee_records_updated', { detail: { feeRecords: store.feeRecords } }));
      }
    } catch (e) {
      console.error('Error saving portal demo data:', e);
    }

    try {
      if (typeof api !== 'undefined' && api) {
        if (typeof api.createSchool === 'function') {
          api.createSchool(newSchool).catch(() => {});
        }
        if (typeof api.syncAuthUser === 'function') {
          api.syncAuthUser(createdAdmin).catch(() => {});
          api.syncAuthUser(createdFinance).catch(() => {});
        }
        if (typeof api.createUser === 'function') {
          api.createUser(createdAdmin).catch(() => {});
          api.createUser(createdFinance).catch(() => {});
        }
        if (typeof api.createStudent === 'function') {
          demoStudents.forEach((st) => {
            api.createStudent({
              name: st.name,
              rollNo: st.roll,
              grade: st.class.split('-')[0],
              section: st.class.split('-')[1] || 'A',
              gender: st.gender,
              parentName: st.parentName,
              parentPhone: st.parentPhone,
              feeStatus: st.performance === 'Outstanding' ? 'Paid' : 'Pending',
              schoolId: newSchool.id
            }).catch(() => {});
          });
        }
      }
    } catch (errSync) {}

    showFeedback(
      'School & Administrative Accounts Created',
      `School "${newSchool.name}" has been successfully registered with 10 demo students and 5 demo teachers. The system has automatically provisioned the School Administrator and Finance Manager login accounts:`,
      {
        schoolAdmin: {
          name: adminName,
          email: adminEmail,
          username: adminUsername,
          password: adminPassword,
        },
        financeManager: {
          name: financeName,
          email: financeEmail,
          username: financeUsername,
          password: financePassword,
        }
      }
    );
  };

  
  
  
  
  const filteredSchools = schools.filter((s) => {
    if (schoolFilter !== 'All' && s.status !== schoolFilter) return false;
    if (schoolSearch && !s.name.toLowerCase().includes(schoolSearch.toLowerCase()) && !(s.code || '').toLowerCase().includes(schoolSearch.toLowerCase()) && !(s.adminName || s.admin || '').toLowerCase().includes(schoolSearch.toLowerCase())) return false;
    return true;
  });

  const filteredAdmins = schoolAdmins.filter((a) => {
    if (adminFilter !== 'All' && a.status !== adminFilter) return false;
    if (adminSearch) {
      const q = adminSearch.toLowerCase();
      const matchesName = (a.name || '').toLowerCase().includes(q);
      const matchesEmail = (a.email || '').toLowerCase().includes(q);
      const matchesSchool = (a.schoolName || '').toLowerCase().includes(q);
      const matchesUsername = (a.username || '').toLowerCase().includes(q);
      if (!matchesName && !matchesEmail && !matchesSchool && !matchesUsername) return false;
    }
    return true;
  });

  const filteredSubs = subscriptions.filter((s) => {
    if (subStatusFilter !== 'All' && s.status !== subStatusFilter) return false;
    return true;
  });

  const filteredBills = bills.filter((b) => {
    if (billFilter !== 'All' && b.status !== billFilter) return false;
    return true;
  });

  return (
    <div>
      
      
      
      {activeTab === 'sa-dashboard' && (
        <div>
          
          <div className="content-header">
            <h2 id="section-title">Super Admin Dashboard</h2>
            <div id="section-actions"></div>
          </div>

          <div id="portal-content">
            
            <div className="grid-4" style={{ marginBottom: '25px' }}>
              
              <div
                className="portal-card clickable-card"
                style={{ borderLeftColor: '#2563eb' }}
                title="Click to view all registered schools"
                onClick={() =>
                  setCardDetailModal({
                    isOpen: true,
                    config: {
                      title: 'All Registered Schools',
                      subtitle: 'Comprehensive directory of onboarded multi-tenant campuses',
                      badgeColor: '#2563eb',
                      count: schools.length,
                      type: 'schools',
                      items: schools,
                      targetTab: 'sa-schools',
                      targetTabLabel: 'Schools Management',
                    },
                  })
                }
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-light)', fontWeight: 700 }}>Total Schools</div>
                  <span style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: 600 }}>View &rarr;</span>
                </div>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1e3a8a', margin: '4px 0' }}>{totalSchools}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600 }}>Platform Multi-Tenant</span>
              </div>

              
              <div
                className="portal-card clickable-card"
                style={{ borderLeftColor: '#10b981' }}
                title="Click to view active operational schools"
                onClick={() => {
                  const items = schools.filter((s) => s.status === 'Active');
                  setCardDetailModal({
                    isOpen: true,
                    config: {
                      title: 'Active Schools',
                      subtitle: 'Currently operational and enabled campuses',
                      badgeColor: '#10b981',
                      count: items.length,
                      type: 'schools',
                      items,
                      targetTab: 'sa-schools',
                      targetTabLabel: 'Schools Management',
                    },
                  });
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-light)', fontWeight: 700 }}>Active Schools</div>
                  <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>View &rarr;</span>
                </div>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#047857', margin: '4px 0' }}>{activeSchools}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600 }}>Operational</span>
              </div>

              
              <div
                className="portal-card clickable-card"
                style={{ borderLeftColor: '#ef4444' }}
                title="Click to view suspended or inactive schools"
                onClick={() => {
                  const items = schools.filter((s) => s.status !== 'Active');
                  setCardDetailModal({
                    isOpen: true,
                    config: {
                      title: 'Inactive & Suspended Schools',
                      subtitle: 'Campuses pending activation or suspended for review',
                      badgeColor: '#ef4444',
                      count: items.length,
                      type: 'schools',
                      items,
                      targetTab: 'sa-schools',
                      targetTabLabel: 'Schools Management',
                    },
                  });
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-light)', fontWeight: 700 }}>InActive Schools</div>
                  <span style={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: 600 }}>View &rarr;</span>
                </div>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#b91c1c', margin: '4px 0' }}>{inactiveSchools}</p>
                <span style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 600 }}>Suspended / Expired</span>
              </div>

              
              <div
                className="portal-card clickable-card"
                style={{ borderLeftColor: '#f59e0b' }}
                title="Click to view assigned school administrators"
                onClick={() =>
                  setCardDetailModal({
                    isOpen: true,
                    config: {
                      title: 'School Administrators',
                      subtitle: 'Assigned school head administrators & campus principals',
                      badgeColor: '#f59e0b',
                      count: schoolAdmins.length,
                      type: 'admins',
                      items: schoolAdmins,
                      targetTab: 'sa-admin-management',
                      targetTabLabel: 'Admin Management',
                    },
                  })
                }
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-light)', fontWeight: 700 }}>Total School Admins</div>
                  <span style={{ fontSize: '0.72rem', color: '#b45309', fontWeight: 600 }}>View &rarr;</span>
                </div>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#b45309', margin: '4px 0' }}>{totalSchoolAdmins}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>Assigned Admins</span>
              </div>

              
              <div
                className="portal-card clickable-card"
                style={{ borderLeftColor: '#10b981' }}
                title="Click to view active SaaS subscriptions"
                onClick={() => {
                  const items = subscriptions.filter((s) => s.status === 'ACTIVE' || s.status === 'Active');
                  setCardDetailModal({
                    isOpen: true,
                    config: {
                      title: 'Active SaaS Subscriptions',
                      subtitle: 'Campuses on active annual software subscriptions',
                      badgeColor: '#10b981',
                      count: items.length,
                      type: 'subscriptions',
                      items,
                      targetTab: 'sa-subscriptions',
                      targetTabLabel: 'Subscriptions',
                    },
                  });
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-light)', fontWeight: 700 }}>Active Subscriptions</div>
                  <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 600 }}>View &rarr;</span>
                </div>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#059669', margin: '4px 0' }}>{activeSubs}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600 }}>Paid SaaS Tier</span>
              </div>

              
              <div
                className="portal-card clickable-card"
                style={{ borderLeftColor: '#f97316' }}
                title="Click to view expired or pending renewal subscriptions"
                onClick={() => {
                  const items = subscriptions.filter((s) => s.status === 'EXPIRED' || s.status === 'PENDING');
                  setCardDetailModal({
                    isOpen: true,
                    config: {
                      title: 'Expiring / Expired Subscriptions',
                      subtitle: 'Subscriptions needing immediate renewal or activation',
                      badgeColor: '#f97316',
                      count: items.length,
                      type: 'subscriptions',
                      items,
                      targetTab: 'sa-subscriptions',
                      targetTabLabel: 'Subscriptions',
                    },
                  });
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-light)', fontWeight: 700 }}>Expiring / Expired</div>
                  <span style={{ fontSize: '0.72rem', color: '#c2410c', fontWeight: 600 }}>View &rarr;</span>
                </div>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#c2410c', margin: '4px 0' }}>{expiringSubs}</p>
                <span style={{ fontSize: '0.75rem', color: '#ea580c', fontWeight: 600 }}>Action Required</span>
              </div>

              
              <div
                className="portal-card clickable-card"
                style={{ borderLeftColor: '#ef4444' }}
                title="Click to view pending or overdue invoices"
                onClick={() => {
                  const items = bills.filter((b) => b.status === 'PENDING' || b.status === 'OVERDUE');
                  setCardDetailModal({
                    isOpen: true,
                    config: {
                      title: 'Pending & Overdue Invoices',
                      subtitle: 'Invoices awaiting payment clearance from schools',
                      badgeColor: '#ef4444',
                      count: items.length,
                      type: 'bills',
                      items,
                      targetTab: 'sa-billing',
                      targetTabLabel: 'Billing Management',
                    },
                  });
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-light)', fontWeight: 700 }}>Pending Bills</div>
                  <span style={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: 600 }}>View &rarr;</span>
                </div>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#dc2626', margin: '4px 0' }}>{pendingBills}</p>
                <span style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 600 }}>Invoices Unpaid</span>
              </div>

              
              <div
                className="portal-card clickable-card"
                style={{ borderLeftColor: '#059669' }}
                title="Click to view collected billing invoices"
                onClick={() => {
                  const items = bills.filter((b) => b.status === 'PAID');
                  setCardDetailModal({
                    isOpen: true,
                    config: {
                      title: 'Revenue Collections Breakdown',
                      subtitle: `Lifetime collected revenue from paid school licenses (Total: ₹${totalRevenue.toLocaleString()}/-)`,
                      badgeColor: '#059669',
                      count: items.length,
                      type: 'bills',
                      items,
                      targetTab: 'sa-billing',
                      targetTabLabel: 'Billing Management',
                    },
                  });
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-light)', fontWeight: 700 }}>Total Revenue</div>
                  <span style={{ fontSize: '0.72rem', color: '#047857', fontWeight: 600 }}>View &rarr;</span>
                </div>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#047857', margin: '4px 0' }}>₹{totalRevenue.toLocaleString()}/-</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600 }}>Lifetime Collections</span>
              </div>

              
              <div
                className="portal-card clickable-card"
                style={{ borderLeftColor: '#3b82f6' }}
                title="Click to view student population by school"
                onClick={() =>
                  setCardDetailModal({
                    isOpen: true,
                    config: {
                      title: 'Students Across Campuses',
                      subtitle: `Total of ${totalStudents.toLocaleString()} students enrolled across all active partner campuses`,
                      badgeColor: '#3b82f6',
                      count: schools.length,
                      type: 'people',
                      items: schools,
                      targetTab: 'sa-schools',
                      targetTabLabel: 'Schools Management',
                    },
                  })
                }
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-light)', fontWeight: 700 }}>Total Students</div>
                  <span style={{ fontSize: '0.72rem', color: '#1d4ed8', fontWeight: 600 }}>View &rarr;</span>
                </div>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1d4ed8', margin: '4px 0' }}>{totalStudents.toLocaleString()}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>Across All Campuses</span>
              </div>

              
              <div
                className="portal-card clickable-card"
                style={{ borderLeftColor: '#8b5cf6' }}
                title="Click to view faculty distribution by school"
                onClick={() =>
                  setCardDetailModal({
                    isOpen: true,
                    config: {
                      title: 'Faculty Members by Campus',
                      subtitle: `Total of ${totalTeachers} teaching staff members across all campuses`,
                      badgeColor: '#8b5cf6',
                      count: schools.length,
                      type: 'people',
                      items: schools,
                      targetTab: 'sa-schools',
                      targetTabLabel: 'Schools Management',
                    },
                  })
                }
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-light)', fontWeight: 700 }}>Total Teachers</div>
                  <span style={{ fontSize: '0.72rem', color: '#6d28d9', fontWeight: 600 }}>View &rarr;</span>
                </div>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#6d28d9', margin: '4px 0' }}>{totalTeachers}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>Faculty Members</span>
              </div>

              
              <div
                className="portal-card clickable-card"
                style={{ borderLeftColor: '#ec4899' }}
                title="Click to view parent registrations by school"
                onClick={() =>
                  setCardDetailModal({
                    isOpen: true,
                    config: {
                      title: 'Parent Guardians by Campus',
                      subtitle: `Total of ${totalParents.toLocaleString()} registered parent guardian accounts`,
                      badgeColor: '#ec4899',
                      count: schools.length,
                      type: 'people',
                      items: schools,
                      targetTab: 'sa-schools',
                      targetTabLabel: 'Schools Management',
                    },
                  })
                }
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-light)', fontWeight: 700 }}>Total Parents</div>
                  <span style={{ fontSize: '0.72rem', color: '#be185d', fontWeight: 600 }}>View &rarr;</span>
                </div>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#be185d', margin: '4px 0' }}>{totalParents.toLocaleString()}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>Registered Portals</span>
              </div>

              
              <div
                className="portal-card clickable-card"
                style={{ borderLeftColor: '#6366f1' }}
                title="Click to view full staff breakdown"
                onClick={() =>
                  setCardDetailModal({
                    isOpen: true,
                    config: {
                      title: 'School Staff & Leadership Breakdown',
                      subtitle: `Total of ${totalStaff} staff (Admins, Faculty & School personnel)`,
                      badgeColor: '#6366f1',
                      count: schools.length,
                      type: 'people',
                      items: schools,
                      targetTab: 'sa-admin-management',
                      targetTabLabel: 'Admin Management',
                    },
                  })
                }
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-light)', fontWeight: 700 }}>Total Staff</div>
                  <span style={{ fontSize: '0.72rem', color: '#4338ca', fontWeight: 600 }}>View &rarr;</span>
                </div>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#4338ca', margin: '4px 0' }}>{totalStaff}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>Admins & Teachers</span>
              </div>
            </div>

            
            <div style={{ marginTop: '35px' }}>
              <h3 style={{ color: 'var(--color-primary)', fontSize: '1.25rem', marginBottom: '12px' }}>Recent Platform Activities</h3>
              <div className="activity-timeline">
                {activities.map((act) => (
                  <div key={act.id} className="activity-item">
                    <span className="activity-icon-badge" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(30,58,138,0.06)', flexShrink: 0 }}>
                      {renderActivityIcon(act.type)}
                    </span>
                    <div>
                      <strong>{act.text}</strong>
                    </div>
                    <span className="activity-time">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      
      
      
      {activeTab === 'sa-schools' && (
        <div>
          {activeCampusPortal ? (
            
            
            
            <div className="sa-school-deep-dive">
              
              <div className="sa-campus-header-card" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                marginBottom: '20px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                flexWrap: 'wrap',
                gap: '14px'
              }}>
                <div className="sa-campus-header-left" style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setActiveCampusPortal(null)}
                    className="btn btn-outline"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      fontWeight: 700,
                      color: 'var(--color-primary, #1e3a8a)',
                      borderColor: '#cbd5e1',
                      borderRadius: '8px',
                      background: '#f8fafc',
                      cursor: 'pointer'
                    }}
                    title="Return to Schools Management table"
                  >
                    <span style={{ fontSize: '1.1rem' }}>&larr;</span> Back to All Schools
                  </button>

                  <div className="sa-campus-header-info" style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary, #1e3a8a)' }}>
                        {activeCampusPortal.name}
                      </h2>
                      <span className="badge badge-info" style={{ fontWeight: 700 }}>
                        {activeCampusPortal.code || 'CAMPUS'}
                      </span>
                      <span className="badge badge-success">
                        {activeCampusPortal.subscription || 'Enterprise Plan'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px', lineHeight: 1.4 }}>
                      Partition ID: <code>{activeCampusPortal.id}</code> &bull; City: <strong>{activeCampusPortal.city || 'Tamil Nadu'}</strong> &bull; Students: <strong>{activeCampusPortal.studentsCount || 450}</strong> &bull; Teachers: <strong>{activeCampusPortal.teachersCount || 25}</strong>
                    </div>
                  </div>
                </div>

                <div className="sa-campus-header-badge" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#f5f3ff',
                  border: '1px solid #ddd6fe',
                  color: '#6d28d9',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: 700
                }}>
                  <span> Super Admin Access</span>
                </div>
              </div>

              {activeCampusPortal.status !== 'Active' && (
                <div style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '10px',
                  padding: '12px 18px',
                  marginBottom: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#991b1b',
                  fontSize: '0.86rem',
                  boxShadow: '0 2px 8px rgba(220, 38, 38, 0.08)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <strong style={{ background: '#dc2626', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem' }}>CAMPUS DEACTIVATED</strong>
                    <span>This institution is currently DEACTIVATED. All logins and portal access for regular staff and students are offline.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      handleToggleSchool(activeCampusPortal.id, 'Active');
                      setActiveCampusPortal(prev => ({ ...prev, status: 'Active' }));
                    }}
                    style={{
                      background: '#10b981',
                      color: '#ffffff',
                      border: 'none',
                      padding: '7px 16px',
                      borderRadius: '6px',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 2px 6px rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    Activate School
                  </button>
                </div>
              )}

              
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '16px 20px',
                marginBottom: '20px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Select Dashboard Perspective
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                  borderBottom: '1px solid #f1f5f9',
                  paddingBottom: '14px',
                  marginBottom: '14px'
                }}>
                  {[
                    { id: 'schooladmin', label: 'School Admin Dashboard', defaultTab: 'school-admin-users' },
                    { id: 'finance', label: 'Finance Dashboard', defaultTab: 'finance-management' },
                    { id: 'principal', label: 'Principal Dashboard', defaultTab: 'attendance-reports' },
                    { id: 'teacher', label: 'Faculty / Teacher', defaultTab: 'my-classes' },
                    { id: 'student', label: 'Student Portal', defaultTab: 'view-dashboard' },
                    { id: 'parent', label: 'Parent Portal', defaultTab: 'child-information' },
                  ].map((roleItem) => {
                    const isActive = activeCampusRole === roleItem.id;
                    return (
                      <button
                        key={roleItem.id}
                        type="button"
                        onClick={() => {
                          setActiveCampusRole(roleItem.id);
                          setActiveCampusTab(roleItem.defaultTab);
                        }}
                        style={{
                          padding: '8px 18px',
                          borderRadius: '8px',
                          fontSize: '0.88rem',
                          fontWeight: isActive ? 700 : 600,
                          border: isActive ? '1px solid #7c3aed' : '1px solid #e2e8f0',
                          background: isActive ? '#7c3aed' : '#ffffff',
                          color: isActive ? '#ffffff' : '#475569',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          boxShadow: isActive ? '0 2px 6px rgba(124, 58, 237, 0.25)' : 'none',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span>{roleItem.label}</span>
                      </button>
                    );
                  })}
                </div>

                
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                  alignItems: 'center'
                }}>
                  {activeCampusRole === 'schooladmin' && (
                    <>
                      <button className={`btn btn-sm ${activeCampusTab === 'school-admin-users' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('school-admin-users')}>DashBoard</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'school-services-tab' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('school-services-tab')}>Campus Services & Activities</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'manage-staff' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('manage-staff')}>Manage Staff</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'manage-students' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('manage-students')}>Manage Students</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'manage-parents' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('manage-parents')}>Manage Parents</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'manage-classes' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('manage-classes')}>Manage Classes</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'manage-subjects' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('manage-subjects')}>Manage Subjects</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'fee-collection-tracker' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('fee-collection-tracker')}>Fee Collection & Dues</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'publish-announcements' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('publish-announcements')}>Announcements</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'view-reports' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('view-reports')}>School Reports</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'secure-messaging' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('secure-messaging')}>Messages</button>
                    </>
                  )}
                  {activeCampusRole === 'finance' && (
                    <>
                      <button className="btn btn-sm btn-primary" onClick={() => setActiveCampusTab('finance-management')} style={{ fontWeight: 700 }}>Finance Manage & Dues</button>
                    </>
                  )}
                  {activeCampusRole === 'principal' && (
                    <>
                      <button className={`btn btn-sm ${activeCampusTab === 'dashboard-analytics' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('dashboard-analytics')}>Dashboard Analytics</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'attendance-reports' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('attendance-reports')}>Attendance Reports</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'track-exams' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('track-exams')}>Examination Schedule & Dates</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'principal-services-tab' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('principal-services-tab')}>Enrichment Programs & Services</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'staff-leave-approvals' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('staff-leave-approvals')}>Staff Leave Approvals</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'school-announcements' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('school-announcements')}>School Announcements</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'communication-teachers' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('communication-teachers')}>Communication with Teachers</button>
                    </>
                  )}
                  {activeCampusRole === 'teacher' && (
                    <>
                      <button className={`btn btn-sm ${activeCampusTab === 'my-classes' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('my-classes')}>My Classes</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'teacher-services-tab' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('teacher-services-tab')}>Activities & Service Labs</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'student-list' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('student-list')}>Student List</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'attendance-management' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('attendance-management')}>Attendance Management</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'track-exams' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('track-exams')}>Exam Schedule & Dates</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'assignments' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('assignments')}>Homework & Assignments</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'study-materials' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('study-materials')}>Study Materials</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'announcements' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('announcements')}>Announcements</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'leave-request' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('leave-request')}>Leave Requests & Approvals</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'secure-messaging' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('secure-messaging')}>Messages</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'timetable' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('timetable')}>Timetable</button>
                    </>
                  )}
                  {activeCampusRole === 'student' && (
                    <>
                      <button className={`btn btn-sm ${activeCampusTab === 'view-dashboard' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('view-dashboard')}>View Dashboard</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'student-services-tab' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('student-services-tab')}>My Active Services & Play</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'check-attendance' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('check-attendance')}>Check Attendance</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'view-timetable' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('view-timetable')}>View Timetable</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'download-materials' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('download-materials')}>Study Materials</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'submit-assignments' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('submit-assignments')}>Submit Homework & Assignments</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'view-homework' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('view-homework')}>View Homework</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'receive-announcements' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('receive-announcements')}>Announcements</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'chat-teachers' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('chat-teachers')}>Chat with Teachers</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'track-exams' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('track-exams')}>Track Upcoming Exams</button>
                    </>
                  )}
                  {activeCampusRole === 'parent' && (
                    <>
                      <button className={`btn btn-sm ${activeCampusTab === 'child-information' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('child-information')}>Child Information</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'parent-services-tab' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('parent-services-tab')}>Student Enrolled Services</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'attendance-tracking' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('attendance-tracking')}>Attendance Tracking</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'homework' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('homework')}>Homework & Assignments</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'track-exams' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('track-exams')}>Upcoming Exam Schedule</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'exam-results' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('exam-results')}>Exam Results & Report Card</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'fee-reminders' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('fee-reminders')}>Fee Payments</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'school-announcements' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('school-announcements')}>School Announcements</button>
                      <button className={`btn btn-sm ${activeCampusTab === 'messaging-teachers' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveCampusTab('messaging-teachers')}>Messaging with Teachers</button>
                    </>
                  )}
                </div>
              </div>

              
              <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', minHeight: '600px' }}>
                {activeCampusRole === 'finance' ? (
                  <SchoolFinanceModule user={{ schoolId: activeCampusPortal.id, schoolName: activeCampusPortal.name, role: 'finance' }} />
                ) : activeCampusRole === 'schooladmin' ? (
                  <SchoolAdminView activeTab={activeCampusTab} setActiveTab={setActiveCampusTab} user={{ schoolId: activeCampusPortal.id, schoolName: activeCampusPortal.name, role: 'schooladmin' }} />
                ) : (
                  <AcademicRolesView
                    role={activeCampusRole}
                    user={{
                      name: `Super Admin Viewing (${activeCampusPortal.name})`,
                      role: activeCampusRole.toUpperCase(),
                      schoolId: activeCampusPortal.id,
                      schoolName: activeCampusPortal.name,
                    }}
                    activeTab={activeCampusTab}
                    setActiveTab={setActiveCampusTab}
                  />
                )}
              </div>
            </div>
          ) : (
            
            
            
            <>
              <div className="content-header">
                <h2 id="section-title">Schools Management</h2>
                <div id="section-actions"></div>
              </div>

              <div id="portal-content">
                
                <div className="sa-schools-toolbar">
              <div className="sa-filter-segment">
                <button
                  type="button"
                  className={`sa-filter-tab ${schoolFilter === 'All' ? 'active' : ''}`}
                  onClick={() => setSchoolFilter('All')}
                >
                  <span>All Schools</span>
                  <span className="sa-tab-badge" id="badge-all-schools">{schools.length}</span>
                </button>
                <button
                  type="button"
                  className={`sa-filter-tab ${schoolFilter === 'Active' ? 'active' : ''}`}
                  onClick={() => setSchoolFilter('Active')}
                >
                  <span>Active</span>
                  <span className="sa-tab-badge badge-green" id="badge-active-schools">{activeSchools}</span>
                </button>
                <button
                  type="button"
                  className={`sa-filter-tab ${schoolFilter === 'Inactive' ? 'active' : ''}`}
                  onClick={() => setSchoolFilter('Inactive')}
                >
                  <span>Inactive</span>
                  <span className="sa-tab-badge badge-rose" id="badge-inactive-schools">{inactiveSchools}</span>
                </button>
              </div>

              <div className="sa-toolbar-right">
                <div className="sa-search-wrap">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input
                    type="text"
                    className="sa-search-input"
                    placeholder="Search schools by name, code, city, admin..."
                    value={schoolSearch}
                    onChange={(e) => setSchoolSearch(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => setIsWizardOpen(true)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 16px' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add School
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="sa-schools-table">
                <thead>
                  <tr>
                    <th style={{ minWidth: '220px' }}>School Name</th>
                    <th>School Code</th>
                    <th>Admin</th>
                    <th>Students</th>
                    <th>Teachers</th>
                    <th>Subscription</th>
                    <th>Status</th>
                    <th>Created Date</th>
                    <th style={{ textAlign: 'center', minWidth: '240px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSchools.map((s) => (
                    <tr key={s.id} className="sa-school-row" data-status={s.status}>
                      <td
                        data-label="School Name"
                        className="school-meta-line"
                        style={{ cursor: 'pointer', verticalAlign: 'middle' }}
                        title="Click to view all dashboards of this school"
                        onClick={() => {
                          setActiveCampusPortal(s);
                          setActiveCampusRole('schooladmin');
                          setActiveCampusTab('school-admin-users');
                        }}
                      >
                        <div className="school-meta-content">
                          <strong style={{ color: 'var(--color-primary, #1e3a8a)', fontSize: '0.94rem', display: 'block', lineHeight: 1.3 }}>
                            {s.name}
                          </strong>
                          <small style={{ color: '#64748b', fontSize: '0.78rem', display: 'block', marginTop: '2px' }}>{s.city || 'Tamil Nadu'}</small>
                        </div>
                      </td>
                      <td data-label="School Code"><span className="badge badge-info">{s.code || ''}</span></td>
                      <td data-label="Admin" className="school-meta-line">
                        <div className="school-meta-content">
                          <strong style={{ display: 'block' }}>{s.adminName || s.admin || 'Unassigned'}</strong>
                          <small style={{ display: 'block', marginTop: '2px' }}>{s.admin || ''}</small>
                        </div>
                      </td>
                      <td data-label="Students">{s.studentsCount || 0}</td>
                      <td data-label="Teachers">{s.teachersCount || 0}</td>
                      <td data-label="Subscription">
                        <span
                          className={`badge ${s.subscription === 'Pending Activation' ? 'badge-warning' : 'badge-info'}`}
                          style={s.subscription === 'Pending Activation' ? { cursor: 'pointer' } : {}}
                          title={s.subscription === 'Pending Activation' ? 'Click to activate SaaS subscription' : ''}
                          onClick={() => {
                            if (s.subscription === 'Pending Activation') {
                              setSelectedPlanObj({ schoolId: s.id, schoolName: s.name });
                              setSubModalTab('subscription');
                              setIsSubModalOpen(true);
                            }
                          }}
                        >
                          {s.subscription || 'Pending Activation'}
                          {s.subscription === 'Pending Activation' ? ' ' : ''}
                        </span>
                      </td>
                      <td data-label="Status">
                        <span className={`badge ${s.status === 'Active' ? 'badge-success' : s.status === 'Pending' ? 'badge-warning' : 'badge-danger'}`}>
                          {s.status}
                        </span>
                      </td>
                      <td data-label="Created Date">{s.createdDate || '2026-01-01'}</td>
                      <td data-label="Actions" style={{ textAlign: 'center' }}>
                        <div className="sa-actions-cell">
                          <button
                            type="button"
                            className="sa-tbl-action"
                            style={{ color: '#4338ca', borderColor: '#818cf8', background: '#e0e7ff', fontWeight: 700 }}
                            title={`Open all dashboards for ${s.name} directly as Super Admin`}
                            onClick={() => {
                              setActiveCampusPortal(s);
                              setActiveCampusRole('schooladmin');
                              setActiveCampusTab('school-admin-users');
                            }}
                          >
                             Dashboards
                          </button>
                          {s.subscription === 'Pending Activation' && (
                            <button
                              type="button"
                              className="sa-tbl-action"
                              style={{ color: '#047857', borderColor: '#10b981', background: '#ecfdf5', fontWeight: 600 }}
                              title="Activate SaaS Subscription"
                              onClick={() => {
                                setSelectedPlanObj({ schoolId: s.id, schoolName: s.name });
                                setSubModalTab('subscription');
                                setIsSubModalOpen(true);
                              }}
                            >
                               Plan
                            </button>
                          )}
                          <button
                            type="button"
                            className="sa-tbl-action view"
                            title="View Campus Details"
                            onClick={() => { setSelectedSchool(s); setIsOverviewOpen(true); }}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                            </svg>
                            <span>View</span>
                          </button>
                          <button
                            type="button"
                            className="sa-tbl-action edit"
                            title="Edit School Information"
                            onClick={() => { setSelectedSchool(s); setIsEditSchoolOpen(true); }}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            <span>Edit</span>
                          </button>
                          {s.status === 'Active' ? (
                            <button
                              type="button"
                              className="sa-tbl-action danger"
                              title="Deactivate School"
                              onClick={() => handleToggleSchool(s.id, 'Inactive')}
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                              </svg>
                              <span>Deactivate</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="sa-tbl-action success"
                              title="Activate School"
                              onClick={() => handleToggleSchool(s.id, 'Active')}
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                              </svg>
                              <span>Activate</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
            </>
          )}
        </div>
      )}

      
      
      
      {activeTab === 'sa-admin-management' && (
        <div>
          <div className="content-header">
            <h2 id="section-title">Admin Management</h2>
            <div id="section-actions"></div>
          </div>

          <div id="portal-content">
            <div className="sa-schools-header-bar">
              <div className="sa-filter-segment">
                <button
                  className={`sa-filter-tab ${adminFilter === 'All' ? 'active' : ''}`}
                  onClick={() => setAdminFilter('All')}
                >
                  All Admins <span className="sa-tab-badge">{schoolAdmins.length}</span>
                </button>
                <button
                  className={`sa-filter-tab ${adminFilter === 'Active' ? 'active' : ''}`}
                  onClick={() => setAdminFilter('Active')}
                >
                  Active <span className="sa-tab-badge badge-green">{schoolAdmins.filter((a) => a.status === 'Active').length}</span>
                </button>
                <button
                  className={`sa-filter-tab ${adminFilter === 'Inactive' ? 'active' : ''}`}
                  onClick={() => setAdminFilter('Inactive')}
                >
                  Inactive <span className="sa-tab-badge badge-rose">{schoolAdmins.filter((a) => a.status !== 'Active').length}</span>
                </button>
              </div>
              <div className="sa-toolbar-right">
                <div className="sa-search-wrap">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    className="sa-search-input"
                    placeholder="Search admins by name, email, campus..."
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => setIsAddAdminOpen(true)}>
                  + Add Admin
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="sa-schools-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th style={{ minWidth: '220px', padding: '12px 16px' }}>Admin Profile</th>
                    <th style={{ minWidth: '180px', padding: '12px 16px' }}>Official Email</th>
                    <th style={{ minWidth: '200px', padding: '12px 16px' }}>Assigned Campus</th>
                    <th style={{ minWidth: '100px', textAlign: 'center', padding: '12px 16px' }}>Status</th>
                    <th style={{ minWidth: '120px', padding: '12px 16px' }}>Created Date</th>
                    <th style={{ minWidth: '240px', textAlign: 'center', padding: '12px 16px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdmins.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                        No campus administrators found matching the criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredAdmins.map((a) => (
                      <tr key={a.id} className="sa-admin-row" data-status={a.status}>
                        <td data-label="Admin Profile" className="sa-admin-profile-cell" style={{ verticalAlign: 'middle', padding: '12px 16px' }}>
                          <div className="sa-admin-profile-inner" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '8px',
                              background: '#eff6ff',
                              color: 'var(--color-primary, #1e3a8a)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '0.9rem',
                              border: '1px solid #dbeafe',
                              flexShrink: 0
                            }}>
                              {a.name ? a.name.charAt(0).toUpperCase() : 'A'}
                            </div>
                            <div className="school-meta-line">
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <strong style={{ color: '#0f172a', fontSize: '0.92rem' }}>{a.name}</strong>
                                <span className="badge badge-primary" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                                  School Admin
                                </span>
                              </div>
                              <small style={{ color: '#64748b', fontSize: '0.78rem' }}>Username: <code style={{ color: '#2563eb' }}>{a.username}</code></small>
                              <div style={{ marginTop: '3px' }}>
                                <small style={{ color: '#047857', fontSize: '0.78rem', fontWeight: 700 }}>
                                  Password: <code style={{ background: '#ecfdf5', color: '#065f46', padding: '1px 7px', borderRadius: '4px', border: '1px solid #a7f3d0' }}>{a.password || 'Admin@12345'}</code>
                                </small>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td data-label="Official Email" style={{ verticalAlign: 'middle', padding: '12px 16px', color: '#334155' }}>
                          <span style={{ fontSize: '0.86rem' }}>{a.email}</span>
                          {a.phone && <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>{a.phone}</div>}
                        </td>
                        <td data-label="Assigned Campus" style={{ verticalAlign: 'middle', padding: '12px 16px' }}>
                          <div className="school-meta-line">
                            <strong style={{ color: '#1e293b', fontSize: '0.88rem', display: 'block' }}>{a.schoolName || 'Unassigned'}</strong>
                            {a.schoolId && <span className="badge badge-info" style={{ marginTop: '3px', display: 'inline-block' }}>{a.schoolId}</span>}
                          </div>
                        </td>
                        <td data-label="Status" style={{ textAlign: 'center', verticalAlign: 'middle', padding: '12px 16px' }}>
                          <span className={`badge ${a.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                            {a.status}
                          </span>
                        </td>
                        <td data-label="Created Date" style={{ verticalAlign: 'middle', padding: '12px 16px', color: '#475569', fontSize: '0.84rem' }}>
                          {a.createdDate || '2026-01-01'}
                        </td>
                        <td data-label="Actions" style={{ textAlign: 'center', verticalAlign: 'middle', padding: '12px 16px' }}>
                          <div className="sa-actions-cell" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <button
                              type="button"
                              className="sa-tbl-action view"
                              onClick={() => { setSelectedAdmin(a); setIsAdminProfileOpen(true); }}
                              title="View Profile"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                              </svg>
                              <span>View</span>
                            </button>
                            <button
                              type="button"
                              className="sa-tbl-action edit"
                              onClick={() => { setAssignInitialAdminId(a.id); setIsAssignAdminOpen(true); }}
                              title="Reassign Campus"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" />
                              </svg>
                              <span>Reassign</span>
                            </button>
                            {a.status === 'Active' ? (
                              <button
                                type="button"
                                className="sa-tbl-action danger"
                                onClick={() => handleToggleAdmin(a.id, 'Inactive')}
                                title="Deactivate Account"
                              >
                                Deactivate
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="sa-tbl-action success"
                                onClick={() => handleToggleAdmin(a.id, 'Active')}
                                title="Activate Account"
                              >
                                Activate
                              </button>
                            )}
                            <button
                              type="button"
                              className="sa-tbl-action admin"
                              onClick={() => handleResetAdminPassword(a.id)}
                              title="Reset Password"
                            >
                              Reset
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      
      
      
      {activeTab === 'sa-services' && (
        <div>
          <div className="content-header" style={{ marginBottom: '18px' }}>
            <div>
              <h2 id="section-title">Enrichment & Extracurricular Services</h2>
            </div>
          </div>

          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '10px 14px',
            marginBottom: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setServicesMainSection('available')}
                style={{
                  padding: '9px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  background: servicesMainSection === 'available' ? 'var(--color-primary, #1e3a8a)' : '#f8fafc',
                  color: servicesMainSection === 'available' ? '#ffffff' : '#475569',
                  fontWeight: servicesMainSection === 'available' ? 700 : 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>Available Services</span>
                <span style={{
                  background: servicesMainSection === 'available' ? 'rgba(255,255,255,0.25)' : '#e2e8f0',
                  color: servicesMainSection === 'available' ? '#ffffff' : '#334155',
                  padding: '1px 7px',
                  borderRadius: '10px',
                  fontSize: '0.74rem'
                }}>
                  {services.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setServicesMainSection('school-services')}
                style={{
                  padding: '9px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  background: servicesMainSection === 'school-services' ? 'var(--color-primary, #1e3a8a)' : '#f8fafc',
                  color: servicesMainSection === 'school-services' ? '#ffffff' : '#475569',
                  fontWeight: servicesMainSection === 'school-services' ? 700 : 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>School Services</span>
                <span style={{
                  background: servicesMainSection === 'school-services' ? 'rgba(255,255,255,0.25)' : '#e2e8f0',
                  color: servicesMainSection === 'school-services' ? '#ffffff' : '#334155',
                  padding: '1px 7px',
                  borderRadius: '10px',
                  fontSize: '0.74rem'
                }}>
                  {schoolAssignments.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setServicesMainSection('management')}
                style={{
                  padding: '9px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  background: servicesMainSection === 'management' ? 'var(--color-primary, #1e3a8a)' : '#f8fafc',
                  color: servicesMainSection === 'management' ? '#ffffff' : '#475569',
                  fontWeight: servicesMainSection === 'management' ? 700 : 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>Management Services</span>
              </button>
            </div>

            
            <div style={{ position: 'relative', minWidth: '260px' }}>
              <span style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'none'
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="text"
                value={serviceSearch}
                onChange={(e) => setServiceSearch(e.target.value)}
                placeholder="Search services or categories..."
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 34px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.86rem',
                  background: '#f8fafc',
                  outline: 'none',
                  color: '#0f172a'
                }}
              />
              {serviceSearch && (
                <button
                  type="button"
                  onClick={() => setServiceSearch('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    padding: 0
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          
          {servicesMainSection === 'available' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '18px' }}>
                {services
                  .filter((srv) => {
                    if (!serviceSearch.trim()) return true;
                    const query = serviceSearch.toLowerCase();
                    return (
                      srv.name.toLowerCase().includes(query) ||
                      srv.category.toLowerCase().includes(query) ||
                      (srv.description && srv.description.toLowerCase().includes(query))
                    );
                  })
                  .map((srv) => (
                    <div
                      key={srv.id}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '14px',
                        padding: '20px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                          <div style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '10px',
                            background: '#eff6ff',
                            border: '1px solid #dbeafe',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1rem',
                            fontWeight: 800,
                            color: '#1e40af'
                          }}>
                            {srv.name ? srv.name.charAt(0).toUpperCase() : 'S'}
                          </div>
                          <span className={`badge ${srv.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                            {srv.status}
                          </span>
                        </div>

                        <h3 style={{ margin: '0 0 4px', fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary, #1e3a8a)' }}>
                          {srv.name}
                        </h3>
                        <div style={{ fontSize: '0.78rem', color: '#4f46e5', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                          {srv.category}
                        </div>
                        <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.45, margin: '0 0 16px' }}>
                          {srv.description}
                        </p>
                      </div>

                      <div>
                        
                        <div style={{ marginBottom: '12px' }}>
                          <button
                            type="button"
                            onClick={() => setActiveInteractiveService(srv)}
                            style={{
                              width: '100%',
                              padding: '9px 12px',
                              borderRadius: '8px',
                              background: '#2563eb',
                              color: '#ffffff',
                              border: 'none',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                              boxShadow: '0 2px 4px rgba(37,99,235,0.25)',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <span>▶</span> Open & Practice Service
                          </button>
                        </div>

                        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
                            {srv.cost}
                          </span>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline"
                            onClick={() => {
                              setAssignFormData({ serviceId: srv.id, schoolId: schools[0]?.id || '', status: 'Active' });
                              setIsAssignServiceModalOpen(true);
                            }}
                            style={{ fontSize: '0.78rem', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            Assign to School
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          
          {servicesMainSection === 'school-services' && (
            <div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '18px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '12px 18px',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <span></span> Select School:
                    </span>
                    <select
                      value={selectedSchoolForServiceView}
                      onChange={(e) => setSelectedSchoolForServiceView(e.target.value)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: '#0f172a',
                        background: '#f8fafc',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="All">All Schools (Overview)</option>
                      {schools.map((sch) => (
                        <option key={sch.id} value={sch.id}>
                          {sch.name} ({sch.city || sch.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Status:</span>
                    <button
                      type="button"
                      className={`btn btn-sm ${schoolServiceFilter === 'All' ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => setSchoolServiceFilter('All')}
                    >
                      All
                    </button>
                    <button
                      type="button"
                      className={`btn btn-sm ${schoolServiceFilter === 'Active' ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => setSchoolServiceFilter('Active')}
                    >
                      Active Services
                    </button>
                    <button
                      type="button"
                      className={`btn btn-sm ${schoolServiceFilter === 'Inactive' ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => setSchoolServiceFilter('Inactive')}
                    >
                      Inactive Services
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setAssignFormData({
                      serviceId: services[0]?.id || '',
                      schoolId: selectedSchoolForServiceView === 'All' ? (schools[0]?.id || '') : selectedSchoolForServiceView,
                      status: 'Active'
                    });
                    setIsAssignServiceModalOpen(true);
                  }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>+</span> Assign Services to School
                </button>
              </div>

              
              {selectedSchoolForServiceView !== 'All' && (
                <div style={{
                  background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
                  border: '1px solid #bfdbfe',
                  borderRadius: '10px',
                  padding: '12px 18px',
                  marginBottom: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <div>
                    <strong style={{ color: '#1e3a8a', fontSize: '0.98rem' }}>
                      {schools.find((s) => s.id === selectedSchoolForServiceView)?.name || selectedSchoolForServiceView}
                    </strong>
                    <div style={{ fontSize: '0.8rem', color: '#4338ca', marginTop: '2px' }}>
                      Active Enrichment Services: {
                        schoolAssignments.filter(
                          (a) => a.schoolId === selectedSchoolForServiceView && a.status === 'Active'
                        ).length
                      } active program(s) running
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {schoolAssignments
                      .filter((a) => a.schoolId === selectedSchoolForServiceView && a.status === 'Active')
                      .map((a) => (
                        <span
                          key={a.id}
                          style={{
                            background: '#ffffff',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            color: '#1e3a8a',
                            border: '1px solid #bfdbfe',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          {a.serviceName}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              
              <div className="table-responsive">
                <table className="sa-schools-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                  <thead>
                    <tr>
                      <th style={{ minWidth: '180px', padding: '12px 16px' }}>Service Name</th>
                      <th style={{ minWidth: '220px', padding: '12px 16px' }}>Assigned School</th>
                      <th style={{ minWidth: '130px', textAlign: 'center', padding: '12px 16px' }}>Portal Access</th>
                      <th style={{ minWidth: '280px', padding: '12px 16px' }}>Visible In Portals (Who Can See)</th>
                      <th style={{ minWidth: '100px', textAlign: 'center', padding: '12px 16px' }}>Status</th>
                      <th style={{ minWidth: '210px', textAlign: 'center', padding: '12px 16px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schoolAssignments
                      .filter((item) => {
                        
                        if (selectedSchoolForServiceView !== 'All' && item.schoolId !== selectedSchoolForServiceView) {
                          return false;
                        }
                        
                        if (schoolServiceFilter !== 'All' && item.status !== schoolServiceFilter) {
                          return false;
                        }
                        
                        if (serviceSearch.trim()) {
                          const q = serviceSearch.toLowerCase();
                          const matchesName = item.serviceName.toLowerCase().includes(q);
                          const matchesSchool = item.schoolName.toLowerCase().includes(q);
                          if (!matchesName && !matchesSchool) return false;
                        }
                        return true;
                      })
                      .map((item) => {
                        const srvObj = services.find((s) => s.id === item.serviceId);
                        const isPortalOn = item.portalAccess !== false;
                        const rolesList = (item.visibleRoles || ['student', 'teacher', 'parent', 'principal', 'schooladmin']).map(x => x.toLowerCase());

                        return (
                          <tr key={item.id}>
                            <td data-label="Service Name" style={{ verticalAlign: 'middle', padding: '12px 16px' }}>
                              <div>
                                <strong style={{ color: '#0f172a', fontSize: '0.92rem' }}>{item.serviceName}</strong>
                                <div style={{ fontSize: '0.76rem', color: '#64748b' }}>{srvObj?.category || 'Enrichment'}</div>
                              </div>
                            </td>
                            <td data-label="Assigned School" style={{ verticalAlign: 'middle', padding: '12px 16px' }}>
                              <strong style={{ color: 'var(--color-primary, #1e3a8a)', fontSize: '0.9rem' }}>
                                {item.schoolName}
                              </strong>
                              <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                                Code: <span className="badge badge-info">{item.schoolId}</span>
                              </div>
                            </td>
                            <td data-label="Portal Access" style={{ textAlign: 'center', verticalAlign: 'middle', padding: '12px 16px' }}>
                              <button
                                type="button"
                                onClick={() => handleTogglePortalAccess(item.id)}
                                style={{
                                  background: isPortalOn ? '#ecfdf5' : '#f8fafc',
                                  color: isPortalOn ? '#047857' : '#64748b',
                                  border: `1.5px solid ${isPortalOn ? '#10b981' : '#cbd5e1'}`,
                                  borderRadius: '20px',
                                  padding: '5px 14px',
                                  fontWeight: 800,
                                  fontSize: '0.78rem',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  boxShadow: isPortalOn ? '0 2px 6px rgba(16, 185, 129, 0.2)' : 'none',
                                  transition: 'all 0.2s ease'
                                }}
                                title={isPortalOn ? 'Click to Turn OFF Portal Access' : 'Click to Turn ON Portal Access'}
                              >
                                <span style={{
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  background: isPortalOn ? '#10b981' : '#94a3b8'
                                }}></span>
                                <span>{isPortalOn ? 'ACCESS ON' : 'ACCESS OFF'}</span>
                              </button>
                            </td>
                            <td data-label="Visible In Portals" style={{ verticalAlign: 'middle', padding: '12px 16px' }}>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center' }}>
                                {[
                                  { id: 'student', label: 'Student' },
                                  { id: 'teacher', label: 'Teacher' },
                                  { id: 'parent', label: 'Parent' },
                                  { id: 'principal', label: 'Principal' },
                                  { id: 'schooladmin', label: 'Admin' },
                                ].map((r) => {
                                  const isVisible = rolesList.includes(r.id.toLowerCase());
                                  return (
                                    <button
                                      key={r.id}
                                      type="button"
                                      disabled={!isPortalOn}
                                      onClick={() => handleToggleServiceRole(item.id, r.id)}
                                      style={{
                                        border: `1px solid ${isVisible && isPortalOn ? '#93c5fd' : '#e2e8f0'}`,
                                        background: isVisible && isPortalOn ? '#eff6ff' : '#f8fafc',
                                        color: isVisible && isPortalOn ? '#1d4ed8' : '#94a3b8',
                                        borderRadius: '6px',
                                        padding: '2px 8px',
                                        fontSize: '0.74rem',
                                        fontWeight: isVisible ? 700 : 500,
                                        cursor: !isPortalOn ? 'not-allowed' : 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '3px',
                                        opacity: !isPortalOn ? 0.5 : 1,
                                        transition: 'all 0.15s ease'
                                      }}
                                      title={!isPortalOn ? 'Portal Access is OFF' : `Click to toggle visibility for ${r.label}`}
                                    >
                                      <span>{isVisible && isPortalOn ? '✓' : '+'}</span>
                                      <span>{r.label}</span>
                                    </button>
                                  );
                                })}
                              </div>
                              {!isPortalOn && (
                                <div style={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: 600, marginTop: '3px' }}>
                                  Portal Access is currently OFF
                                </div>
                              )}
                            </td>
                            <td data-label="Assigned Date" style={{ verticalAlign: 'middle', padding: '12px 16px', color: '#475569', fontSize: '0.84rem' }}>
                              {item.assignedDate || '2026-01-15'}
                            </td>
                            <td data-label="Status" style={{ textAlign: 'center', verticalAlign: 'middle', padding: '12px 16px' }}>
                              <span className={`badge ${item.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                                {item.status}
                              </span>
                            </td>
                            <td data-label="Actions" style={{ textAlign: 'center', verticalAlign: 'middle', padding: '12px 16px' }}>
                              <div className="sa-actions-cell" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <button
                                  type="button"
                                  className="sa-tbl-action"
                                  onClick={() => {
                                    if (srvObj) {
                                      setActiveInteractiveService(srvObj);
                                    } else {
                                      setActiveInteractiveService({ name: item.serviceName, icon: '', category: 'General' });
                                    }
                                  }}
                                  style={{ background: '#2563eb', color: '#ffffff', borderColor: '#2563eb' }}
                                  title="Open Interactive Practice / Work"
                                >
                                  <span>▶ Practice</span>
                                </button>
                                <button
                                  type="button"
                                  className={`sa-tbl-action ${item.status === 'Active' ? 'danger' : 'success'}`}
                                  onClick={() => {
                                    const nextStatus = item.status === 'Active' ? 'Inactive' : 'Active';
                                    setSchoolAssignments((prev) => {
                                      const updated = prev.map((a) => (a.id === item.id ? { ...a, status: nextStatus } : a));
                                      try {
                                        const store = getPortalData() || {};
                                        store.schoolServiceAssignments = updated;
                                        savePortalData(store);
                                      } catch (e) {}
                                      window.dispatchEvent(new Event('portal_data_updated'));
                                      return updated;
                                    });
                                    showFeedback('Status Updated', `${item.serviceName} for ${item.schoolName} is now ${nextStatus}.`);
                                  }}
                                  title={item.status === 'Active' ? 'Mark Inactive' : 'Activate Service'}
                                >
                                  {item.status === 'Active' ? 'Deactivate' : 'Activate'}
                                </button>
                                <button
                                  type="button"
                                  className="sa-tbl-action danger"
                                  onClick={() => {
                                    setConfirmModal({
                                      isOpen: true,
                                      title: 'Remove Service Assignment',
                                      message: `Are you sure you want to unassign ${item.serviceName} from ${item.schoolName}?`,
                                      onConfirm: () => {
                                        setSchoolAssignments((prev) => {
                                          const updated = prev.filter((a) => a.id !== item.id);
                                          try {
                                            const store = getPortalData() || {};
                                            store.schoolServiceAssignments = updated;
                                            savePortalData(store);
                                          } catch (e) {}
                                          window.dispatchEvent(new Event('portal_data_updated'));
                                          return updated;
                                        });
                                        showFeedback('Assignment Removed', `${item.serviceName} unassigned successfully.`);
                                        setConfirmModal({ isOpen: false });
                                      }
                                    });
                                  }}
                                  title="Unassign Service"
                                >
                                  Remove
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          
          {servicesMainSection === 'management' && (
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginBottom: '18px',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setEditingService(null);
                    setServiceFormData({ name: '', icon: '', category: 'General', cost: '0/yr', description: '', status: 'Active' });
                    setIsServiceModalOpen(true);
                  }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>+</span> Add New Service
                </button>
              </div>

              <div className="table-responsive">
                <table className="sa-schools-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                  <thead>
                    <tr>
                      <th style={{ minWidth: '180px', padding: '12px 16px' }}>Service Name</th>
                      <th style={{ minWidth: '130px', padding: '12px 16px' }}>Category</th>
                      <th style={{ minWidth: '110px', padding: '12px 16px' }}>Monthly Cost</th>
                      <th style={{ minWidth: '220px', padding: '12px 16px' }}>Portal Visibility (Role Access)</th>
                      <th style={{ minWidth: '200px', padding: '12px 16px' }}>Description</th>
                      <th style={{ minWidth: '85px', textAlign: 'center', padding: '12px 16px' }}>Status</th>
                      <th style={{ minWidth: '150px', textAlign: 'center', padding: '12px 16px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((srv) => {
                      const roles = srv.visibleRoles || ['schooladmin', 'teacher', 'student'];
                      return (
                        <tr key={srv.id}>
                          <td data-label="Service Name" style={{ verticalAlign: 'middle', padding: '12px 16px' }}>
                            <strong style={{ color: 'var(--color-primary, #1e3a8a)', fontSize: '0.92rem' }}>{srv.name}</strong>
                            <div style={{ fontSize: '0.74rem', color: '#64748b' }}>ID: <code>{srv.id}</code></div>
                          </td>
                          <td data-label="Category" style={{ verticalAlign: 'middle', padding: '12px 16px' }}>
                            <span className="badge badge-info">{srv.category}</span>
                          </td>
                          <td data-label="Cost" style={{ verticalAlign: 'middle', padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>
                            {srv.cost}
                          </td>
                          <td data-label="Portal Visibility" style={{ verticalAlign: 'middle', padding: '10px 12px', minWidth: '190px' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                              {[
                                { id: 'schooladmin', label: 'School Admin', activeTone: '#1e40af', activeBg: '#dbeafe', activeBorder: '#93c5fd' },
                                { id: 'principal', label: 'Principal', activeTone: '#3730a3', activeBg: '#e0e7ff', activeBorder: '#c7d2fe' },
                                { id: 'teacher', label: 'Teacher', activeTone: '#166534', activeBg: '#dcfce7', activeBorder: '#86efac' },
                                { id: 'student', label: 'Student', activeTone: '#92400e', activeBg: '#fef3c7', activeBorder: '#fde68a' },
                                { id: 'parent', label: 'Parent', activeTone: '#86198f', activeBg: '#fae8ff', activeBorder: '#f0abfc' },
                              ].map((roleItem) => {
                                const isEnabled = roles.includes(roleItem.id);
                                return (
                                  <button
                                    key={roleItem.id}
                                    type="button"
                                    onClick={() => {
                                      const updatedRoles = isEnabled
                                        ? roles.filter((r) => r !== roleItem.id)
                                        : [...roles, roleItem.id];
                                      const updatedServices = services.map((s) =>
                                        s.id === srv.id ? { ...s, visibleRoles: updatedRoles } : s
                                      );
                                      setServices(updatedServices);
                                      try {
                                        const store = getPortalData();
                                        store.services = updatedServices;
                                        savePortalData(store);
                                      } catch (err) {}
                                      showFeedback(
                                        isEnabled ? 'Access Disabled' : 'Access Enabled',
                                        `${roleItem.label} visibility for "${srv.name}" turned ${isEnabled ? 'OFF' : 'ON'}.`
                                      );
                                    }}
                                    title={`Click to turn ${isEnabled ? 'OFF' : 'ON'} access for ${roleItem.label}`}
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                      padding: '3px 7px',
                                      borderRadius: '6px',
                                      border: isEnabled ? `1px solid ${roleItem.activeBorder}` : '1px solid #cbd5e1',
                                      background: isEnabled ? roleItem.activeBg : '#f8fafc',
                                      color: isEnabled ? roleItem.activeTone : '#94a3b8',
                                      fontSize: '0.72rem',
                                      fontWeight: isEnabled ? 700 : 500,
                                      cursor: 'pointer',
                                      transition: 'all 0.15s ease',
                                      boxShadow: isEnabled ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                                      outline: 'none',
                                      lineHeight: 1.2
                                    }}
                                  >
                                    <span>{roleItem.label}</span>
                                    <span style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: '12px',
                                      height: '12px',
                                      borderRadius: '50%',
                                      background: isEnabled ? roleItem.activeTone : '#94a3b8',
                                      color: '#ffffff',
                                      fontSize: '0.55rem',
                                      fontWeight: 900,
                                      marginLeft: '2px'
                                    }}>
                                      {isEnabled ? '✓' : '×'}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </td>
                          <td data-label="Description" style={{ verticalAlign: 'middle', padding: '12px 16px', fontSize: '0.82rem', color: '#475569', lineHeight: 1.4 }}>
                            {srv.description}
                          </td>
                          <td data-label="Status" style={{ textAlign: 'center', verticalAlign: 'middle', padding: '12px 16px' }}>
                            <span className={`badge ${srv.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                              {srv.status}
                            </span>
                          </td>
                          <td data-label="Actions" style={{ textAlign: 'center', verticalAlign: 'middle', padding: '12px 16px' }}>
                            <div className="sa-actions-cell" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                              <button
                                type="button"
                                className="sa-tbl-action edit"
                                onClick={() => {
                                  setEditingService(srv);
                                  setServiceFormData({
                                    name: srv.name,
                                    icon: srv.icon || '',
                                    category: srv.category || 'General',
                                    cost: srv.cost || '0/yr',
                                    description: srv.description || '',
                                    status: srv.status || 'Active',
                                    visibleRoles: srv.visibleRoles || ['schooladmin', 'teacher', 'student']
                                  });
                                  setIsServiceModalOpen(true);
                                }}
                                title="Edit Service Details & Role Visibility"
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                                <span>Edit</span>
                              </button>
                            <button
                              type="button"
                              className="sa-tbl-action danger"
                              onClick={() => {
                                setConfirmModal({
                                  isOpen: true,
                                  title: 'Delete Service',
                                  message: `Are you sure you want to permanently delete "${srv.name}"? This cannot be undone.`,
                                  onConfirm: () => {
                                    setServices((prev) => prev.filter((s) => s.id !== srv.id));
                                    setSchoolAssignments((prev) => prev.filter((a) => a.serviceId !== srv.id));
                                    showFeedback('Service Deleted', `"${srv.name}" has been removed from master directory.`);
                                    setConfirmModal({ isOpen: false });
                                  }
                                });
                              }}
                              title="Delete Service"
                            >
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          
          {isServiceModalOpen && (
            <div className="modal-overlay" style={{ display: 'flex' }}>
              <div className="modal-content" style={{ maxWidth: '540px' }}>
                <div className="modal-header">
                  <h3>{editingService ? 'Edit Service' : 'Add New Service'}</h3>
                  <button className="modal-close" onClick={() => setIsServiceModalOpen(false)}>&times;</button>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (editingService) {
                      const updated = services.map((s) => (s.id === editingService.id ? { ...s, ...serviceFormData } : s));
                      setServices(updated);
                      const updatedAssigns = schoolAssignments.map((a) => (a.serviceId === editingService.id ? { ...a, serviceName: serviceFormData.name } : a));
                      setSchoolAssignments(updatedAssigns);
                      try {
                        const store = getPortalData();
                        store.services = updated;
                        store.schoolServiceAssignments = updatedAssigns;
                        savePortalData(store);
                      } catch (err) {}
                      showFeedback('Service Updated', `"${serviceFormData.name}" updated successfully.`);
                    } else {
                      const newId = 'SRV-' + String(services.length + 1).padStart(2, '0');
                      const newObj = { id: newId, ...serviceFormData };
                      const updated = [...services, newObj];
                      setServices(updated);
                      try {
                        const store = getPortalData();
                        store.services = updated;
                        savePortalData(store);
                      } catch (err) {}
                      showFeedback('Service Created', `"${serviceFormData.name}" added to master services.`);
                    }
                    setIsServiceModalOpen(false);
                  }}
                  style={{ padding: '20px' }}
                >
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.86rem', fontWeight: 600 }}>Service Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="e.g. Coding for Kids"
                      value={serviceFormData.name}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, name: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                    <div className="form-group">
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.86rem', fontWeight: 600 }}>Category</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. STEM, Sports, Arts"
                        value={serviceFormData.category}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, category: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.86rem', fontWeight: 600 }}>Status</label>
                      <select
                        className="form-control"
                        value={serviceFormData.status}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, status: e.target.value })}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.86rem', fontWeight: 600 }}>Monthly Cost</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="0/yr"
                      value={serviceFormData.cost}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, cost: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.86rem', fontWeight: 600 }}>Description</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="Brief details regarding curriculum, tools used, or requirements..."
                      value={serviceFormData.description}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                    />
                  </div>

                  
                  <div className="form-group" style={{ marginBottom: '20px', background: '#f8fafc', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.86rem', fontWeight: 700, color: '#1e3a8a' }}>
                      Portal Visibility — Which Roles Can Access & View This Service?
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                      {[
                        { id: 'schooladmin', label: 'School Admin' },
                        { id: 'principal', label: 'Principal' },
                        { id: 'teacher', label: 'Teacher' },
                        { id: 'student', label: 'Student' },
                        { id: 'parent', label: 'Parent' },
                      ].map((r) => {
                        const currentRoles = serviceFormData.visibleRoles || ['schooladmin', 'teacher', 'student'];
                        const isChecked = currentRoles.includes(r.id);
                        return (
                          <label
                            key={r.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              background: isChecked ? '#eff6ff' : '#ffffff',
                              border: isChecked ? '1px solid #93c5fd' : '1px solid #cbd5e1',
                              padding: '6px 10px',
                              borderRadius: '6px'
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                let updatedRoles;
                                if (e.target.checked) {
                                  updatedRoles = [...currentRoles, r.id];
                                } else {
                                  updatedRoles = currentRoles.filter((x) => x !== r.id);
                                }
                                setServiceFormData({ ...serviceFormData, visibleRoles: updatedRoles });
                              }}
                            />
                            <span>{r.label}</span>
                          </label>
                        );
                      })}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '6px' }}>
                      Selected portals will show this service under their Enrichment & Services menu tab.
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <button type="button" className="btn btn-outline btn-sm" onClick={() => setIsServiceModalOpen(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary btn-sm">{editingService ? 'Save Changes' : 'Create Service'}</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          
          {isAssignServiceModalOpen && (
            <div className="modal-overlay" style={{ display: 'flex' }}>
              <div className="modal-content" style={{ maxWidth: '500px' }}>
                <div className="modal-header">
                  <h3>Assign Service to School</h3>
                  <button className="modal-close" onClick={() => setIsAssignServiceModalOpen(false)}>&times;</button>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const srv = services.find((s) => s.id === assignFormData.serviceId);
                    const sch = schools.find((sc) => sc.id === assignFormData.schoolId);
                    if (srv && sch) {
                      const newAssignId = 'SSA-' + Date.now().toString().slice(-4);
                      const newAssignment = {
                        id: newAssignId,
                        serviceId: srv.id,
                        serviceName: srv.name,
                        schoolId: sch.id,
                        schoolName: sch.name,
                        status: assignFormData.status,
                        portalAccess: assignFormData.portalAccess !== false,
                        visibleRoles: assignFormData.visibleRoles || ['student', 'teacher', 'parent', 'principal', 'schooladmin'],
                        assignedDate: new Date().toISOString().split('T')[0]
                      };
                      const updated = [newAssignment, ...schoolAssignments];
                      setSchoolAssignments(updated);
                      try {
                        const store = getPortalData();
                        store.schoolServiceAssignments = updated;
                        savePortalData(store);
                      } catch (err) {}
                      window.dispatchEvent(new Event('portal_data_updated'));
                      showFeedback('Service Assigned', `Successfully assigned "${srv.name}" to "${sch.name}".`);
                      setIsAssignServiceModalOpen(false);
                      setServicesMainSection('school-services');
                    }
                  }}
                  style={{ padding: '20px' }}
                >
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.86rem', fontWeight: 600 }}>Select Service *</label>
                    <select
                      className="form-control"
                      required
                      value={assignFormData.serviceId}
                      onChange={(e) => setAssignFormData({ ...assignFormData, serviceId: e.target.value })}
                    >
                      <option value="">-- Choose a Service --</option>
                      {services.map((srv) => (
                        <option key={srv.id} value={srv.id}>
                          {srv.name} ({srv.cost})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.86rem', fontWeight: 600 }}>Select School Campus *</label>
                    <select
                      className="form-control"
                      required
                      value={assignFormData.schoolId}
                      onChange={(e) => setAssignFormData({ ...assignFormData, schoolId: e.target.value })}
                    >
                      <option value="">-- Choose a School --</option>
                      {schools.map((sch) => (
                        <option key={sch.id} value={sch.id}>
                          {sch.name} ({sch.code || sch.id})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.86rem', fontWeight: 600 }}>Initial Status</label>
                    <select
                      className="form-control"
                      value={assignFormData.status}
                      onChange={(e) => setAssignFormData({ ...assignFormData, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.86rem', fontWeight: 600 }}>Portal Access</label>
                    <div style={{ display: 'flex', gap: '14px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: assignFormData.portalAccess !== false ? '#047857' : '#64748b' }}>
                        <input
                          type="radio"
                          name="assignPortalAccess"
                          checked={assignFormData.portalAccess !== false}
                          onChange={() => setAssignFormData({ ...assignFormData, portalAccess: true })}
                        />
                        <span>ACCESS ON (Live in Portals)</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: assignFormData.portalAccess === false ? '#dc2626' : '#64748b' }}>
                        <input
                          type="radio"
                          name="assignPortalAccess"
                          checked={assignFormData.portalAccess === false}
                          onChange={() => setAssignFormData({ ...assignFormData, portalAccess: false })}
                        />
                        <span>ACCESS OFF (Hidden)</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '20px', background: '#f8fafc', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.86rem', fontWeight: 700, color: '#1e3a8a' }}>
                      Visible Portals — Who Can See This Service?
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {[
                        { id: 'student', label: 'Student' },
                        { id: 'teacher', label: 'Teacher' },
                        { id: 'parent', label: 'Parent' },
                        { id: 'principal', label: 'Principal' },
                        { id: 'schooladmin', label: 'School Admin' },
                      ].map((r) => {
                        const currentRoles = (assignFormData.visibleRoles || ['student', 'teacher', 'parent', 'principal', 'schooladmin']).map(x => x.toLowerCase());
                        const isChecked = currentRoles.includes(r.id.toLowerCase());
                        return (
                          <label
                            key={r.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              background: isChecked ? '#eff6ff' : '#ffffff',
                              border: isChecked ? '1px solid #93c5fd' : '1px solid #cbd5e1',
                              padding: '5px 10px',
                              borderRadius: '6px'
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                let updatedRoles;
                                if (e.target.checked) {
                                  updatedRoles = [...currentRoles, r.id];
                                } else {
                                  updatedRoles = currentRoles.filter((x) => x !== r.id);
                                }
                                setAssignFormData({ ...assignFormData, visibleRoles: updatedRoles });
                              }}
                            />
                            <span>{r.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <button type="button" className="btn btn-outline btn-sm" onClick={() => setIsAssignServiceModalOpen(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary btn-sm">Confirm Assignment</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      
      
      
      {activeTab === 'sa-subscriptions' && (
        <div>
          <div className="content-header">
            <h2 id="section-title">Subscriptions Management</h2>
            <div id="section-actions"></div>
          </div>

          <div id="portal-content">
            <div className="sa-schools-header-bar">
              <div className="sa-filter-segment">
                <button
                  className={`sa-filter-tab ${subViewType === 'subs' && subStatusFilter === 'All' ? 'active' : ''}`}
                  onClick={() => { setSubViewType('subs'); setSubStatusFilter('All'); }}
                >
                  All Subscriptions <span className="sa-tab-badge">{subscriptions.length}</span>
                </button>
                <button
                  className={`sa-filter-tab ${subViewType === 'plans' ? 'active' : ''}`}
                  onClick={() => setSubViewType('plans')}
                >
                  Subscription Plans
                </button>
                <button
                  className={`sa-filter-tab ${subViewType === 'subs' && subStatusFilter === 'ACTIVE' ? 'active' : ''}`}
                  onClick={() => { setSubViewType('subs'); setSubStatusFilter('ACTIVE'); }}
                >
                  Active <span className="sa-tab-badge badge-green">{subscriptions.filter((s) => s.status === 'ACTIVE').length}</span>
                </button>
                <button
                  className={`sa-filter-tab ${subViewType === 'subs' && subStatusFilter === 'EXPIRED' ? 'active' : ''}`}
                  onClick={() => { setSubViewType('subs'); setSubStatusFilter('EXPIRED'); }}
                >
                  Expired <span className="sa-tab-badge badge-rose">{subscriptions.filter((s) => s.status === 'EXPIRED').length}</span>
                </button>
                <button
                  className={`sa-filter-tab ${subViewType === 'subs' && subStatusFilter === 'PENDING' ? 'active' : ''}`}
                  onClick={() => { setSubViewType('subs'); setSubStatusFilter('PENDING'); }}
                >
                  Pending <span className="sa-tab-badge badge-warning">{subscriptions.filter((s) => s.status === 'PENDING').length}</span>
                </button>
              </div>
              <div className="sa-toolbar-right">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => { setSelectedPlanObj(null); setSubModalTab('subscription'); setIsSubModalOpen(true); }}
                >
                  + New Subscription
                </button>
              </div>
            </div>

            
            {subViewType === 'plans' && (
              <div id="sub-plans-pane" style={{ marginBottom: '25px' }}>
                <div className="grid-3">
                  {plans.map((p) => (
                    <div key={p.id} className="portal-card" style={{ borderLeftColor: 'var(--color-primary)' }}>
                      <div className="portal-card-header">
                        <span className="portal-card-title">{p.name}</span>
                        <span className="badge badge-info">Up to {p.maxStudents} Students</span>
                      </div>
                      <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)', margin: '8px 0' }}>{p.price}</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dark)' }}>{p.features}</p>
                      <button
                        className="btn btn-outline btn-sm"
                        style={{ marginTop: '14px', width: '100%' }}
                        onClick={() => { setSelectedPlanObj(p); setSubModalTab('plan'); setIsSubModalOpen(true); }}
                      >
                        Configure Plan
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            
            {subViewType === 'subs' && (
              <div id="sub-table-pane" className="table-responsive">
                <table className="sa-schools-table">
                  <thead>
                    <tr>
                      <th style={{ minWidth: '120px' }}>Subscription ID</th>
                      <th style={{ minWidth: '180px' }}>School Campus</th>
                      <th style={{ minWidth: '140px' }}>Plan Tier</th>
                      <th style={{ minWidth: '110px' }}>Start Date</th>
                      <th style={{ minWidth: '110px' }}>End Date</th>
                      <th style={{ minWidth: '110px', textAlign: 'center' }}>Amount</th>
                      <th style={{ minWidth: '100px', textAlign: 'center' }}>Status</th>
                      <th style={{ minWidth: '140px', textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubs.map((sub) => (
                      <tr key={sub.id} className="sa-sub-row" data-status={sub.status}>
                        <td data-label="Subscription ID"><code>{sub.id}</code></td>
                        <td data-label="School Campus">
                          <div className="school-meta-line">
                            <strong>{sub.school}</strong>
                            <small>{sub.schoolId || ''}</small>
                          </div>
                        </td>
                        <td data-label="Plan Tier">
                          <span className={`badge ${sub.status === 'PENDING' ? 'badge-warning' : 'badge-info'}`}>
                            {sub.plan}
                          </span>
                        </td>
                        <td data-label="Start Date">{sub.startDate}</td>
                        <td data-label="End Date">{sub.endDate}</td>
                        <td data-label="Amount" style={{ textAlign: 'center' }}>
                          <span className="badge badge-subtle" style={{ fontWeight: 700, color: 'var(--color-primary, #1e3a8a)' }}>
                            {sub.amount && sub.amount.includes('/') ? sub.amount : '0/yr'}
                          </span>
                        </td>
                        <td data-label="Status" style={{ textAlign: 'center' }}>
                          <span className={`badge ${sub.status === 'ACTIVE' ? 'badge-success' : sub.status === 'EXPIRED' ? 'badge-danger' : 'badge-warning'}`}>
                            {sub.status}
                          </span>
                        </td>
                        <td data-label="Action" style={{ textAlign: 'center' }}>
                          <div className="sa-actions-cell">
                            {sub.status === 'PENDING' ? (
                              <button
                                className="sa-tbl-action"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  color: '#047857',
                                  background: '#ecfdf5',
                                  borderColor: '#a7f3d0',
                                  fontWeight: 600,
                                  padding: '5px 12px',
                                  borderRadius: '6px',
                                }}
                                onClick={() => {
                                  setSelectedPlanObj(sub);
                                  setSubModalTab('subscription');
                                  setIsSubModalOpen(true);
                                }}
                              >
                                 Activate Plan
                              </button>
                            ) : (
                              <button
                                className="sa-tbl-action edit"
                                onClick={() => {
                                  setSelectedPlanObj(sub);
                                  setSubModalTab('subscription');
                                  setIsSubModalOpen(true);
                                }}
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                                Renew / Edit
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      
      
      
      {activeTab === 'sa-billing' && (
        <div>
          <div className="content-header">
            <h2 id="section-title">Bills & Billing Management</h2>
            <div id="section-actions"></div>
          </div>

          <div id="portal-content">
            <div className="sa-schools-header-bar">
              <div className="sa-filter-segment">
                <button
                  className={`sa-filter-tab ${billFilter === 'All' ? 'active' : ''}`}
                  onClick={() => setBillFilter('All')}
                >
                  All Bills <span className="sa-tab-badge">{bills.length}</span>
                </button>
                <button
                  className={`sa-filter-tab ${billFilter === 'PAID' ? 'active' : ''}`}
                  onClick={() => setBillFilter('PAID')}
                >
                  Paid <span className="sa-tab-badge badge-green">{bills.filter((b) => b.status === 'PAID').length}</span>
                </button>
                <button
                  className={`sa-filter-tab ${billFilter === 'PENDING' ? 'active' : ''}`}
                  onClick={() => setBillFilter('PENDING')}
                >
                  Pending <span className="sa-tab-badge">{bills.filter((b) => b.status === 'PENDING').length}</span>
                </button>
                <button
                  className={`sa-filter-tab ${billFilter === 'OVERDUE' ? 'active' : ''}`}
                  onClick={() => setBillFilter('OVERDUE')}
                >
                  Overdue <span className="sa-tab-badge badge-rose">{bills.filter((b) => b.status === 'OVERDUE').length}</span>
                </button>
              </div>
              <div className="sa-toolbar-right">
                <button className="btn btn-primary btn-sm" onClick={() => setIsInvoiceModalOpen(true)}>
                  + Create Invoice
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="sa-schools-table">
                <thead>
                  <tr>
                    <th style={{ minWidth: '110px' }}>Invoice ID</th>
                    <th style={{ minWidth: '180px' }}>School Campus</th>
                    <th style={{ minWidth: '130px' }}>Plan Tier</th>
                    <th style={{ minWidth: '100px' }}>Amount</th>
                    <th style={{ minWidth: '100px' }}>Due Date</th>
                    <th style={{ minWidth: '100px' }}>Payment Date</th>
                    <th style={{ minWidth: '90px', textAlign: 'center' }}>Status</th>
                    <th style={{ minWidth: '160px', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBills.map((b) => (
                    <tr key={b.invoiceNo} className="sa-bill-row" data-status={b.status}>
                      <td data-label="Invoice ID"><strong>{b.invoiceNo}</strong></td>
                      <td data-label="School"><strong>{b.school}</strong></td>
                      <td data-label="Plan"><span className="badge badge-info">{b.plan}</span></td>
                      <td data-label="Amount"><strong>{b.amount}</strong></td>
                      <td data-label="Due Date">{b.dueDate}</td>
                      <td data-label="Payment Date">{b.paymentDate || '—'}</td>
                      <td data-label="Status" style={{ textAlign: 'center' }}>
                        <span className={`badge ${b.status === 'PAID' ? 'badge-success' : b.status === 'PENDING' ? 'badge-warning' : 'badge-danger'}`}>
                          {b.status}
                        </span>
                      </td>
                      <td data-label="Actions" style={{ textAlign: 'center' }}>
                        <div className="sa-actions-cell">
                          <button
                            className="sa-tbl-action view"
                            onClick={() => setSelectedInvoiceForPrint(b)}
                            title="View official printable invoice"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                            </svg>
                            Invoice / PDF
                          </button>
                          <button
                            className="sa-tbl-action"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              color: '#1e3a8a',
                              background: '#eff6ff',
                              borderColor: '#bfdbfe',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              padding: '5px 9px',
                              borderRadius: '6px'
                            }}
                            onClick={() => downloadInvoicePDF(b)}
                            title="Direct download invoice PDF to your computer"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                              <line x1="12" y1="18" x2="12" y2="12" />
                              <line x1="9" y1="15" x2="12" y2="18" />
                              <line x1="15" y1="15" x2="12" y2="18" />
                            </svg>
                            Download PDF
                          </button>
                          {b.status !== 'PAID' && (
                            <button
                              className="sa-tbl-action success"
                              onClick={() => handleMarkBillPaid(b.invoiceNo)}
                            >
                              Mark Paid
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      
      
      
      {activeTab === 'sa-messaging' && (
        <div>
          <div className="content-header">
            <h2 id="section-title">Messages</h2>
            <div id="section-actions"></div>
          </div>
          <div id="portal-content" style={{ marginTop: '16px' }}>
            <ChatBox />
          </div>
        </div>
      )}

      
      
      
      {activeTab === 'sa-settings' && (
        <div>
          <div className="content-header">
            <h2 id="section-title">Platform Settings</h2>
            <div id="section-actions"></div>
          </div>

          <div id="portal-content" style={{ marginTop: '16px' }}>
            <SuperAdminSettingsView initialSection={settingsSection} />
          </div>
        </div>
      )}


      
      
      
      
      <NewSchoolWizardModal
        key={isWizardOpen ? 'wiz-open' : 'wiz-closed'}
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSchoolCreated={handleSchoolOnboarded}
      />

      
      <CampusOverviewModal
        isOpen={isOverviewOpen}
        school={selectedSchool}
        onClose={() => setIsOverviewOpen(false)}
        onEdit={(s) => { setSelectedSchool(s); setIsEditSchoolOpen(true); }}
        onEnterSchool={(s) => {
          setActiveCampusPortal(s);
          setActiveCampusRole('schooladmin');
          setActiveCampusTab('school-admin-users');
        }}
        onUpdateCredentials={handleUpdateSchoolCredentials}
      />

      
      <EditSchoolModal
        isOpen={isEditSchoolOpen}
        school={selectedSchool}
        onClose={() => setIsEditSchoolOpen(false)}
        onSave={async (updated) => {
          setSchools((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
          try {
            const store = getPortalData() || {};
            if (store && store.schools) {
              store.schools = store.schools.map((s) => (s.id === updated.id ? updated : s));
              savePortalData(store);
            }
            if (updated.status) {
              setSchoolStatusInStore(updated.id, updated.status);
            }
            await api.updateSchool(updated.id, updated);
          } catch (e) {}
          showFeedback('Campus Updated', `Changes saved for ${updated.name}.`);
        }}
      />

      
      <AdminProfileModal
        isOpen={isAdminProfileOpen}
        admin={selectedAdmin}
        onClose={() => setIsAdminProfileOpen(false)}
      />

      
      <AddAdminModal
        isOpen={isAddAdminOpen}
        schools={schools}
        onClose={() => setIsAddAdminOpen(false)}
        onSave={handleAddAdmin}
      />

      
      <AssignAdminModal
        isOpen={isAssignAdminOpen}
        admins={schoolAdmins}
        schools={schools}
        initialAdminId={assignInitialAdminId}
        onClose={() => setIsAssignAdminOpen(false)}
        onSave={handleAssignAdmin}
      />

      
      <SubscriptionModal
        isOpen={isSubModalOpen}
        defaultTab={subModalTab}
        planObj={selectedPlanObj}
        schools={schools}
        plans={plans}
        onClose={() => setIsSubModalOpen(false)}
        onSave={handleSaveSubOrPlan}
      />

      
      <CreateInvoiceModal
        isOpen={isInvoiceModalOpen}
        schools={schools}
        onClose={() => setIsInvoiceModalOpen(false)}
        onSave={handleSaveInvoice}
      />

      
      <FeedbackModal
        isOpen={feedback.isOpen}
        title={feedback.title}
        message={feedback.message}
        credentials={feedback.credentials}
        onClose={() => setFeedback({ ...feedback, isOpen: false })}
      />

      
      <DashboardDetailModal
        isOpen={cardDetailModal.isOpen}
        detailConfig={cardDetailModal.config}
        onClose={() => setCardDetailModal({ isOpen: false, config: null })}
        onNavigate={(tab) => {
          if (setActiveTab) {
            setActiveTab(tab);
          }
        }}
      />

      
      <PrintableInvoiceModal
        isOpen={!!selectedInvoiceForPrint}
        bill={selectedInvoiceForPrint}
        onClose={() => setSelectedInvoiceForPrint(null)}
      />

      
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
      />

      
      <InteractiveServicePlayerModal
        isOpen={!!activeInteractiveService}
        service={activeInteractiveService}
        onClose={() => setActiveInteractiveService(null)}
      />
    </div>
  );
}
