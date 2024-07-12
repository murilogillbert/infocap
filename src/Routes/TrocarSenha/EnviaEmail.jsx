import React, { useState } from 'react';
import axios from 'axios';

export default function EnviaEmail() {
    const [userEmail, setUserEmail] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const verifyUser = async () => {
        try {
            const response = await axios.get('https://infocap-back.onrender.com/user/findAll');

            if (response.status === 200) {
                const usersData = response.data;
                const user = usersData.find(user => user.email === userEmail);

                if (user) {
                    sendEmail(user);
                } else {
                    setFeedbackMessage('Email não cadastrado ou inválido.');
                }
            } else {
                setFeedbackMessage('Erro ao buscar usuários.');
            }
        } catch (error) {
            console.error('Erro ao verificar usuário:', error);
            setFeedbackMessage('Erro ao verificar usuário.');
        }
    };

    const sendEmail = async (user) => {
        try {
            const response = await axios.post(`https://infocap-back.onrender.com/user/resetPassword/${user.id}`);
            
            if (response.status === 200) {
                setFeedbackMessage('Email de redefinição de senha enviado com sucesso.');
            } else if (response.status === 404) {
                setFeedbackMessage('Usuário não encontrado.');
            } else {
                setFeedbackMessage('Erro ao enviar o email.');
            }
        } catch (error) {
            console.error('Erro ao enviar o email:', error);
            setFeedbackMessage('Erro ao enviar o email. Tente novamente mais tarde.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        verifyUser();
    };

    return (
        <section className="container-user-insert">
            <form onSubmit={handleSubmit}>
                {feedbackMessage && <p>{feedbackMessage}</p>}
                <label htmlFor="input-cred">Email</label>
                <input 
                    type="email" 
                    id="input-cred" 
                    value={userEmail} 
                    onChange={(e) => setUserEmail(e.target.value)} 
                    required 
                />
                <button type="submit">Enviar Email</button>
            </form>
        </section>
    );
}
