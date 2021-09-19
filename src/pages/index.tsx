import React, {useState} from 'react';

import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from "next/router";

import { useToasts } from 'react-toast-notifications';
import { FiPlusCircle } from 'react-icons/fi';

import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pwd, setPWD] = useState('');

  const router = useRouter();
  const { addToast } = useToasts();

  async function handleLogin (e: { preventDefault: () => void; }) {
    e.preventDefault();
    try {
      const response = await api.post('login', { email, pwd }); // makes the session request
      localStorage.setItem('userId', response.data.id);
      router.push('/Products'); // navigates to the Products route
    } catch (err) {
      addToast('Falha no login, tente novamente.', { appearance: 'info' });
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <Image  src="/login_logo.svg" alt="loginLogo" width={80} height={20} />
        <form onSubmit={handleLogin}>
          <input 
            placeholder="E-mail"
            value={email}
            autoFocus={true}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            placeholder="Senha"
            value={pwd}
            type="password"
            onChange={e => setPWD(e.target.value)}
          />
          <button id="loginButton" className="button" type="submit">
            Entrar
          </button>
          <Link href="/Register" passHref>
            <div className="link-register">
              <FiPlusCircle size={20} color="#E84143" />
              Cadastrar-se
            </div>
          </Link>
        </form>
      </section>
    </div>
  );
}
