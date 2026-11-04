import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const highlights = [
    {
      title: 'Academic Timetables & Period Scheduling',
      category: 'Academics & Rosters',
      desc: 'Interactive period scheduling with auto-matching faculty and room allocation. Prevent overlapping lectures with automatic teacher substitution detection and live timetable views for students.',
      points: [
        'Automated conflict detection across classrooms and labs',
        'Teacher substitution & emergency period reassignment',
        'Direct live schedule sync to student and parent mobile portals'
      ],
      iconColor: '#2563eb',
      imgSrc: '/images/previews/choose-timetables.png',
      tagBadge: 'AUTO-MATCHED'
    },
    {
      title: 'Batch Examination Dates & Seating',
      category: 'Exams & Hall Tickets',
      desc: 'Schedule 5+ subjects in one table format and publish dates directly to students and parents with instant hall ticket and seating arrangements.',
      points: [
        'Multi-subject board exam date sheets published in 1-click',
        'Hall ticket & desk seating allocation rosters',
        'Automated subject syllabus & exam guideline attachments'
      ],
      iconColor: '#7c3aed',
      imgSrc: '/images/previews/choose-exams.png',
      tagBadge: '5 SUBJECTS PUBLISHED'
    },
    {
      title: 'Student Fee Collections & Billing',
      category: 'Finance & Invoicing',
      desc: 'Transparent fee collections, automated receipts, due tracking, and ledger records with instant WhatsApp receipts sent to parent mobiles.',
      points: [
        'Itemized tuition, transport, lab, and exam fee breakdown',
        'Instant digital invoices & GST payment receipt generation',
        'Automated SMS & WhatsApp fee payment confirmations'
      ],
      iconColor: '#059669',
      imgSrc: '/images/previews/student-billing.png',
      tagBadge: 'PAID IN FULL'
    },
    {
      title: 'Faculty & Staff Monthly Payroll',
      category: 'Payroll & HR',
      desc: 'Complete teaching and non-teaching salary calculations with allowance breakdowns, EPF/ESI statutory compliance, and monthly bank transfer slips.',
      points: [
        'Automated Basic + HRA + Allowances calculation',
        'EPF, ESI & professional tax deduction tracking',
        '1-click downloadable salary slips for faculty'
      ],
      iconColor: '#d97706',
      imgSrc: '/images/previews/choose-payroll.png',
      tagBadge: 'OCTOBER DISBURSED'
    },
    {
      title: 'Live Parent Updates & WhatsApp Alerts',
      category: 'Parent Guardian Desk',
      desc: 'Parents receive immediate updates on attendance, exam schedules, homework deadlines, and term results directly on their personal devices.',
      points: [
        'Real-time morning gate in-time arrival alerts',
        'Instant WhatsApp notifications for homework & bus tracking',
        'Continuous academic feedback from subject teachers'
      ],
      iconColor: '#db2777',
      imgSrc: '/images/previews/choose-parent.png',
      tagBadge: 'INSTANT ALERTS'
    }
  ];

  return (
    <div className="landing-wrapper">
      
      <section
        className="landing-hero"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #0b1938 100%)',
          position: 'relative',
          padding: '90px 20px 80px',
          textAlign: 'center',
          overflow: 'hidden',
          color: '#ffffff'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            pointerEvents: 'none'
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '10%',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            right: '10%',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ maxWidth: '880px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h1
            style={{
              fontSize: '3.2rem',
              fontWeight: 900,
              color: '#ffffff',
              margin: '0 0 18px',
              lineHeight: '1.2',
              letterSpacing: '-0.5px'
            }}
          >
            Transform Your Campus with{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #38bdf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              ZenSkooll
            </span>
          </h1>

          <p
            style={{
              fontSize: '1.18rem',
              color: '#cbd5e1',
              lineHeight: '1.7',
              margin: '0 auto 36px',
              maxWidth: '720px'
            }}
          >
            A modern, multi-campus digital ERP platform built to streamline student attendance, examination schedules, fee billing registers, staff payroll, and real-time parent WhatsApp updates.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '18px', flexWrap: 'wrap' }}>
            <Link
              to="/login"
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#0f172a',
                padding: '15px 36px',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '1.02rem',
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(245, 158, 11, 0.45)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              <span>Open ERP Portal</span>
              <span>&rarr;</span>
            </Link>
            <Link
              to="/features"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                padding: '15px 32px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '1.02rem',
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background 0.2s ease'
              }}
            >
              <span>Explore Features</span>
            </Link>
          </div>

          <div
            style={{
              marginTop: '42px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '28px',
              flexWrap: 'wrap',
              fontSize: '0.84rem',
              color: '#94a3b8',
              fontWeight: 600
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#10b981' }}>✓</span> 5 Connected Campuses
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#10b981' }}>✓</span> 10,000+ Enrolled Students
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#10b981' }}>✓</span> 100% Data Isolation
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#10b981' }}>✓</span> 24/7 Cloud Availability
            </div>
          </div>
        </div>
      </section>

      {/* 
        CORE MODULES WITH COMPACT SAMPLE OUTPUT PREVIEWS
      */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '46px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.3px' }}>
            All-in-One Campus Management Platform
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.02rem', maxWidth: '680px', margin: '0 auto' }}>
            Comprehensive operational modules with live digital workflows from classroom assignments to campus accounts.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '42px' }}>
          
          {/* 1. SMART HOMEWORK MANAGEMENT */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '32px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
          }}>
            <div>
              <div style={{
                display: 'inline-block',
                fontSize: '0.74rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#d97706',
                background: '#fef3c7',
                padding: '4px 12px',
                borderRadius: '6px',
                border: '1px solid #fde68a',
                marginBottom: '10px'
              }}>
                Academics & Assignments
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '0 0 10px', letterSpacing: '-0.3px' }}>
                Smart Homework Management
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.94rem', lineHeight: '1.6', margin: '0 0 18px' }}>
                Publish subject-wise homework tasks with attached PDF notes and submission deadlines. Students upload responses directly, and parents stay updated on homework completion.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px', fontSize: '0.86rem', color: '#334155', fontWeight: 600 }}>
                <div><span style={{ color: '#d97706', fontWeight: 800, marginRight: '6px' }}>✓</span> Daily subject assignments & exercise trackers</div>
                <div><span style={{ color: '#d97706', fontWeight: 800, marginRight: '6px' }}>✓</span> Downloadable study material notes & sample sheets</div>
                <div><span style={{ color: '#d97706', fontWeight: 800, marginRight: '6px' }}>✓</span> Real-time student submission counters & teacher marks</div>
              </div>
              <Link
                to="/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#d97706',
                  color: '#ffffff',
                  padding: '9px 20px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  textDecoration: 'none'
                }}
              >
                <span>Access Homework Desk</span>
                <span>&rarr;</span>
              </Link>
            </div>

            {/* Compact Pictorial Image Preview: Homework */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '12px',
              padding: '12px',
              boxShadow: '0 6px 18px rgba(0,0,0,0.05)',
              maxWidth: '440px',
              margin: '0 auto',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>Homework & Assignments Output</span>
                <span style={{ fontSize: '0.68rem', color: '#b45309', fontWeight: 800, background: '#fef3c7', padding: '2px 8px', borderRadius: '4px' }}>ACADEMICS</span>
              </div>
              <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', maxHeight: '220px' }}>
                <img
                  src="/images/previews/homework-management.png"
                  alt="Smart Homework Management Output Preview"
                  style={{ width: '100%', height: '220px', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                  loading="lazy"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '0.72rem', color: '#64748b' }}>
                <span>Actual Screen: Student & Parent Academic Desk</span>
                <span style={{ color: '#d97706', fontWeight: 700 }}>Study Materials</span>
              </div>
            </div>
          </div>

          {/* 2. REAL-TIME ATTENDANCE TRACKING */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '32px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
          }}>
            <div>
              <div style={{
                display: 'inline-block',
                fontSize: '0.74rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#7c3aed',
                background: '#f5f3ff',
                padding: '4px 12px',
                borderRadius: '6px',
                border: '1px solid #ddd6fe',
                marginBottom: '10px'
              }}>
                Biometric & Roll-Call Sync
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '0 0 10px', letterSpacing: '-0.3px' }}>
                Real-Time Attendance Tracking
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.94rem', lineHeight: '1.6', margin: '0 0 18px' }}>
                Morning biometric QR and RFID gate in-time capture with live class registers, attendance rate percentages, and automated instant WhatsApp alerts to parents of absentees.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px', fontSize: '0.86rem', color: '#334155', fontWeight: 600 }}>
                <div><span style={{ color: '#7c3aed', fontWeight: 800, marginRight: '6px' }}>✓</span> 95.0% Real-time attendance rate tracking</div>
                <div><span style={{ color: '#7c3aed', fontWeight: 800, marginRight: '6px' }}>✓</span> Morning assembly in-time logs (08:30 AM cutoff)</div>
                <div><span style={{ color: '#7c3aed', fontWeight: 800, marginRight: '6px' }}>✓</span> Instant absentee notifications to parent mobile numbers</div>
              </div>
              <Link
                to="/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#7c3aed',
                  color: '#ffffff',
                  padding: '9px 20px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  textDecoration: 'none'
                }}
              >
                <span>Check Attendance Register</span>
                <span>&rarr;</span>
              </Link>
            </div>

            {/* Compact Pictorial Image Preview: Attendance */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '12px',
              padding: '12px',
              boxShadow: '0 6px 18px rgba(0,0,0,0.05)',
              maxWidth: '440px',
              margin: '0 auto',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>Attendance Tracking Output</span>
                <span style={{ fontSize: '0.68rem', color: '#1e40af', fontWeight: 800, background: '#eff6ff', padding: '2px 8px', borderRadius: '4px' }}>95% PRESENT</span>
              </div>
              <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', maxHeight: '220px' }}>
                <img
                  src="/images/previews/attendance-tracking.png"
                  alt="Real-Time Attendance Tracking Output Preview"
                  style={{ width: '100%', height: '220px', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                  loading="lazy"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '0.72rem', color: '#64748b' }}>
                <span>Actual Screen: Student Roll & Attendance</span>
                <span style={{ color: '#7c3aed', fontWeight: 700 }}>Biometric QR Sync</span>
              </div>
            </div>
          </div>

          {/* 3. BILLING & INSTANT RECEIPTS: EASY STUDENT FEE BILLING */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '32px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
          }}>
            <div>
              <div style={{
                display: 'inline-block',
                fontSize: '0.74rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#2563eb',
                background: '#eff6ff',
                padding: '4px 12px',
                borderRadius: '6px',
                border: '1px solid #bfdbfe',
                marginBottom: '10px'
              }}>
                Billing & Instant Receipts
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '0 0 10px', letterSpacing: '-0.3px' }}>
                Easy Student Fee Billing
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.94rem', lineHeight: '1.6', margin: '0 0 18px' }}>
                Generate official student invoices with itemized tuition and lab fee breakdowns, automated due balance tracking, and one-click WhatsApp receipts delivered to parents.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px', fontSize: '0.86rem', color: '#334155', fontWeight: 600 }}>
                <div><span style={{ color: '#2563eb', fontWeight: 800, marginRight: '6px' }}>✓</span> Instant digital invoices & GST receipt generation</div>
                <div><span style={{ color: '#2563eb', fontWeight: 800, marginRight: '6px' }}>✓</span> Clear Paid, Partial, and Pending status tracking</div>
                <div><span style={{ color: '#2563eb', fontWeight: 800, marginRight: '6px' }}>✓</span> One-click fee payment receipts sent via WhatsApp</div>
              </div>
              <Link
                to="/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#2563eb',
                  color: '#ffffff',
                  padding: '9px 20px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  textDecoration: 'none'
                }}
              >
                <span>View Fee Billing Desk</span>
                <span>&rarr;</span>
              </Link>
            </div>

            {/* Compact Pictorial Image Preview: Fee Billing */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '12px',
              padding: '12px',
              boxShadow: '0 6px 18px rgba(0,0,0,0.05)',
              maxWidth: '440px',
              margin: '0 auto',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>Fee Billing & Invoices Output</span>
                <span style={{ fontSize: '0.68rem', color: '#15803d', fontWeight: 800, background: '#dcfce7', padding: '2px 8px', borderRadius: '4px' }}>INVOICES</span>
              </div>
              <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', maxHeight: '220px' }}>
                <img
                  src="/images/previews/fee-billing.png"
                  alt="Student Fee Billing Output Preview"
                  style={{ width: '100%', height: '220px', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                  loading="lazy"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '0.72rem', color: '#64748b' }}>
                <span>Actual Screen: Student Fee Collection</span>
                <span style={{ color: '#2563eb', fontWeight: 700 }}>WhatsApp Receipts</span>
              </div>
            </div>
          </div>

          {/* 4. SMART FINANCIAL MANAGEMENT */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '32px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
          }}>
            <div>
              <div style={{
                display: 'inline-block',
                fontSize: '0.74rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#059669',
                background: '#ecfdf5',
                padding: '4px 12px',
                borderRadius: '6px',
                border: '1px solid #a7f3d0',
                marginBottom: '10px'
              }}>
                Campus Finance & Ledger
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '0 0 10px', letterSpacing: '-0.3px' }}>
                Smart Financial Management
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.94rem', lineHeight: '1.6', margin: '0 0 18px' }}>
                Complete multi-head financial accounts with centralized visibility over campus cashflow, monthly faculty payroll disbursements, institutional expenses, and audited net surplus.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px', fontSize: '0.86rem', color: '#334155', fontWeight: 600 }}>
                <div><span style={{ color: '#059669', fontWeight: 800, marginRight: '6px' }}>✓</span> Real-time campus revenue & expenditure tracking</div>
                <div><span style={{ color: '#059669', fontWeight: 800, marginRight: '6px' }}>✓</span> Automated faculty & staff payroll calculation</div>
                <div><span style={{ color: '#059669', fontWeight: 800, marginRight: '6px' }}>✓</span> 81.6% Collection rate & monthly fee reconciliation</div>
              </div>
              <Link
                to="/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#059669',
                  color: '#ffffff',
                  padding: '9px 20px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  textDecoration: 'none'
                }}
              >
                <span>Open Financial Desk</span>
                <span>&rarr;</span>
              </Link>
            </div>

            {/* Compact Pictorial Image Preview: Finance */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '12px',
              padding: '12px',
              boxShadow: '0 6px 18px rgba(0,0,0,0.05)',
              maxWidth: '440px',
              margin: '0 auto',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>Finance Dashboard Output</span>
                <span style={{ fontSize: '0.68rem', color: '#059669', fontWeight: 800, background: '#ecfdf5', padding: '2px 8px', borderRadius: '4px' }}>LIVE LEDGER</span>
              </div>
              <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', maxHeight: '220px' }}>
                <img
                  src="/images/previews/finance-management.png"
                  alt="Smart Financial Management Output Preview"
                  style={{ width: '100%', height: '220px', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                  loading="lazy"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '0.72rem', color: '#64748b' }}>
                <span>Actual Screen: School Accounts & Ledger</span>
                <span style={{ color: '#059669', fontWeight: 700 }}>81.6% Collected</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 20px 70px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a' }}>Why Institutions Choose ZenSkooll</h2>
          <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '6px' }}>Built from the ground up for streamlined Indian school workflows</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {highlights.map((h, i) => {
            const isReversed = i % 2 === 1;
            return (
              <div
                key={i}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '32px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '32px',
                  alignItems: 'center',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
                }}
              >
                {/* Text Content */}
                <div style={{ order: isReversed ? 2 : 1 }}>
                  <div
                    style={{
                      display: 'inline-block',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: h.iconColor,
                      background: `${h.iconColor}12`,
                      padding: '4px 12px',
                      borderRadius: '6px',
                      border: `1px solid ${h.iconColor}30`,
                      marginBottom: '10px'
                    }}
                  >
                    {h.category}
                  </div>
                  <h3
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 900,
                      color: '#0f172a',
                      margin: '0 0 10px',
                      letterSpacing: '-0.3px'
                    }}
                  >
                    {h.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.94rem', lineHeight: '1.6', margin: '0 0 18px' }}>
                    {h.desc}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px', fontSize: '0.86rem', color: '#334155', fontWeight: 600 }}>
                    {h.points.map((pt, idx) => (
                      <div key={idx}>
                        <span style={{ color: h.iconColor, fontWeight: 800, marginRight: '6px' }}>✓</span>
                        {pt}
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/login"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: h.iconColor,
                      color: '#ffffff',
                      padding: '9px 20px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.86rem',
                      textDecoration: 'none'
                    }}
                  >
                    <span>Explore Module</span>
                    <span>&rarr;</span>
                  </Link>
                </div>

                {/* Big Pictorial Preview Card */}
                <div
                  style={{
                    order: isReversed ? 1 : 2,
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '12px',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.05)',
                    maxWidth: '480px',
                    margin: '0 auto',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: '1px solid #e2e8f0',
                      paddingBottom: '8px',
                      marginBottom: '10px'
                    }}
                  >
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>{h.category} Preview</span>
                    <span style={{ fontSize: '0.68rem', color: h.iconColor, fontWeight: 800, background: `${h.iconColor}15`, padding: '2px 8px', borderRadius: '4px' }}>
                      {h.tagBadge}
                    </span>
                  </div>
                  <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <img
                      src={h.imgSrc}
                      alt={h.title}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
