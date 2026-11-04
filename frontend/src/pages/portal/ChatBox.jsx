import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

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
  return idMap[rawId] || rawId || 'USR001';
};

export default function ChatBox() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [searchContact, setSearchContact] = useState('');
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);

  const chatContainerRef = useRef(null);
  const isUserAtBottomRef = useRef(true);

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

  const loadContacts = async () => {
    try {
      const res = await api.getContacts();
      if (res && res.success && Array.isArray(res.data)) {
        setContacts(res.data);
        setActiveContact((prev) => {
          if (prev) {
            const found = res.data.find((c) => c.id === prev.id);
            return found || prev;
          }
          return res.data.length > 0 ? res.data[0] : null;
        });
      }
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
      const res = await api.getMessages(contactId);
      if (res && res.success && Array.isArray(res.data)) {
        setMessages((prev) => {
          if (prev.length === res.data.length) {
            const prevLast = prev[prev.length - 1];
            const newLast = res.data[res.data.length - 1];
            const prevFirst = prev[0];
            const newFirst = res.data[0];
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
          return res.data;
        });
      }
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
    }, 2500);
    return () => clearInterval(contactInterval);
  }, []);

  useEffect(() => {
    if (!activeContact?.id) return;
    const interval = setInterval(() => {
      loadMessages(activeContact.id);
    }, 1500);
    return () => clearInterval(interval);
  }, [activeContact?.id]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeContact) return;

    const textToSend = inputText.trim();
    setInputText('');

    const currentUserId = normalizeUserId(user);
    const currentUserName = user?.name || 'Super Administrator';
    const currentUserRole = user?.role || 'superadmin';

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const localMsg = {
      messageId: 'TEMP-' + Date.now(),
      senderId: currentUserId,
      senderName: currentUserName,
      senderRole: currentUserRole,
      receiverId: activeContact.id,
      receiverName: activeContact.name,
      text: textToSend,
      timestamp: timeNow,
      delivered: activeContact.status === 'online',
      read: false,
    };

    setMessages((prev) => [...prev, localMsg]);
    isUserAtBottomRef.current = true;
    setTimeout(() => scrollToBottom(true), 30);

    try {
      const res = await api.sendMessage({
        receiverId: activeContact.id,
        receiverName: activeContact.name,
        receiverRole: activeContact.role,
        text: textToSend,
      });

      if (res && res.success && res.data) {
        setMessages((prev) =>
          prev.map((m) => (m.messageId === localMsg.messageId ? res.data : m))
        );
      }
    } catch (err) {
      console.error('Send message error:', err);
    }
  };

  const filteredContacts = contacts.filter((c) => {
    if (!searchContact.trim()) return true;
    const term = searchContact.toLowerCase();
    return (
      c.name.toLowerCase().includes(term) ||
      (c.role && c.role.toLowerCase().includes(term)) ||
      (c.schoolName && c.schoolName.toLowerCase().includes(term))
    );
  });

  return (
    <div className={`messaging-layout ${showMobileChat ? 'show-mobile-chat' : 'show-mobile-sidebar'}`}>
      <div className="messaging-sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)', margin: 0 }}>
            Contacts & Chats
          </h4>
          <span className="badge badge-info" style={{ fontSize: '0.72rem' }}>
            {filteredContacts.length} Contacts
          </span>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search contacts by name, role..."
            value={searchContact}
            onChange={(e) => setSearchContact(e.target.value)}
            style={{ fontSize: '0.82rem', padding: '6px 12px', margin: 0, height: '34px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '440px' }}>
          {filteredContacts.length === 0 ? (
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', textAlign: 'center', padding: '16px 0' }}>
              No contacts found
            </div>
          ) : (
            filteredContacts.map((c) => {
              const hasUnread = c.unreadCount > 0 && activeContact?.id !== c.id;
              const isOnline = c.status === 'online';
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`contact-item-btn ${activeContact?.id === c.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveContact(c);
                    setShowMobileChat(true);
                  }}
                  style={{
                    backgroundColor: hasUnread ? '#f0fdf4' : undefined,
                    borderLeft: hasUnread ? '3px solid #16a34a' : undefined,
                  }}
                >
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img
                      src={c.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                      alt={c.name}
                      style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                    />
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
                      <strong style={{ fontSize: '0.84rem', color: hasUnread ? '#15803d' : '#1e293b', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
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
                            boxShadow: '0 1px 4px rgba(34, 197, 94, 0.4)'
                          }}
                        >
                          {c.unreadCount} NEW
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
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

      <div className="messaging-chat-pane" style={{ display: 'flex', flexDirection: 'column', height: '520px' }}>
        {activeContact && (
          <div
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#f8fafc',
              borderRadius: '8px 8px 0 0',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                className="btn btn-outline btn-sm mobile-chat-back-btn"
                onClick={() => setShowMobileChat(false)}
                style={{ padding: '6px 10px', display: 'none', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}
                title="Back to Contacts list"
              >
                &larr; Contacts
              </button>
              <img
                src={activeContact.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                alt={activeContact.name}
                style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
              />
              <div>
                <strong style={{ fontSize: '0.92rem', color: 'var(--color-primary)', display: 'block' }}>
                  {activeContact.name}
                </strong>
                <div style={{ fontSize: '0.74rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '1px' }}>
                  <span>{activeContact.role ? activeContact.role.toUpperCase() : 'USER'}</span>
                  <span>•</span>
                  {activeContact.status === 'online' ? (
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

            <button
              type="button"
              className="btn btn-outline btn-sm mobile-close-chat-btn"
              onClick={() => setShowMobileChat(false)}
              style={{ display: 'none', padding: '4px 10px', fontSize: '0.78rem' }}
            >
              List &larr;
            </button>
          </div>
        )}

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
            <div style={{ margin: 'auto', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
              No messages yet with {activeContact ? activeContact.name : 'this user'}. Start the conversation!
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
                    {isMe && (
                      <span style={{ fontSize: '0.8rem', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>
                        {m.read ? (
                          <span style={{ color: '#38bdf8' }} title="Read">✓✓</span>
                        ) : m.delivered ? (
                          <span style={{ color: 'rgba(255, 255, 255, 0.75)' }} title="Delivered">✓✓</span>
                        ) : (
                          <span style={{ color: 'rgba(255, 255, 255, 0.65)' }} title="Sent">✓</span>
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
            type="text"
            className="form-control"
            placeholder={`Type message to ${activeContact ? activeContact.name : 'contact'}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ margin: 0, padding: '10px 14px', fontSize: '0.9rem' }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '0 20px', whiteSpace: 'nowrap' }}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
