import { nations } from '../data/nations'

const MONTH_NAMES = [
  '', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
]

export default function EventScreen({
  nationId,
  event,
  variant,
  eventNumber,
  totalEvents,
  previous,
  onChoose,
}) {
  const n = nations[nationId]

  return (
    <div
      className={`screen screen-event nation-theme-${nationId}`}
      style={{
        '--nation-primary': n.colors.primary,
        '--nation-accent': n.colors.accent,
        '--nation-paper': n.colors.paper,
        '--nation-ink': n.colors.ink,
      }}
    >
      <div className="event-poster">
        <div className="event-progress">
          <span className="event-date">
            {MONTH_NAMES[event.month] || ''} {event.year}
          </span>
          <span className="event-counter">
            DECISION {eventNumber} / {totalEvents}
          </span>
        </div>

        {previous && (
          <div className="event-recap">
            <span className="recap-eyebrow">PREVIOUSLY</span>
            <span className="recap-choice">{previous.choice}</span>
            <span className="recap-arrow">→</span>
            <span className="recap-outcome">{previous.outcome}</span>
          </div>
        )}

        <h2 className="event-title">{variant.title || event.title}</h2>

        <div className="event-body">{variant.description}</div>

        <div className="event-choices">
          {variant.choices.map((c, i) => (
            <button
              key={i}
              className="choice-button"
              onClick={() => onChoose(c)}
            >
              <span className="choice-letter">{String.fromCharCode(65 + i)}</span>
              <span className="choice-text">{c.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
