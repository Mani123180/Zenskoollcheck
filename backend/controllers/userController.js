const User = require('../models/User');
const { getDBStatus } = require('../config/db');
const { memUsers } = require('./authController');

const getUsers = async (req, res) => {
  try {
    const { schoolId, role } = req.query;
    let query = {};
    if (schoolId && schoolId !== 'ALL') query.schoolId = schoolId;
    if (role) query.role = role;

    if (getDBStatus()) {
      const users = await User.find(query).select('-password');
      if (users.length > 0) return res.json({ success: true, count: users.length, data: users });
    }

    let filtered = [...memUsers];
    if (schoolId && schoolId !== 'ALL') {
      filtered = filtered.filter((u) => u.schoolId === schoolId || u.schoolId === 'ALL');
    }
    if (role) {
      filtered = filtered.filter((u) => (u.role || '').toLowerCase() === role.toLowerCase());
    }

    const safeUsers = filtered.map(({ password, ...rest }) => rest);
    return res.json({ success: true, count: safeUsers.length, data: safeUsers });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, password, name, email, phone, role, schoolId, schoolName } = req.body;
    if (!username || !name || !email || !role) {
      return res.status(400).json({ success: false, message: 'Username, name, email and role are required' });
    }

    const userId = 'USR' + String(Date.now()).slice(-4);
    const newUser = {
      userId,
      username: username.toLowerCase().trim(),
      password: (password || 'Welcome@123').trim(),
      name,
      email: email.toLowerCase().trim(),
      phone: phone || '',
      role: (role || 'schooladmin').toLowerCase(),
      schoolId: schoolId || (req.user && req.user.schoolId) || 'SCH001',
      schoolName: schoolName || (req.user && req.user.schoolName) || 'Campus',
      status: 'Active',
      avatar: '',
    };

    if (getDBStatus()) {
      await User.create(newUser).catch(() => {});
    }

    const existingIdx = memUsers.findIndex(
      (u) =>
        (u.username && u.username.toLowerCase() === newUser.username) ||
        (u.email && u.email.toLowerCase() === newUser.email)
    );

    if (existingIdx !== -1) {
      memUsers[existingIdx] = { ...memUsers[existingIdx], ...newUser };
    } else {
      memUsers.unshift(newUser);
    }

    const { password: _, ...userSafe } = newUser;
    return res.status(201).json({ success: true, message: 'User created successfully', data: userSafe });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const updated = await User.findOneAndUpdate({ userId: id }, req.body, { new: true }).select('-password');
      if (updated) return res.json({ success: true, data: updated });
    }

    const idx = memUsers.findIndex((u) => u.userId === id || u.id === id);
    if (idx !== -1) {
      memUsers[idx] = { ...memUsers[idx], ...req.body };
      const { password, ...userSafe } = memUsers[idx];
      return res.json({ success: true, data: userSafe });
    }
    return res.status(404).json({ success: false, message: 'User not found' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      await User.findOneAndDelete({ userId: id });
    }
    const idx = memUsers.findIndex((u) => u.userId === id || u.id === id);
    if (idx !== -1) {
      memUsers.splice(idx, 1);
    }
    return res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, memUsers };
