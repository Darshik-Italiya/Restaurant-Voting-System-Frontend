import React from 'react';

export default function RestaurantCard({ r, onVote, onDelete, canDelete }) {
    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                <div>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{r.name}</div>
                    {r.cuisine && <div className="tag">{r.cuisine}</div>}
                    {typeof r.votes === 'number' && <div className="small">Votes: {r.votes}</div>}
                </div>
                <div className="row" style={{ width: 220 }}>
                    <button className="btn-success" onClick={() => onVote(r)} title="Give a vote">Vote 👍</button>
                    {canDelete && (
                        <button className="btn-danger" onClick={() => onDelete(r)} title="Delete restaurant">Delete</button>
                    )}
                </div>
            </div>
        </div>
    );
}
