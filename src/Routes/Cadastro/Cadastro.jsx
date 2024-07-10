import React, { useState } from 'react';
import axios from 'axios';
import styles from './Cadastro.module.css';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [repeatEmail, setRepeatEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cpf, setCpf] = useState('');

  const addUser = async (e) => {
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
      CPF: cpf,
      login: nome, // Usando o nome como login, você pode ajustar conforme necessário
      password,
      name: nome,
      selo: 'ouro', // Valor fixo, ajuste após testes
      email,
      role: 'ADMIN' // Valor fixo, ajuste após testes
    };

    try {
      const response = await axios.post('https://infocap-back.onrender.com/user/create', newUser);
      if (response.status === 201) {
        alert('Usuário cadastrado com sucesso!');
        // Resetar o formulário
        setNome('');
        setEmail('');
        setRepeatEmail('');
        setPassword('');
        setConfirmPassword('');
        setCpf('');
      } else {
        alert('Erro ao cadastrar usuário.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao cadastrar usuário.');
    }

    console.log('Usuário adicionado:', newUser);
  };

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
