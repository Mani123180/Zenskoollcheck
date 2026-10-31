import React, { useState, useEffect } from 'react';

const getInitialWizardData = () => {
  return {
    schoolName: '',
    schoolCode: '',
    board: 'State Board',
    academicYear: '2026-2027',
    city: '',
    address: '',
    phone: '',
    email: '',
    principal: '',
    plan: 'Pro Plan',
    subdomain: '',
    adminName: '',
    adminEmail: '',
    adminUsername: '',
    adminPassword: 'Admin@12345',
    financeName: '',
    financeEmail: '',
    financeUsername: '',
    financePassword: 'Finance@12345',
  };
};

export default function NewSchoolWizardModal({ isOpen, onClose, onSchoolCreated }) {
  const [step, setStep] = useState(1);
  const [wizardData, setWizardData] = useState(getInitialWizardData);

  
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setWizardData(getInitialWizardData());
    }
  }, [isOpen]);

  const handleReset = () => {
    setStep(1);
    setWizardData(getInitialWizardData());
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  if (!isOpen) return null;

  const autoSuggestSchoolCode = (name) => {
    const words = name.trim().split(/\s+/).filter(Boolean);
    if (words.length > 0) {
      let acronym = words.map((w) => w[0].toUpperCase()).join('').substring(0, 4);
      if (words.length === 1 && words[0].length >= 3) {
        acronym = words[0].substring(0, 3).toUpperCase();
      }
      const city = wizardData.city.trim() || 'TN';
      const cityCode = city.substring(0, 3).toUpperCase();
      const cleanSub = acronym.toLowerCase();
      setWizardData((prev) => ({
        ...prev,
        schoolName: name,
        schoolCode: `${acronym}-${cityCode}`,
        subdomain: prev.subdomain || `${cleanSub}.zenschool.edu`,
      }));
    } else {
      setWizardData((prev) => ({ ...prev, schoolName: name }));
    }
  };

  const regenerateWizPass = () => {
    const code = (wizardData.schoolCode || 'Zen').trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    const rand = Math.floor(1000 + Math.random() * 9000);
    setWizardData((prev) => ({ ...prev, adminPassword: `${code || 'School'}@${rand}` }));
  };

  const regenerateFinPass = () => {
    const code = (wizardData.schoolCode || 'Zen').trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    const rand = Math.floor(1000 + Math.random() * 9000);
    setWizardData((prev) => ({ ...prev, financePassword: `Finance@${rand}` }));
  };

  const handleNext = (e, currentStep) => {
    e.preventDefault();
    if (currentStep === 1) {
      const cleanWord = wizardData.schoolName.split(' ')[0] || 'User';
      const cleanCode = (wizardData.schoolCode || 'school').toLowerCase().replace(/[^a-z0-9]/g, '');
      setWizardData((prev) => ({
        ...prev,
        subdomain: prev.subdomain || `${cleanCode.substring(0, 8)}.zenschool.edu`,
        adminName: prev.adminName || `Admin ${cleanWord}`,
        adminEmail: prev.adminEmail || `admin@${cleanCode}.edu`,
        adminUsername: prev.adminUsername || `admin_${cleanCode.substring(0, 6)}`,
        adminPassword: prev.adminPassword || 'Admin@12345',
        financeName: prev.financeName || `Finance Manager (${cleanWord})`,
        financeEmail: prev.financeEmail || `finance@${cleanCode}.edu`,
        financeUsername: prev.financeUsername || `finance_${cleanCode.substring(0, 6)}`,
        financePassword: prev.financePassword || 'Finance@12345',
      }));
      setStep(2);
    } else if (currentStep === 2) {
      setStep(3);
    } else if (currentStep === 3) {
      setStep(4);
    }
  };

  const handleFinalize = () => {
    const newSchool = {
      id: 'SCHOOL0' + Math.floor(10 + Math.random() * 90),
      name: wizardData.schoolName,
      code: wizardData.schoolCode,
      city: wizardData.city,
      phone: wizardData.phone,
      email: wizardData.email,
      principal: wizardData.principal,
      academicYear: wizardData.academicYear,
      admin: wizardData.adminEmail,
      adminName: wizardData.adminName,
      adminUsername: wizardData.adminUsername,
      adminPassword: wizardData.adminPassword,
      username: wizardData.adminUsername,
      password: wizardData.adminPassword,
      financeEmail: wizardData.financeEmail,
      financeName: wizardData.financeName,
      financeUsername: wizardData.financeUsername,
      financePassword: wizardData.financePassword,
      status: 'Active',
      studentsCount: 10,
      teachersCount: 5,
      parentsCount: 10,
      subscription: wizardData.plan || 'Pro Plan',
      subdomain: wizardData.subdomain || 'school.zenschool.edu',
      createdDate: new Date().toISOString().split('T')[0],
      address: wizardData.address,
      board: wizardData.board,
    };

    onSchoolCreated(newSchool);
    handleReset();
    onClose();
  };

  const progressPercent = ((step - 1) / 3) * 100;

  return (
    <div className="modal-overlay" style={{ display: 'flex' }}>
      <div className="modal-content wizard-modal-lg">
        <div className="modal-header">
          <h3 id="modal-title">Onboard New School Campus</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleReset}
              title="Reset form and start from Step 1"
              style={{ fontSize: '0.78rem', padding: '4px 10px', borderRadius: '4px' }}
            >
              ↻ Reset Form
            </button>
            <button className="modal-close" onClick={handleClose}>&times;</button>
          </div>
        </div>

        <div id="modal-body">
          
          <div className="wizard-stepper-wrap">
            <div className="wizard-progress-track">
              <div className="wizard-progress-bar" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div className="wizard-steps" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <div className={`wizard-step ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>
                <div className="step-circle">{step > 1 ? '✓' : '1'}</div>
                <div className="step-label">Basic Info</div>
              </div>
              <div className={`wizard-step ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
                <div className="step-circle">{step > 2 ? '✓' : '2'}</div>
                <div className="step-label">Plan Tier</div>
              </div>
              <div className={`wizard-step ${step === 3 ? 'active' : step > 3 ? 'completed' : ''}`}>
                <div className="step-circle">{step > 3 ? '✓' : '3'}</div>
                <div className="step-label">Admin Account</div>
              </div>
              <div className={`wizard-step ${step === 4 ? 'active' : ''}`}>
                <div className="step-circle">4</div>
                <div className="step-label">Domain & Launch</div>
              </div>
            </div>
          </div>

          
          {step === 1 && (
            <form onSubmit={(e) => handleNext(e, 1)}>
              <div className="wizard-form-box">
                <div className="wizard-header-strip">
                  <div className="wizard-header-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21h18"></path><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path><path d="M9 7h1"></path><path d="M14 7h1"></path><path d="M9 11h1"></path><path d="M14 11h1"></path><path d="M9 15h1"></path><path d="M14 15h1"></path>
                    </svg>
                  </div>
                  <div className="wizard-header-titles">
                    <h4>Step 1: School Identity & Campus Profile</h4>
                    <p>Configure the foundational details for the new multi-tenant school instance.</p>
                  </div>
                </div>

                <div className="wizard-grid-2">
                  <div className="wizard-field">
                    <label>School / Institution Name <span className="req">*</span></label>
                    <input
                      type="text"
                      value={wizardData.schoolName}
                      placeholder="e.g. ABC Matriculation Higher Secondary School"
                      required
                      onChange={(e) => autoSuggestSchoolCode(e.target.value)}
                    />
                  </div>
                  <div className="wizard-field">
                    <label>School Code (Unique ID) <span className="req">*</span></label>
                    <input
                      type="text"
                      value={wizardData.schoolCode}
                      placeholder="e.g. ABC-CHE"
                      required
                      style={{ textTransform: 'uppercase' }}
                      onChange={(e) => setWizardData({ ...wizardData, schoolCode: e.target.value.toUpperCase() })}
                    />
                  </div>

                  <div className="wizard-field">
                    <label>Board / Affiliation <span className="req">*</span></label>
                    <select
                      value={wizardData.board}
                      required
                      onChange={(e) => setWizardData({ ...wizardData, board: e.target.value })}
                    >
                      <option value="State Board">State Board (Tamil Nadu)</option>
                      <option value="Matriculation">Matriculation</option>
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                      <option value="International">International / IGCSE</option>
                    </select>
                  </div>
                  <div className="wizard-field">
                    <label>Academic Year <span className="req">*</span></label>
                    <input
                      type="text"
                      value={wizardData.academicYear}
                      required
                      onChange={(e) => setWizardData({ ...wizardData, academicYear: e.target.value })}
                    />
                  </div>

                  <div className="wizard-field">
                    <label>Official School Email <span className="req">*</span></label>
                    <input
                      type="email"
                      value={wizardData.email}
                      placeholder="contact@abcschool.edu.in"
                      required
                      onChange={(e) => setWizardData({ ...wizardData, email: e.target.value })}
                    />
                  </div>
                  <div className="wizard-field">
                    <label>Contact Phone <span className="req">*</span></label>
                    <input
                      type="text"
                      value={wizardData.phone}
                      placeholder="+91 98765 43210"
                      required
                      onChange={(e) => setWizardData({ ...wizardData, phone: e.target.value })}
                    />
                  </div>

                  <div className="wizard-field">
                    <label>Principal Full Name <span className="req">*</span></label>
                    <input
                      type="text"
                      value={wizardData.principal}
                      placeholder="e.g. Dr. K. Ramanathan"
                      required
                      onChange={(e) => setWizardData({ ...wizardData, principal: e.target.value })}
                    />
                  </div>
                  <div className="wizard-field">
                    <label>City / Campus Location <span className="req">*</span></label>
                    <input
                      type="text"
                      value={wizardData.city}
                      placeholder="e.g. Chennai, Coimbatore, Salem"
                      required
                      onChange={(e) => setWizardData({ ...wizardData, city: e.target.value })}
                    />
                  </div>

                  <div className="wizard-field span-2">
                    <label>Campus Physical Address</label>
                    <input
                      type="text"
                      value={wizardData.address}
                      placeholder="Street, Landmark, District, Pincode"
                      onChange={(e) => setWizardData({ ...wizardData, address: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="wizard-footer">
                <span className="step-count-text">Step 1 of 4: School Profile</span>
                <div className="wizard-footer-actions">
                  <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>Cancel</button>
                  <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '8px 22px' }}>Next: Plan Selection →</button>
                </div>
              </div>
            </form>
          )}

          
          {step === 2 && (
            <form onSubmit={(e) => handleNext(e, 2)}>
              <div className="wizard-form-box">
                <div className="wizard-header-strip">
                  <div className="wizard-header-icon" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                  </div>
                  <div className="wizard-header-titles">
                    <h4>Step 2: SaaS Plan & License Tier</h4>
                    <p>Select the subscription bundle that best fits this school's expected student capacity.</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
                  {[
                    { name: 'Basic Plan', cap: 'Up to 500 Students', price: '₹15,000/yr', desc: 'Attendance, Marks, Notices & Student Records' },
                    { name: 'Pro Plan', cap: 'Up to 1,500 Students', price: '₹35,000/yr', desc: 'Basic + Online Fee Portal, SMS Gateway, Assignments' },
                    { name: 'Enterprise Plan', cap: 'Up to 5,000 Students', price: '₹75,000/yr', desc: 'Pro + Custom Mobile App, GPS Tracking, Dedicated Support' },
                  ].map((p) => {
                    const isSelected = (wizardData.plan || 'Pro Plan') === p.name;
                    return (
                      <div
                        key={p.name}
                        onClick={() => setWizardData({ ...wizardData, plan: p.name })}
                        style={{
                          border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                          background: isSelected ? '#eff6ff' : '#ffffff',
                          borderRadius: '10px',
                          padding: '16px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h4 style={{ margin: 0, color: '#1e3a8a', fontSize: '1rem' }}>{p.name}</h4>
                          <input type="radio" checked={isSelected} readOnly />
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#047857', margin: '8px 0 4px' }}>{p.price}</div>
                        <div style={{ fontSize: '0.78rem', color: '#6366f1', fontWeight: 600 }}>{p.cap}</div>
                        <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '8px', lineHeight: 1.4 }}>{p.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="wizard-footer">
                <span className="step-count-text">Step 2 of 4: Plan Selection</span>
                <div className="wizard-footer-actions">
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setStep(1)}>← Back</button>
                  <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '8px 22px' }}>Next: Admin Account →</button>
                </div>
              </div>
            </form>
          )}

          
          {step === 3 && (
            <form onSubmit={(e) => handleNext(e, 3)}>
              <div className="wizard-form-box">
                <div className="wizard-header-strip">
                  <div className="wizard-header-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="wizard-header-titles">
                    <h4>Step 3: Administrative & Financial Manager Accounts</h4>
                    <p>Initialize distinct login credentials for both School Administrator and Finance Desk.</p>
                  </div>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '16px', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ fontWeight: 800, color: '#1e3a8a', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span></span> Primary School Administrator
                    </div>
                    <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>ROLE: SCHOOLADMIN</span>
                  </div>

                  <div className="wizard-grid-2">
                    <div className="wizard-field">
                      <label>Administrator Full Name <span className="req">*</span></label>
                      <input
                        type="text"
                        value={wizardData.adminName}
                        placeholder="e.g. Rajesh Kumar"
                        required
                        onChange={(e) => setWizardData({ ...wizardData, adminName: e.target.value })}
                      />
                    </div>
                    <div className="wizard-field">
                      <label>Admin Login Email <span className="req">*</span></label>
                      <input
                        type="email"
                        value={wizardData.adminEmail}
                        placeholder="e.g. admin@abcschool.com"
                        required
                        onChange={(e) => setWizardData({ ...wizardData, adminEmail: e.target.value })}
                      />
                    </div>

                    <div className="wizard-field">
                      <label>Portal Username <span className="req">*</span></label>
                      <input
                        type="text"
                        value={wizardData.adminUsername}
                        placeholder="e.g. admin_abc"
                        required
                        onChange={(e) => setWizardData({ ...wizardData, adminUsername: e.target.value })}
                      />
                    </div>
                    <div className="wizard-field">
                      <label>Admin Password <span className="req">*</span></label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={wizardData.adminPassword}
                          required
                          style={{ fontFamily: 'monospace' }}
                          onChange={(e) => setWizardData({ ...wizardData, adminPassword: e.target.value })}
                        />
                        <button type="button" className="btn btn-outline btn-sm" onClick={regenerateWizPass} style={{ whiteSpace: 'nowrap', padding: '0 12px' }}>
                          Generate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ background: '#fdfbf7', border: '1px solid #fde68a', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ fontWeight: 800, color: '#92400e', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span></span> Primary Finance Manager
                    </div>
                    <span className="badge badge-warning" style={{ fontSize: '0.72rem' }}>ROLE: FINANCE</span>
                  </div>

                  <div className="wizard-grid-2">
                    <div className="wizard-field">
                      <label>Finance Manager Full Name <span className="req">*</span></label>
                      <input
                        type="text"
                        value={wizardData.financeName}
                        placeholder="e.g. Anand Sharma"
                        required
                        onChange={(e) => setWizardData({ ...wizardData, financeName: e.target.value })}
                      />
                    </div>
                    <div className="wizard-field">
                      <label>Finance Login Email <span className="req">*</span></label>
                      <input
                        type="email"
                        value={wizardData.financeEmail}
                        placeholder="e.g. finance@abcschool.com"
                        required
                        onChange={(e) => setWizardData({ ...wizardData, financeEmail: e.target.value })}
                      />
                    </div>

                    <div className="wizard-field">
                      <label>Finance Username <span className="req">*</span></label>
                      <input
                        type="text"
                        value={wizardData.financeUsername}
                        placeholder="e.g. finance_abc"
                        required
                        onChange={(e) => setWizardData({ ...wizardData, financeUsername: e.target.value })}
                      />
                    </div>
                    <div className="wizard-field">
                      <label>Finance Password <span className="req">*</span></label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={wizardData.financePassword}
                          required
                          style={{ fontFamily: 'monospace' }}
                          onChange={(e) => setWizardData({ ...wizardData, financePassword: e.target.value })}
                        />
                        <button type="button" className="btn btn-outline btn-sm" onClick={regenerateFinPass} style={{ whiteSpace: 'nowrap', padding: '0 12px' }}>
                          Generate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="wizard-footer">
                <span className="step-count-text">Step 3 of 4: Admin & Finance Accounts</span>
                <div className="wizard-footer-actions">
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setStep(2)}>← Back</button>
                  <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '8px 22px' }}>Next: Subdomain & Review →</button>
                </div>
              </div>
            </form>
          )}

          
          {step === 4 && (
            <div>
              <div className="wizard-form-box">
                <div className="wizard-header-strip">
                  <div className="wizard-header-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                  </div>
                  <div className="wizard-header-titles">
                    <h4>Step 4: Domain Routing & Review Launch</h4>
                    <p>Verify sub-domain host and provision the new isolated multi-tenant environment.</p>
                  </div>
                </div>

                <div className="wizard-field span-2" style={{ marginBottom: '18px' }}>
                  <label>Dedicated School Subdomain / Custom Domain Routing <span className="req">*</span></label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="text"
                      value={wizardData.subdomain}
                      onChange={(e) => setWizardData({ ...wizardData, subdomain: e.target.value })}
                      required
                      style={{ fontWeight: 700, color: '#1e3a8a' }}
                    />
                    <span className="badge badge-success" style={{ whiteSpace: 'nowrap' }}>DNS Ready ✓</span>
                  </div>
                </div>

                <div className="review-grid">
                  <div className="review-card">
                    <div className="review-card-title">Campus Details</div>
                    <div className="review-row"><span className="review-label">School:</span><span className="review-value">{wizardData.schoolName}</span></div>
                    <div className="review-row"><span className="review-label">Code:</span><span className="review-value"><span className="badge badge-info">{wizardData.schoolCode}</span></span></div>
                    <div className="review-row"><span className="review-label">Affiliation:</span><span className="review-value">{wizardData.board}</span></div>
                    <div className="review-row"><span className="review-label">City:</span><span className="review-value">{wizardData.city || 'Tamil Nadu'}</span></div>
                  </div>

                  <div className="review-card">
                    <div className="review-card-title"> School Administrator</div>
                    <div className="review-row"><span className="review-label">Admin Name:</span><span className="review-value">{wizardData.adminName}</span></div>
                    <div className="review-row"><span className="review-label">Login ID / Username:</span><span className="review-value"><code>{wizardData.adminUsername || `admin_${(wizardData.schoolCode || 'school').toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 6)}`}</code></span></div>
                    <div className="review-row"><span className="review-label">Password:</span><span className="review-value"><code style={{ color: '#047857', fontWeight: 800 }}>{wizardData.adminPassword}</code></span></div>
                    <div className="review-row"><span className="review-label">Email:</span><span className="review-value">{wizardData.adminEmail}</span></div>
                    <div className="review-row"><span className="review-label">Plan Tier:</span><span className="review-value"><span className="badge badge-primary">{wizardData.plan}</span></span></div>
                  </div>

                  <div className="review-card span-2" style={{ background: '#fdfbf7', border: '1px solid #fde68a' }}>
                    <div className="review-card-title" style={{ color: '#92400e' }}> Finance Manager</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                      <div className="review-row"><span className="review-label">Finance Name:</span><span className="review-value">{wizardData.financeName}</span></div>
                      <div className="review-row"><span className="review-label">Login ID / Username:</span><span className="review-value"><code>{wizardData.financeUsername || `finance_${(wizardData.schoolCode || 'school').toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 6)}`}</code></span></div>
                      <div className="review-row"><span className="review-label">Password:</span><span className="review-value"><code style={{ color: '#b45309', fontWeight: 800 }}>{wizardData.financePassword}</code></span></div>
                      <div className="review-row"><span className="review-label">Email:</span><span className="review-value">{wizardData.financeEmail}</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="wizard-footer">
                <span className="step-count-text">Step 4 of 4: Provision & Launch</span>
                <div className="wizard-footer-actions">
                  <button type="button" className="btn btn-outline btn-sm" onClick={handleReset} style={{ color: '#64748b' }}>↻ Reset Form</button>
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setStep(3)}>← Back</button>
                  <button type="button" className="btn btn-primary btn-sm" style={{ padding: '9px 24px', fontWeight: 700 }} onClick={handleFinalize}>
                    Provision School & Launch ✓
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
