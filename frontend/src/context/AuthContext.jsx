import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { getPortalData, defaultPortalSchools, defaultPortalUsers } from '../services/portalData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(false);
  const [demoAccounts, setDemoAccounts] = useState([]);

  useEffect(() => {
    
    api.getDemoAccounts()
      .then((data) => {
        if (data.success) {
          setDemoAccounts(data.demoAccounts);
        }
      })
      .catch((err) => console.warn('Could not load demo accounts:', err.message));
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    const cleanQuery = String(username || '').trim().toLowerCase();
    const cleanPass = String(password || '').trim();

    try {
      const data = await api.login(username, password);
      if (data && data.success && data.user) {
        const uRole = (data.user.role || '').toLowerCase();
        if (uRole !== 'superadmin') {
          if (data.user.status === 'Inactive' || data.user.status === 'Suspended') {
            setLoading(false);
            return {
              success: false,
              isDeactivated: true,
              message: `Account Deactivated: This administrator account (${data.user.name || data.user.username}) has been DEACTIVATED by Super Admin. Please contact Super Admin.`
            };
          }
        }
        if (uRole !== 'superadmin' && data.user.schoolId && data.user.schoolId !== 'ALL') {
          const store = getPortalData() || {};
          const allSchools = [...(store.schools || []), ...(defaultPortalSchools || [])];
          const sch = allSchools.find((s) => s.id === data.user.schoolId || s.schoolId === data.user.schoolId || s.code === data.user.schoolId);
          if (sch && sch.status !== 'Active') {
            setLoading(false);
            return {
              success: false,
              isDeactivated: true,
              message: `Campus Access Suspended: ${sch.name || data.user.schoolName || 'This school'} has been DEACTIVATED by the Central Super Administrator. All logins and operations are currently suspended.`
            };
          }
        }
        setUser(data.user);
        setToken(data.token || 'jwt_zen_' + Date.now());
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token || 'jwt_zen_' + Date.now());
        setLoading(false);
        return { success: true, user: data.user };
      }
    } catch (apiErr) {
      if (apiErr.message && (apiErr.message.includes('Suspended') || apiErr.message.includes('DEACTIVATED') || apiErr.message.includes('deactivated'))) {
        setLoading(false);
        return { success: false, isDeactivated: true, message: apiErr.message };
      }
      console.warn('Backend login unavailable or error, checking resilient local accounts:', apiErr.message);
    }

    try {
      const store = getPortalData() || {};
      const allUsers = [...(store.users || []), ...(defaultPortalUsers || [])];
      const allSchools = [...(store.schools || []), ...(defaultPortalSchools || [])];

      let matchedUser = allUsers.find((u) => {
        const uUname = (u.username || '').toLowerCase();
        const uEmail = (u.email || '').toLowerCase();
        const uName = (u.name || '').toLowerCase();
        const uId = (u.id || u.userId || '').toLowerCase();
        const hasAlias = Array.isArray(u.aliases) && u.aliases.some((a) => a.toLowerCase() === cleanQuery);
        return uUname === cleanQuery || uEmail === cleanQuery || uId === cleanQuery || uName === cleanQuery || hasAlias;
      });

      if (!matchedUser && store.teachers) {
        const tMatch = store.teachers.find((t) => {
          const tName = (t.name || '').toLowerCase();
          const tEmail = (t.email || '').toLowerCase();
          const tId = (t.id || '').toLowerCase();
          return tName === cleanQuery || tName.includes(cleanQuery) || tEmail === cleanQuery || tId === cleanQuery;
        });
        if (tMatch) {
          matchedUser = {
            id: tMatch.id || 'USR_TCH',
            userId: tMatch.id || 'USR_TCH',
            teacherId: tMatch.id,
            name: tMatch.name,
            email: tMatch.email || `${cleanQuery}@ssvschool.com`,
            username: tMatch.email ? tMatch.email.split('@')[0] : cleanQuery,
            role: 'teacher',
            class: tMatch.class,
            subject: tMatch.subject || tMatch.onboardSubject || 'General',
            schoolId: tMatch.schoolId || 'SCHOOL002',
            password: tMatch.password || 'teacher123',
            status: tMatch.status || 'Active'
          };
        }
      }

      if (!matchedUser && store.classes) {
        const clsMatch = store.classes.find((c) => c.teacher && c.teacher.toLowerCase().includes(cleanQuery));
        if (clsMatch) {
          matchedUser = {
            id: 'USR_DAVID',
            userId: 'USR_DAVID',
            name: clsMatch.teacher,
            email: `${cleanQuery}@ssvschool.com`,
            username: cleanQuery,
            role: 'teacher',
            class: clsMatch.name,
            subject: 'General',
            schoolId: 'SCHOOL002',
            password: 'teacher123',
            status: 'Active'
          };
        }
      }

      if (!matchedUser) {
        const school = allSchools.find((s) => {
          const sUname = (s.username || s.adminUsername || '').toLowerCase();
          const sEmail = (s.admin || s.email || '').toLowerCase();
          const fUname = (s.financeUsername || '').toLowerCase();
          const fEmail = (s.financeEmail || '').toLowerCase();
          const sCode = (s.code || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          return sUname === cleanQuery || sEmail === cleanQuery || fUname === cleanQuery || fEmail === cleanQuery || cleanQuery === `admin_${sCode.substring(0, 8)}` || cleanQuery === `finance_${sCode.substring(0, 8)}`;
        });

        if (school) {
          const isFin = cleanQuery.includes('finance') || cleanQuery === (school.financeEmail || '').toLowerCase() || cleanQuery === (school.financeUsername || '').toLowerCase();
          matchedUser = {
            userId: isFin ? `USR_${school.id}_FIN` : `USR_${school.id}_ADM`,
            username: cleanQuery,
            name: isFin ? `Finance Manager (${school.name})` : (school.adminName || `Admin ${school.name}`),
            email: isFin ? (school.financeEmail || `finance@${school.id}.edu`) : (school.admin || school.email || `admin@${school.id}.edu`),
            role: isFin ? 'finance' : 'schooladmin',
            schoolId: school.id,
            schoolName: school.name,
            password: isFin ? (school.financePassword || 'Finance@12345') : (school.adminPassword || school.password || 'Admin@12345'),
            status: school.status || 'Active',
          };
        }
      }

      if (!matchedUser) {
        if (cleanQuery === 'superadmin@zenschool.com' || cleanQuery === 'superadmin') {
          matchedUser = {
            userId: 'USR001',
            username: 'superadmin',
            name: 'Super Administrator',
            email: 'superadmin@zenschool.com',
            role: 'superadmin',
            schoolId: 'ALL',
            schoolName: 'Zenith Central Trust',
            password: 'SuperAdmin@123',
            status: 'Active',
            avatar: '',
          };
        } else if (cleanQuery === 'admin@ssvschool.com' || cleanQuery === 'admin_ssv') {
          matchedUser = {
            userId: 'USR002',
            username: 'admin_ssv',
            name: 'School Administrator (SSV)',
            email: 'admin@ssvschool.com',
            role: 'schooladmin',
            schoolId: 'SCHOOL002',
            schoolName: 'Sri Sankara Vidhyasala Girls High School',
            password: 'Admin@12345',
            status: 'Active',
            avatar: '',
          };
        } else if (cleanQuery === 'finance@ssvschool.com' || cleanQuery === 'finance_ssv') {
          matchedUser = {
            userId: 'USR005',
            username: 'finance_ssv',
            name: 'School Finance Manager (SSV)',
            email: 'finance@ssvschool.com',
            role: 'finance',
            schoolId: 'SCHOOL002',
            schoolName: 'Sri Sankara Vidhyasala Girls High School',
            password: 'Finance@12345',
            status: 'Active',
            avatar: '',
          };
        } else if (cleanQuery === 'principal@ssvschool.com' || cleanQuery === 'principal') {
          matchedUser = {
            userId: 'USR001_PRIN',
            username: 'principal',
            name: 'Dr. Savithri Raman',
            email: 'principal@ssvschool.com',
            role: 'principal',
            schoolId: 'SCHOOL002',
            schoolName: 'Sri Sankara Vidhyasala Girls High School',
            password: 'principal123',
            status: 'Active',
            avatar: '',
          };
        } else if (cleanQuery === 'teacher@ssvschool.com' || cleanQuery === 'teacher') {
          matchedUser = {
            userId: 'USR003_TEA',
            username: 'teacher',
            name: 'Mrs. Priya Krishnan',
            email: 'teacher@ssvschool.com',
            role: 'teacher',
            schoolId: 'SCHOOL002',
            schoolName: 'Sri Sankara Vidhyasala Girls High School',
            password: 'teacher123',
            status: 'Active',
            avatar: '',
          };
        } else if (cleanQuery === 'student@ssvschool.com' || cleanQuery === 'student') {
          matchedUser = {
            userId: 'USR005_STU',
            username: 'student',
            name: 'Aishwarya Kumar',
            email: 'student@ssvschool.com',
            role: 'student',
            schoolId: 'SCHOOL002',
            schoolName: 'Sri Sankara Vidhyasala Girls High School',
            password: 'student123',
            status: 'Active',
            avatar: '',
          };
        } else if (cleanQuery === 'parent@ssvschool.com' || cleanQuery === 'parent') {
          matchedUser = {
            userId: 'USR006_PAR',
            username: 'parent',
            name: 'Ramesh Kumar',
            email: 'parent@ssvschool.com',
            role: 'parent',
            schoolId: 'SCHOOL002',
            schoolName: 'Sri Sankara Vidhyasala Girls High School',
            password: 'parent123',
            status: 'Active',
            avatar: '',
          };
        }
      }

      if (matchedUser) {
        const userPass = String(matchedUser.password || '').trim();
        const role = (matchedUser.role || '').toLowerCase();
        let passMatches = (cleanPass === userPass);

        if (!passMatches) {
          const lowerPass = cleanPass.toLowerCase();
          if (role === 'superadmin' && (cleanPass === 'SuperAdmin@123' || lowerPass === 'superadmin123' || lowerPass === 'admin123')) passMatches = true;
          else if ((role === 'schooladmin' || role === 'school_admin') && (cleanPass === 'Admin@12345' || lowerPass === 'admin123' || lowerPass === 'admin@12345' || lowerPass === 'admin')) passMatches = true;
          else if (role === 'finance' && (cleanPass === 'Finance@12345' || lowerPass === 'finance123' || lowerPass === 'finance@12345' || lowerPass === 'finance')) passMatches = true;
          else if (role === 'principal' && (lowerPass === 'principal123' || cleanPass === 'Principal@123')) passMatches = true;
          else if (role === 'teacher' && (lowerPass === 'teacher123' || cleanPass === 'Teacher@123' || lowerPass === 'david123' || lowerPass === 'david')) passMatches = true;
          else if (role === 'student' && (lowerPass === 'student123' || cleanPass === 'Student@123')) passMatches = true;
          else if (role === 'parent' && (lowerPass === 'parent123' || cleanPass === 'Parent@123')) passMatches = true;
        }

        if (passMatches) {
          if (role !== 'superadmin') {
            if (matchedUser.status === 'Inactive' || matchedUser.status === 'Suspended') {
              setLoading(false);
              return {
                success: false,
                isDeactivated: true,
                message: `Account Deactivated: This administrator account (${matchedUser.name || matchedUser.username}) has been DEACTIVATED by Super Admin. Please contact Super Admin.`
              };
            }
          }

          const targetSchoolId = matchedUser.schoolId || 'SCHOOL002';
          if (role !== 'superadmin' && targetSchoolId && targetSchoolId !== 'ALL') {
            const sch = allSchools.find((s) => s.id === targetSchoolId || s.schoolId === targetSchoolId || s.code === targetSchoolId);
            if (sch && sch.status !== 'Active') {
              setLoading(false);
              return {
                success: false,
                isDeactivated: true,
                message: `Campus Access Suspended: ${sch.name || matchedUser.schoolName || 'This school'} has been DEACTIVATED by the Central Super Administrator. All logins and operations for this school are currently disabled.`
              };
            }
          }

          const uRole = (role || matchedUser.role || 'schooladmin').toLowerCase();
          let extraProps = {};
          if (uRole === 'student') {
            const stList = store.students || [];
            const stMatch = stList.find((s) =>
              (matchedUser.roll && s.roll === matchedUser.roll) ||
              (matchedUser.email && (s.studentEmail === matchedUser.email || s.email === matchedUser.email)) ||
              (matchedUser.name && s.name && s.name.toLowerCase() === matchedUser.name.toLowerCase()) ||
              (s.roll && cleanQuery && s.roll.toLowerCase() === cleanQuery)
            );
            if (stMatch) {
              extraProps = {
                roll: stMatch.roll,
                studentRoll: stMatch.roll,
                class: stMatch.class,
                parentName: stMatch.parentName,
                parentPhone: stMatch.parentPhone,
                emergencyContact: stMatch.emergencyContact
              };
            }
          } else if (uRole === 'teacher') {
            const tList = store.teachers || [];
            const tMatch = tList.find((t) =>
              (matchedUser.id && t.id === matchedUser.id) ||
              (matchedUser.email && t.email && t.email.toLowerCase() === matchedUser.email.toLowerCase()) ||
              (matchedUser.name && t.name && t.name.toLowerCase() === matchedUser.name.toLowerCase())
            );
            if (tMatch) {
              extraProps = {
                class: tMatch.class,
                subject: tMatch.subject,
                teacherId: tMatch.id
              };
            }
          } else if (uRole === 'parent') {
            const parList = store.parents || [];
            const parMatch = parList.find((p) =>
              (matchedUser.id && p.id === matchedUser.id) ||
              (matchedUser.email && p.email && p.email.toLowerCase() === matchedUser.email.toLowerCase()) ||
              (matchedUser.name && p.name && p.name.toLowerCase() === matchedUser.name.toLowerCase()) ||
              (matchedUser.phone && p.phone === matchedUser.phone)
            );
            if (parMatch) {
              extraProps = {
                studentRoll: parMatch.studentRoll,
                studentName: parMatch.studentName,
                relationship: parMatch.relationship
              };
            }
          } else if (uRole === 'principal') {
            const prList = store.principals || [];
            const prMatch = prList.find((pr) =>
              (matchedUser.id && pr.id === matchedUser.id) ||
              (matchedUser.email && pr.email && pr.email.toLowerCase() === matchedUser.email.toLowerCase()) ||
              (matchedUser.name && pr.name && pr.name.toLowerCase() === matchedUser.name.toLowerCase())
            );
            if (prMatch) {
              extraProps = {
                qualification: prMatch.qualification,
                experience: prMatch.experience
              };
            }
          }

          const safeUser = {
            ...matchedUser,
            ...extraProps,
            userId: matchedUser.userId || matchedUser.id || 'USR_' + Date.now(),
            username: matchedUser.username || cleanQuery,
            name: matchedUser.name || 'User',
            email: matchedUser.email || cleanQuery,
            phone: matchedUser.phone || '',
            role: uRole,
            schoolId: targetSchoolId,
            schoolName: matchedUser.schoolName || 'Sri Sankara Vidhyasala Girls High School',
            status: matchedUser.status || 'Active',
            avatar: matchedUser.avatar || '',
          };
          const localToken = 'jwt_zen_' + btoa(unescape(encodeURIComponent(JSON.stringify(safeUser))));
          setUser(safeUser);
          setToken(localToken);
          localStorage.setItem('user', JSON.stringify(safeUser));
          localStorage.setItem('token', localToken);
          setLoading(false);
          return { success: true, user: safeUser };
        }
      }
    } catch (localErr) {
      console.error('Local fallback auth error:', localErr);
    } finally {
      setLoading(false);
    }

    return { success: false, message: 'Invalid username/email or password.' };
  };

  const logout = () => {
    try {
      api.sendOffline();
      if (user) {
        const rawId = user.userId || user.id || (user.name ? `USR_${user.name.replace(/\s+/g, '')}` : '');
        const uname = (user.username || '').toLowerCase();
        const name = (user.name || '').trim().toLowerCase();
        const store = JSON.parse(localStorage.getItem('ssv_presence_map') || '{}');
        if (rawId) delete store[rawId];
        if (uname) delete store[uname];
        if (name) delete store[name];
        localStorage.setItem('ssv_presence_map', JSON.stringify(store));
      }
    } catch (e) {}
    setUser(null);
    setToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const switchUser = async (targetUsername) => {
    const foundDemo = demoAccounts.find((d) => d.username === targetUsername);
    if (foundDemo) {
      return await login(foundDemo.username, foundDemo.passwordHint);
    }
    return { success: false, message: 'Account not found' };
  };

  const impersonate = (targetUser) => {
    
    const originalAdmin = localStorage.getItem('originalAdmin') || JSON.stringify(user);
    localStorage.setItem('originalAdmin', originalAdmin);
    setUser(targetUser);
    localStorage.setItem('user', JSON.stringify(targetUser));
  };

  const exitImpersonation = () => {
    const original = localStorage.getItem('originalAdmin');
    if (original) {
      const parsed = JSON.parse(original);
      setUser(parsed);
      localStorage.setItem('user', original);
      localStorage.removeItem('originalAdmin');
      return true;
    }
    return false;
  };

  const isImpersonating = !!localStorage.getItem('originalAdmin');

  const updateCurrentUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, demoAccounts, login, logout, switchUser, impersonate, exitImpersonation, isImpersonating, updateCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
