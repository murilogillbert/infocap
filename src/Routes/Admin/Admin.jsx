import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
    /*
  const [credentials, setCredentials] = useState({ login: '', password: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://infocap-back.onrender.com/user/findAll');
      if (response.ok) {
        console.log('Opaaa')
        const data = await response.json();
        const user = data.find(
          (user) =>
            (user.login === credentials.login || user.email === credentials.login) &&
            user.role === 'ADMIN'
        );

        if (user) {
          setIsAuthenticated(true);
          setUsers(data);  // Armazena todos os usuários
          // Fetch courses data (assumindo que você tem uma rota para isso)
          const coursesResponse = await fetch('https://infocap-back.onrender.com/courses');
          if (coursesResponse.ok) {
            const coursesData = await coursesResponse.json();
            setCourses(coursesData);
          } else {
            console.error('Failed to fetch courses');
          }
        } else {
          console.error('Invalid credentials or not an admin');
        }
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Login (Username or Email):</label>
            <input
              type="text"
              name="login"
              value={credentials.login}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <section>
        <h3>Usuários</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <h3>Cursos</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Monitor</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{course.monitor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );*/

  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const usersResponse = await fetch('https://infocap-back.onrender.com/user/findAll');
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setUsers(usersData);
        } else {
          console.error('Failed to fetch users');
        }

        // Fetch courses
        const coursesResponse = await fetch('https://infocap-back.onrender.com/curso/findAll');
        if (coursesResponse.ok) {
          const coursesData = await coursesResponse.json();
          setCourses(coursesData);
        } else {
          console.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <section>
        <h3>Usuários</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <h3>Cursos</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Instrutor</th>
              <th>Descrição</th>
              <th>Horas Totais</th>
              <th>Media de Avaliação</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{course.instrutor.name}</td>
                <td>{course.descricao}</td>
                <td>{course.qtda_horas_totais}</td>
                <td>{course.media_avaliacao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );

};

export default Admin;
