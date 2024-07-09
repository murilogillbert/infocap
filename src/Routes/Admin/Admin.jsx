import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const Admin = () => {
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [data, setData] = useState({ users: [], courses: [], monitors: [] });
  const [credentials, setCredentials] = useState({
    login: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://infocap-back.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('login', credentials.login); // Store login for later use
        setToken(data.token);
        localStorage.setItem('token', data.token);
      } else {
        console.error('Failed to login');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const verifyTokenAndRole = async () => {
      if (token) {
        try {
          const userResponse = await axios.get('https://infocap-back.onrender.com/user/findAll', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const currentUser = userResponse.data.find(user => user.login === localStorage.getItem('login'));

          if (currentUser && currentUser.role === 'ADMIN') {
            setUserRole('ADMIN');
            fetchData(token);
          } else {
            alert('Você não tem permissão para acessar esta página.');
          }
        } catch (error) {
          console.error('Erro ao verificar token e role:', error);
          alert('Erro ao verificar token e role.');
        }
      }
    };

    const fetchData = async (token) => {
      try {
        const usersResponse = await axios.get('https://infocap-back.onrender.com/user/findAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const coursesResponse = await axios.get('https://infocap-back.onrender.com/course/findAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData({
          users: usersResponse.data,
          courses: coursesResponse.data,
          monitors: usersResponse.data.filter(user => user.role === 'MONITOR'),
        });
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    verifyTokenAndRole();
  }, [token]);

  if (!token) {
    return (
      <div className="container">
        <h2 className="header">Login</h2>
        <form onSubmit={handleLogin} className="loginForm">
          <div className="formGroup">
            <label className="label">Login:</label>
            <input type="text" name="login" value={credentials.login} onChange={handleChange} required className="input" />
          </div>
          <div className="formGroup">
            <label className="label">Password:</label>
            <input type="password" name="password" value={credentials.password} onChange={handleChange} required className="input" />
          </div>
          <button type="submit" className="button">Login</button>
        </form>
      </div>
    );
  }

  if (userRole !== 'ADMIN') {
    return <div className="container">Verificando permissões...</div>;
  }

  return (
    <div className="container">
      <h1 className="header">Painel Administrativo</h1>
      <div className="dataSection">
        <h2>Usuários</h2>
        <ul className="list">
          {data.users.map(user => (
            <li key={user.id} className="listItem">{user.name}</li>
          ))}
        </ul>
      </div>
      <div className="dataSection">
        <h2>Cursos</h2>
        <ul className="list">
          {data.courses.map(course => (
            <li key={course.id} className="listItem">{course.name}</li>
          ))}
        </ul>
      </div>
      <div className="dataSection">
        <h2>Monitores</h2>
        <ul className="list">
          {data.monitors.map(monitor => (
            <li key={monitor.id} className="listItem">{monitor.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
