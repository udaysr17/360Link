import React, { useState, useRef, useEffect } from "react";
import styles from '../styles/chat.module.css'
import Sidebar from './Sidebar';
import ProfileModal from "../miscellaneous/profileModal";
import AddGroupModal from "../miscellaneous/addGroupModal";
import { redirect } from "react-router-dom";
import expressAsyncHandler from "express-async-handler";

const Chat = ()=> {
  
  const handleLogout = expressAsyncHandler(async()=>{
      await axios.post('/api/logout');
      setDropdownOpen(false);
      
  })
  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        {/* Top Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>Chat</h1>
            <div className={styles.searchBox}>
              <svg className={styles.searchIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
              <input 
                type="text" 
                placeholder="search for users"
                className={styles.searchInput}
              />
            </div>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.username}>username</span>
            <button
              className={styles.avatar}
              style={{border: 'none', background: 'none', padding: 0, cursor: 'pointer', position: 'relative'}}
              onClick={() => setDropdownOpen((open) => !open)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </button>
            {/* Dropdown menu */}
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                style={{
                  position: 'absolute',
                  top: 60,
                  right: 32,
                  background: '#fff',
                  borderRadius: 12,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                  minWidth: 180,
                  zIndex: 100,
                  border: '1px solid #e5e7eb',
                  padding: 0,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    padding: '18px 20px',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    color : '#222',
                    borderBottom: '1px solid #e5e7eb',
                  }}
                  onClick={() => {
                    setProfileOpen(true);
                    setDropdownOpen(false);
                  }}
                >
                  My Profile
                </div>
                <div
                  style={{
                    padding: '18px 20px',
                    color : '#222',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </header>
        <div className={styles.main}>
          {/* Center Section - Chat */}
          <main className={styles.chatSection}>
            <div className={styles.chatHeader}>
              <h2 className={styles.chatName}>{selectedChat}</h2>
            </div>
            
            <div className={styles.messagesArea}>
              {(messages[selectedChat] || []).map((msg) => (
                <div key={msg.id} className={`${styles.message} ${msg.isOwn ? styles.ownMessage : styles.otherMessage}`}>
                  <div className={styles.messageContent}>
                    <div className={styles.messageBubble}>
                      <p>{msg.text}</p>
                    </div>
                    <div className={styles.messageAvatar}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.messageInputArea}>
              <input
                type="text"
                placeholder="Write your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className={styles.messageInput}
              />
              <button onClick={handleSendMessage} className={styles.sendButton}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </main>

          {/* Right Section - My Chats */}
          <aside className={styles.rightPanel}>
            <div className={styles.rightHeader}>
              <h2 className={styles.sectionTitle}>My Chats</h2>
              <div className={styles.newGroupRow}>
                <span>New Group Chat</span>
                <button className={styles.addButton} onClick={() => setGroupModalOpen(true)}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className={styles.chatList}>
              {chats.map((chat) => (
                <div
                  key={chat.name}
                  onClick={() => setSelectedChat(chat.name)}
                  className={`${styles.chatItem} ${selectedChat === chat.name ? styles.activeChatItem : ''}`}
                >
                  <div className={styles.chatItemName}>{chat.name}</div>
                  {chat.lastMessage && (
                    <div className={styles.chatItemPreview}>{chat.lastMessage}</div>
                  )}
                </div>
              ))}
            </div>
          </aside>
        </div>
        <ProfileModal
          open={profileOpen}
          onClose={() => setProfileOpen(false)}
          username={user.username}
          email={user.email}
          avatar={user.avatar}
        />
        <AddGroupModal
          open={groupModalOpen}
          onClose={() => setGroupModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default Chat