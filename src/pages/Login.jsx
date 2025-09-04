import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export default function Login() {
    const { login, loading } = useAuth();
    const nav = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [err, setErr] = useState('');

    async function onSubmit(e) {
        e.preventDefault();
        setErr('');
        try {
            await login(form);
            nav('/'); // go to dashboard (restaurants list)
        } catch (e) {
            setErr(e?.detail || e?.message || 'Login failed');
        }
    }

    return (
        <div className="container" style={{ marginTop: 24, maxWidth: 460 }}>
            <div className="card">
                <h2>Login</h2>
                <form className="row" onSubmit={onSubmit}>
                    <input
                        placeholder="Email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                    <input
                        placeholder="Password"
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />
                    {err && <div className="small" style={{ color: 'var(--danger)' }}>{err}</div>}
                    <button className="btn-primary" disabled={loading}>
                        {loading ? 'Signing in…' : 'Login'}
                    </button>
                </form>
                <div className="small" style={{ marginTop: 10 }}>
                    No account? <Link to="/register">Register</Link>
                </div>
            </div>
        </div>
    );
}
