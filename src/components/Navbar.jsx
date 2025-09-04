import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export default function Navbar() {
    const { user, token, logout } = useAuth();
    return (
        <nav className="nav">
            <Link to="/" style={{ fontWeight: 800, fontSize: '1.05rem' }}>🍽️ Restaurant Voting</Link>
            <div style={{ display: 'flex', gap: 10 }}>
                {token && (
                    <>
                        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Restaurants</NavLink>
                        <NavLink to="/winners" className={({ isActive }) => isActive ? 'active' : ''}>Winners</NavLink>
                    </>
                )}
                {!token ? (
                    <>
                        <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Login</NavLink>
                        <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>Register</NavLink>
                    </>
                ) : (
                    <button onClick={logout} className="btn-danger" style={{ padding: '8px 12px' }}>
                        Logout {user?.email ? `(${user.email})` : ''}
                    </button>
                )}
            </div>
        </nav>
    );
}
