import { nations } from '../data/nations'
import { resolveDescription, visibleChoices } from '../data/branching'

const MONTH_NAMES = [
  '', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
]

// Game runs January 1933 → September 1939 (81 months).
const START_YEAR = 1933
const END_YEAR = 1939
const END_MONTH = 9
const TOTAL_MONTHS = (END_YEAR - START_YEAR) * 12 + END_MONTH

function progressFor(year, month) {
  const elapsed = (year - START_YEAR) * 12 + ((month || 1) - 1)
  return Math.max(0, Math.min(1, elapsed / TOTAL_MONTHS))
}

export default function EventScreen({
  nationId,
  event,
  variant,
  flagSet,
  previous,
  onChoose,
}) {
  const n = nations[nationId]
  const description = resolveDescription(variant, flagSet)
  const choices = visibleChoices(variant, flagSet)
  const pct = Math.round(progressFor(event.year, event.month) * 100)

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
          <div className="event-progress-bar">
            <div className="event-progress-fill" style={{ width: `${pct}%` }} />
            <span className="event-progress-anchor anchor-start">1933</span>
            <span className="event-progress-anchor anchor-end">1939</span>
          </div>
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

        <div className="event-body">{description}</div>

        <div className="event-choices">
          {choices.map((c, i) => (
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
