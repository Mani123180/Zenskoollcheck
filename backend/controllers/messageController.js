const Message = require('../models/Message');
const User = require('../models/User');
const { initialMessages, initialUsers } = require('../seed/seedData');
const { getDBStatus } = require('../config/db');


const realPortalUsers = [
  {
    userId: 'USR001',
    username: 'superadmin',
    name: 'Super Administrator',
    role: 'superadmin',
    schoolId: 'ALL',
    schoolName: 'Zenith Central Trust',
    avatar: '',
    status: 'offline',
  },
  {
    userId: 'USR002',
    username: 'admin_ssv',
    name: 'School Administrator (SSV)',
    role: 'schooladmin',
    schoolId: 'SCHOOL002',
    schoolName: 'Sri Sankara Vidhyasala Girls High School',
    avatar: '',
    status: 'offline',
  },
  {
    userId: 'USR003',
    username: 'principal',
    name: 'Dr. Savithri Raman',
    role: 'principal',
    schoolId: 'SCHOOL002',
    schoolName: 'Sri Sankara Vidhyasala Girls High School',
    avatar: '',
    status: 'offline',
  },
  {
    userId: 'USR004',
    username: 'teacher',
    name: 'Mrs. Priya Krishnan',
    role: 'teacher',
    schoolId: 'SCHOOL002',
    schoolName: 'Sri Sankara Vidhyasala Girls High School',
    avatar: '',
    status: 'offline',
  },
  {
    userId: 'USR005',
    username: 'finance_ssv',
    name: 'School Finance Manager (SSV)',
    role: 'finance',
    schoolId: 'SCHOOL002',
    schoolName: 'Sri Sankara Vidhyasala Girls High School',
    avatar: '',
    status: 'offline',
  },
  {
    userId: 'USR006',
    username: 'student',
    name: 'Aishwarya Kumar',
    role: 'student',
    schoolId: 'SCHOOL002',
    schoolName: 'Sri Sankara Vidhyasala Girls High School',
    avatar: '',
    status: 'offline',
  },
  {
    userId: 'USR008',
    username: 'parent',
    name: 'Ramesh Kumar',
    role: 'parent',
    schoolId: 'SCHOOL002',
    schoolName: 'Sri Sankara Vidhyasala Girls High School',
    avatar: '',
    status: 'offline',
  },
];

let memMessages = [...initialMessages];

const normalizeId = (idOrUser) => {
  if (!idOrUser) return '';
  if (typeof idOrUser === 'object') {
    const uname = (idOrUser.username || '').toLowerCase();
    const unameMap = {
      superadmin: 'USR001',
      admin_ssv: 'USR002',
      admin_ssvkod: 'USR002',
      principal: 'USR003',
      teacher: 'USR004',
      priya: 'USR004',
      finance_ssv: 'USR005',
      student: 'USR006',
      aishwarya: 'USR006',
      parent: 'USR008',
      ramesh: 'USR008',
      admin_abcche: 'USR_ABC_ADM',
      finance_abcche: 'USR_ABC_FIN',
      admin_stmerd: 'USR_STM_ADM',
      finance_stmerd: 'USR_STM_FIN',
      admin_dpwcbe: 'USR_DPW_ADM',
      finance_dpwcbe: 'USR_DPW_FIN',
      admin_oxfchn: 'USR_OXF_ADM',
      finance_oxfchn: 'USR_OXF_FIN',
    };
    if (uname && unameMap[uname]) return unameMap[uname];
    idOrUser = idOrUser.userId || idOrUser.id || idOrUser._id || '';
  }
  const str = String(idOrUser).trim();
  const idMap = {
    'USR-SA': 'USR001',
    'USR-ADM': 'USR002',
    'USR-PRIN': 'USR003',
    'USR001_PRIN': 'USR003',
    'USR-TCH': 'USR004',
    'USR003_TEA': 'USR004',
    'USR004_TEA': 'USR004',
    'USR-STD': 'USR006',
    'USR005_STU': 'USR006',
    'USR006_STU': 'USR006',
    'USR-PAR': 'USR008',
    'USR007_PAR': 'USR008',
  };
  return idMap[str] || str;
};

const { memUsers } = require('./userController');

const activeUserPresence = new Map();

const isUserOnline = (userId, userName) => {
  if (!userId && !userName) return false;
  const norm = normalizeId(userId);
  const raw = String(userId || '');
  const uName = userName ? userName.trim().toLowerCase() : '';
  const lastSeen = activeUserPresence.get(norm) || activeUserPresence.get(raw) || (uName && activeUserPresence.get(uName));
  if (!lastSeen) return false;
  return Date.now() - lastSeen < 12000;
};

const heartbeat = async (req, res) => {
  try {
    const rawUserId = req.user ? (req.user.userId || req.user.id) : null;
    const currentUserId = normalizeId(req.user) || normalizeId(rawUserId);
    const uName = req.user && req.user.name ? req.user.name.trim().toLowerCase() : '';
    const now = Date.now();
    if (currentUserId) activeUserPresence.set(currentUserId, now);
    if (rawUserId) activeUserPresence.set(String(rawUserId), now);
    if (uName) activeUserPresence.set(uName, now);

    if (currentUserId) {
      memMessages.forEach((m) => {
        const mReceiver = normalizeId(m.receiverId);
        const mRecName = (m.receiverName || '').trim().toLowerCase();
        if ((mReceiver === currentUserId || (rawUserId && m.receiverId === rawUserId) || (uName && mRecName === uName)) && !m.delivered) {
          m.delivered = true;
        }
      });

      if (getDBStatus()) {
        try {
          await Message.updateMany(
            { receiverId: { $in: [currentUserId, rawUserId] }, delivered: false },
            { $set: { delivered: true } }
          );
        } catch (e) {}
      }
    }
    return res.json({ success: true, online: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const offline = async (req, res) => {
  try {
    const rawUserId = req.user ? (req.user.userId || req.user.id) : null;
    const currentUserId = normalizeId(req.user) || normalizeId(rawUserId);
    const uName = req.user && req.user.name ? req.user.name.trim().toLowerCase() : '';
    if (currentUserId) activeUserPresence.delete(currentUserId);
    if (rawUserId) activeUserPresence.delete(String(rawUserId));
    if (uName) activeUserPresence.delete(uName);
    return res.json({ success: true, online: false });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const rawUserId = req.user ? (req.user.userId || req.user.id) : null;
    const currentUserId = normalizeId(req.user) || normalizeId(rawUserId);
    if (currentUserId) {
      activeUserPresence.set(currentUserId, Date.now());
    }

    const userMap = new Map();
    realPortalUsers.forEach((u) => {
      const uid = normalizeId(u.userId);
      const online = isUserOnline(uid);
      userMap.set(uid, {
        id: uid,
        name: u.name,
        role: u.role,
        schoolId: u.schoolId,
        schoolName: u.schoolName,
        status: online ? 'online' : 'offline',
        avatar: (u.avatar && !u.avatar.includes('unsplash')) ? u.avatar : '',
      });
    });

    if (Array.isArray(memUsers)) {
      memUsers.forEach((u) => {
        const uId = normalizeId(u);
        if (uId && !userMap.has(uId)) {
          const online = isUserOnline(uId);
          userMap.set(uId, {
            id: uId,
            name: u.name,
            role: u.role,
            schoolId: u.schoolId,
            schoolName: u.schoolName,
            status: online ? 'online' : 'offline',
            avatar: (u.avatar && !u.avatar.includes('unsplash')) ? u.avatar : '',
          });
        }
      });
    }

    const allUsers = Array.from(userMap.values());

    const getUnreadCount = (contactId) => {
      const cId = normalizeId(contactId);
      return memMessages.filter(
        (m) => normalizeId(m.senderId) === cId && normalizeId(m.receiverId) === currentUserId && !m.read
      ).length;
    };

    const getLastMsg = (contactId) => {
      const cId = normalizeId(contactId);
      const matched = memMessages.filter(
        (m) =>
          (normalizeId(m.senderId) === cId && normalizeId(m.receiverId) === currentUserId) ||
          (normalizeId(m.senderId) === currentUserId && normalizeId(m.receiverId) === cId)
      );
      if (matched.length > 0) {
        return matched[matched.length - 1];
      }
      return null;
    };

    const filteredContacts = allUsers
      .filter((c) => c.id !== currentUserId && c.id !== rawUserId)
      .map((c) => {
        const lastMsg = getLastMsg(c.id);
        return {
          ...c,
          unreadCount: getUnreadCount(c.id),
          lastMessageText: lastMsg ? lastMsg.text : '',
          lastMessageTime: lastMsg ? lastMsg.timestamp : '',
        };
      });

    return res.json({ success: true, data: filteredContacts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const rawContactId = req.query.contactId;
    const rawUserId = req.user ? (req.user.userId || req.user.id) : null;
    const currentUserId = normalizeId(req.user) || normalizeId(rawUserId);
    const contactId = normalizeId(rawContactId);

    if (currentUserId) {
      activeUserPresence.set(currentUserId, Date.now());
    }

    if (contactId && currentUserId) {
      memMessages.forEach((m) => {
        const mSender = normalizeId(m.senderId);
        const mReceiver = normalizeId(m.receiverId);
        if (mSender === contactId && mReceiver === currentUserId) {
          m.delivered = true;
          m.read = true;
        }
      });

      if (getDBStatus()) {
        try {
          await Message.updateMany(
            {
              senderId: { $in: [contactId, rawContactId] },
              receiverId: { $in: [currentUserId, rawUserId] },
            },
            { $set: { delivered: true, read: true } }
          );
        } catch (e) {}
      }
    }

    if (getDBStatus()) {
      let query = {};
      if (contactId && currentUserId) {
        query = {
          $or: [
            { senderId: { $in: [currentUserId, rawUserId] }, receiverId: { $in: [contactId, rawContactId] } },
            { senderId: { $in: [contactId, rawContactId] }, receiverId: { $in: [currentUserId, rawUserId] } },
          ],
        };
      } else if (currentUserId) {
        query = {
          $or: [
            { senderId: { $in: [currentUserId, rawUserId] } },
            { receiverId: { $in: [currentUserId, rawUserId] } },
          ],
        };
      }
      const msgs = await Message.find(query).sort({ createdAt: 1 });
      if (msgs && msgs.length > 0) return res.json({ success: true, data: msgs });
    }

    let filtered = [...memMessages];
    if (contactId && currentUserId) {
      filtered = filtered.filter((m) => {
        const mSender = normalizeId(m.senderId);
        const mReceiver = normalizeId(m.receiverId);
        return (
          (mSender === currentUserId && mReceiver === contactId) ||
          (mSender === contactId && mReceiver === currentUserId)
        );
      });
    } else if (currentUserId) {
      filtered = filtered.filter((m) => {
        const mSender = normalizeId(m.senderId);
        const mReceiver = normalizeId(m.receiverId);
        return mSender === currentUserId || mReceiver === currentUserId;
      });
    }

    return res.json({ success: true, data: filtered });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { receiverId, receiverName, receiverRole, text, messageId } = req.body;
    if (!receiverId || !text) {
      return res.status(400).json({ success: false, message: 'Receiver and message text are required' });
    }

    const rawUserId = req.user ? (req.user.userId || req.user.id) : null;
    const currentUserId = normalizeId(req.user) || normalizeId(rawUserId) || 'USR001';
    const currentUserName = req.user ? req.user.name : 'Super Administrator';
    const currentUserRole = req.user ? req.user.role : 'superadmin';
    const normalizedReceiverId = normalizeId(receiverId);

    activeUserPresence.set(currentUserId, Date.now());

    const receiverOnline = isUserOnline(normalizedReceiverId);

    const msgId = messageId || ('MSG' + String(Date.now()).slice(-4));
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg = {
      messageId: msgId,
      senderId: currentUserId,
      senderName: currentUserName,
      senderRole: currentUserRole,
      receiverId: normalizedReceiverId,
      receiverName: receiverName || 'User',
      receiverRole: receiverRole || 'user',
      schoolId: req.user ? req.user.schoolId : 'ALL',
      text: text.trim(),
      timestamp: timeStr,
      delivered: receiverOnline,
      read: false,
    };

    if (getDBStatus()) {
      try {
        await Message.create(newMsg);
      } catch (dbErr) {
        console.warn('DB message save failed:', dbErr.message);
      }
    }
    memMessages.push(newMsg);

    return res.status(201).json({ success: true, data: newMsg });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getContacts, getMessages, sendMessage, heartbeat, offline, activeUserPresence };
