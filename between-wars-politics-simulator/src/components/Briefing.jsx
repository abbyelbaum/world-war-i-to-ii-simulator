import { nations } from '../data/nations'

export default function Briefing({ nationId, onContinue, onBack }) {
  const n = nations[nationId]
  return (
    <div
      className={`screen screen-briefing nation-theme-${nationId}`}
      style={{
        '--nation-primary': n.colors.primary,
        '--nation-accent': n.colors.accent,
        '--nation-paper': n.colors.paper,
        '--nation-ink': n.colors.ink,
      }}
    >
      <div className="poster">
        <button className="ghost-button poster-back" onClick={onBack}>
          ← Reconsider
        </button>
        <div className="poster-eyebrow">JANUARY 1933 — BRIEFING</div>
        <h2 className="poster-title">{n.name}</h2>
        <div className="poster-subtitle">{n.tagline}</div>

        <div className="poster-body">{n.description}</div>

        <div className="objectives-block">
          <div className="objectives-header">YOUR OBJECTIVES</div>
          <ol className="objectives-list">
            {n.objectives.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ol>
        </div>

        <button className="big-button poster-cta" onClick={onContinue}>
          Take Office
        </button>
      </div>
    </div>
  )
}
