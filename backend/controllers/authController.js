const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { initialUsers } = require('../seed/seedData');
const { getDBStatus } = require('../config/db');

const realPortalUsers = [
  {
    userId: 'USR001',
    username: 'superadmin',
    email: 'superadmin@zenschool.com',
    password: 'SuperAdmin@123',
    name: 'Super Administrator',
    role: 'superadmin',
    schoolId: 'ALL',
    schoolName: 'Zenith Central Trust',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    aliases: ['superadmin', 'superadmin@zenschool.com'],
  },
  {
    userId: 'USR002',
    username: 'admin_ssv',
    email: 'admin@ssvschool.com',
    password: 'Admin@12345',
    name: 'School Administrator (SSV)',
    role: 'schooladmin',
    schoolId: 'SCHOOL002',
    schoolName: 'Sri Sankara Vidhyasala Girls High School',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    aliases: ['admin_ssv', 'admin_ssvkod', 'admin@ssvschool.com'],
  },
  {
    userId: 'USR005',
    username: 'finance_ssv',
    email: 'finance@ssvschool.com',
    password: 'Finance@12345',
    name: 'School Finance Manager (SSV)',
    role: 'finance',
    schoolId: 'SCHOOL002',
    schoolName: 'Sri Sankara Vidhyasala Girls High School',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80',
    aliases: ['finance_ssv', 'finance_ssvkod', 'finance@ssvschool.com'],
  },
  {
    userId: 'USR_ABC_ADM',
    username: 'admin_abcche',
    email: 'admin@abcschool.com',
    password: 'Admin@12345',
    name: 'Admin Rajesh (ABC School)',
    role: 'schooladmin',
    schoolId: 'SCHOOL001',
    schoolName: 'ABC Matriculation School',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    aliases: ['admin_abcche', 'admin_abc', 'admin@abcschool.com'],
  },
  {
    userId: 'USR_ABC_FIN',
    username: 'finance_abcche',
    email: 'finance@abcschool.com',
    password: 'Finance@12345',
    name: 'Finance Manager (ABC School)',
    role: 'finance',
    schoolId: 'SCHOOL001',
    schoolName: 'ABC Matriculation School',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80',
    aliases: ['finance_abcche', 'finance_abc', 'finance@abcschool.com'],
  },
  {
    userId: 'USR_STM_ADM',
    username: 'admin_stmerd',
    email: 'admin@stmarys.com',
    password: 'Admin@12345',
    name: 'Admin Joseph (St. Marys)',
    role: 'schooladmin',
    schoolId: 'SCHOOL003',
    schoolName: 'St. Marys Academy',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    aliases: ['admin_stmerd', 'admin_stm', 'admin@stmarys.com'],
  },
  {
    userId: 'USR_STM_FIN',
    username: 'finance_stmerd',
    email: 'finance@stmerd.edu',
    password: 'Finance@12345',
    name: 'Finance Manager (St. Marys)',
    role: 'finance',
    schoolId: 'SCHOOL003',
    schoolName: 'St. Marys Academy',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80',
    aliases: ['finance_stmerd', 'finance_stm', 'finance@stmerd.edu'],
  },
  {
    userId: 'USR_DPW_ADM',
    username: 'admin_dpwcbe',
    email: 'admin@dpwschool.edu',
    password: 'Admin@12345',
    name: 'Admin Anitha (DPW School)',
    role: 'schooladmin',
    schoolId: 'SCHOOL004',
    schoolName: 'Delhi Public World School',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    aliases: ['admin_dpwcbe', 'admin_dpw', 'admin@dpwschool.edu'],
  },
  {
    userId: 'USR_DPW_FIN',
    username: 'finance_dpwcbe',
    email: 'finance@dpwschool.edu',
    password: 'Finance@12345',
    name: 'Finance Manager (DPW School)',
    role: 'finance',
    schoolId: 'SCHOOL004',
    schoolName: 'Delhi Public World School',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80',
    aliases: ['finance_dpwcbe', 'finance_dpw', 'finance@dpwschool.edu'],
  },
  {
    userId: 'USR_OXF_ADM',
    username: 'admin_oxfchn',
    email: 'admin@oxford.edu',
    password: 'Admin@12345',
    name: 'Admin Vikram (Oxford)',
    role: 'schooladmin',
    schoolId: 'SCHOOL005',
    schoolName: 'Oxford International Academy',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    aliases: ['admin_oxfchn', 'admin_oxf', 'admin@oxford.edu'],
  },
  {
    userId: 'USR_OXF_FIN',
    username: 'finance_oxfchn',
    email: 'finance@oxford.edu',
    password: 'Finance@12345',
    name: 'Finance Manager (Oxford)',
    role: 'finance',
    schoolId: 'SCHOOL005',
    schoolName: 'Oxford International Academy',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80',
    aliases: ['finance_oxfchn', 'finance_oxf', 'finance@oxford.edu'],
  },
  {
    userId: 'USR003',
    username: 'principal',
    email: 'principal@ssvschool.com',
    password: 'principal123',
    name: 'Dr. Savithri Raman',
    role: 'principal',
    schoolId: 'SCHOOL002',
    schoolName: 'Sri Sankara Vidhyasala Girls High School',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
  },
  {
    userId: 'USR004',
    username: 'teacher',
    email: 'teacher@ssvschool.com',
    password: 'teacher123',
    name: 'Mrs. Priya Krishnan',
    role: 'teacher',
    schoolId: 'SCHOOL002',
    schoolName: 'Sri Sankara Vidhyasala Girls High School',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
  },
  {
    userId: 'USR006',
    username: 'student',
    email: 'student@ssvschool.com',
    password: 'student123',
    name: 'Aishwarya Kumar',
    role: 'student',
    schoolId: 'SCHOOL002',
    schoolName: 'Sri Sankara Vidhyasala Girls High School',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  },
  {
    userId: 'USR008',
    username: 'parent',
    email: 'parent@ssvschool.com',
    password: 'parent123',
    name: 'Ramesh Kumar',
    role: 'parent',
    schoolId: 'SCHOOL002',
    schoolName: 'Sri Sankara Vidhyasala Girls High School',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
  },
];

let memUsers = [...realPortalUsers];

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.userId || user._id,
      username: user.username,
      name: user.name,
      role: user.role,
      schoolId: user.schoolId,
      schoolName: user.schoolName,
    },
    process.env.JWT_SECRET || 'zenschool_jwt_super_secret_key_2026_zen_education',
    { expiresIn: '7d' }
  );
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username and password' });
    }

    const query = username.trim().toLowerCase();
    let foundUser = null;

    if (getDBStatus()) {
      foundUser = await User.findOne({
        $or: [
          { username: query },
          { email: query },
          { userId: query },
        ],
      });
    }

    if (!foundUser) {
      foundUser = memUsers.find(
        (u) =>
          (u.username && u.username.toLowerCase() === query) ||
          (u.email && u.email.toLowerCase() === query) ||
          (u.userId && u.userId.toLowerCase() === query) ||
          (u.id && u.id.toLowerCase() === query) ||
          (u.email && u.email.split('@')[0].toLowerCase() === query) ||
          (Array.isArray(u.aliases) && u.aliases.some((a) => a.toLowerCase() === query))
      );
    }

    if (!foundUser) {
      return res.status(401).json({ success: false, message: 'Invalid username/email or password.' });
    }

    if (foundUser.password && String(foundUser.password).trim() !== String(password).trim()) {
      return res.status(401).json({ success: false, message: 'Invalid username/email or password.' });
    }

    const token = generateToken(foundUser);
    const userSafe = {
      userId: foundUser.userId || foundUser.id || foundUser._id,
      username: foundUser.username,
      name: foundUser.name,
      email: foundUser.email,
      phone: foundUser.phone || '',
      role: (foundUser.role || 'schooladmin').toLowerCase(),
      schoolId: foundUser.schoolId,
      schoolName: foundUser.schoolName,
      status: foundUser.status || 'Active',
      avatar: foundUser.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    };

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userSafe,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const syncUser = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData || (!userData.username && !userData.email && !userData.schoolId)) {
      return res.status(400).json({ success: false, message: 'User data is required' });
    }

    const cleanUsername = userData.username ? String(userData.username).toLowerCase().trim() : '';
    const cleanEmail = userData.email ? String(userData.email).toLowerCase().trim() : '';
    const cleanPassword = userData.password ? String(userData.password).trim() : '';
    const cleanRole = userData.role ? String(userData.role).toLowerCase().trim() : '';
    const cleanSchoolId = userData.schoolId ? String(userData.schoolId).trim() : '';

    let matched = false;
    memUsers = memUsers.map((u) => {
      const matchUname = cleanUsername && u.username && u.username.toLowerCase() === cleanUsername;
      const matchEmail = cleanEmail && u.email && u.email.toLowerCase() === cleanEmail;
      const matchId = (userData.id && (u.userId === userData.id || u.id === userData.id)) ||
                      (userData.userId && (u.userId === userData.userId || u.id === userData.userId));
      const matchSchoolRole = cleanSchoolId && cleanRole &&
        u.schoolId === cleanSchoolId &&
        u.role && u.role.toLowerCase() === cleanRole;

      if (matchUname || matchEmail || matchId || matchSchoolRole) {
        matched = true;
        return {
          ...u,
          ...(cleanPassword ? { password: cleanPassword } : {}),
          ...(cleanUsername ? { username: cleanUsername } : {}),
          ...(cleanEmail ? { email: cleanEmail } : {}),
          ...(userData.name ? { name: userData.name } : {}),
          ...(cleanRole ? { role: cleanRole } : {}),
          ...(cleanSchoolId ? { schoolId: cleanSchoolId } : {}),
          ...(userData.schoolName ? { schoolName: userData.schoolName } : {}),
        };
      }
      return u;
    });

    const fullUser = {
      userId: userData.userId || userData.id || 'USR' + String(Date.now()).slice(-4),
      username: cleanUsername || (cleanEmail ? cleanEmail.split('@')[0] : `user_${Date.now()}`),
      password: cleanPassword || 'Admin@12345',
      name: userData.name || cleanUsername || 'User',
      email: cleanEmail || `${cleanUsername || 'user'}@school.edu`,
      phone: userData.phone || '',
      role: cleanRole || 'schooladmin',
      schoolId: cleanSchoolId || 'SCH001',
      schoolName: userData.schoolName || 'Campus',
      status: userData.status || 'Active',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    };

    if (!matched) {
      memUsers.unshift(fullUser);
    }

    if (getDBStatus()) {
      const orClauses = [];
      if (cleanUsername) orClauses.push({ username: cleanUsername });
      if (cleanEmail) orClauses.push({ email: cleanEmail });
      if (cleanSchoolId && cleanRole) orClauses.push({ schoolId: cleanSchoolId, role: cleanRole });
      if (orClauses.length > 0) {
        await User.updateMany({ $or: orClauses }, { $set: { ...(cleanPassword ? { password: cleanPassword } : {}), ...userData } }).catch(() => {});
      }
      if (cleanUsername) {
        await User.findOneAndUpdate({ username: cleanUsername }, fullUser, { upsert: true }).catch(() => {});
      }
    }

    return res.json({ success: true, message: 'User synchronized for login', user: fullUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    return res.json({ success: true, user: req.user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getDemoAccounts = async (req, res) => {
  try {
    const accounts = memUsers.map((u) => ({
      userId: u.userId,
      username: u.username,
      email: u.email,
      name: u.name,
      role: u.role,
      schoolName: u.schoolName,
      passwordHint: u.password,
    }));
    return res.json({ success: true, demoAccounts: accounts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { login, syncUser, getMe, getDemoAccounts, memUsers };
