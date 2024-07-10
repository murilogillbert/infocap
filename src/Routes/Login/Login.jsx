import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const checkUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const requestBody = {
        "login": email,
        "password": password
      };

      const response = await axios.post('https://infocap-back.onrender.com/auth/login', requestBody);

      if (response.status === 200) {
        const { token } = response.data;
        console.log('Autenticação bem-sucedida, token:', token);
        // Armazenar o token no localStorage ou state global e redirecionar o usuário
      } else {
        console.log('Dados inválidos fornecidos');
        setError('Dados inválidos fornecidos.');
      }
    } catch (error) {
      if (error.response) {
        // Erro foi retornado pelo servidor
        switch (error.response.status) {
          case 400:
            setError('Dados inválidos fornecidos.');
            break;
          case 401:
            setError('Credenciais inválidas.');
            break;
          case 404:
            setError('Usuário não encontrado.');
            break;
          default:
            setError('Erro interno do servidor. Tente novamente mais tarde.');
        }
      } else {
        // Erro de rede ou outro tipo de erro
        setError('Erro na conexão. Verifique sua rede e tente novamente.');
      }
    }
  };

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <form onSubmit={checkUser}>
        {error && <label className={styles.error}>{error}</label>}
        <label>Email</label>
        <input
          type="text"
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

      <span className={styles.cadastro}>Não possui conta? <Link to="/Cadastro">Cadastre-se</Link></span>
      <span className={styles.cadastro}>Esqueceu sua senha? <Link to="/resetPassword">Mude aqui</Link></span>
    </div>
  );
};

export default Login;
