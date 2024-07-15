import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cursoData from '../../jsons/cursos.json';
import videoData from '../../jsons/videos.json';
import { Link } from 'react-router-dom';
import './Curso.css';

const Curso = () => {

  const { id } = useParams();
  const curso = cursoData.find(curso => curso.id === parseInt(id));
  const videos = videoData.filter(video => video.cursoId === parseInt(id));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    // Verificando se o usuário está autenticado
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && Array.isArray(userData.user)) {
      const authenticatedUser = userData.user.find(user => user.autenticado === true);
      if (authenticatedUser) {
        setIsLoggedIn(true);
        // Verificando se o usuário está matriculado no curso
        if (authenticatedUser.curso.includes(parseInt(id))) {
          setIsEnrolled(true);
        }
      }
    }
  }, [id]);

  const handleEnroll = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    //Atualização dos dados do usuário, e de seus cursos
    const updatedUsers = userData.user.map(user => {
      if (user.autenticado === true) {
        return {
          ...user,
          curso: [...user.curso, parseInt(id)]
        };
      }
      return user;
    });

    localStorage.setItem('user', JSON.stringify({ user: updatedUsers }));
    setIsEnrolled(true);
  };

  if (!curso) {
    return <div>Curso não encontrado</div>;
  }

  return (

      <div className="curso-container">
        <h2>{curso.nome}</h2>
        <p>{curso.descricao}</p>
        {isLoggedIn ? (
          <button type="button" onClick={handleEnroll} disabled={isEnrolled}>
            {isEnrolled ? 'Matriculado' : 'Inscreva-se'}
          </button>
        ) : (
          <Link to="/login">Faça login para se inscrever</Link>
        )}
        <h3>Vídeos</h3>
        <div className="videos-container">
          {videos.map((video) => (
            <div className="video-item" key={video.id}>
              <h4>{video.titulo}</h4>
              <Link to={`/cursos/${curso.id}/video/${video.id}`}>Acessar</Link>
            </div>
          ))}
        </div>
      </div>

  );
};

export default Curso;
