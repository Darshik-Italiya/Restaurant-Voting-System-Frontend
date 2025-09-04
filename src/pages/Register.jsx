import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const { register, loading } = useAuth();
    const nav = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [err, setErr] = useState('');

    async function onSubmit(e) {
        e.preventDefault();
        setErr('');
        try {
            await register(form);
            nav('/'); // auto-redirect after register → login
        } catch (e) {
            setErr(e?.detail || e?.message || 'Registration failed');
        }
    }

    return (
        <div className="container" style={{ marginTop: 24, maxWidth: 460 }}>
            <div className="card">
                <h2>Register</h2>
                <form className="row" onSubmit={onSubmit}>
                    <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <input placeholder="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    <input placeholder="Password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    {err && <div className="small" style={{ color: 'var(--danger)' }}>{err}</div>}
                    <button className="btn-primary" disabled={loading}>{loading ? 'Creating…' : 'Create account'}</button>
                </form>
                <div className="small" style={{ marginTop: 10 }}>
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}
