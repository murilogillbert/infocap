import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';

const Login = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function checkUser(e) {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem('user')) || { user: [] };

    const user = users.user.find(u => u.email === email && u.senha === password);

    if (user) {
      if (user.autenticado === true) {
        alert('Login está ok');
        window.location.href = '/MeusCursos';
      } else {
        setError('Usuário não verificado');
      }
    } else {
      setError('Email ou senha incorretos.');
    }
  }

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <form onSubmit={checkUser}>
        {error && <label className={styles.error}>{error}</label>}
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      
      <span className={styles.cadastro}>Não possue conta?<Link to="/Cadastro">Cadastre-se</Link></span>
    </div>
  );
};

export default Login;
