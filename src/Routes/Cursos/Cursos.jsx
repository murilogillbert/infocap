import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cursoData from '../../jsons/cursos.json';
import './Cursos.css';

const fetchCursos = async () => {
  // Supondo que a URL real para fetch seja fornecida, mas no exemplo usaremos os dados locais.
  // const response = await fetch('URL_TO_FETCH_COURSES');
  // const data = await response.json();
  // return data;
  return cursoData; // Usando dados locais do arquivo JSON
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

  return (
    <div className="cursos-container">
      {cursos.map((curso) => (
        <div className="curso-item" key={curso.id} style={{backgroundImage:`url("${curso.img}")`}}>
          <h3>{curso.nome}</h3>
          <p>{curso.materia}</p>
          <button>
            <Link to={`/cursos/${curso.id}`}>Acessar</Link>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cursos;
