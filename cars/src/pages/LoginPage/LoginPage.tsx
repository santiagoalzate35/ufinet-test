import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as api from '@/api/auth';
import { useAuthStore } from '@/auth/authStore';
import Button from '@/components/Button/Button';
import './login.css';

export default function LoginPage() {
  const nav   = useNavigate();
  const login = useAuthStore(s => s.login);
  const [form, set] = useState({ email:'', password:'' });
  const [msg , setMsg] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    set({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await api.login(form);
      login(token);
      nav('/');
    } catch {
      setMsg('Credenciales inválidas');
    }
  };

  return (
    <section className="login">
      <form className="login__box" onSubmit={submit}>
        <h2>Ingreso</h2>

        <label>
          CORREO
          <input name="email" value={form.email} onChange={onChange} required />
        </label>

        <label>
          CONTRASEÑA
          <input type="password" name="password" value={form.password} onChange={onChange} required />
        </label>

        {msg && <p className="login__error">{msg}</p>}

        <Button type="submit" style={{ width:'100%' }}>Entrar</Button>

        <Link to="/register" className="login__link">Crear cuenta</Link>
      </form>
    </section>
  );
}
