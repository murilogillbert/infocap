import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext';  // Importar o contexto de autenticação

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login: authenticate } = useAuth();  // Usar a função de login do contexto
  const navigate = useNavigate();  // Hook para navegação

  const saveLogin = () => {
    localStorage.setItem('login',login)
    localStorage.setItem('password',password)
  }

  const checkUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const requestBody = {
        "login": login,
        "password": password
      };

      const response = await axios.post('https://infocap-back.onrender.com/auth/login', requestBody);

      if (response.status === 200) {
        const { token } = response.data;
        console.log('Autenticação bem-sucedida, token:', token);
        saveLogin(login,password,);
        authenticate(token);  // Chamar a função de login do contexto
        navigate('/');  // Redirecionar para a página inicial
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
        setError(error + ' : Erro na conexão. Verifique sua rede e tente novamente.');
      }
    }
  };

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <form onSubmit={checkUser}>
        {error && <label className={styles.error}>{error}</label>}
        <label>Login</label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
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

      <span className={styles.cadastro}>Não possui conta? <Link to="/cadastro">Cadastre-se</Link></span>
      <span className={styles.cadastro}>Esqueceu sua senha? <Link to="/trocarSenha">Mude aqui</Link></span>
    </div>
  );
};

export default Login;
