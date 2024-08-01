/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Configuracao.css'
import { Link } from 'react-router-dom';

const Configuracao = () => {
    const [codigoAutenticacao, setCodigoAutenticacao] = useState('');
    const [codigoCorreto, setCodigoCorreto] = useState('1234');
    const [senhaHabilitada, setSenhaHabilitada] = useState(false);

    const handleAplicar = () => {
        //Requisição para a modificação dos dados no banco de dados
    }

    const handleConfirmarCodigo = () => {
        if (codigoAutenticacao === codigoCorreto) {
            setSenhaHabilitada(true);
            alert('Código correto! Você pode agora configurar sua senha.');
            return (
        <section id="configuracao">
            <div id="perfil-container">
                <label htmlFor="nome" id="nome-label">Nome</label>
                <input type="text" id="nome" />
                <label htmlFor="email" id="email-label">Email</label>
                <input type="text" id="email" />
                <label htmlFor="cpf" id="cpf-label">CPF</label>
                <input type="text" id="cpf" />
            </div>
            <div id='simple-container'>
                <div id="autenticacao-container">
                    <label htmlFor="autenticacao" id="autenticacao-label">Código de Autenticação</label>
                    <input
                        type="text"
                        id="autenticacao"
                        value={codigoAutenticacao}
                        onChange={(e) => setCodigoAutenticacao(e.target.value)}
                    />
                    <button type="button" onClick={() => alert('Email enviado!')}>Enviar Email</button>
                    <button type="button" onClick={handleConfirmarCodigo}>Confirmar Código</button>
                </div>
                <div id="senha-container">
                    <label htmlFor="senha" id="senha-label">Senha</label>
                    <input
                        type="text"
                        id="senha"
                        disabled={!senhaHabilitada}
                    />
                    <label htmlFor="repita-senha" id="repita-senha-label">Repita Senha</label>
                    <input
                        type="text"
                        id="repita-senha"
                        disabled={!senhaHabilitada}
                    />
                </div>
            </div>
            <div id="botoes">
                <button type="button" id="aplicar-button">Aplicar</button>
                <button type="button" id="cancelar-button">Cancelar</button>
            </div>
        </section>
    );
        } else {
            alert('Código incorreto. Por favor, tente novamente.');
        }
    };

    return (
        <section id="configuracao">
            <div id="perfil-container">
                <label htmlFor="nome" id="nome-label">Nome</label>
                <input type="text" id="nome" />
                <label htmlFor="email" id="email-label">Email</label>
                <input type="text" id="email" />
                <label htmlFor="cpf" id="cpf-label">CPF</label>
                <input type="text" id="cpf" />
            </div>
            <div id='simple-container'>
                <div id="autenticacao-container">
                    <label htmlFor="autenticacao" id="autenticacao-label">Código de Autenticação</label>
                    <input
                        type="text"
                        id="autenticacao"
                        value={codigoAutenticacao}
                        onChange={(e) => setCodigoAutenticacao(e.target.value)}
                    />
                    <button type="button" onClick={() => alert('Email enviado!')}>Enviar Email</button>
                    <button type="button" onClick={handleConfirmarCodigo}>Confirmar Código</button>
                </div>
                <div id="senha-container">
                    <label htmlFor="senha" id="senha-label">Senha</label>
                    <input
                        type="text"
                        id="senha"
                        disabled={!senhaHabilitada}
                    />
                    <label htmlFor="repita-senha" id="repita-senha-label">Repita Senha</label>
                    <input
                        type="text"
                        id="repita-senha"
                        disabled={!senhaHabilitada}
                    />
                </div>
            </div>
            <div id="botoes">
                <button type="button" id="aplicar-button"onClick={handleAplicar}>Aplicar</button>
                <button type="button" id="cancelar-button">Cancelar</button>
            </div>
            <div>
                <span>Deseja virar um instrutor?<Link to='/seja-um-instrutor'>Clique Aqui!</Link></span>
            </div>
        </section>
    );
};

export default Configuracao;
