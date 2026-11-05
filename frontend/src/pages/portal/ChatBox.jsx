import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { getPortalData } from '../../services/portalData';

const normalizeUserId = (u) => {
  if (!u) return 'USR001';
  if (typeof u === 'string') {
    const s = u.trim();
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
    return idMap[s] || s;
  }
  const uname = (u.username || '').toLowerCase();
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

  const rawId = u.userId || u.id || '';
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
  return idMap[rawId] || rawId || (u.name ? `USR_${u.name.replace(/\s+/g, '')}` : 'USR001');
};

const getRoleBadgeStyle = (role) => {
  const r = (role || '').toLowerCase();
  if (r.includes('teach')) return { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' };
  if (r.includes('stud')) return { bg: '#ecfdf5', color: '#047857', border: '#a7f3d0' };
  if (r.includes('par')) return { bg: '#fffbeb', color: '#b45309', border: '#fde68a' };
  if (r.includes('prin')) return { bg: '#faf5ff', color: '#7e22ce', border: '#e9d5ff' };
  if (r.includes('admin') || r.includes('super')) return { bg: '#eef2ff', color: '#4338ca', border: '#c7d2fe' };
  if (r.includes('fin')) return { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' };
  return { bg: '#f1f5f9', color: '#475569', border: '#cbd5e1' };
};

// Clean neutral empty avatar (no AI stock photo)
const EmptyAvatar = ({ size = 38, border = '1px solid #cbd5e1' }) => (
  <div
    style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      backgroundColor: '#f1f5f9',
      border,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#94a3b8',
      flexShrink: 0,
    }}
    title="Profile"
  >
    <svg width={Math.round(size * 0.52)} height={Math.round(size * 0.52)} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  </div>
);

export default function ChatBox() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [searchContact, setSearchContact] = useState('');
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);

  // Connect New Person Modal State
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectCategoryFilter, setConnectCategoryFilter] = useState('all'); // 'all', 'teacher', 'student', 'parent', 'principal', 'staff'
  const [connectSearchQuery, setConnectSearchQuery] = useState('');

  const chatContainerRef = useRef(null);
  const messageInputRef = useRef(null);
  const isUserAtBottomRef = useRef(true);
  const backendOnlineMapRef = useRef(new Map());

  // Helper to determine if a person is ACTUALLY online across any portal
  const checkUserIsOnline = (person) => {
    if (!person) return false;
    const pNormId = normalizeUserId(person.id || person.userId);
    const pRawId = String(person.id || person.userId || '');
    const pName = (person.name || '').trim().toLowerCase();

    // 1. Check backend online map (heartbeat from realPortalUsers / database)
    if (backendOnlineMapRef.current) {
      if (backendOnlineMapRef.current.get(pNormId) === true) return true;
      if (backendOnlineMapRef.current.get(pRawId) === true) return true;
      if (pName && backendOnlineMapRef.current.get(pName) === true) return true;
    }

    // 2. Check localStorage cross-portal presence map (updated every 3.5s by active sessions across tabs)
    try {
      const store = JSON.parse(localStorage.getItem('ssv_presence_map') || '{}');
      const now = Date.now();
      const lastSeen = store[pNormId] || store[pRawId] || (pName && store[pName]);
      if (lastSeen && now - lastSeen < 12000) {
        return true;
      }
    } catch (e) {}

    return false;
  };

  const scrollToBottom = (smooth = false) => {
    if (!chatContainerRef.current) return;
    if (smooth) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    } else {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    isUserAtBottomRef.current = scrollHeight - scrollTop - clientHeight < 70;
  };

  // Helper to build campus directory of all persons
  const getCampusDirectory = () => {
    const pData = getPortalData() || {};
    const currentNormId = normalizeUserId(user);
    const currentName = (user?.name || '').trim().toLowerCase();

    const directory = [];
    const seenIds = new Set();
    if (currentNormId) seenIds.add(currentNormId);

    // 1. Teachers (Mrs. Priya Krishnan, Dr. Anandhi Rajan, Mrs. Selvi Murugan, David, etc.)
    (pData.teachers || []).forEach((t) => {
      const tid = t.id || `TCH_${(t.name || '').replace(/\s+/g, '')}`;
      if (!seenIds.has(tid) && (t.name || '').trim().toLowerCase() !== currentName) {
        seenIds.add(tid);
        const isOnline = checkUserIsOnline({ id: tid, name: t.name });
        directory.push({
          id: tid,
          name: t.name,
          role: 'Teacher',
          schoolId: t.schoolId || 'SCHOOL002',
          schoolName: 'Sri Sankara Vidhyasala Girls High School',
          status: isOnline ? 'online' : 'offline',
          avatar: '',
          subtext: `Teacher • ${t.subject || t.onboardSubject || 'Faculty'} ${t.class ? `(${t.class})` : ''}`,
          category: 'teacher',
          email: t.email,
          phone: t.phone,
        });
      }
    });

    // 2. Students
    (pData.students || []).forEach((s) => {
      const sid = s.roll || `STD_${(s.name || '').replace(/\s+/g, '')}`;
      if (!seenIds.has(sid) && (s.name || '').trim().toLowerCase() !== currentName) {
        seenIds.add(sid);
        const isOnline = checkUserIsOnline({ id: sid, name: s.name });
        directory.push({
          id: sid,
          name: s.name,
          role: 'Student',
          schoolId: s.schoolId || 'SCHOOL002',
          schoolName: 'Sri Sankara Vidhyasala Girls High School',
          status: isOnline ? 'online' : 'offline',
          avatar: '',
          subtext: `Student • Class ${s.class || 'General'} (Roll: ${s.roll})`,
          category: 'student',
          class: s.class,
          roll: s.roll,
        });
      }
    });

    // 3. Parents
    (pData.students || []).forEach((s) => {
      if (s.parentName) {
        const pid = `PAR_${s.roll || (s.name || '').replace(/\s+/g, '')}`;
        if (!seenIds.has(pid) && s.parentName.trim().toLowerCase() !== currentName) {
          seenIds.add(pid);
          const isOnline = checkUserIsOnline({ id: pid, name: s.parentName });
          directory.push({
            id: pid,
            name: s.parentName,
            role: 'Parent',
            schoolId: s.schoolId || 'SCHOOL002',
            schoolName: 'Sri Sankara Vidhyasala Girls High School',
            status: isOnline ? 'online' : 'offline',
            avatar: '',
            subtext: `Parent of ${s.name} (${s.class || 'Student'})`,
            category: 'parent',
            phone: s.parentPhone,
          });
        }
      }
    });

    // 4. Principals (Dr. Savithri Raman, Meena)
    (pData.principals || []).forEach((p) => {
      const pid = p.id || `PRIN_${(p.name || '').replace(/\s+/g, '')}`;
      if (!seenIds.has(pid) && (p.name || '').trim().toLowerCase() !== currentName) {
        seenIds.add(pid);
        const isOnline = checkUserIsOnline({ id: pid, name: p.name });
        directory.push({
          id: pid,
          name: p.name,
          role: 'Principal',
          schoolId: p.schoolId || 'SCHOOL002',
          schoolName: 'Sri Sankara Vidhyasala Girls High School',
          status: isOnline ? 'online' : 'offline',
          avatar: '',
          subtext: 'Principal • Head of Institution',
          category: 'principal',
        });
      }
    });

    // 5. Non-teaching staff & operations
    (pData.nonTeachingStaff || []).forEach((st) => {
      const stid = st.id || `STF_${(st.name || '').replace(/\s+/g, '')}`;
      if (!seenIds.has(stid) && (st.name || '').trim().toLowerCase() !== currentName) {
        seenIds.add(stid);
        const isOnline = checkUserIsOnline({ id: stid, name: st.name });
        directory.push({
          id: stid,
          name: st.name,
          role: st.role || 'Staff',
          schoolId: st.schoolId || 'SCHOOL002',
          schoolName: 'Sri Sankara Vidhyasala Girls High School',
          status: isOnline ? 'online' : 'offline',
          avatar: '',
          subtext: `Staff • ${st.role || 'Campus Operations'}`,
          category: 'staff',
          phone: st.phone,
        });
      }
    });

    // 6. Registered Portal Users (Admins, Super Admin, Finance Managers)
    (pData.users || []).forEach((u) => {
      const uid = normalizeUserId(u);
      if (!seenIds.has(uid) && (u.name || '').trim().toLowerCase() !== currentName) {
        seenIds.add(uid);
        const isOnline = checkUserIsOnline({ id: uid, name: u.name });
        directory.push({
          id: uid,
          name: u.name,
          role: (u.role || 'user').toUpperCase(),
          schoolId: u.schoolId || 'SCHOOL002',
          schoolName: u.schoolName || 'Campus Administration',
          status: isOnline ? 'online' : 'offline',
          avatar: (u.avatar && !u.avatar.includes('unsplash')) ? u.avatar : '',
          subtext: `${(u.role || 'user').toUpperCase()} • ${u.schoolName || 'Administration'}`,
          category: (u.role || '').toLowerCase().includes('admin') ? 'admin' : (u.role || '').toLowerCase().includes('teacher') ? 'teacher' : 'staff',
          email: u.email,
          phone: u.phone,
        });
      }
    });

    // 7. Custom connected persons from localStorage
    try {
      const customList = JSON.parse(localStorage.getItem('ssv_custom_chat_contacts') || '[]');
      if (Array.isArray(customList)) {
        customList.forEach((c) => {
          if (!seenIds.has(c.id) && (c.name || '').trim().toLowerCase() !== currentName) {
            seenIds.add(c.id);
            const isOnline = checkUserIsOnline(c);
            directory.push({
              ...c,
              status: isOnline ? 'online' : 'offline',
            });
          }
        });
      }
    } catch (e) {}

    return directory;
  };

  // Smart message deduplication helper
  const isSameMessage = (msgA, msgB) => {
    if (!msgA || !msgB) return false;
    if (msgA.messageId && msgB.messageId && msgA.messageId === msgB.messageId) return true;
    if (msgA._id && msgB._id && msgA._id === msgB._id) return true;

    const textA = (msgA.text || '').trim().toLowerCase();
    const textB = (msgB.text || '').trim().toLowerCase();
    const sA = normalizeUserId(msgA.senderId);
    const sB = normalizeUserId(msgB.senderId);
    const rA = normalizeUserId(msgA.receiverId);
    const rB = normalizeUserId(msgB.receiverId);

    if (textA === textB && sA === sB && rA === rB) {
      const tA = (msgA.timestamp || '').trim().toLowerCase().replace(/\s+/g, '');
      const tB = (msgB.timestamp || '').trim().toLowerCase().replace(/\s+/g, '');
      if (tA === tB) return true;
      // Compare HH:MM part (e.g. "03:34pm" vs "03:34PM")
      if (tA.slice(0, 5) === tB.slice(0, 5)) return true;
      const diff = Math.abs((msgA.createdAt || 0) - (msgB.createdAt || 0));
      if (diff > 0 && diff < 120000) return true;
    }
    return false;
  };

  const loadContacts = async () => {
    try {
      let fetched = [];
      try {
        const res = await api.getContacts();
        if (res && res.success && Array.isArray(res.data)) {
          fetched = res.data;
        }
      } catch (e) {
        console.warn('API getContacts failed:', e);
      }

      // Store live backend online status map
      const bMap = new Map();
      fetched.forEach((c) => {
        const isOnline = c.status === 'online';
        const cId = normalizeUserId(c.id || c.userId);
        bMap.set(cId, isOnline);
        if (c.id) bMap.set(String(c.id), isOnline);
        if (c.name) bMap.set(c.name.trim().toLowerCase(), isOnline);
      });
      backendOnlineMapRef.current = bMap;

      // Local custom connected contacts
      let localCustom = [];
      try {
        localCustom = JSON.parse(localStorage.getItem('ssv_custom_chat_contacts') || '[]');
      } catch (e) {}

      const currentNormId = normalizeUserId(user);
      const currentName = (user?.name || '').trim().toLowerCase();
      const campusDir = getCampusDirectory();

      const mergedMap = new Map();

      // Priority 1: Backend contacts
      fetched.forEach((c) => {
        const cId = normalizeUserId(c.id || c.userId);
        if (cId !== currentNormId && (c.name || '').trim().toLowerCase() !== currentName) {
          const isOnline = checkUserIsOnline(c);
          mergedMap.set(cId, { ...c, id: cId, status: isOnline ? 'online' : 'offline' });
        }
      });

      // Priority 2: Custom connected contacts
      localCustom.forEach((c) => {
        const cId = normalizeUserId(c.id);
        if (cId !== currentNormId && (c.name || '').trim().toLowerCase() !== currentName) {
          if (!mergedMap.has(cId)) {
            const isOnline = checkUserIsOnline(c);
            mergedMap.set(cId, { ...c, status: isOnline ? 'online' : 'offline' });
          }
        }
      });

      // Priority 3: Registered campus users
      campusDir.forEach((d) => {
        const dId = normalizeUserId(d.id);
        if (dId !== currentNormId && (d.name || '').trim().toLowerCase() !== currentName) {
          if (!mergedMap.has(dId)) {
            const isOnline = checkUserIsOnline(d);
            mergedMap.set(dId, { ...d, status: isOnline ? 'online' : 'offline' });
          }
        }
      });

      // Read unread count and latest messages from local storage
      let localMsgStore = {};
      try {
        localMsgStore = JSON.parse(localStorage.getItem('ssv_chat_messages_store') || '{}');
      } catch (e) {}

      const mergedList = Array.from(mergedMap.values()).map((c) => {
        const isOnline = checkUserIsOnline(c);
        const threadKey = [currentNormId, c.id].sort().join('__');
        const thread = localMsgStore[threadKey] || [];
        const lastMsg = thread.length > 0 ? thread[thread.length - 1] : null;
        return {
          ...c,
          status: isOnline ? 'online' : 'offline',
          lastMessageText: lastMsg ? lastMsg.text : (c.lastMessageText || ''),
          lastMessageTime: lastMsg ? lastMsg.timestamp : (c.lastMessageTime || ''),
          lastMessageTimestamp: lastMsg ? (lastMsg.createdAt || 1) : (c.lastMessageTimestamp || 0),
          unreadCount: c.unreadCount || 0,
        };
      });

      // 🌟 SORT CONTACTS: Most recent conversation ALWAYS on TOP!
      mergedList.sort((a, b) => (b.lastMessageTimestamp || 0) - (a.lastMessageTimestamp || 0));

      setContacts(mergedList);
      setActiveContact((prev) => {
        if (prev) {
          const found = mergedList.find((c) => c.id === prev.id);
          const isOnline = checkUserIsOnline(found || prev);
          return { ...(found || prev), status: isOnline ? 'online' : 'offline' };
        }
        return mergedList.length > 0 ? mergedList[0] : null;
      });
    } catch (err) {
      console.warn('Contacts load error:', err);
    }
  };

  useEffect(() => {
    loadContacts();
  }, [user]);

  const loadMessages = async (contactId) => {
    if (!contactId) return;
    try {
      const currentNormId = normalizeUserId(user);
      const threadKey = [currentNormId, contactId].sort().join('__');

      // 1. Fetch from local message cache
      let localThread = [];
      try {
        const localMsgStore = JSON.parse(localStorage.getItem('ssv_chat_messages_store') || '{}');
        localThread = localMsgStore[threadKey] || [];
      } catch (e) {}

      // 2. Fetch from backend API
      let remoteThread = [];
      try {
        const res = await api.getMessages(contactId);
        if (res && res.success && Array.isArray(res.data)) {
          remoteThread = res.data;
        }
      } catch (e) {}

      // 3. Live Delivery Sync: If receiver is currently online, mark undelivered sent messages as delivered!
      const receiverIsOnline = checkUserIsOnline(activeContact);
      let localUpdated = false;

      localThread = localThread.map((m) => {
        const mSender = normalizeUserId(m.senderId);
        const mReceiver = normalizeUserId(m.receiverId);

        // When receiver is online, my messages become delivered (double-tick)!
        if (mSender === currentNormId && receiverIsOnline && !m.delivered) {
          localUpdated = true;
          return { ...m, delivered: true };
        }

        // If receiver was previously offline, ensure delivered is false unless read or online
        if (mSender === currentNormId && !receiverIsOnline && !m.read && m.delivered) {
          localUpdated = true;
          return { ...m, delivered: false };
        }

        // When I view messages sent by the contact, mark them as read & delivered
        if (mSender === contactId && mReceiver === currentNormId && (!m.read || !m.delivered)) {
          localUpdated = true;
          return { ...m, delivered: true, read: true };
        }

        return m;
      });

      if (localUpdated) {
        try {
          const store = JSON.parse(localStorage.getItem('ssv_chat_messages_store') || '{}');
          store[threadKey] = localThread;
          localStorage.setItem('ssv_chat_messages_store', JSON.stringify(store));
        } catch (e) {}
      }

      // 4. Merge and deduplicate (Fixes duplicate "hey" bug!)
      const combined = [];
      const addIfNotDuplicate = (msg) => {
        const idx = combined.findIndex((m) => isSameMessage(m, msg));
        if (idx === -1) {
          combined.push(msg);
        } else {
          // Merge flags if available
          combined[idx] = { ...combined[idx], ...msg };
        }
      };

      remoteThread.forEach(addIfNotDuplicate);
      localThread.forEach(addIfNotDuplicate);

      combined.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));

      // Also clean up prior duplicates in localStore
      const cleanedLocal = [];
      localThread.forEach((lm) => {
        if (!cleanedLocal.some((m) => isSameMessage(m, lm))) {
          cleanedLocal.push(lm);
        }
      });
      if (cleanedLocal.length !== localThread.length) {
        try {
          const store = JSON.parse(localStorage.getItem('ssv_chat_messages_store') || '{}');
          store[threadKey] = cleanedLocal;
          localStorage.setItem('ssv_chat_messages_store', JSON.stringify(store));
        } catch (e) {}
      }

      setMessages((prev) => {
        if (prev.length === combined.length) {
          const prevLast = prev[prev.length - 1];
          const newLast = combined[combined.length - 1];
          const prevFirst = prev[0];
          const newFirst = combined[0];
          const isSame =
            (!prevLast && !newLast) ||
            (prevLast &&
              newLast &&
              (prevLast.messageId === newLast.messageId || prevLast._id === newLast._id) &&
              prevLast.read === newLast.read &&
              prevLast.delivered === newLast.delivered &&
              prevFirst?.messageId === newFirst?.messageId);
          if (isSame) {
            return prev;
          }
        }

        if (isUserAtBottomRef.current) {
          setTimeout(() => scrollToBottom(true), 60);
        }
        return combined;
      });
    } catch (err) {
      console.warn('Messages load error:', err);
    }
  };

  useEffect(() => {
    if (activeContact?.id) {
      isUserAtBottomRef.current = true;
      loadMessages(activeContact.id);
      setTimeout(() => scrollToBottom(false), 50);
    }
  }, [activeContact?.id]);

  useEffect(() => {
    const contactInterval = setInterval(() => {
      loadContacts();
    }, 3000);
    return () => clearInterval(contactInterval);
  }, []);

  useEffect(() => {
    if (!activeContact?.id) return;
    const interval = setInterval(() => {
      loadMessages(activeContact.id);
    }, 2000);
    return () => clearInterval(interval);
  }, [activeContact?.id]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeContact) return;

    const textToSend = inputText.trim();
    setInputText('');

    const currentUserId = normalizeUserId(user);
    const currentUserName = user?.name || (user?.username === 'superadmin' ? 'Super Administrator' : 'Portal User');
    const currentUserRole = user?.role || 'user';

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const nowTs = Date.now();
    const msgId = 'MSG_' + nowTs;

    // 🌟 REAL PRESENCE CHECK: If receiver is online -> delivered=true (Double Tick); if offline -> delivered=false (Single Tick)!
    const isReceiverOnline = checkUserIsOnline(activeContact);

    const localMsg = {
      messageId: msgId,
      senderId: currentUserId,
      senderName: currentUserName,
      senderRole: currentUserRole,
      receiverId: activeContact.id,
      receiverName: activeContact.name,
      receiverRole: activeContact.role || 'user',
      text: textToSend,
      timestamp: timeNow,
      delivered: isReceiverOnline, // Single tick if receiver offline, Double tick if online!
      read: false,
      createdAt: nowTs,
    };

    // 1. Optimistic update (with duplicate check)
    setMessages((prev) => {
      if (prev.some((m) => isSameMessage(m, localMsg))) return prev;
      return [...prev, localMsg];
    });
    isUserAtBottomRef.current = true;
    setTimeout(() => scrollToBottom(true), 30);

    // 2. 🌟 IMMEDIATELY MOVE THIS PERSON TO TOP OF THE LEFT-SIDE CONTACTS LIST!
    setContacts((prev) => {
      const updatedContact = {
        ...activeContact,
        status: isReceiverOnline ? 'online' : 'offline',
        lastMessageText: textToSend,
        lastMessageTime: timeNow,
        lastMessageTimestamp: nowTs,
      };
      const others = prev.filter((c) => c.id !== activeContact.id);
      return [updatedContact, ...others];
    });
    setActiveContact((prev) =>
      prev
        ? {
            ...prev,
            status: isReceiverOnline ? 'online' : 'offline',
            lastMessageText: textToSend,
            lastMessageTime: timeNow,
            lastMessageTimestamp: nowTs,
          }
        : prev
    );

    // 3. Persist to local message storage
    try {
      const threadKey = [currentUserId, activeContact.id].sort().join('__');
      const localStore = JSON.parse(localStorage.getItem('ssv_chat_messages_store') || '{}');
      if (!localStore[threadKey]) localStore[threadKey] = [];
      if (!localStore[threadKey].some((m) => isSameMessage(m, localMsg))) {
        localStore[threadKey].push(localMsg);
      }
      localStorage.setItem('ssv_chat_messages_store', JSON.stringify(localStore));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

    // 4. Send to API backend with messageId
    try {
      const res = await api.sendMessage({
        messageId: msgId,
        receiverId: activeContact.id,
        receiverName: activeContact.name,
        receiverRole: activeContact.role,
        text: textToSend,
      });

      if (res && res.success && res.data) {
        setMessages((prev) =>
          prev.map((m) => (isSameMessage(m, localMsg) ? { ...m, ...res.data } : m))
        );
        try {
          const threadKey = [currentUserId, activeContact.id].sort().join('__');
          const localStore = JSON.parse(localStorage.getItem('ssv_chat_messages_store') || '{}');
          if (localStore[threadKey]) {
            localStore[threadKey] = localStore[threadKey].map((m) =>
              isSameMessage(m, localMsg) ? { ...m, ...res.data } : m
            );
            localStorage.setItem('ssv_chat_messages_store', JSON.stringify(localStore));
          }
        } catch (e) {}
      }
    } catch (err) {
      console.warn('Send message API notice (saved locally):', err);
    }
  };

  // Connect a Person from Directory (Puts person at TOP of list)
  const handleConnectPerson = (person) => {
    if (!person || !person.id) return;

    const isOnline = checkUserIsOnline(person);
    const personWithTs = {
      ...person,
      status: isOnline ? 'online' : 'offline',
      lastMessageTimestamp: Date.now(),
    };

    // Save to custom contacts in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('ssv_custom_chat_contacts') || '[]');
      if (!existing.some((c) => c.id === person.id)) {
        existing.unshift(personWithTs);
        localStorage.setItem('ssv_custom_chat_contacts', JSON.stringify(existing));
      }
    } catch (e) {}

    // Add to contacts state at the VERY TOP of the left list!
    setContacts((prev) => {
      const others = prev.filter((c) => c.id !== person.id);
      return [personWithTs, ...others];
    });

    // Make active
    setActiveContact(personWithTs);
    setShowConnectModal(false);
    setShowMobileChat(true);

    // Focus message input
    setTimeout(() => {
      if (messageInputRef.current) {
        messageInputRef.current.focus();
      }
      scrollToBottom(false);
    }, 100);
  };

  // Filtered Contacts in Sidebar
  const filteredContacts = contacts.filter((c) => {
    if (!searchContact.trim()) return true;
    const term = searchContact.toLowerCase();
    return (
      (c.name && c.name.toLowerCase().includes(term)) ||
      (c.role && c.role.toLowerCase().includes(term)) ||
      (c.subtext && c.subtext.toLowerCase().includes(term)) ||
      (c.schoolName && c.schoolName.toLowerCase().includes(term))
    );
  });

  // Filtered Directory for Modal
  const campusDirectory = getCampusDirectory();
  const filteredDirectory = campusDirectory.filter((p) => {
    // Category filter
    if (connectCategoryFilter !== 'all') {
      const cat = (p.category || p.role || '').toLowerCase();
      if (!cat.includes(connectCategoryFilter.toLowerCase())) return false;
    }
    // Search query
    if (connectSearchQuery.trim()) {
      const q = connectSearchQuery.toLowerCase();
      return (
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.role && p.role.toLowerCase().includes(q)) ||
        (p.subtext && p.subtext.toLowerCase().includes(q)) ||
        (p.email && p.email.toLowerCase().includes(q)) ||
        (p.phone && p.phone.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div
      className={`messaging-layout ${showMobileChat ? 'show-mobile-chat' : 'show-mobile-sidebar'}`}
      style={{
        display: 'grid',
        gridTemplateColumns: '290px 1fr',
        gap: '16px',
        backgroundColor: '#ffffff',
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        minHeight: '580px',
      }}
    >
      {/* 👥 PERMANENTLY VISIBLE PERSON LIST / CONTACTS SIDEBAR */}
      <div
        className="messaging-sidebar"
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid #e2e8f0',
          paddingRight: '14px',
          minWidth: '270px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', gap: '8px' }}>
          <div>
            <h4 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--color-primary, #1e3a8a)', margin: 0 }}>
              Campus People & Chats
            </h4>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
              {filteredContacts.length} in List
            </span>
          </div>

          {/* 🌟 1-CLICK CONNECT NEW PERSON BUTTON */}
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => {
              setConnectSearchQuery('');
              setShowConnectModal(true);
            }}
            title="Connect with a new teacher, student, parent, or staff member"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '6px 11px',
              borderRadius: '7px',
              background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
              color: '#ffffff',
              border: 'none',
              boxShadow: '0 2px 6px rgba(37, 99, 235, 0.3)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
            + Connect Person
          </button>
        </div>

        {/* SEARCH CONTACTS INPUT */}
        <div style={{ marginBottom: '12px', position: 'relative' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search person by name, role..."
            value={searchContact}
            onChange={(e) => setSearchContact(e.target.value)}
            style={{ fontSize: '0.82rem', padding: '7px 12px', margin: 0, height: '36px', borderRadius: '8px' }}
          />
          {searchContact && (
            <button
              type="button"
              onClick={() => setSearchContact('')}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* PERSONS LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '480px' }}>
          {filteredContacts.length === 0 ? (
            <div style={{ fontSize: '0.82rem', color: '#64748b', textAlign: 'center', padding: '24px 12px', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
              <p style={{ margin: '0 0 8px', fontWeight: 600 }}>No conversations found</p>
              <button
                type="button"
                className="btn btn-sm btn-outline"
                onClick={() => setShowConnectModal(true)}
                style={{ fontSize: '0.75rem', fontWeight: 700 }}
              >
                + Connect a Person
              </button>
            </div>
          ) : (
            filteredContacts.map((c) => {
              const hasUnread = c.unreadCount > 0 && activeContact?.id !== c.id;
              const isOnline = checkUserIsOnline(c);
              const badgeStyle = getRoleBadgeStyle(c.role);

              return (
                <button
                  key={c.id}
                  type="button"
                  className={`contact-item-btn ${activeContact?.id === c.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveContact({ ...c, status: isOnline ? 'online' : 'offline' });
                    setShowMobileChat(true);
                  }}
                  style={{
                    backgroundColor: activeContact?.id === c.id ? '#eff6ff' : hasUnread ? '#f0fdf4' : undefined,
                    borderLeft: activeContact?.id === c.id ? '3px solid #2563eb' : hasUnread ? '3px solid #16a34a' : undefined,
                  }}
                >
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <EmptyAvatar size={38} />
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: '11px',
                        height: '11px',
                        borderRadius: '50%',
                        backgroundColor: isOnline ? '#22c55e' : '#94a3b8',
                        border: '2px solid #fff',
                        boxShadow: isOnline ? '0 0 5px rgba(34, 197, 94, 0.7)' : 'none',
                      }}
                      title={isOnline ? 'Online' : 'Offline'}
                    />
                  </div>

                  <div style={{ textAlign: 'left', overflow: 'hidden', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.85rem', color: hasUnread ? '#15803d' : '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {c.name}
                      </strong>
                      {hasUnread && (
                        <span
                          style={{
                            backgroundColor: '#22c55e',
                            color: '#ffffff',
                            borderRadius: '12px',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            padding: '1px 6px',
                            minWidth: '18px',
                            textAlign: 'center',
                          }}
                        >
                          {c.unreadCount} NEW
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          background: badgeStyle.bg,
                          color: badgeStyle.color,
                          border: `1px solid ${badgeStyle.border}`,
                          fontWeight: 700,
                        }}
                      >
                        {c.role ? c.role.toUpperCase() : 'USER'}
                      </span>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 600,
                          color: isOnline ? '#16a34a' : '#94a3b8',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                        }}
                      >
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: isOnline ? '#22c55e' : '#94a3b8',
                            display: 'inline-block',
                          }}
                        />
                        {isOnline ? 'Online' : 'Offline'}
                      </span>
                    </div>

                    {c.lastMessageText && (
                      <div
                        style={{
                          fontSize: '0.74rem',
                          color: '#64748b',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          marginTop: '3px',
                        }}
                      >
                        {c.lastMessageText}
                      </div>
                    )}
                  </div>

                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" className="mobile-chevron">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* 💬 CHAT PANE (ALWAYS VISIBLE SIDE-BY-SIDE WITH PERSON LIST) */}
      <div
        className="messaging-chat-pane"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '560px',
          minWidth: 0,
        }}
      >
        {activeContact ? (
          <>
            {/* CHAT HEADER */}
            {(() => {
              const activeIsOnline = checkUserIsOnline(activeContact);
              return (
                <div
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px 8px 0 0',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm mobile-chat-back-btn"
                      onClick={() => setShowMobileChat(false)}
                      style={{ padding: '6px 10px', display: 'none', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}
                      title="Back to Persons list"
                    >
                      &larr; Persons
                    </button>
                    <EmptyAvatar size={38} />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <strong style={{ fontSize: '0.94rem', color: 'var(--color-primary, #1e3a8a)', display: 'block' }}>
                          {activeContact.name}
                        </strong>
                        <span
                          style={{
                            fontSize: '0.66rem',
                            fontWeight: 700,
                            padding: '1px 6px',
                            borderRadius: '4px',
                            ...getRoleBadgeStyle(activeContact.role),
                          }}
                        >
                          {activeContact.role ? activeContact.role.toUpperCase() : 'USER'}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '1px' }}>
                        <span>{activeContact.subtext || activeContact.schoolName || 'Campus Contact'}</span>
                        <span>•</span>
                        {activeIsOnline ? (
                          <span style={{ color: '#16a34a', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block', boxShadow: '0 0 5px #22c55e' }}></span>
                            Online
                          </span>
                        ) : (
                          <span style={{ color: '#94a3b8', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#94a3b8', display: 'inline-block' }}></span>
                            Offline
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm mobile-close-chat-btn"
                      onClick={() => setShowMobileChat(false)}
                      style={{ display: 'none', padding: '4px 10px', fontSize: '0.78rem' }}
                    >
                      List &larr;
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* MESSAGES SCROLL CONTAINER */}
            <div
              ref={chatContainerRef}
              onScroll={handleScroll}
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {messages.length === 0 ? (
                <div style={{ margin: 'auto', textAlign: 'center', color: '#64748b', fontSize: '0.88rem', maxWidth: '340px' }}>
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      backgroundColor: '#eff6ff',
                      color: '#2563eb',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '12px',
                    }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <strong style={{ display: 'block', color: '#1e293b', marginBottom: '4px' }}>
                    Start conversation with {activeContact.name}
                  </strong>
                  <span>Type a message below to connect and chat in real-time.</span>
                </div>
              ) : (
                messages.map((m, idx) => {
                  const currentMyId = normalizeUserId(user);
                  const msgSender = normalizeUserId(m.senderId);
                  const isMe = msgSender === currentMyId || m.senderId === currentMyId || m.senderId === user?.userId;

                  return (
                    <div key={idx} className={`chat-bubble ${isMe ? 'outgoing' : 'incoming'}`}>
                      <div style={{ fontWeight: 600, fontSize: '0.74rem', marginBottom: '3px', opacity: 0.85 }}>
                        {isMe ? 'You' : m.senderName}
                      </div>
                      <div>{m.text}</div>
                      <div className="chat-meta">
                        <span>{m.timestamp}</span>
                        {/* 🌟 ACCURATE SINGLE TICK (Offline) & DOUBLE TICK (Online / Read) */}
                        {isMe && (
                          <span style={{ fontSize: '0.82rem', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', marginLeft: '4px' }}>
                            {m.read ? (
                              <span style={{ color: '#38bdf8' }} title="Read by recipient">✓✓</span>
                            ) : m.delivered ? (
                              <span style={{ color: 'rgba(255, 255, 255, 0.85)' }} title="Delivered (Recipient is online)">✓✓</span>
                            ) : (
                              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }} title="Sent (Recipient is currently offline)">✓</span>
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}

              {isTyping && (
                <div className="typing-indicator">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              )}
            </div>

            {/* MESSAGE INPUT FORM */}
            <form
              onSubmit={handleSend}
              style={{
                padding: '12px 14px',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                gap: '10px',
                backgroundColor: '#f8fafc',
                borderRadius: '0 0 8px 8px',
              }}
            >
              <input
                ref={messageInputRef}
                type="text"
                className="form-control"
                placeholder={`Type a message to ${activeContact.name}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={{ margin: 0, padding: '10px 14px', fontSize: '0.9rem', borderRadius: '8px' }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  padding: '0 22px',
                  whiteSpace: 'nowrap',
                  borderRadius: '8px',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
                  boxShadow: '0 2px 6px rgba(37, 99, 235, 0.3)',
                }}
              >
                Send
              </button>
            </form>
          </>
        ) : (
          <div style={{ margin: 'auto', textAlign: 'center', color: '#64748b', padding: '32px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#f1f5f9',
                color: '#64748b',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h4 style={{ margin: '0 0 6px', color: '#1e293b', fontWeight: 800 }}>Select a Conversation</h4>
            <p style={{ margin: '0 0 16px', fontSize: '0.86rem' }}>
              Choose a contact from the left list or connect with any teacher, student, or parent.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowConnectModal(true)}
              style={{ fontWeight: 700, padding: '8px 18px', borderRadius: '8px' }}
            >
              + Connect Person
            </button>
          </div>
        )}
      </div>

      {/* 🌟 MODAL: CAMPUS DIRECTORY & CONNECT PERSON (CLEAN DIRECTORY ONLY) */}
      {showConnectModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowConnectModal(false);
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '680px',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
              animation: 'fadeIn 0.2s ease',
            }}
          >
            {/* MODAL HEADER */}
            <div
              style={{
                padding: '18px 22px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'inline-flex', padding: '6px', borderRadius: '8px', background: '#dbeafe', color: '#1d4ed8' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <line x1="20" y1="8" x2="20" y2="14" />
                      <line x1="23" y1="11" x2="17" y2="11" />
                    </svg>
                  </span>
                  Campus People Directory
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                  Select any registered Teacher, Student, Parent, Principal, or Staff to start chatting.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowConnectModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.25rem',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '6px',
                }}
              >
                ✕
              </button>
            </div>

            {/* MODAL CONTENT BODY */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '18px 22px' }}>
              {/* SEARCH BAR & CATEGORY PILLS */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ position: 'relative', marginBottom: '10px' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name, role (Teacher, Student, Parent), subject, or class..."
                    value={connectSearchQuery}
                    onChange={(e) => setConnectSearchQuery(e.target.value)}
                    style={{
                      fontSize: '0.86rem',
                      padding: '9px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      width: '100%',
                    }}
                  />
                  {connectSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setConnectSearchQuery('')}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* ROLE FILTER PILLS */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'all', label: 'All Roles' },
                    { id: 'teacher', label: 'Teachers' },
                    { id: 'student', label: 'Students' },
                    { id: 'parent', label: 'Parents' },
                    { id: 'principal', label: 'Principals' },
                    { id: 'admin', label: 'Admins & Staff' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setConnectCategoryFilter(cat.id)}
                      style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        border: '1px solid',
                        borderColor: connectCategoryFilter === cat.id ? '#2563eb' : '#e2e8f0',
                        backgroundColor: connectCategoryFilter === cat.id ? '#eff6ff' : '#ffffff',
                        color: connectCategoryFilter === cat.id ? '#1d4ed8' : '#64748b',
                        cursor: 'pointer',
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* DIRECTORY PERSONS LIST */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '380px', overflowY: 'auto' }}>
                {filteredDirectory.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '36px 16px', color: '#64748b' }}>
                    <p style={{ margin: '0 0 6px', fontWeight: 600 }}>No members matched your search</p>
                    <span style={{ fontSize: '0.8rem' }}>
                      Try clearing filters or search query.
                    </span>
                  </div>
                ) : (
                  filteredDirectory.map((person) => {
                    const badgeStyle = getRoleBadgeStyle(person.role);
                    const isAlreadyActive = activeContact?.id === person.id;
                    const isOnline = checkUserIsOnline(person);

                    return (
                      <div
                        key={person.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1px solid #e2e8f0',
                          backgroundColor: '#ffffff',
                          transition: 'all 0.15s ease',
                          gap: '12px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                          <div style={{ position: 'relative', flexShrink: 0 }}>
                            <EmptyAvatar size={40} />
                            <span
                              style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: isOnline ? '#22c55e' : '#94a3b8',
                                border: '2px solid #fff',
                              }}
                            />
                          </div>
                          <div style={{ overflow: 'hidden' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <strong style={{ fontSize: '0.88rem', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {person.name}
                              </strong>
                              <span
                                style={{
                                  fontSize: '0.66rem',
                                  fontWeight: 700,
                                  padding: '1px 6px',
                                  borderRadius: '4px',
                                  background: badgeStyle.bg,
                                  color: badgeStyle.color,
                                  border: `1px solid ${badgeStyle.border}`,
                                }}
                              >
                                {person.role}
                              </span>
                              <span
                                style={{
                                  fontSize: '0.68rem',
                                  fontWeight: 600,
                                  color: isOnline ? '#16a34a' : '#94a3b8',
                                }}
                              >
                                {isOnline ? 'Online' : 'Offline'}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                              {person.subtext || person.schoolName}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleConnectPerson(person)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            padding: '6px 14px',
                            borderRadius: '7px',
                            background: isAlreadyActive ? '#e2e8f0' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: isAlreadyActive ? '#475569' : '#ffffff',
                            border: 'none',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            boxShadow: isAlreadyActive ? 'none' : '0 2px 5px rgba(16, 185, 129, 0.3)',
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                          {isAlreadyActive ? 'Active Chat' : 'Start Chat'}
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div
              style={{
                padding: '12px 22px',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f8fafc',
              }}
            >
              <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                Total {campusDirectory.length} campus members available
              </span>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => setShowConnectModal(false)}
                style={{ fontSize: '0.8rem', padding: '5px 14px' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
