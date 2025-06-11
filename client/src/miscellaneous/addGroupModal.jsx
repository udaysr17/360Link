import React, { useState } from 'react';

const defaultAvatar = 'https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/amongus.svg';

const usersList = [
  {
    id: 1,
    name: 'Ansul',
    email: 'ansulluharuka@rediffmail.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    name: 'Shourya gupta',
    email: '22ucs202@lnmiit.ac.in',
    avatar: null,
  },
  {
    id: 3,
    name: 'Ansull',
    email: 'ansulluharuka21@gmail.com',
    avatar: 'https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/amongus.svg',
  },
  {
    id: 4,
    name: 'Adit',
    email: 'abcd@gmail.com',
    avatar: null,
  },
];

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.15)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const cardStyle = {
  background: '#fff',
  borderRadius: '12px',
  padding: '40px 32px 32px 32px',
  minWidth: 400,
  maxWidth: 480,
  boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
  textAlign: 'left',
  position: 'relative',
};

const closeStyle = {
  position: 'absolute',
  top: 18,
  right: 18,
  fontSize: 28,
  color: '#444',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
};

const inputStyle = {
  width: '100%',
  fontSize: '1.2rem',
  padding: '12px 16px',
  borderRadius: 8,
  border: '1px solid #d1d5db',
  marginBottom: 16,
  marginTop: 8,
  boxSizing: 'border-box',
};

const userCardStyle = {
  display: 'flex',
  alignItems: 'center',
  background: '#ededed',
  borderRadius: 12,
  padding: '12px 18px',
  marginBottom: 14,
  gap: 18,
};

const avatarStyle = {
  width: 48,
  height: 48,
  borderRadius: '50%',
  objectFit: 'cover',
  background: '#f5f5f5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 600,
  fontSize: 22,
  color: '#fff',
  marginRight: 16,
};

const nameStyle = {
  fontSize: '1.2rem',
  fontWeight: 500,
  marginBottom: 2,
};

const emailStyle = {
  fontSize: '1rem',
  color: '#222',
  margin: 0,
};

const buttonStyle = {
  marginTop: 24,
  padding: '12px 32px',
  fontSize: '1.1rem',
  borderRadius: 8,
  border: 'none',
  background: '#2584e6',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: 500,
  float: 'right',
};

const AddGroupModal = ({ open, onClose }) => {
  const [groupName, setGroupName] = useState('');
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  if (!open) return null;

  // Filter users by search
  const filteredUsers = usersList.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Get initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div style={modalStyle}>
      <div style={cardStyle}>
        <button style={closeStyle} onClick={onClose} aria-label="Close">&times;</button>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 400, marginBottom: 18, textAlign: 'left' }}>Create Group Chat</h1>
        <input
          style={inputStyle}
          type="text"
          placeholder="Chat Name"
          value={groupName}
          onChange={e => setGroupName(e.target.value)}
        />
        <input
          style={{ ...inputStyle, borderColor: '#2584e6' }}
          type="text"
          placeholder="Add Users eg: John, Piyush, Jane"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div>
          {filteredUsers.map((user) => (
            <div key={user.id} style={userCardStyle}>
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} style={avatarStyle} />
              ) : (
                <div style={{ ...avatarStyle, background: '#e74c3c', color: '#fff', justifyContent: 'center' }}>
                  {getInitials(user.name)}
                </div>
              )}
              <div>
                <div style={nameStyle}>{user.name}</div>
                <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 2 }}>Email : <span style={emailStyle}>{user.email}</span></div>
              </div>
            </div>
          ))}
        </div>
        <button style={buttonStyle} onClick={() => {}}>Create Chat</button>
      </div>
    </div>
  );
};

export default AddGroupModal; 