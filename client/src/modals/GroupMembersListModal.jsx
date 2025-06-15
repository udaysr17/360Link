import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GroupMembersListModal = ({ selectedConversation, open, onClose, currentUser }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    console.log('participants in this group', selectedConversation?.participants);
    if (selectedConversation?.participants) {
      setParticipants(selectedConversation.participants);
    }
  }, [selectedConversation]);

  // Get initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };



  if (!open) return null;

  return (
    <div style={modalStyle}>
      <div style={cardStyle}>
        <button style={closeStyle} onClick={onClose} aria-label="Close">&times;</button>
        
        <div style={headerStyle}>
          <h1 style={titleStyle}>Group Members</h1>
          <div style={groupInfoStyle}>
            <div style={groupNameStyle}>{selectedConversation?.conversationName}</div>
            <div style={memberCountStyle}>
              {participants?.length || 0} member{participants?.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        <div style={membersContainerStyle}>
          {participants && participants.length > 0 ? (
            participants.map((member) => {
              const isAdmin = selectedConversation?.groupAdmin === member._id || 
                             selectedConversation?.groupAdmin?._id === member._id;
              const isCurrentUser = member._id === currentUser?._id;
              
              return (
                <div key={member._id} style={memberCardStyle}>
                  <div style={memberInfoStyle}>
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.username} style={avatarStyle} />
                    ) : (
                      <div style={avatarFallbackStyle}>
                        {getInitials(member.username || member.name)}
                      </div>
                    )}
                    
                    <div style={memberDetailsStyle}>
                      <div style={memberNameStyle}>
                        {member.username || member.name}
                        {isCurrentUser && <span style={youTagStyle}>(You)</span>}
                      </div>
                      <div style={memberEmailStyle}>{member.email}</div>
                      {isAdmin && <div style={adminBadgeStyle}>Admin</div>}
                    </div>
                  </div>


                </div>
              );
            })
          ) : (
            <div style={emptyStateStyle}>
              <div style={emptyIconStyle}>👥</div>
              <div style={emptyTextStyle}>No members found</div>
            </div>
          )}
        </div>


      </div>
    </div>
  );
};

// Styles
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
  padding: '24px',
  minWidth: 450,
  maxWidth: 500,
  maxHeight: '80vh',
  boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
};

const closeStyle = {
  position: 'absolute',
  top: 18,
  right: 18,
  fontSize: 28,
  color: '#666',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  zIndex: 1,
};

const headerStyle = {
  marginBottom: 20,
  paddingRight: 40,
};

const titleStyle = {
  fontSize: '1.8rem',
  fontWeight: 600,
  marginBottom: 8,
  color: '#333',
};

const groupInfoStyle = {
  background: '#f8f9fa',
  padding: '12px 16px',
  borderRadius: 8,
  marginBottom: 8,
};

const groupNameStyle = {
  fontSize: '1.1rem',
  fontWeight: 500,
  color: '#2584e6',
  marginBottom: 4,
};

const memberCountStyle = {
  fontSize: '0.9rem',
  color: '#666',
};

const membersContainerStyle = {
  flex: 1,
  overflowY: 'auto',
  marginBottom: 16,
};

const memberCardStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '14px 16px',
  marginBottom: 12,
  background: '#f8f9fa',
  borderRadius: 10,
  border: '1px solid #e9ecef',
};

const memberInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  flex: 1,
};

const avatarStyle = {
  width: 45,
  height: 45,
  borderRadius: '50%',
  objectFit: 'cover',
  marginRight: 14,
};

const avatarFallbackStyle = {
  width: 45,
  height: 45,
  borderRadius: '50%',
  background: '#2584e6',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 600,
  fontSize: '1.1rem',
  marginRight: 14,
};

const memberDetailsStyle = {
  flex: 1,
};

const memberNameStyle = {
  fontSize: '1.1rem',
  fontWeight: 500,
  color: '#333',
  marginBottom: 2,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

const memberEmailStyle = {
  fontSize: '0.9rem',
  color: '#666',
  marginBottom: 4,
};

const youTagStyle = {
  fontSize: '0.8rem',
  color: '#2584e6',
  fontWeight: 400,
};

const adminBadgeStyle = {
  fontSize: '0.75rem',
  background: '#28a745',
  color: '#fff',
  padding: '2px 8px',
  borderRadius: 12,
  fontWeight: 500,
  display: 'inline-block',
};



const emptyStateStyle = {
  textAlign: 'center',
  padding: '40px 20px',
  color: '#666',
};

const emptyIconStyle = {
  fontSize: '3rem',
  marginBottom: 16,
};

const emptyTextStyle = {
  fontSize: '1.1rem',
};

export default GroupMembersListModal;