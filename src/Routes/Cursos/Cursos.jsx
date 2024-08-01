import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Cursos.css';

const verifyMonitor = async () => {
  try {
    const response = await axios.get('http://localhost:8081/user/findAll');

    if (response.status === 200) {
        const usersData = response.data;
        const user = usersData.find(user => user.login === localStorage.getItem('login'));
        if (user) {
            return true
        } else {
            console.log('o usuário não é monitor')
            return false
        }
    } else {
        console.log('Erro ao buscar usuários.');
    }
} catch (error) {
    console.error('Erro ao verificar usuário:', error);
}
}

const fetchCursos = async () => {
  try {
    const response = await axios.get('https://infocap-back.onrender.com/curso/findAll');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cursos:', error);
    return [];
  }
};

const Cursos = () => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const getCursos = async () => {
      const data = await fetchCursos();
      setCursos(data);
    };
    getCursos();
  }, []);

  const cursosCriados = () => {
    if(verifyMonitor())(      <div className="cursos-container" id="cursos criados">
    {cursos.map((curso) => (
      <div className="curso-item" key={curso.id} style={{ backgroundImage: `url("${curso.img_diretorio}")` }}>
        <h3>{curso.name}</h3>
        <p>{curso.descricao}</p>
        <button>
          <Link to={`/cursos/${curso.id}`}>Acessar</Link>
        </button>
      </div>
    ))}
  </div>)}
  return (
    <section id='meus-cursos'>
      {//Verifica se o usuário é monitor, liberando a div de cursos criados
        cursosCriados()}
      <div className="cursos-container" id="cursos criados">
        {cursos.map((curso) => (
          <div className="curso-item" key={curso.id} style={{ backgroundImage: `url("${curso.img_diretorio}")` }}>
            <h3>{curso.name}</h3>
            <p>{curso.descricao}</p>
            <button>
              <Link to={`/cursos/${curso.id}`}>Acessar</Link>
            </button>
          </div>
        ))}
      </div>
      <div className="cursos-container">
        {cursos.map((curso) => (
          <div className="curso-item" key={curso.id} style={{ backgroundImage: `url("${curso.img_diretorio}")` }}>
            <h3>{curso.name}</h3>
            <p>{curso.descricao}</p>
            <button>
              <Link to={`/cursos/${curso.id}`}>Acessar</Link>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cursos;
