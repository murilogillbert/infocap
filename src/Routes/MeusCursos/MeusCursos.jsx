/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import './MeusCursos.css';
import axios from 'axios';

const MeusCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [ultimoCursoVisto, setUltimoCursoVisto] = useState(null);
  const [isMonitor, setIsMonitor] = useState(false);
  const [cursosCriados, setCursosCriados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [novoCurso, setNovoCurso] = useState({
    idInstrutor: '',
    name: '',
    imgDiretorio: '',
    descricao: '',
    prazoCertificado: '',
    data: ''
  });

  useEffect(() => {
    const verifyMonitor = async () => {
      try {
        const response = await axios.get('http://localhost:8081/user/findAll');
        if (response.status === 200) {
          const usersData = response.data;
          const user = usersData.find(user => user.login === localStorage.getItem('login'));
          if (user && user.role === 'INSTRUTOR') {
            setIsMonitor(true);
            setNovoCurso(prevState => ({ ...prevState, idInstrutor: user.id }));
            // Aqui está sendo buscado cursos que o monitor criou
            const cursosResponse = await axios.get('http://localhost:8081/curso/findAll');
            if (cursosResponse.status === 200) {
              setCursosCriados(cursosResponse.data.filter(curso => curso.instrutor.id === user.id));
            }
          }
        } else {
          console.log('Erro ao buscar usuários.');
        }
      } catch (error) {
        console.error('Erro ao verificar usuário:', error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:8081/categoria/findAll');
        if (response.status === 200) {
          setCategorias(response.data);
        } else {
          console.log('Erro ao buscar categorias.');
        }
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    verifyMonitor();
    fetchCategorias();

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoCurso(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(typeof(novoCurso.name))
    console.log(typeof(novoCurso.descricao))
    console.log(typeof(novoCurso.data))
    console.log(novoCurso.data)

    console.log(typeof(novoCurso.imgDiretorio))
    console.log(typeof(novoCurso.idInstrutor))
    novoCurso.prazoCertificado = parseInt(novoCurso.prazoCertificado)
    console.log(typeof( novoCurso.prazoCertificado))
    try {
      const response = await axios.post('http://localhost:8081/curso/create', novoCurso);
      if (response.status === 201) {
        alert('Curso criado com sucesso!');
        setModalOpen(false);
        // Atualize a lista de cursos criados
        setCursosCriados(prevState => [...prevState, response.data]);
      } else {
        console.log('Erro ao criar curso.');
      }
    } catch (error) {
      console.error('Erro ao criar curso:', error);
    }
  };

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
          <button onClick={() => setModalOpen(true)}>Adicionar Novo Curso</button>
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

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
            <h2>Criar Novo Curso</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Nome do Curso:
                <input type="text" name="name" value={novoCurso.name} onChange={handleInputChange} required />
              </label>
              <label>
                Imagem (Diretório):
                <input type="text" name="imgDiretorio" value={novoCurso.imgDiretorio} onChange={handleInputChange} required />
              </label>
              <label>
                Descrição:
                <textarea name="descricao" value={novoCurso.descricao} onChange={handleInputChange} required></textarea>
              </label>
              <label>
                Prazo para Certificado (dias):
                <input type="number" name="prazoCertificado" value={novoCurso.prazoCertificado} onChange={handleInputChange} required />
              </label>
              <label>
                Data:
                <input type="date" name="data" value={novoCurso.data} onChange={handleInputChange} required />
              </label>
              <button type="submit">Criar Curso</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default MeusCursos;
