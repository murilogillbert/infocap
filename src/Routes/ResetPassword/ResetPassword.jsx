import React, { useState } from "react";

export default function ResetPassword() {
    const [senha, setSenha] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [tokenEmail, setTokenEmail] = useState("");
    const [tokenValido, setTokenValido] = useState(false);
    const [userData, setUserData] = useState(null);
    const [textConfirmaEnvioEmail, setTextConfirmaEnvioEmail] = useState(null);
    const [resetStatus, setResetStatus] = useState(null);

    const verifyUser = async () => {
        try {
            const response = await fetch('https://infocap-back.onrender.com/user/findAll');
            console.log('A respota é: ' + response.ok)
            if (response.ok) {
                const usersData = await response.json();

                const user = usersData.find(user => user.email === userEmail);
                console.log("Exibindo o user: " + user)
                console.log("Exibindo o user.id : " + user.id)
                if (user) {
                    setUserData(user); // Define userData com o objeto encontrado
                    console.log("Usuario setado : " + userData)
                    console.log("Usuário Passado : " + user)
                    sendEmail(user); // Chama a função para enviar o email de redefinição
                } else {
                    setTextConfirmaEnvioEmail('Email Não Cadastrado ou Inválido');
                }
            } else {
                setTextConfirmaEnvioEmail('Erro ao buscar usuários');
            }
        } catch (error) {
            console.error('Erro ao verificar usuário:', error);
            setTextConfirmaEnvioEmail('Erro ao verificar usuário');
        }
    };

    /* A função sendEmail recebe como parâmetro 'e' o json de um usuário
        {
        "id": 1,
        "role": "ADMIN",
        "name": "João da Silva",
        "CPF": "12345678901",
        "email": "usuario@example.com",
        "login": "usuario123"
        } 
    */
        const sendEmail = async (user) => {
            try {
                console.log("O usuário é: ", user);
                console.log("O ID do usuário é: ", user.id);
        
                if (user && user.id) {
                    const response = await fetch(`https://infocap-back.onrender.com/user/resetPassword/${user.id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
        
                    if (response.ok) {
                        setTextConfirmaEnvioEmail('Email enviado com sucesso!');
                    } else if (response.status === 403) {
                        setTextConfirmaEnvioEmail('403 Forbidden: O servidor recebeu a requisição, mas está recusando executá-la devido a permissões insuficientes do cliente.');
                    } else if (response.status === 404) {
                        setTextConfirmaEnvioEmail('Usuário não encontrado.');
                    } else {
                        setTextConfirmaEnvioEmail('Erro ao enviar email.');
                    }
                } else {
                    setTextConfirmaEnvioEmail('Dados de usuário não encontrados.');
                }
            } catch (error) {
                console.error('Erro ao enviar email:', error);
                setTextConfirmaEnvioEmail('Erro ao enviar email.');
            }
        };
        

    const verifyToken = async () => {
        try {
            const response = await fetch(`https://infocap-back.onrender.com/token/verify/${tokenEmail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setTokenValido(true);
            } else if (response.status === 404) {
                setTextConfirmaEnvioEmail('Token Inválido');
            } else {
                setTextConfirmaEnvioEmail('Erro ao verificar token');
            }
        } catch (error) {
            console.error('Erro ao verificar token:', error);
            setTextConfirmaEnvioEmail('Erro ao verificar token');
        }
    };

    const changePassword = async (e) => {
        e.preventDefault();

        try {
            if (userData && tokenEmail && senha) {
                const response = await fetch(`https://infocap-back.onrender.com/user/updatePassword/${tokenEmail}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: userData.id,
                        newPassword: senha
                    })
                });

                if (response.ok) {
                    setResetStatus('Senha redefinida com sucesso');
                } else if (response.status === 400) {
                    setResetStatus('Token inválido ou expirado');
                } else if (response.status === 404) {
                    setResetStatus('Usuário não encontrado');
                } else {
                    setResetStatus('Erro ao redefinir senha');
                }
            } else {
                setResetStatus('Dados incompletos para redefinir senha');
            }
        } catch (error) {
            console.error('Erro ao redefinir senha:', error);
            setResetStatus('Erro ao redefinir senha');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        verifyUser();
    };

    const handleTokenSubmit = (e) => {
        e.preventDefault();
        verifyToken();
    };

    if (textConfirmaEnvioEmail !== 'Email Enviado!') {
        return (
            <section className="container-user-insert">
                <form onSubmit={handleSubmit}>
                    <label>{textConfirmaEnvioEmail}</label>
                    <label htmlFor="input-cred">Email</label>
                    <input type="text" id="input-cred" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                    <button type="submit">Enviar Email</button>
                </form>
            </section>
        );
    }

    if (!tokenValido) {
        return (
            <section className="container-token-email-senha">
                <form onSubmit={handleTokenSubmit}>
                    <label htmlFor="input-token-redefinição">Token Enviado No Email</label>
                    <input type="text" id="input-token-redefinição" value={tokenEmail} onChange={(e) => setTokenEmail(e.target.value)} />
                    <button type="submit">Validar Token</button>
                    <label>{textConfirmaEnvioEmail}</label>
                </form>
            </section>
        );
    }

    return (
        <section className="container-nova-senha">
            <form onSubmit={changePassword}>
                <label htmlFor="input-nova-senha">Nova Senha</label>
                <input type="password" id="input-nova-senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                <button type="submit">Redefinir Senha</button>
                {resetStatus && <p>{resetStatus}</p>}
            </form>
        </section>
    );
}
