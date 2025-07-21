// src/pages/RegisterPage/RegisterPage.tsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as api from '@/api/auth';
import { useAuthStore } from '@/auth/authStore';
import Button from '@/components/Button/Button';
import '../LoginPage/login.css';  // reutilizamos los estilos de login

export default function RegisterPage() {
  const nav   = useNavigate();
  const login = useAuthStore(s => s.login);
  const [form, set] = useState({ username: '', email: '', password: '' });
  const [msg , setMsg]  = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    set({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1️⃣ Primero hago el registro
      await api.register({
        username: form.username,
        email:    form.email,
        password: form.password
      });

      // 2️⃣ Luego hago login con las mismas credenciales
      const { token } = await api.login({
        email:    form.email,
        password: form.password
      });

      // 3️⃣ Hidrato el store y redirijo a la lista de coches
      login(token);
      nav('/');
    } catch (err) {
      console.error('ERROR en register →', err);
      setMsg('No se pudo crear la cuenta');
    }
  };

  return (
    <section className="login">
      <form className="login__box" onSubmit={submit}>
        <h2>Registro</h2>

        <label>
          USERNAME
          <input
            name="username"
            value={form.username}
            onChange={onChange}
            required
          />
        </label>

        <label>
          CORREO
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
          />
        </label>

        <label>
          CONTRASEÑA
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
          />
        </label>

        {msg && <p className="login__error">{msg}</p>}

        <Button type="submit" style={{ width: '100%' }}>
          Crear cuenta
        </Button>

        <Link to="/login" className="login__link">
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </form>
    </section>
  );
}
