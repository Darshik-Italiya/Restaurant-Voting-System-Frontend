import React, { useEffect, useMemo, useState } from 'react';
import api from '../lib/api';
import RestaurantCard from '../components/RestaurantCard';
import VoteProgress from '../components/VoteProgress';

export default function Restaurants() {
    const [list, setList] = useState([]);
    const [form, setForm] = useState({ name: '', cuisine: '' });
    const [myVotes, setMyVotes] = useState({ remaining: 0, total: 0 });

    const sorted = useMemo(
        () => [...list].sort((a, b) => (b.votes ?? 0) - (a.votes ?? 0)),
        [list]
    );

    async function loadAll() {
        const [restaurants, votes] = await Promise.all([
            api.get('/restaurants').then(r => r.data),
            api.get('/votes/my-votes').then(r => r.data).catch(() => ({ remaining: 0, total: 0 }))
        ]);
        setList(Array.isArray(restaurants) ? restaurants : restaurants?.items ?? []);
        // Accept flexible shapes: {remaining,total} or {remaining_votes,total_votes}
        const remaining = votes?.remaining ?? votes?.remaining_votes ?? 0;
        const total = votes?.total ?? votes?.total_votes ?? 0;
        setMyVotes({ remaining, total });
    }

    useEffect(() => { loadAll(); }, []);

    async function addRestaurant(e) {
        e.preventDefault();
        if (!form.name.trim()) return;
        await api.post('/restaurants', { name: form.name.trim(), cuisine: form.cuisine || undefined });
        setForm({ name: '', cuisine: '' });
        await loadAll();
    }

    async function vote(r) {
        await api.post('/votes', { restaurant_id: r.id ?? r.restaurant_id ?? r._id });
        await loadAll();
    }

    async function remove(r) {
        const id = r.id ?? r.restaurant_id ?? r._id;
        await api.delete(`/restaurants/${id}`);
        await loadAll();
    }

    return (
        <div className="container" style={{ marginTop: 16 }}>
            <div className="row row-2" style={{ alignItems: 'start' }}>
                <div className="card">
                    <h3 style={{ marginTop: 0 }}>Create Restaurant</h3>
                    <form className="row" onSubmit={addRestaurant}>
                        <input placeholder="Name (e.g., Spice Hub)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        <input placeholder="Cuisine (optional)" value={form.cuisine} onChange={(e) => setForm({ ...form, cuisine: e.target.value })} />
                        <button className="btn-primary">Create</button>
                    </form>
                    <div className="small" style={{ marginTop: 10 }}>
                        After login, this acts like your dashboard.
                    </div>
                </div>

                <VoteProgress remaining={myVotes.remaining} total={myVotes.total} />
            </div>

            <div style={{ margin: '16px 0 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>Restaurants</h3>
                <div className="tag">Sorted by votes</div>
            </div>

            <div className="grid grid-3">
                {sorted.map((r) => (
                    <RestaurantCard
                        key={r.id ?? r._id ?? r.name}
                        r={r}
                        onVote={vote}
                        onDelete={remove}
                        canDelete={true}
                    />
                ))}
            </div>
        </div>
    );
}
