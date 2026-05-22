import { useMemo, useState } from 'react'
import { nations } from './data/nations'
import { events } from './data/events'
import { computeEnding } from './data/endings'
import TitleScreen from './components/TitleScreen'
import NationSelect from './components/NationSelect'
import Briefing from './components/Briefing'
import EventScreen from './components/EventScreen'
import Ending from './components/Ending'
import './App.css'

const INITIAL_TENSION = 30

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value))
}

function applyStatDelta(stats, delta, key) {
  // Aggression is bipolar (-50..+50). Others are 0..100.
  if (key === 'aggression') {
    return clamp((stats[key] || 0) + (delta || 0), -50, 50)
  }
  return clamp((stats[key] || 0) + (delta || 0))
}

export default function App() {
  const [phase, setPhase] = useState('title') // title | select | briefing | event | ending
  const [nationId, setNationId] = useState(null)
  const [stats, setStats] = useState(null)
  const [tension, setTension] = useState(INITIAL_TENSION)
  const [flags, setFlags] = useState([])
  const [history, setHistory] = useState([])
  const [eventIndex, setEventIndex] = useState(0)
  const [previous, setPrevious] = useState(null) // recap shown atop the next event

  // Events that apply to the chosen nation, in chronological order.
  const playerEvents = useMemo(() => {
    if (!nationId) return []
    return events
      .filter((e) => !e.appliesTo || e.appliesTo.includes(nationId))
      .sort((a, b) => a.year - b.year || (a.month || 0) - (b.month || 0))
  }, [nationId])

  function startGame() {
    setPhase('select')
  }

  function selectNation(id) {
    setNationId(id)
    setStats({ ...nations[id].startingStats })
    setTension(INITIAL_TENSION)
    setFlags([])
    setHistory([])
    setEventIndex(0)
    setPrevious(null)
    setPhase('briefing')
  }

  function beginPlay() {
    setPhase('event')
  }

  function chooseOption(choice) {
    const currentEvent = playerEvents[eventIndex]
    const variant = currentEvent.variants[nationId]

    // Apply stat deltas.
    const nextStats = { ...stats }
    if (choice.effects) {
      for (const key of Object.keys(choice.effects)) {
        nextStats[key] = applyStatDelta(nextStats, choice.effects[key], key)
      }
    }
    setStats(nextStats)

    // Apply tension delta.
    const nextTension = clamp(tension + (choice.tension || 0))
    setTension(nextTension)

    // Apply flags.
    if (choice.flags && choice.flags.length) {
      const nextFlags = Array.from(new Set([...flags, ...choice.flags]))
      setFlags(nextFlags)
    }

    // Log history.
    setHistory((h) => [
      ...h,
      {
        year: currentEvent.year,
        title: variant.title || currentEvent.title,
        choice: choice.label,
      },
    ])

    // Stash recap for the top of the next screen.
    setPrevious({ choice: choice.label, outcome: choice.outcome })

    const nextIndex = eventIndex + 1
    if (nextIndex >= playerEvents.length) {
      setPhase('ending')
    } else {
      setEventIndex(nextIndex)
    }
  }

  function restart() {
    setPhase('title')
    setNationId(null)
    setStats(null)
    setTension(INITIAL_TENSION)
    setFlags([])
    setHistory([])
    setEventIndex(0)
    setPrevious(null)
  }

  function backToTitle() {
    setPhase('title')
  }

  function backToSelect() {
    setPhase('select')
  }

  if (phase === 'title') {
    return <TitleScreen onStart={startGame} />
  }

  if (phase === 'select') {
    return <NationSelect onSelect={selectNation} onBack={backToTitle} />
  }

  if (phase === 'briefing') {
    return <Briefing nationId={nationId} onContinue={beginPlay} onBack={backToSelect} />
  }

  if (phase === 'event') {
    const event = playerEvents[eventIndex]
    const variant = event.variants[nationId]
    if (!variant) {
      // Defensive: shouldn't happen given appliesTo filter, but skip if it does.
      setEventIndex(eventIndex + 1)
      return null
    }
    return (
      <EventScreen
        nationId={nationId}
        event={event}
        variant={variant}
        eventNumber={eventIndex + 1}
        totalEvents={playerEvents.length}
        previous={previous}
        onChoose={chooseOption}
      />
    )
  }

  if (phase === 'ending') {
    const ending = computeEnding({ nationId, stats, flags, tension, history })
    return (
      <Ending
        nationId={nationId}
        stats={stats}
        ending={ending}
        history={history}
        onRestart={restart}
      />
    )
  }

  return null
}
