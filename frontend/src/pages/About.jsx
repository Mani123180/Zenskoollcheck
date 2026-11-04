import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const pillars = [
    {
      title: 'Automated School Operations',
      desc: 'Say goodbye to fragmented paper registers and manual receipt logs. ZenSkooll centralizes student onboarding, fee billing, examination rosters, and staff salary processing.',
      color: '#2563eb'
    },
    {
      title: 'Real-Time Parent Connectivity',
      desc: 'Keep guardians informed every single morning. Instant RFID gate arrival alerts, daily homework assignments with PDF study materials, and WhatsApp fee receipts.',
      color: '#7c3aed'
    },
    {
      title: 'Indian Compliance Ready',
      desc: 'Tailored for CBSE, ICSE, Matriculation, and State Board curriculum structures with built-in EPF, ESI statutory deductions and itemized fee ledgers.',
      color: '#059669'
    },
    {
      title: 'Multi-Role Enterprise Security',
      desc: 'Strict role-based access control with isolated dashboards for Super Admins, School Administrators, Principals, Finance Managers, Teachers, Students, and Parents.',
      color: '#d97706'
    }
  ];

  return (
    <div className="landing-wrapper">
      
      {/* HERO SECTION */}
      <section
        className="landing-hero"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #0b1938 100%)',
          position: 'relative',
          padding: '80px 20px 60px',
          textAlign: 'center',
          color: '#ffffff'
        }}
      >
        <h1 style={{ color: '#ffffff', fontSize: '2.8rem', fontWeight: 900, margin: '0 0 14px', letterSpacing: '-0.4px' }}>
          Pioneering the Future of <span style={{ color: '#fbbf24' }}>Digital Campus Management</span>
        </h1>
        <p style={{ color: '#cbd5e1', maxWidth: '720px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.7' }}>
          ZenSkooll is a modern, all-in-one educational ERP designed to eliminate administrative friction and empower schools, teachers, students, and parents with seamless digital workflows.
        </p>
      </section>

      {/* MISSION & VISION */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 900, color: '#0f172a', margin: '0 0 14px' }}>
              Built From the Ground Up for Indian Educational Institutions
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '14px' }}>
              Traditional school management relied heavily on scattered paper registers, manual cash billing, delayed report card generation, and unorganized staff payroll calculations. Educational leaders spent valuable hours managing paperwork rather than focusing on institutional growth and student development.
            </p>
            <p style={{ color: '#64748b', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '22px' }}>
              ZenSkooll was engineered to solve these exact operational challenges. We combined automated biometric roll-calls, real-time fee collection with instant WhatsApp receipts, class period timetables, batch exam scheduling, and staff payroll into one unified, secure platform.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                to="/features"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: '#0f172a',
                  padding: '12px 26px',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>Explore Features</span>
                <span>&rarr;</span>
              </Link>
              <Link
                to="/contact"
                style={{
                  background: '#ffffff',
                  color: '#0f172a',
                  border: '1px solid #cbd5e1',
                  padding: '12px 26px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>Book a Demo</span>
              </Link>
            </div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0f172a', margin: '0 0 16px' }}>
              How ZenSkooll Transforms Daily School Life
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>1</div>
                <div>
                  <b style={{ color: '#0f172a', fontSize: '0.94rem' }}>Zero Administrative Bottlenecks</b>
                  <p style={{ color: '#64748b', fontSize: '0.86rem', margin: '2px 0 0', lineHeight: '1.5' }}>Daily attendance registers, fee dues calculation, and marks compilation happen automatically without manual tallying.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>2</div>
                <div>
                  <b style={{ color: '#0f172a', fontSize: '0.94rem' }}>Transparent Parent Partnerships</b>
                  <p style={{ color: '#64748b', fontSize: '0.86rem', margin: '2px 0 0', lineHeight: '1.5' }}>Parents stay continuously looped in through automated morning entry timestamps, homework reminders, and WhatsApp fee receipts.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>3</div>
                <div>
                  <b style={{ color: '#0f172a', fontSize: '0.94rem' }}>100% Statutory HR & Payroll Compliance</b>
                  <p style={{ color: '#64748b', fontSize: '0.86rem', margin: '2px 0 0', lineHeight: '1.5' }}>Monthly teaching and non-teaching payroll calculations with automated EPF, ESI deductions, allowances, and bank transfer slips.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>4</div>
                <div>
                  <b style={{ color: '#0f172a', fontSize: '0.94rem' }}>Dedicated Cloud Data Sovereignty</b>
                  <p style={{ color: '#64748b', fontSize: '0.86rem', margin: '2px 0 0', lineHeight: '1.5' }}>Every educational institution operates within an isolated, encrypted workspace with enterprise role-based authorization.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* OUR CORE PILLARS */}
        <div style={{ marginTop: '80px', textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
            Core Pillars of ZenSkooll
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '620px', margin: '0 auto' }}>
            Our architectural principles ensure complete reliability, data privacy, and daily convenience for educational campuses.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {pillars.map((p, i) => (
            <div key={i} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '28px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)', borderTop: `4px solid ${p.color}` }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>{p.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* TRUST BANNER */}
        <div style={{
          marginTop: '70px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)',
          border: '1px solid #bfdbfe',
          borderRadius: '16px',
          padding: '40px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#1e3a8a', marginBottom: '10px' }}>
            Ready to Digitize Your Educational Campus?
          </h3>
          <p style={{ color: '#475569', fontSize: '0.98rem', maxWidth: '640px', margin: '0 auto 24px', lineHeight: '1.6' }}>
            Experience how ZenSkooll streamlines attendance, fee invoices, staff payroll, and examination dates in one click.
          </p>
          <Link
            to="/login"
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#0f172a',
              padding: '13px 34px',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.98rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)'
            }}
          >
            <span>Access ZenSkooll Portal</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
