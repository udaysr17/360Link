import React from 'react';

const defaultAvatar =
  'https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/amongus.svg'; // You can use any default avatar image

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
  minWidth: 340,
  maxWidth: 380,
  boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
  textAlign: 'center',
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

const avatarStyle = {
  width: 140,
  height: 140,
  borderRadius: '50%',
  objectFit: 'cover',
  margin: '24px auto',
  display: 'block',
  background: '#f5f5f5',
  border: '4px solid #fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
};

const usernameStyle = {
  fontSize: '2.6rem',
  fontWeight: 400,
  margin: '0 0 12px 0',
  color: '#222',
};

const emailStyle = {
  fontSize: '1.6rem',
  color: '#222',
  margin: '32px 0 0 0',
  fontWeight: 300,
};

const buttonStyle = {
  marginTop: 32,
  padding: '10px 28px',
  fontSize: '1.1rem',
  borderRadius: 8,
  border: 'none',
  background: '#f3f6fa',
  color: '#222',
  cursor: 'pointer',
  fontWeight: 500,
};

const ProfileModal = ({ open, onClose, username, email, avatar }) => {
  if (!open) return null;
  return (
    <div style={modalStyle}>
      <div style={cardStyle}>
        <button style={closeStyle} onClick={onClose} aria-label="Close">&times;</button>
        <div style={usernameStyle}>{username}</div>
        <img
          src={avatar || defaultAvatar}
          alt="avatar"
          style={avatarStyle}
        />
        <div style={emailStyle}>Email: {email}</div>
        <button style={buttonStyle} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProfileModal; 