import { useMemo, useState } from 'react'
import { nations } from './data/nations'
import { events } from './data/events'
import { computeEnding } from './data/endings'
import { meetsRequirements } from './data/branching'
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

// Scans forward from `fromIndex` for the next event whose appliesTo/requires/excludes
// are all satisfied by the current flags. Returns the index, or -1 if none remains.
function findNextEventIndex(sortedEvents, fromIndex, nationId, flagSet) {
  for (let i = fromIndex; i < sortedEvents.length; i++) {
    const e = sortedEvents[i]
    if (e.appliesTo && !e.appliesTo.includes(nationId)) continue
    if (!meetsRequirements(e, flagSet)) continue
    const variant = e.variants[nationId]
    if (!variant) continue
    return i
  }
  return -1
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

  // All events sorted chronologically. We walk this list with eventIndex; the filter
  // happens at look-up time so flags set during play can affect what fires next.
  const sortedEvents = useMemo(
    () => [...events].sort((a, b) => a.year - b.year || (a.month || 0) - (b.month || 0)),
    [],
  )

  const flagSet = useMemo(() => new Set(flags), [flags])

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
    const currentEvent = sortedEvents[eventIndex]
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

    // Apply flags. Compute the new flag set up front so we can use it to find the next event.
    let nextFlagsArray = flags
    if (choice.flags && choice.flags.length) {
      nextFlagsArray = Array.from(new Set([...flags, ...choice.flags]))
      setFlags(nextFlagsArray)
    }
    const nextFlagSet = new Set(nextFlagsArray)

    setHistory((h) => [
      ...h,
      {
        year: currentEvent.year,
        title: variant.title || currentEvent.title,
        choice: choice.label,
      },
    ])

    setPrevious({ choice: choice.label, outcome: choice.outcome })

    // Find the next eligible event from eventIndex+1 onward, using the new flag set.
    const nextIdx = findNextEventIndex(sortedEvents, eventIndex + 1, nationId, nextFlagSet)
    if (nextIdx === -1) {
      setPhase('ending')
    } else {
      setEventIndex(nextIdx)
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
    // On first entry, eventIndex may point at an ineligible event. Skip forward as needed.
    let idx = eventIndex
    if (idx === 0 || !sortedEvents[idx]) {
      idx = findNextEventIndex(sortedEvents, 0, nationId, flagSet)
      if (idx === -1) {
        // No events at all — straight to ending.
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
      if (idx !== eventIndex) setEventIndex(idx)
    }

    const event = sortedEvents[idx]
    const variant = event.variants[nationId]

    return (
      <EventScreen
        nationId={nationId}
        event={event}
        variant={variant}
        flagSet={flagSet}
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
