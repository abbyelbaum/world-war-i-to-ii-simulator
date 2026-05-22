// Helpers for flag-driven branching shared by App.jsx and EventScreen.jsx.

// True if a record (event, choice) is eligible given the player's current flags.
// `requires`: every flag in the array must be present.
// `excludes`: none of the flags in the array may be present.
export function meetsRequirements(record, flagSet) {
  if (record.requires && record.requires.length) {
    for (const f of record.requires) if (!flagSet.has(f)) return false
  }
  if (record.excludes && record.excludes.length) {
    for (const f of record.excludes) if (flagSet.has(f)) return false
  }
  return true
}

// Picks the description for a variant given current flags.
// A variant may declare `altDescriptions: [{ when: [...flags], text: '...' }]`.
// The first alt whose `when` flags are all present wins.
export function resolveDescription(variant, flagSet) {
  if (variant.altDescriptions) {
    for (const alt of variant.altDescriptions) {
      if (alt.when.every((f) => flagSet.has(f))) return alt.text
    }
  }
  return variant.description
}

// Returns choices that are eligible given current flags.
export function visibleChoices(variant, flagSet) {
  return variant.choices.filter((c) => meetsRequirements(c, flagSet))
}
