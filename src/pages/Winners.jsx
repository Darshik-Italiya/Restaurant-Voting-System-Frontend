import React, { useEffect, useState } from 'react';
import api from '../lib/api';

function Board({ title, data }) {
    return (
        <div className="card">
            <h3 style={{ marginTop: 0 }}>{title}</h3>
            {(!data || data.length === 0) && <div className="small">No winners yet.</div>}
            <div className="grid">
                {(data || []).map((r, i) => (
                    <div key={i} className="card" style={{ padding: 12 }}>
                        <div style={{ fontWeight: 700 }}>{i + 1}. {r.name ?? r.restaurant_name ?? 'Unknown'}</div>
                        <div className="small">Votes: {r.votes ?? r.vote_count ?? '-'}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Winners() {
    const [daily, setDaily] = useState([]);
    const [weekly, setWeekly] = useState([]);
    const [monthly, setMonthly] = useState([]);

    async function load() {
        const [d, w, m] = await Promise.all([
            api.get('/leaderboard/daily').then(r => r.data).catch(() => []),
            api.get('/leaderboard/weekly').then(r => r.data).catch(() => []),
            api.get('/leaderboard/monthly').then(r => r.data).catch(() => []),
        ]);
        setDaily(Array.isArray(d) ? d : d?.items ?? []);
        setWeekly(Array.isArray(w) ? w : w?.items ?? []);
        setMonthly(Array.isArray(m) ? m : m?.items ?? []);
    }

    useEffect(() => { load(); }, []);

    return (
        <div className="container" style={{ marginTop: 16 }}>
            <div className="grid">
                <Board title="Daily Winners" data={daily} />
                <Board title="Weekly Winners" data={weekly} />
                <Board title="Monthly Winners" data={monthly} />
            </div>
        </div>
    );
}
