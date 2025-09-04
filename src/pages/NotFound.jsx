import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="container" style={{ marginTop: 24 }}>
            <div className="card">
                <h3>404 — Not Found</h3>
                <div className="small">The page you requested does not exist.</div>
                <Link to="/" style={{ display: 'inline-block', marginTop: 12 }}>
                    ← Back to Restaurants
                </Link>
            </div>
        </div>
    );
}
