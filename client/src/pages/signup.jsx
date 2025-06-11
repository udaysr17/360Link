import React, { useState, useEffect } from 'react';
import styles from '../styles/login.module.css';
import toast , {Toaster} from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername]= useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [avatar, setAvatar] = useState();
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  
  const submitHandler = async(e)=>{
    e.preventDefault();
    setLoading(true);
    console.log("i'm submitting....")
    if(!username || !email || !password){
      toast.error('Please fill all the Fields');
      setLoading(false);
      return;
    }
    console.log(username, email , password, avatar);
    try{
      const config = {
        header : {
          "Content-type" : "application/json"
        }
      }
      const response = await axios.post("api/signup", {
        username,
        email,
        password,
        avatar
      }, config);
      console.log(response);
      setLoading(false);
      toast.success(response.data.message);
      navigate('/chat')
    }
    catch (error) {
      const message = error.response?.data?.message;
      toast.error(message);
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1 className={styles.logo}>360Link</h1>
          <h2 className={styles.title}>Create Account</h2>
          <p className={styles.subtitle}>Sign up to get started:</p>
        </div>
        <form onSubmit={submitHandler} className={styles.form} autoComplete='on'>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>Username<span style={{color: 'red'}}>*</span></label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              className={styles.input}
              placeholder="Your username"
              required
              disabled={loading}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email Address<span style={{color: 'red'}}>*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              className={styles.input}
              placeholder="johndoe@360link.com"
              required
              disabled={loading}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password<span style={{color: 'red'}}>*</span></label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              className={styles.input}
              placeholder="Case Sensitive"
              required
              disabled={loading}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="avatar" className={styles.label}>Avatar (optional)</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={(e)=> setAvatar(e.target.value)}
              className={styles.input}
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            className={`${styles.signInButton} ${loading ? styles.loading : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          <div className={styles.forgotPassword}>
            <a href="/login" className={styles.forgotLink}>Already have an account? Log in</a>
          </div>
        </form>
        <div className={styles.footer}>
          <p className={styles.footerText}>
            By signing up, you agree to our <a href="#" className={styles.createAccountLink}>Terms of Service</a>.
          </p>
        </div>
      </div>
      <div className={styles.bottomFooter}>
        <p className={styles.copyright}>
          © 2025 360Link. Created by <span className={styles.poweredBy}>Uday</span>.
        </p>
      </div>
    </div>
  );
};

export default Signup; 