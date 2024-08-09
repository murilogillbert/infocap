/* eslint-disable */
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
  const [modificaOpen, setModificaOpen] = useState({ emUso: false, curso: null });
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

    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && Array.isArray(userData.user)) {
      const authenticatedUser = userData.user.find(user => user.autenticado === true);
      if (authenticatedUser) {
        const enrolledCourses = cursoData.filter(curso => authenticatedUser.curso.includes(curso.id));
        setCursos(enrolledCourses);

        const ultimoCursoVistoData = JSON.parse(localStorage.getItem('ultimoCursoVisto')) || null;
        setUltimoCursoVisto(ultimoCursoVistoData);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoCurso(prevState => ({ ...prevState, [name]: value }));
  };

  const handleInputChangeCourse = (e) => {
    const { name, value } = e.target;
    setModificaOpen(prevState => ({
      ...prevState,
      curso: { ...prevState.curso, [name]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    novoCurso.prazoCertificado = parseInt(novoCurso.prazoCertificado);
    try {
      const response = await axios.post('http://localhost:8081/curso/create', novoCurso);
      if (response.status === 201) {
        alert('Curso criado com sucesso!');
        setModalOpen(false);
        setCursosCriados(prevState => [...prevState, response.data]);
      } else {
        console.log('Erro ao criar curso.');
      }
    } catch (error) {
      console.error('Erro ao criar curso:', error);
    }
  };

  const handleSubmitCourseChange = async (e) => {
    e.preventDefault();
    const updatedCurso = modificaOpen.curso;
    console.log()
    // Formata a data
    if (Array.isArray(updatedCurso.data)) {
        updatedCurso.data = formatDateArray(updatedCurso.data);
    }

    updatedCurso.data = parseInt(updatedCurso.data);
    console.log(updatedCurso.data)

    try {
        const response = await axios.put('http://localhost:8081/curso/update', updatedCurso);
        if (response.status === 204) {
            alert('Curso atualizado com sucesso!');
            setModificaOpen({ emUso: false, curso: null });
            setCursosCriados(prevState =>
                prevState.map(curso =>
                    curso.id === updatedCurso.id ? updatedCurso : curso
                )
            );
        } else {
            console.log('Erro ao atualizar curso.');
        }
    } catch (error) {
        console.error('Erro ao atualizar curso:', error);
    }
};


  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/curso/${id}`);
      if (response.status === 204) {
        setCursos(cursos.filter(curso => curso.id !== id));
      }
    } catch (error) {
      console.log(id)
      console.error('Erro ao deletar curso:', error);
      
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
                  <h3>{curso.name}</h3>
                  <p>{curso.materia}</p>
                  <button onClick={() => setModificaOpen({ emUso: true, curso })}>Modificar</button>
                  <button onClick={() => handleDelete(curso.id)}>Excluir</button>
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

      {modificaOpen.emUso && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModificaOpen({ emUso: false, curso: null })}>&times;</span>
            <h2>Modificar Curso</h2>
            <form onSubmit={handleSubmitCourseChange}>
              <label>
                Nome do Curso:
                <input type="text" name="name" value={modificaOpen.curso.name} onChange={handleInputChangeCourse} required />
              </label>
              <label>
                Imagem (Diretório):
                <input type="text" name="imgDiretorio" value={modificaOpen.curso.imgDiretorio} onChange={handleInputChangeCourse} required />
              </label>
              <label>
                Descrição:
                <textarea name="descricao" value={modificaOpen.curso.descricao} onChange={handleInputChangeCourse} required></textarea>
              </label>
              <label>
                Prazo para Certificado (dias):
                <input type="number" name="prazoCertificado" value={modificaOpen.curso.prazoCertificado} onChange={handleInputChangeCourse} required />
              </label>
              <label>
                Data:
                <input type="date" name="data" value={modificaOpen.curso.data} onChange={handleInputChangeCourse} required />
              </label>
              <button type="submit">Salvar Alterações</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default MeusCursos;
