import { useState, useEffect } from 'react';
import './MeusCursos.css';
import cursoData from '../../jsons/cursos.json'; // Importando os dados dos cursos

const MeusCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [ultimoCursoVisto, setUltimoCursoVisto] = useState(null);

  useEffect(() => {
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
    <section className="meus-cursos">
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
    </section>
  );
};

export default MeusCursos;
