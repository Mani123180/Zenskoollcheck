import React, { useState, useEffect } from 'react';
import { getPortalData, savePortalData } from '../../services/portalData';
import { useAuth } from '../../context/AuthContext';
import SuperAdminSecurityView from './SuperAdminSecurityView';

export default function SuperAdminSettingsView({ initialSection = 'platform' }) {
  const { user, updateCurrentUser } = useAuth();
  const [activeSection, setActiveSection] = useState(initialSection);
  const [toast, setToast] = useState(null);

  // 1. Platform Settings state
  const [platform, setPlatform] = useState({
    platformName: 'ZenSkooll Multi-School ERP Platform',
    contactEmail: 'superadmin@zenschool.com',
    supportPhone: '+91 98401 11001',
    currency: 'INR (₹)',
    academicYear: '2026 - 2027',
    maintenanceMode: 'Disabled',
    backupFrequency: 'Daily',
    timezone: 'Asia/Kolkata (IST +5:30)',
  });

  // 2. Roles & Permissions state
  const [rolePolicy, setRolePolicy] = useState({
    allowSchoolAdminCreateStaff: true,
    allowTeacherPostAnnouncements: true,
    allowStudentDownloadMaterials: true,
    allowParentChatTeachers: true,
    allowFinanceManageExpenses: true,
    minPasswordLength: 8,
    requireSpecialChar: true,
    sessionTimeout: 60,
  });

  // 3. Notification Settings state
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsAlerts: true,
    inAppSoundAlerts: true,
    dailyDigest: false,
    systemAlertEmail: 'superadmin@zenschool.com',
  });

  // 4. Profile state
  const [profile, setProfile] = useState({
    name: user?.name || 'Super Administrator',
    username: user?.username || 'superadmin',
    email: user?.email || 'superadmin@zenschool.com',
    phone: user?.phone || '+91 98401 11001',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [saving, setSaving] = useState(false);

  // Load existing settings on mount
  useEffect(() => {
    try {
      const store = getPortalData();
      if (store) {
        if (store.platformSettings) {
          setPlatform((prev) => ({ ...prev, ...store.platformSettings }));
        }
        if (store.rolePolicySettings) {
          setRolePolicy((prev) => ({ ...prev, ...store.rolePolicySettings }));
        }
        if (store.notificationSettings) {
          setNotifications((prev) => ({ ...prev, ...store.notificationSettings }));
        }
        if (user) {
          setProfile((prev) => ({
            ...prev,
            name: user.name || prev.name,
            username: user.username || prev.username,
            email: user.email || prev.email,
            phone: user.phone || prev.phone,
            avatar: user.avatar || prev.avatar,
          }));
        }
      }
    } catch (err) {
      console.warn('Could not load settings:', err);
    }
  }, [user]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // 1. Save Platform Settings
  const handleSavePlatform = (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const store = getPortalData() || {};
      store.platformSettings = { ...platform };
      savePortalData(store);
      showToast('Platform Configuration saved successfully!');
    } catch (err) {
      showToast('Failed to save platform configuration', 'error');
    } finally {
      setSaving(false);
    }
  };

  // 2. Save Roles & Permissions
  const handleSaveRoles = (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const store = getPortalData() || {};
      store.rolePolicySettings = { ...rolePolicy };
      savePortalData(store);
      showToast('Roles & Permissions policy updated successfully!');
    } catch (err) {
      showToast('Failed to update role policy', 'error');
    } finally {
      setSaving(false);
    }
  };

  // 3. Save Notifications
  const handleSaveNotifications = (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const store = getPortalData() || {};
      store.notificationSettings = { ...notifications };
      savePortalData(store);
      showToast('Notification preferences saved successfully!');
    } catch (err) {
      showToast('Failed to save notifications', 'error');
    } finally {
      setSaving(false);
    }
  };

  // 4. Save Profile & Credentials
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSaving(true);

    // If attempting password change, validate
    if (profile.newPassword || profile.confirmPassword || profile.currentPassword) {
      if (!profile.currentPassword) {
        showToast('Please enter your Current Password to set a new password', 'error');
        setSaving(false);
        return;
      }
      if (profile.newPassword !== profile.confirmPassword) {
        showToast('New Password and Confirmation do not match', 'error');
        setSaving(false);
        return;
      }
      if (profile.newPassword.length < (rolePolicy.minPasswordLength || 6)) {
        showToast(`New Password must be at least ${rolePolicy.minPasswordLength || 6} characters`, 'error');
        setSaving(false);
        return;
      }
    }

    try {
      const store = getPortalData() || {};
      const users = store.users || [];
      const saIndex = users.findIndex(
        (u) => (u.role || '').toLowerCase() === 'superadmin' || u.id === 'USR001' || u.username === 'superadmin'
      );

      const updatedUser = {
        ...(user || {}),
        name: profile.name.trim(),
        email: profile.email.trim(),
        phone: profile.phone.trim(),
        avatar: profile.avatar.trim(),
      };

      if (profile.newPassword) {
        updatedUser.password = profile.newPassword;
      }

      if (saIndex !== -1) {
        users[saIndex] = { ...users[saIndex], ...updatedUser };
        store.users = users;
        savePortalData(store);
      }

      if (typeof updateCurrentUser === 'function') {
        updateCurrentUser(updatedUser);
      }

      setProfile((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));

      showToast('Super Admin Profile & Credentials updated successfully!');
    } catch (err) {
      showToast('Failed to update profile: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 9999,
            padding: '12px 20px',
            borderRadius: '8px',
            color: '#fff',
            backgroundColor: toast.type === 'error' ? '#ef4444' : '#16a34a',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.9rem',
            fontWeight: 600,
            animation: 'fadeIn 0.2s ease-in-out',
          }}
        >
          <span>{toast.type === 'error' ? '⚠️' : '✓'}</span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Settings Navigation Tabs */}
      <div className="sa-schools-header-bar" style={{ marginBottom: '20px' }}>
        <div className="sa-filter-segment" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`sa-filter-tab ${activeSection === 'platform' ? 'active' : ''}`}
            onClick={() => setActiveSection('platform')}
          >
            Platform Settings
          </button>
          <button
            type="button"
            className={`sa-filter-tab ${activeSection === 'roles' ? 'active' : ''}`}
            onClick={() => setActiveSection('roles')}
          >
            Roles & Permissions
          </button>
          <button
            type="button"
            className={`sa-filter-tab ${activeSection === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveSection('notifications')}
          >
            Notifications
          </button>
          <button
            type="button"
            className={`sa-filter-tab ${activeSection === 'security' ? 'active' : ''}`}
            onClick={() => setActiveSection('security')}
          >
            High Security
          </button>
          <button
            type="button"
            className={`sa-filter-tab ${activeSection === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveSection('profile')}
          >
            Profile & Account
          </button>
        </div>
      </div>

      {/* SECTION 1: High Security View */}
      {activeSection === 'security' && (
        <div style={{ marginTop: '16px' }}>
          <SuperAdminSecurityView />
        </div>
      )}

      {/* SECTION 2: Platform Settings */}
      {activeSection === 'platform' && (
        <div id="settings-content-pane" style={{ maxWidth: '820px', marginTop: '15px' }}>
          <div className="wizard-form-box" style={{ background: '#ffffff', borderRadius: '12px', padding: '26px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(30, 58, 138, 0.08)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-primary)' }}>ZenSkooll Platform Configuration</h4>
                <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: '#64748b' }}>Global multi-campus parameters, institutional branding, support channels, and platform operation mode.</p>
              </div>
            </div>

            <form onSubmit={handleSavePlatform}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Platform Name <span style={{ color: '#ef4444' }}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    value={platform.platformName}
                    onChange={(e) => setPlatform({ ...platform, platformName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Super Admin Contact Email <span style={{ color: '#ef4444' }}>*</span></label>
                  <input
                    type="email"
                    className="form-control"
                    value={platform.contactEmail}
                    onChange={(e) => setPlatform({ ...platform, contactEmail: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Support Contact Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={platform.supportPhone}
                    onChange={(e) => setPlatform({ ...platform, supportPhone: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Default Currency <span style={{ color: '#ef4444' }}>*</span></label>
                  <select
                    className="form-control"
                    value={platform.currency}
                    onChange={(e) => setPlatform({ ...platform, currency: e.target.value })}
                  >
                    <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                    <option value="USD ($)">USD ($) - US Dollar</option>
                    <option value="EUR (€)">EUR (€) - Euro</option>
                    <option value="GBP (£)">GBP (£) - British Pound</option>
                    <option value="AED (د.إ)">AED (د.إ) - UAE Dirham</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Academic Year Session</label>
                  <select
                    className="form-control"
                    value={platform.academicYear}
                    onChange={(e) => setPlatform({ ...platform, academicYear: e.target.value })}
                  >
                    <option value="2025 - 2026">2025 - 2026</option>
                    <option value="2026 - 2027">2026 - 2027 (Active)</option>
                    <option value="2027 - 2028">2027 - 2028 (Upcoming)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Platform Maintenance Mode</label>
                  <select
                    className="form-control"
                    value={platform.maintenanceMode}
                    onChange={(e) => setPlatform({ ...platform, maintenanceMode: e.target.value })}
                  >
                    <option value="Disabled">Disabled (Platform Online & Accessible)</option>
                    <option value="Enabled">Enabled (Maintenance Mode - Restricted)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Auto-Backup Frequency</label>
                  <select
                    className="form-control"
                    value={platform.backupFrequency}
                    onChange={(e) => setPlatform({ ...platform, backupFrequency: e.target.value })}
                  >
                    <option value="Daily">Daily Automated Snapshot</option>
                    <option value="Weekly">Weekly Backup</option>
                    <option value="Monthly">Monthly Archive</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>System Timezone</label>
                  <select
                    className="form-control"
                    value={platform.timezone}
                    onChange={(e) => setPlatform({ ...platform, timezone: e.target.value })}
                  >
                    <option value="Asia/Kolkata (IST +5:30)">Asia/Kolkata (IST +5:30)</option>
                    <option value="UTC">UTC (Coordinated Universal Time)</option>
                    <option value="Asia/Dubai (GST +4:00)">Asia/Dubai (GST +4:00)</option>
                    <option value="America/New_York (EST -5:00)">America/New_York (EST -5:00)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                <button type="submit" disabled={saving} className="btn btn-primary" style={{ padding: '9px 24px', fontSize: '0.88rem' }}>
                  {saving ? 'Saving...' : 'Save Platform Settings ✓'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SECTION 3: Roles & Permissions */}
      {activeSection === 'roles' && (
        <div id="settings-content-pane" style={{ maxWidth: '820px', marginTop: '15px' }}>
          <div className="wizard-form-box" style={{ background: '#ffffff', borderRadius: '12px', padding: '26px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(22, 163, 74, 0.1)', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-primary)' }}>Roles & Permissions Policy</h4>
                <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: '#64748b' }}>Configure functional capabilities, staff autonomy flags, password strength rules, and session timeout.</p>
              </div>
            </div>

            <form onSubmit={handleSaveRoles}>
              <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>Role Feature Permissions</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.86rem', color: '#334155' }}>
                  <input
                    type="checkbox"
                    checked={rolePolicy.allowSchoolAdminCreateStaff}
                    onChange={(e) => setRolePolicy({ ...rolePolicy, allowSchoolAdminCreateStaff: e.target.checked })}
                    style={{ width: '17px', height: '17px', cursor: 'pointer' }}
                  />
                  <span><strong>School Admins:</strong> Allow adding, editing, and managing campus Faculty & Staff</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.86rem', color: '#334155' }}>
                  <input
                    type="checkbox"
                    checked={rolePolicy.allowTeacherPostAnnouncements}
                    onChange={(e) => setRolePolicy({ ...rolePolicy, allowTeacherPostAnnouncements: e.target.checked })}
                    style={{ width: '17px', height: '17px', cursor: 'pointer' }}
                  />
                  <span><strong>Teachers:</strong> Allow posting homework alerts and general announcements to students</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.86rem', color: '#334155' }}>
                  <input
                    type="checkbox"
                    checked={rolePolicy.allowStudentDownloadMaterials}
                    onChange={(e) => setRolePolicy({ ...rolePolicy, allowStudentDownloadMaterials: e.target.checked })}
                    style={{ width: '17px', height: '17px', cursor: 'pointer' }}
                  />
                  <span><strong>Students:</strong> Allow direct download of syllabus, question papers & study materials PDF</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.86rem', color: '#334155' }}>
                  <input
                    type="checkbox"
                    checked={rolePolicy.allowParentChatTeachers}
                    onChange={(e) => setRolePolicy({ ...rolePolicy, allowParentChatTeachers: e.target.checked })}
                    style={{ width: '17px', height: '17px', cursor: 'pointer' }}
                  />
                  <span><strong>Parents:</strong> Allow direct messaging and academic communication with class faculty</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.86rem', color: '#334155' }}>
                  <input
                    type="checkbox"
                    checked={rolePolicy.allowFinanceManageExpenses}
                    onChange={(e) => setRolePolicy({ ...rolePolicy, allowFinanceManageExpenses: e.target.checked })}
                    style={{ width: '17px', height: '17px', cursor: 'pointer' }}
                  />
                  <span><strong>Finance Managers:</strong> Allow creating and managing campus operational expense records</span>
                </label>
              </div>

              <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>Authentication & Session Policy</h5>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Min Password Length</label>
                  <select
                    className="form-control"
                    value={rolePolicy.minPasswordLength}
                    onChange={(e) => setRolePolicy({ ...rolePolicy, minPasswordLength: Number(e.target.value) })}
                  >
                    <option value={6}>6 Characters</option>
                    <option value={8}>8 Characters (Recommended)</option>
                    <option value={10}>10 Characters (High Security)</option>
                    <option value={12}>12 Characters (Enterprise)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Special Characters & Numbers</label>
                  <select
                    className="form-control"
                    value={rolePolicy.requireSpecialChar ? 'Yes' : 'No'}
                    onChange={(e) => setRolePolicy({ ...rolePolicy, requireSpecialChar: e.target.value === 'Yes' })}
                  >
                    <option value="Yes">Enforced (@, #, $, 0-9)</option>
                    <option value="No">Optional</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Session Idle Timeout</label>
                  <select
                    className="form-control"
                    value={rolePolicy.sessionTimeout}
                    onChange={(e) => setRolePolicy({ ...rolePolicy, sessionTimeout: Number(e.target.value) })}
                  >
                    <option value={15}>15 Minutes</option>
                    <option value={30}>30 Minutes</option>
                    <option value={60}>60 Minutes (Default)</option>
                    <option value={120}>120 Minutes (Extended)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                <button type="submit" disabled={saving} className="btn btn-primary" style={{ padding: '9px 24px', fontSize: '0.88rem' }}>
                  {saving ? 'Saving...' : 'Update Roles Policy ✓'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SECTION 4: Notifications */}
      {activeSection === 'notifications' && (
        <div id="settings-content-pane" style={{ maxWidth: '820px', marginTop: '15px' }}>
          <div className="wizard-form-box" style={{ background: '#ffffff', borderRadius: '12px', padding: '26px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(234, 179, 8, 0.12)', color: '#ca8a04', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-primary)' }}>Notification Channels & Alerts</h4>
                <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: '#64748b' }}>Manage email dispatch, parent SMS gateways, real-time message sounds, and system alerts.</p>
              </div>
            </div>

            <form onSubmit={handleSaveNotifications}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: '#f8fafc', padding: '18px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: '0.88rem', color: '#1e293b' }}>
                  <div>
                    <strong>System Email Notifications</strong>
                    <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '2px' }}>Send billing receipts, invoice updates, and credentials dispatch emails</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.emailNotifications}
                    onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                </label>

                <div style={{ borderTop: '1px solid #e2e8f0' }}></div>

                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: '0.88rem', color: '#1e293b' }}>
                  <div>
                    <strong>SMS Gateway Notifications</strong>
                    <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '2px' }}>Send automated SMS alerts to parents for student absenteeism or emergency notices</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.smsAlerts}
                    onChange={(e) => setNotifications({ ...notifications, smsAlerts: e.target.checked })}
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                </label>

                <div style={{ borderTop: '1px solid #e2e8f0' }}></div>

                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: '0.88rem', color: '#1e293b' }}>
                  <div>
                    <strong>In-App Sound Alerts</strong>
                    <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '2px' }}>Play chime sound when new chat message or live announcement is received</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.inAppSoundAlerts}
                    onChange={(e) => setNotifications({ ...notifications, inAppSoundAlerts: e.target.checked })}
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                </label>

                <div style={{ borderTop: '1px solid #e2e8f0' }}></div>

                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: '0.88rem', color: '#1e293b' }}>
                  <div>
                    <strong>Daily Morning Executive Digest</strong>
                    <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '2px' }}>Receive daily 08:00 AM summary of fee collections, campus attendance, and active tickets</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.dailyDigest}
                    onChange={(e) => setNotifications({ ...notifications, dailyDigest: e.target.checked })}
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                </label>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>System Alert Recipient Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={notifications.systemAlertEmail}
                  onChange={(e) => setNotifications({ ...notifications, systemAlertEmail: e.target.value })}
                  style={{ maxWidth: '420px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                <button type="submit" disabled={saving} className="btn btn-primary" style={{ padding: '9px 24px', fontSize: '0.88rem' }}>
                  {saving ? 'Saving...' : 'Save Notification Preferences ✓'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SECTION 5: Profile & Account Credentials */}
      {activeSection === 'profile' && (
        <div id="settings-content-pane" style={{ maxWidth: '820px', marginTop: '15px' }}>
          <div className="wizard-form-box" style={{ background: '#ffffff', borderRadius: '12px', padding: '26px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
              <img
                src={profile.avatar}
                alt={profile.name}
                style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-primary)' }}
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'; }}
              />
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-primary)' }}>Super Administrator Profile</h4>
                <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: '#64748b' }}>Manage your display identity, contact email, and security password.</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile}>
              <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>Personal Information</h5>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Display Name <span style={{ color: '#ef4444' }}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile.username}
                    readOnly
                    style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed', color: '#64748b' }}
                    title="Username cannot be altered"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Email Address <span style={{ color: '#ef4444' }}>*</span></label>
                  <input
                    type="email"
                    className="form-control"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Contact Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Avatar Image URL</label>
                  <input
                    type="url"
                    className="form-control"
                    value={profile.avatar}
                    onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', marginBottom: '12px', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
                Change Password (Leave blank to keep current)
              </h5>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Current Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Current Password"
                    value={profile.currentPassword}
                    onChange={(e) => setProfile({ ...profile, currentPassword: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    value={profile.newPassword}
                    onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm New Password"
                    value={profile.confirmPassword}
                    onChange={(e) => setProfile({ ...profile, confirmPassword: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                <button type="submit" disabled={saving} className="btn btn-primary" style={{ padding: '9px 24px', fontSize: '0.88rem' }}>
                  {saving ? 'Updating...' : 'Save Profile Changes ✓'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

