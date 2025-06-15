import React from 'react';
import styles from '../styles/chat.module.css';
import { useAuth } from '../context/AuthContext.jsx';

const ChatItem = ({ conversation, selectedConversation, setSelectedConversation }) => {
  const { user } = useAuth();

  const getOtherParticipant = (conversation) => {
    if (!conversation || conversation.isGroup) return null;
    return conversation.participants.find(p => p._id !== user._id);
  };

  const otherUser = getOtherParticipant(conversation);

  const getDisplayName = () => {
    if (conversation.isGroup) {
      return conversation.groupName || 'Group Chat';
    }
    return otherUser?.username || 'Unknown User';
  };

  const getLastMessagePreview = () => {
    if (!conversation.lastMessage) return '';
    
    const isOwnMessage = conversation.lastMessage.sender?._id === user._id;
    const messageText = conversation.lastMessage.content || '';
    
    if (isOwnMessage) {
      return `You: ${messageText}`;
    }
    return messageText;
  };

  return (
    <div
      onClick={() => setSelectedConversation(conversation)}
      className={`${styles.chatItem} ${selectedConversation?._id === conversation._id ? styles.activeChatItem : ''}`}
    >
      <div className={styles.chatItemAvatar}>
        {conversation.isGroup ? (
          <div className={styles.groupAvatarContainer}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
          </div>
        ) : (
          <div className={styles.singleAvatarContainer}>
            {otherUser?.avatar ? (
              <img 
                src={otherUser.avatar} 
                alt={otherUser.username || 'User'} 
                className={styles.chatItemAvatarImage}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <svg 
              viewBox="0 0 24 24" 
              fill="currentColor"
              style={{ display: otherUser?.avatar ? 'none' : 'block' }}
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        )}
      </div>
      
      <div className={styles.chatItemInfo}>
        <div className={styles.chatItemName}>
          {getDisplayName()}
        </div>
        <div className={styles.chatItemPreview}>
          {getLastMessagePreview()}
        </div>
      </div>
      
      {conversation.unreadCount > 0 && (
        <div className={styles.unreadBadge}>
          {conversation.unreadCount}
        </div>
      )}
    </div>
  );
};

export default ChatItem;
