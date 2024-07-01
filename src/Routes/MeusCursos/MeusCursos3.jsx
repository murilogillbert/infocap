import React from 'react';
import './MeusCursos.css';

const MeusCursos = () => {

  const cursos = [
    {
      id: 1,
      nome: "Desenvolvimento Web com React",
      materia: "Programação",
      imagem: "react.jpg",
      descricao: "Aprenda a criar interfaces web interativas e dinâmicas com React, uma biblioteca JavaScript popular.",
    },
    {
      id: 2,
      nome: "Introdução à Análise de Dados com Python",
      materia: "Ciência de Dados",
      imagem: "python.jpg",
      descricao: "Domine as ferramentas e técnicas básicas para coletar, analisar e visualizar dados com Python.",
    },
    {
      id: 3,
      nome: "Criação de Conteúdo para Redes Sociais",
      materia: "Marketing Digital",
      imagem: "social-media.jpg",
      descricao: "Aprenda as melhores práticas para criar conteúdo atraente e engajador para suas redes sociais.",
    },
    {
      id: 4,
      nome: "Design Gráfico para Iniciantes",
      materia: "Design",
      imagem: "graphic-design.jpg",
      descricao: "Domine os princípios básicos do design gráfico e aprenda a criar designs profissionais.",
    },
    {
      id: 5,
      nome: "Introdução à Fotografia Digital",
      materia: "Fotografia",
      imagem: "photography.jpg",
      descricao: "Aprenda as técnicas básicas de fotografia e tire fotos incríveis com sua câmera.",
    },
  ];
  


  return (
    <section className="meus-cursos">
      <h2>Meus Cursos</h2>

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
