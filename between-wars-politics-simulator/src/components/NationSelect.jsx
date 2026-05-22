import { nations, nationOrder } from '../data/nations'

export default function NationSelect({ onSelect, onBack }) {
  return (
    <div className="screen screen-select">
      <div className="select-header">
        <button className="ghost-button" onClick={onBack}>← Back</button>
        <h2 className="select-title">CHOOSE YOUR POWER</h2>
        <div className="select-spacer" />
      </div>

      <div className="nation-grid">
        {nationOrder.map((id) => {
          const n = nations[id]
          return (
            <button
              key={id}
              className={`nation-card nation-${id}`}
              style={{
                '--nation-primary': n.colors.primary,
                '--nation-accent': n.colors.accent,
                '--nation-paper': n.colors.paper,
                '--nation-ink': n.colors.ink,
              }}
              onClick={() => onSelect(id)}
            >
              <div className="nation-card-banner">
                <span className="nation-card-name">{n.name}</span>
              </div>
              <div className="nation-card-body">
                <div className="nation-card-tagline">{n.tagline}</div>
                <div className="nation-card-role">As the {n.leader}</div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
