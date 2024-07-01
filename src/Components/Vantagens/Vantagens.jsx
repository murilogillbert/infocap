import React from 'react';
import './Vantagens.css';

const Vantagens = () => {
  return (
    <section className="vantagens">
      <div className="vantagens-item">
        <i className="vantagens-icon fas fa-gem"></i>
        <h3>Qualidade</h3>
        <p>Nossos cursos são cuidadosamente elaborados por especialistas da área, garantindo um aprendizado de excelência.</p>
      </div>
      <div className="vantagens-item">
        <i className="vantagens-icon fas fa-users"></i>
        <h3>Comunidade</h3>
        <p>Faça parte de uma comunidade de aprendizado dinâmica, onde você pode interagir com outros membros, trocar conhecimentos e expandir sua rede de contatos.</p>
      </div>
      <div className="vantagens-item">
        <i className="vantagens-icon fas fa-certificate"></i>
        <h3>Certificados</h3>
        <p>Ao concluir com sucesso um curso, você receberá um certificado reconhecido, comprovando suas habilidades e conhecimentos adquiridos.</p>
      </div>
    </section>
  );
};

export default Vantagens;