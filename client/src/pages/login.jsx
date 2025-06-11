import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/login.module.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    //   history.push("/chat");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitHandler();
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1 className={styles.logo}>360Link</h1>
          <h2 className={styles.title}>Account Login</h2>
          <p className={styles.subtitle}>Enter your account info below:</p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className={styles.input}
              placeholder="johndoe@360link.com"
              required
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className={styles.input}
              placeholder="Case Sensitive"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className={`${styles.signInButton} ${loading ? styles.loading : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className={styles.forgotPassword}>
            <a href="#" className={styles.forgotLink}>Forgot Password?</a>
          </div>
        </form>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Need an account? <a href="#" className={styles.createAccountLink}>Create student account.</a>
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

export default Login;