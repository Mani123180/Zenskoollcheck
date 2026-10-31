import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { getPortalData } from '../services/portalData';

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

    let authoritativePassword = null;
    let matchedLocalUser = null;

    try {
      const store = getPortalData();
      if (store && store.users) {
        matchedLocalUser = store.users.find((u) => {
          const matchUname = u.username && String(u.username).trim().toLowerCase() === cleanQuery;
          const matchEmail = u.email && String(u.email).trim().toLowerCase() === cleanQuery;
          const matchId = (u.id && String(u.id).trim().toLowerCase() === cleanQuery) ||
                          (u.userId && String(u.userId).trim().toLowerCase() === cleanQuery);
          const matchAlias = Array.isArray(u.aliases) && u.aliases.some((a) => a.toLowerCase() === cleanQuery);
          return matchUname || matchEmail || matchId || matchAlias;
        });
        if (matchedLocalUser && matchedLocalUser.password) {
          authoritativePassword = String(matchedLocalUser.password).trim();
        }
      }

      if (store && store.schools) {
        const localSchool = store.schools.find((s) => {
          const sCode = (s.code || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          const sGenAdmin = `admin_${sCode.substring(0, 8)}`;
          const sGenFin = `finance_${sCode.substring(0, 8)}`;
          const sUname = (s.username || s.adminUsername || '').toLowerCase();
          const sEmail = (s.admin || s.email || '').toLowerCase();
          const fUname = (s.financeUsername || '').toLowerCase();
          const fEmail = (s.financeEmail || '').toLowerCase();

          return (
            sUname === cleanQuery ||
            sGenAdmin === cleanQuery ||
            sEmail === cleanQuery ||
            fUname === cleanQuery ||
            sGenFin === cleanQuery ||
            fEmail === cleanQuery ||
            (Array.isArray(s.aliases) && s.aliases.some((a) => a.toLowerCase() === cleanQuery))
          );
        });

        if (localSchool) {
          const sCode = (localSchool.code || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          const isFin =
            (localSchool.financeUsername && localSchool.financeUsername.toLowerCase() === cleanQuery) ||
            (localSchool.financeEmail && localSchool.financeEmail.toLowerCase() === cleanQuery) ||
            cleanQuery === `finance_${sCode.substring(0, 8)}` ||
            cleanQuery.includes('finance');

          const schoolAuthPass = isFin
            ? String(localSchool.financePassword || 'Finance@12345').trim()
            : String(localSchool.password || localSchool.adminPassword || 'Admin@12345').trim();

          if (!authoritativePassword) {
            authoritativePassword = schoolAuthPass;
          }

          if (!matchedLocalUser) {
            const adminEmail = localSchool.admin || localSchool.email || `admin@${sCode}.edu`;
            const finEmail = localSchool.financeEmail || `finance@${sCode}.edu`;
            matchedLocalUser = {
              userId: `USR_${localSchool.id}_${isFin ? 'FIN' : 'ADM'}`,
              username: cleanQuery,
              name: isFin ? `Finance Manager (${localSchool.name})` : (localSchool.adminName || `Admin ${localSchool.name}`),
              email: isFin ? finEmail : adminEmail,
              role: isFin ? 'finance' : 'schooladmin',
              schoolId: localSchool.id,
              schoolName: localSchool.name,
              password: schoolAuthPass,
              status: localSchool.status || 'Active',
            };
          }
        }
      }

      if (authoritativePassword !== null && cleanPass !== authoritativePassword) {
        setLoading(false);
        return { success: false, message: 'Invalid username/email or password.' };
      }
    } catch (checkErr) {
      console.warn('Local credential pre-check error:', checkErr);
    }

    if (matchedLocalUser && authoritativePassword && cleanPass === authoritativePassword) {
      if (api && typeof api.syncAuthUser === 'function') {
        try {
          await api.syncAuthUser(matchedLocalUser);
        } catch (syncErr) {
          console.warn('Background syncAuthUser warning:', syncErr);
        }
      }
    }

    try {
      const data = await api.login(username, password);
      if (data && data.success) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        setLoading(false);
        return { success: true, user: data.user };
      }
    } catch (apiErr) {
      console.warn('Backend login attempt returned error, trying local credentials:', apiErr);
    }

    try {
      if (matchedLocalUser && matchedLocalUser.password && String(matchedLocalUser.password).trim() === cleanPass) {
        const safeUser = {
          userId: matchedLocalUser.id || matchedLocalUser.userId || 'USR_' + Date.now(),
          username: matchedLocalUser.username,
          name: matchedLocalUser.name,
          email: matchedLocalUser.email,
          phone: matchedLocalUser.phone || '',
          role: (matchedLocalUser.role || 'schooladmin').toLowerCase(),
          schoolId: matchedLocalUser.schoolId,
          schoolName: matchedLocalUser.schoolName,
          status: matchedLocalUser.status || 'Active',
          avatar: matchedLocalUser.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        };
        const localToken = 'jwt_zen_' + btoa(unescape(encodeURIComponent(JSON.stringify(safeUser))));
        setUser(safeUser);
        setToken(localToken);
        localStorage.setItem('user', JSON.stringify(safeUser));
        localStorage.setItem('token', localToken);

        return { success: true, user: safeUser };
      }
    } catch (localErr) {
      console.error('Local fallback auth error:', localErr);
    } finally {
      setLoading(false);
    }

    return { success: false, message: 'Invalid username/email or password.' };
  };

  const logout = () => {
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

  return (
    <AuthContext.Provider value={{ user, token, loading, demoAccounts, login, logout, switchUser, impersonate, exitImpersonation, isImpersonating }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
