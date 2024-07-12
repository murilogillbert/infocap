import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Cursos.css';

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

  return (
    <div className="cursos-container">
      {cursos.map((curso) => (
        <div className="curso-item" key={curso.id} style={{backgroundImage:`url("${curso.img_diretorio}")`}}>
          <h3>{curso.name}</h3>
          <p>{curso.descricao}</p>
          <button>
            <Link to={`/cursos/${curso.id}`}>Acessar</Link>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cursos;
