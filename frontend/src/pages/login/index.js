import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {
    const [email, setEmail] = useState('');

    async function loginSubmit(e) {
        e.preventDefault();
        const response = await api.post('/sessions', { email });
        const { _id } = response.data;
        localStorage.setItem('user', _id);
        history.push('/dashboard');
    }

    return (
        <>
            <p>Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa.</p>

            <form onSubmit={loginSubmit}>
                <label htmlFor="email">Email:</label>

                <input type="email" id="email" placeholder="Digite aqui seu email..." value={email} onChange={e => setEmail(e.target.value)} autoFocus/>

                <button type="submit" className="login">Entrar</button>
            </form>
        </>
    );
}