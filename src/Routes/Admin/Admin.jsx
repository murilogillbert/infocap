import { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [newCategoria, setNewCategoria] = useState({ nome: '', descricao: '' });
  const [editCategoria, setEditCategoria] = useState({ id: '', nome: '', descricao: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const usersResponse = await axios.get('http://localhost:8081/user/findAll');
        setUsers(usersResponse.data);

        // Fetch courses
        const coursesResponse = await axios.get('http://localhost:8081/curso/findAll');
        setCourses(coursesResponse.data);

        // Fetch categories
        const categoriasResponse = await axios.get('http://localhost:8081/categoria/findAll');
        setCategorias(categoriasResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreateCategoria = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/categoria/create', newCategoria);
      console.log(newCategoria)
      setCategorias([...categorias, response.data]);
      setNewCategoria({ nome: '', descricao: '' });
    } catch (error) {
      console.error('Error creating categoria:', error);
    }
  };

  const handleDeleteCategoria = async (id) => {
    try {
      console.log('id de deleção : '+ id)
      await axios.delete(`http://localhost:8081/categoria/${id}`);
      setCategorias(categorias.filter(categoria => categoria.id !== id));
    } catch (error) {
      console.error('Error deleting categoria:', error);
    }
  };

  const handleEditCategoria = (categoria) => {
    console.log(categoria)
    setEditCategoria(categoria);
  };
/* O update não está funcionado pois o servidor retorna um erro 500 */
/*Talvez seja culpa do  servidor */
  const handleUpdateCategoria = async (e) => {
    e.preventDefault();
    console.log('editCategoria' + editCategoria.id + '' + editCategoria.nome + '' + editCategoria.descricao)
    try {
      const response = await axios.put('http://localhost:8081/curso/update', editCategoria);
      const updatedCategorias = categorias.map(categoria => {
        categoria.id === editCategoria.id ? response.data : categoria}
      );
      setCategorias(updatedCategorias);
      setEditCategoria({ id: '', nome: '', descricao: '' });
    } catch (error) {
      console.error('Error updating categoria:', error);
    }
  };

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
              <th>Média de Avaliação</th>
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

      <section>
        <h3>Gerenciar Categorias</h3>
        <form onSubmit={handleCreateCategoria}>
          <label>
            Nome:
            <input
              type="text"
              value={newCategoria.nome}
              onChange={(e) => setNewCategoria({ ...newCategoria, nome: e.target.value })}
              required
            />
          </label>
          <label>
            Descrição:
            <input
              type="text"
              value={newCategoria.descricao}
              onChange={(e) => setNewCategoria({ ...newCategoria, descricao: e.target.value })}
              required
            />
          </label>
          <button type="submit">Adicionar Categoria</button>
        </form>

        <h4>Categorias Existentes</h4>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nome}</td>
                <td>{categoria.descricao}</td>
                <td>
                  <button onClick={() => handleEditCategoria(categoria)}>Editar</button>
                  <button onClick={() => handleDeleteCategoria(categoria.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editCategoria.id && (
          <form onSubmit={handleUpdateCategoria}>
            <h4>Editar Categoria</h4>
            <label>
              Nome:
              <input
                type="text"
                value={editCategoria.nome}
                onChange={(e) => setEditCategoria({ ...editCategoria, nome: e.target.value })}
                required
              />
            </label>
            <label>
              Descrição:
              <input
                type="text"
                value={editCategoria.descricao}
                onChange={(e) => setEditCategoria({ ...editCategoria, descricao: e.target.value })}
                required
              />
            </label>
            <button type="submit">Atualizar Categoria</button>
          </form>
        )}
      </section>
    </div>
  );
};

export default Admin;
