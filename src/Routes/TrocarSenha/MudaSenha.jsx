import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MudaSenha() {
    const { token } = useParams(); // Obtém o token da URL
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
    const [resetStatus, setResetStatus] = useState('');

    const mudarSenha = async (e) => {
        e.preventDefault();

        if (senha !== confirmSenha) {
            setResetStatus('As senhas não coincidem.');
            return;
        }

        try {
            const response = await axios.post(`https://infocap-back.onrender.com/user/updatePassword/${token}`, {
                newPassword: senha
            });

            if (response.status === 200) {
                setResetStatus('Senha redefinida com sucesso');
            } else if (response.status === 400) {
                setResetStatus('Token inválido ou expirado');
            } else if (response.status === 404) {
                setResetStatus('Usuário não encontrado');
            } else {
                setResetStatus('Erro ao redefinir senha');
            }
        } catch (error) {
            console.error('Erro ao redefinir senha:', error);
            setResetStatus('Erro ao redefinir senha');
        }
    };

    return (
        <section className="container-muda-senha">
            <form onSubmit={mudarSenha}>
                {resetStatus && <p>{resetStatus}</p>}
                <label htmlFor="input-muda-senha">Nova Senha</label>
                <input
                    type="password"
                    name="input-muda-senha"
                    id="input-muda-senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                <label htmlFor="repete-input-muda-senha">Confirme a Nova Senha</label>
                <input
                    type="password"
                    name="repete-input-muda-senha"
                    id="repete-input-muda-senha"
                    value={confirmSenha}
                    onChange={(e) => setConfirmSenha(e.target.value)}
                    required
                />
                <button type="submit">Confirmar Nova Senha</button>
            </form>
        </section>
    );
}
