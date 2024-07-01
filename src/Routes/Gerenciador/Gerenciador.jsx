import './Gerenciador.css'
const Gerenciador = () => {

  const exibirAddCurso = () => {
    // Função para exibir o formulário de adicionar curso
  };

  const reenviarEmail = () => {
    // Função para reenviar o email
  };

  const limparInputs = () => {
    // Função para limpar os inputs
  };

  const salvarEmCursosDoInstrutor = () => {
    // Função para salvar o curso
  };

  return (
    <section id="gerenciador-container">
      <div id="curso">
        <img src="" alt="" />
        <div id="middle">
          <h1>Título aqui</h1>
          <span>Quantidade de alunos aqui</span>
        </div>
        <div id="buttons">
          <button id="visualizar-curso" type="button">Ir para o curso</button>
          <button id="excluir" type="button">Excluir curso</button>
        </div>
      </div>

      <button type="button" onClick={exibirAddCurso}>Adicionar Curso</button>

      {/* Div que recebe null caso o botão não seja clicado (default), ou o código html */}
      {/* Este é o código que será exibido */}

      <div id="add-curso">
        <label htmlFor="nome">Nome</label>
        <input type="text" name="nome" id="nome" />
        <label htmlFor="curso-seletor">Curso</label>
        <select name="curso-seletor" id="curso-seletor"></select>
        <label htmlFor="autenticacao">Código de Autenticação</label>
        <input type="text" name="autenticacao" id="autenticacao" />
        <div id="buttons-final">
          <button onClick={reenviarEmail}>enviar email/Reenviar email</button>
          <div id="buttons-cancelar-adicionar">
            <button onClick={limparInputs}>Cancelar</button>
            <button onClick={salvarEmCursosDoInstrutor}>Adicionar</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gerenciador;
