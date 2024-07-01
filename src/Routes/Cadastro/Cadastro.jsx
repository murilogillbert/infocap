import React, { useState } from 'react';
import styles from './Cadastro.module.css';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [repeatEmail, setRepeatEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [celular, setCelular] = useState('');

  function addUser(e) {
    e.preventDefault();

    if (email !== repeatEmail) {
      alert('Os e-mails não coincidem.');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    const newUser = {
      nome,
      email,
      senha: password,
      cpf,
      celular,
      //O autenticado está em true pois não há formas ainda de autenticar
      autenticado: true,
      curso:[]
    };

    let users = JSON.parse(localStorage.getItem('user')) || { user: [] };
    users.user.push(newUser);
    localStorage.setItem('user', JSON.stringify(users));

    // Resetar o formulário
    setNome('');
    setEmail('');
    setRepeatEmail('');
    setPassword('');
    setConfirmPassword('');
    setCpf('');
    setCelular('');

    console.log('Usuário adicionado:', newUser);
  }

  return (
    <div className={styles.cadastro}>
      <h1>Cadastro</h1>
      <form onSubmit={addUser}>
        <label>Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Repetir Email</label>
        <input
          type="email"
          value={repeatEmail}
          onChange={(e) => setRepeatEmail(e.target.value)}
          required
        />
        <div>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Repita a Senha</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Celular</label>
          <input
            type="text"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            required
          />
          <label>CPF</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;
