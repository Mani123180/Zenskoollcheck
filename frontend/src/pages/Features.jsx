import React from 'react';
import { Link } from 'react-router-dom';

export default function Features() {
  const pictorialModules = [
    {
      title: 'Smart Homework & Assignments Desk',
      category: 'Academics & Study Desk',
      badge: 'PDF NOTES & DEADLINES',
      desc: 'Publish daily subject assignments with attached study materials, sample exercise questions, and digital response uploads. Track real-time submission rates across classes.',
      imgSrc: '/images/previews/ai-homework-management.jpg',
      accent: '#d97706',
      highlights: ['PDF study material attachments', 'Class-wise submission rate counters', 'Automated parent alerts on new homework']
    },
    {
      title: 'Real-Time Attendance & Biometric Sync',
      category: 'Student & Staff Roll Call',
      badge: '95% LIVE ATTENDANCE',
      desc: 'Capture morning assembly turnstile scans, RFID card taps, and manual teacher class registers with automatic absentee WhatsApp notifications dispatched to parents.',
      imgSrc: '/images/previews/ai-attendance-tracking.jpg',
      accent: '#7c3aed',
      highlights: ['08:30 AM assembly cutoff tracking', 'Instant absent notification to parents', 'Biometric QR & turnstile gate sync']
    },
    {
      title: 'Easy Student Fee Billing & Receipts',
      category: 'Fee Invoicing & Payments',
      badge: 'INSTANT WHATSAPP RECEIPTS',
      desc: 'Complete student fee billing system with itemized tuition, transport, and lab fee heads, real-time Paid and Pending status tracking, and 1-click WhatsApp payment receipts.',
      imgSrc: '/images/previews/ai-fee-billing.jpg',
      accent: '#2563eb',
      highlights: ['Itemized tuition & transport invoices', 'Due balance tracking across terms', 'Direct parent WhatsApp receipts']
    },
    {
      title: 'Smart Financial Management & Ledger',
      category: 'Campus Finance & Accounts',
      badge: 'MULTI-HEAD LEDGERS',
      desc: 'Centralized school financial ledger tracking total revenue, collected student fees, outstanding dues, monthly institutional expenses, and audited net surplus.',
      imgSrc: '/images/previews/ai-financial-management.jpg',
      accent: '#059669',
      highlights: ['Revenue & expense KPI dash cards', '81.6% collection rate reconciliation', 'Audited financial balance sheet']
    },
    {
      title: 'Academic Timetables & Period Scheduling',
      category: 'Faculty & Classroom Rosters',
      badge: 'AUTO-MATCHED SCHEDULES',
      desc: 'Interactive period scheduling matrix matching subject teachers to classroom periods and science laboratories, complete with emergency substitution handling.',
      imgSrc: '/images/previews/ai-timetables.jpg',
      accent: '#2563eb',
      highlights: ['Conflict-free period allocation', 'Faculty substitution management', 'Student & parent mobile timetable sync']
    },
    {
      title: 'Batch Examination Dates & Seating',
      category: 'Exams & Hall Allocations',
      badge: '5 SUBJECTS PUBLISHED',
      desc: 'Schedule comprehensive multi-subject board examinations in one centralized date sheet, publish dates directly to student portals, and assign exam hall desk numbers.',
      imgSrc: '/images/previews/ai-examinations.jpg',
      accent: '#7c3aed',
      highlights: ['Published term date sheets', 'Hall ticket & desk allocation', 'Syllabus guidelines attachment']
    },
    {
      title: 'Faculty & Staff Monthly Payroll',
      category: 'Payroll & HR Clearance',
      badge: '100% EPF/ESI COMPLIANT',
      desc: 'Automated salary calculation covering teaching faculties and non-teaching campus staff (drivers, wardens, maintenance), allowance breakdowns, and bank transfer slips.',
      imgSrc: '/images/previews/ai-payroll.jpg',
      accent: '#d97706',
      highlights: ['Teaching & non-teaching payroll tabs', 'Basic + HRA + Allowances computation', 'Downloadable monthly salary slips']
    },
    {
      title: 'Live Parent Updates & WhatsApp Feed',
      category: 'Guardian Communication Desk',
      badge: 'INSTANT ALERTS',
      desc: 'Keep parents informed with real-time morning gate arrival notifications, homework assignments, upcoming examination schedules, and term report cards.',
      imgSrc: '/images/previews/ai-parent-updates.jpg',
      accent: '#db2777',
      highlights: ['Morning gate RFID turnstile alert', 'Homework submission reminders', 'Direct teacher-to-parent messaging']
    },
    {
      title: 'Multi-Campus Super Admin Tower',
      category: 'Central Trust Governance',
      badge: 'MULTI-SCHOOL NETWORK',
      desc: 'Centralized governance tower for trust administrators managing multiple campuses, school principal credentials, active student quotas, and enterprise licenses.',
      imgSrc: '/images/previews/ai-multi-campus.jpg',
      accent: '#0891b2',
      highlights: ['Multi-branch oversight & analytics', 'Admin & Finance credential controls', 'License management & school onboarding']
    }
  ];

  const comparisonData = [
    { name: 'Super Admin & Multi-School Oversight', basic: true, standard: true, premium: true },
    { name: 'School Admin Institutional Portal', basic: true, standard: true, premium: true },
    { name: 'Teacher Classroom & Marks Portal', basic: true, standard: true, premium: true },
    { name: 'Student Academic Portal', basic: true, standard: true, premium: true },
    { name: 'Parent Real-Time Monitoring Portal', basic: true, standard: true, premium: true },
    { name: 'Principal Supervision Dashboard', basic: false, standard: true, premium: true },
    { name: 'Daily Attendance Management & Roll Call', basic: true, standard: true, premium: true },
    { name: 'Homework & Assignment Publishing', basic: true, standard: true, premium: true },
    { name: 'Digital Study Materials Library', basic: false, standard: true, premium: true },
    { name: 'Interactive Class Timetable Grid', basic: false, standard: true, premium: true },
    { name: 'Batch Exam Scheduling & Date Sheet Table', basic: false, standard: true, premium: true },
    { name: 'Real-Time Exam Result & Report Card', basic: false, standard: true, premium: true },
    { name: 'Finance Manage & Student Fee Billing', basic: false, standard: true, premium: true },
    { name: 'Staff Salary Payroll & Slips', basic: false, standard: true, premium: true },
    { name: 'School Operating Expenses Ledger', basic: false, standard: true, premium: true },
    { name: 'Excel Bulk Import & Export', basic: false, standard: true, premium: true },
    { name: 'Instant Multi-Role Notification Sync', basic: false, standard: false, premium: true },
    { name: 'Live School Bus GPS Tracking', basic: false, standard: false, premium: true },
    { name: 'Multi-Branch & Campus Integration', basic: false, standard: false, premium: true },
    { name: '24/7 Dedicated Support & Cloud Backup', basic: false, standard: false, premium: true },
  ];

  return (
    <div className="landing-wrapper">
      
      {/* HERO BANNER */}
      <section
        className="landing-hero"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #0b1938 100%)',
          position: 'relative',
          padding: '80px 20px 70px',
          textAlign: 'center',
          color: '#ffffff'
        }}
      >
        <h1 style={{ color: '#ffffff', fontSize: '2.7rem', fontWeight: 900, margin: '0 0 12px', letterSpacing: '-0.4px' }}>
          Comprehensive <span style={{ color: '#fbbf24' }}>ZenSkooll</span> Platform Features
        </h1>
        <p style={{ color: '#cbd5e1', maxWidth: '720px', margin: '0 auto 30px', fontSize: '1.08rem', lineHeight: '1.6' }}>
          Explore specialized operational modules designed to digitize modern schools, colleges, and educational institutions.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <Link
            to="/login"
            style={{
              background: '#f59e0b',
              color: '#0f172a',
              padding: '12px 28px',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.95rem',
              textDecoration: 'none'
            }}
          >
            Open Live Portal &rarr;
          </Link>
          <Link
            to="/contact"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              padding: '12px 28px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none'
            }}
          >
            Request Institutional Demo
          </Link>
        </div>
      </section>

      {/* PICTORIAL FEATURE MODULES */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '46px' }}>
          <h2 style={{ fontSize: '2.1rem', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
            Interactive Modules Built for Real School Workflows
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '640px', margin: '0 auto' }}>
            Every tool is engineered for clean everyday execution by principals, teachers, finance officers, and parents.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          {pictorialModules.map((m, i) => (
            <div
              key={i}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '22px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Browser style frame */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '10px',
                  marginBottom: '18px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.64rem', color: m.accent, fontWeight: 800, background: `${m.accent}12`, padding: '2px 6px', borderRadius: '4px' }}>
                    {m.badge}
                  </span>
                </div>
                <div style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid #e2e8f0', height: '200px' }}>
                  <img
                    src={m.imgSrc}
                    alt={m.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                    loading="lazy"
                  />
                </div>
              </div>

              <div style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: m.accent, background: `${m.accent}12`, padding: '3px 10px', borderRadius: '6px', marginBottom: '8px', alignSelf: 'flex-start' }}>
                {m.category}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                {m.title}
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: '1.6', margin: '0 0 16px', flex: 1 }}>
                {m.desc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid #f1f5f9', paddingTop: '14px', fontSize: '0.82rem', color: '#334155', fontWeight: 600 }}>
                {m.highlights.map((h, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: m.accent, fontWeight: 800 }}>✓</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* COMPARISON TABLE */}
        <div style={{ marginTop: '70px', textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#0f172a', margin: '0 0 10px' }}>
            Detailed Feature Comparison Matrix
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Select the plan matched to your institution size and technical requirements</p>
        </div>

        <div style={{ overflowX: 'auto', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '16px 20px', color: '#1e3a8a', fontWeight: 800 }}>Core Features & Modules</th>
                <th style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 800, color: '#475569' }}>Basic Plan</th>
                <th style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 800, color: '#d97706' }}>Standard Plan</th>
                <th style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 800, color: '#059669' }}>Premium Plan</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 600, color: '#334155' }}>{row.name}</td>
                  <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                    {row.basic ? <span style={{ color: '#10b981', fontWeight: 800 }}>✓</span> : <span style={{ color: '#94a3b8' }}>—</span>}
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                    {row.standard ? <span style={{ color: '#d97706', fontWeight: 800 }}>✓</span> : <span style={{ color: '#94a3b8' }}>—</span>}
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                    {row.premium ? <span style={{ color: '#059669', fontWeight: 800 }}>✓</span> : <span style={{ color: '#94a3b8' }}>—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
