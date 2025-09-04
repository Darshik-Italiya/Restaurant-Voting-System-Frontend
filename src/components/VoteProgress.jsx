import React from 'react';

/**
 * Shows a small progress bar for remaining votes.
 * Props:
 *  - remaining (number)
 *  - total (number)
 */
export default function VoteProgress({ remaining = 0, total = 0 }) {
    const used = Math.max(0, total - remaining);
    const pct = total > 0 ? Math.min(100, Math.round((remaining / total) * 100)) : 0;
    return (
        <div className="card">
            <div className="small" style={{ marginBottom: 6 }}>
                Votes: {used}/{total} used — {remaining} remaining
            </div>
            <div className="progress-wrap">
                <div className="progress-bar" style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}
