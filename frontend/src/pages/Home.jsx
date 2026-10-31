import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const highlights = [
    { title: 'Academic Timetables', desc: 'Interactive period scheduling with auto-matching faculty and room allocation.', icon: '' },
    { title: 'Batch Examination Dates', desc: 'Schedule 5+ subjects in one table format and publish dates directly to students and parents.', icon: '' },
    { title: 'Student Fee & Billing', desc: 'Transparent fee collections, automated receipts, due tracking, and ledger records.', icon: '' },
    { title: 'Faculty & Staff Payroll', desc: 'Complete teaching and non-teaching salary calculations with allowance breakdowns.', icon: '' },
    { title: 'Live Parent Updates', desc: 'Parents receive immediate updates on attendance, exam schedules, and term results.', icon: '' },
    { title: 'Secure Multi-Role Portals', desc: 'Independent dashboard access for Super Admin, School Admin, Principals, Teachers, Students & Parents.', icon: '' }
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
          <span
            style={{
              background: 'rgba(245, 158, 11, 0.15)',
              color: '#fbbf24',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              padding: '8px 22px',
              borderRadius: '30px',
              fontWeight: 800,
              fontSize: '0.85rem',
              letterSpacing: '0.6px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.15)'
            }}
          >
            <span></span> ALL-IN-ONE SMART ZENSKOOLL MANAGEMENT SYSTEM
          </span>

          <h1
            style={{
              fontSize: '3.2rem',
              fontWeight: 900,
              color: '#ffffff',
              margin: '26px 0 18px',
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

      
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px 70px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a' }}>Why Institutions Choose ZenSkooll</h2>
          <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '6px' }}>Built from the ground up for streamlined Indian school workflows</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {highlights.map((h, i) => (
            <div key={i} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{h.icon}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>{h.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>{h.desc}</p>
            </div>
          ))}
        </div>

        
        <div style={{ marginTop: '60px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '36px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>Full Feature Suite</h4>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '12px' }}>See detailed comparison matrix across Basic, Standard & Premium.</p>
            <Link to="/features" style={{ color: '#d97706', fontWeight: 700, fontSize: '0.9rem' }}>View All Features &rarr;</Link>
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>Transparent Pricing</h4>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '12px' }}>Clear monthly plans tailored to your active student count.</p>
            <Link to="/pricing" style={{ color: '#d97706', fontWeight: 700, fontSize: '0.9rem' }}>Check Pricing Plans &rarr;</Link>
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>About Our Mission</h4>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '12px' }}>Learn more about our educational technology vision and team.</p>
            <Link to="/about" style={{ color: '#d97706', fontWeight: 700, fontSize: '0.9rem' }}>About Us &rarr;</Link>
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>Contact & Demos</h4>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '12px' }}>Get in touch with our team for personalized campus onboarding.</p>
            <Link to="/contact" style={{ color: '#d97706', fontWeight: 700, fontSize: '0.9rem' }}>Contact Us &rarr;</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
