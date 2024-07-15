import { useState, useEffect } from 'react';
import './MeusCursos.css';
import cursoData from '../../jsons/cursos.json'; // Importando os dados dos cursos
import axios from 'axios';
import { Link } from 'react-router-dom';

const MeusCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [ultimoCursoVisto, setUltimoCursoVisto] = useState(null);
  const [isMonitor, setIsMonitor] = useState(false);
  const [cursosCriados, setCursosCriados] = useState([]);

  useEffect(() => {
    const verifyMonitor = async () => {
      try {
        const response = await axios.get('https://infocap-back.onrender.com/user/findAll');
        if (response.status === 200) {
          const usersData = response.data;
          const user = usersData.find(user => user.login === localStorage.getItem('login'));
          if (user && user.role === 'MONITOR') {
            setIsMonitor(true);
            setCursosCriados(cursoData.filter(curso => curso.monitorId === user.id));
          }
        } else {
          console.log('Erro ao buscar usuários.');
        }
      } catch (error) {
        console.error('Erro ao verificar usuário:', error);
      }
    };

    verifyMonitor();

    // Buscar dados do usuário a partir do localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && Array.isArray(userData.user)) {
      const authenticatedUser = userData.user.find(user => user.autenticado === true);
      if (authenticatedUser) {
        const enrolledCourses = cursoData.filter(curso => authenticatedUser.curso.includes(curso.id));
        setCursos(enrolledCourses);

        // Buscar dados do último curso visto a partir do localStorage
        const ultimoCursoVistoData = JSON.parse(localStorage.getItem('ultimoCursoVisto')) || null;
        setUltimoCursoVisto(ultimoCursoVistoData);
      }
    }
  }, []);

  return (
    <section id='meus-cursos' className="meus-cursos">
      <h2>Meus Cursos</h2>

      {ultimoCursoVisto && (
        <div className="ultimo-curso-visto">
          <img src={`src/images/${ultimoCursoVisto.imagem}`} alt={ultimoCursoVisto.titulo} />
          <h3>{ultimoCursoVisto.titulo}</h3>
          <p>{ultimoCursoVisto.descricao}</p>
          <button><a href={`/curso/${ultimoCursoVisto.id}`}>Recapitular</a></button>
        </div>
      )}

      {cursos.length === 0 ? (
        <p>Você ainda não está inscrito em nenhum curso.</p>
      ) : (
        <div className="cursos-grid">
          {cursos.map((curso) => (
            <div className="curso-item" key={curso.id}>
              <h3>{curso.nome}</h3>
              <p>{curso.materia}</p>
              <button><a href={`/curso/${curso.id}`}>Acessar</a></button>
            </div>
          ))}
        </div>
      )}

      {isMonitor && (
        <section className="cursos-criados">
          <h2>Cursos Criados</h2>
          <button>
            <Link to="/adicionar-curso">Adicionar Novo Curso</Link>
          </button>
          {cursosCriados.length === 0 ? (
            <p>Você ainda não criou nenhum curso.</p>
          ) : (
            <div className="cursos-grid">
              {cursosCriados.map((curso) => (
                <div className="curso-item" key={curso.id}>
                  <h3>{curso.nome}</h3>
                  <p>{curso.materia}</p>
                  <button><a href={`/curso/${curso.id}`}>Acessar</a></button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </section>
  );
};

export default MeusCursos;
