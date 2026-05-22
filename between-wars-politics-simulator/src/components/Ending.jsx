import { nations, statLabels } from '../data/nations'

export default function Ending({ nationId, stats, ending, history, onRestart }) {
  const n = nations[nationId]
  const tierClass = `tier-${ending.tier.toLowerCase()}`

  return (
    <div
      className={`screen screen-ending nation-theme-${nationId}`}
      style={{
        '--nation-primary': n.colors.primary,
        '--nation-accent': n.colors.accent,
        '--nation-paper': n.colors.paper,
        '--nation-ink': n.colors.ink,
      }}
    >
      <div className="ending-poster">
        <div className="ending-eyebrow">SEPTEMBER 1939 · FINAL REPORT</div>
        <h2 className="ending-nation">{n.name}</h2>

        <div className="ending-headline">
          {ending.wwii ? (
            <span className="headline-war">THE WORLD GOES TO WAR</span>
          ) : (
            <span className="headline-peace">THE PEACE HOLDS — FOR NOW</span>
          )}
        </div>

        <div className={`tier-card ${tierClass}`}>
          <div className="tier-letter">{ending.tier}</div>
          <div className="tier-meta">
            <div className="tier-label">FINAL GRADE</div>
            <div className="tier-score">
              {ending.objectiveTotal} / {ending.objectiveMax} objective points
            </div>
          </div>
        </div>

        <div className="ending-section">
          <div className="ending-section-title">YOUR LEADERSHIP</div>
          <div className="archetype-name">{ending.archetype.name}</div>
          <div className="archetype-blurb">{ending.archetype.blurb}</div>
        </div>

        {ending.historical && (
          <div className="ending-section">
            <div className="ending-section-title">HISTORICAL COMPARISON</div>
            <div className="historical-name">You led most like {ending.historical.name}.</div>
            <div className="historical-blurb">{ending.historical.blurb}</div>
          </div>
        )}

        <div className="ending-section">
          <div className="ending-section-title">OBJECTIVES</div>
          <ul className="objective-results">
            {ending.objectives.map((o, i) => {
              const mark = o.score === 2 ? '◆' : o.score === 1 ? '◇' : '✕'
              const status =
                o.score === 2 ? 'achieved' : o.score === 1 ? 'partial' : 'failed'
              return (
                <li key={i} className={`objective-result objective-${status}`}>
                  <span className="objective-mark">{mark}</span>
                  <span className="objective-label">{o.label}</span>
                  <span className="objective-status">{status.toUpperCase()}</span>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="ending-section">
          <div className="ending-section-title">FINAL STATE OF THE NATION</div>
          <div className="stats-grid">
            {Object.entries(statLabels).map(([key, label]) => (
              <StatBar key={key} label={label} value={stats[key]} isAggression={key === 'aggression'} />
            ))}
            <StatBar label="World Tension" value={ending.tension} threshold={70} isTension />
          </div>
        </div>

        <div className="ending-section">
          <div className="ending-section-title">DECISIONS MADE</div>
          <ol className="decision-log">
            {history.map((h, i) => (
              <li key={i}>
                <span className="decision-date">{h.year}</span>
                <span className="decision-title">{h.title}</span>
                <span className="decision-choice">→ {h.choice}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="ending-actions">
          <button className="big-button" onClick={onRestart}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  )
}

function StatBar({ label, value, isAggression, isTension, threshold }) {
  // For aggression, scale -50..+50 to 0..100 for display.
  const display = isAggression ? Math.round(value + 50) : Math.round(value)
  const clamped = Math.max(0, Math.min(100, display))
  const danger = isTension && value >= (threshold || 70)
  return (
    <div className={`stat-row ${danger ? 'stat-danger' : ''}`}>
      <div className="stat-label">{label}</div>
      <div className="stat-bar-track">
        <div className="stat-bar-fill" style={{ width: `${clamped}%` }} />
      </div>
      <div className="stat-value">{isAggression ? value : Math.round(value)}</div>
    </div>
  )
}
