// Takes the final game state for a player and produces the ending screen content:
// - whether WWII broke out and the player's role in it
// - an ideological archetype label
// - a historical leader comparison (per nation)
// - a tier rating (S/A/B/C/D) based on hidden objective checks
// - a written summary paragraph

const TENSION_FOR_WAR = 70

// ---------- Archetype catalogue ----------
const ARCHETYPES = [
  {
    id: 'architect-of-war',
    name: 'The Architect of War',
    test: (s, flags) =>
      flags.has('invaded-poland') ||
      (s.aggression >= 35 && (flags.has('wwii') || s.tension >= TENSION_FOR_WAR)),
    blurb:
      'You did not stumble into war. You built it, stone by stone, and crossed the line yourself.',
  },
  {
    id: 'tyrant',
    name: 'The Tyrant',
    test: (s, flags) =>
      s.aggression >= 25 &&
      s.stability >= 60 &&
      (flags.has('great-terror') || flags.has('enabling-act') || flags.has('long-knives') || flags.has('one-party-state')),
    blurb:
      'You ruled with absolute hand. The opposition was crushed, the streets quiet, and the price of order paid in blood.',
  },
  {
    id: 'cold-visionary',
    name: 'The Cold Visionary',
    test: (s) => s.military >= 60 && s.economy >= 60 && s.diplomacy < 40 && s.aggression >= 10,
    blurb:
      'You built the foundations of a great power — industry, armies, modern apparatus — while the world looked away or feared you.',
  },
  {
    id: 'iron-pragmatist',
    name: 'The Iron Pragmatist',
    test: (s) => s.military >= 55 && s.stability >= 55 && s.diplomacy >= 45 && s.aggression >= 5 && s.aggression < 25,
    blurb:
      'No illusions, no crusades. You did what the moment required: built the arsenal, kept your house in order, never picked the fight you could avoid.',
  },
  {
    id: 'appeaser',
    name: 'The Appeaser',
    test: (s, flags) =>
      flags.has('munich') &&
      (flags.has('british-appeasement') ||
        flags.has('chamberlain-peace') ||
        flags.has('continued-appeasement') ||
        flags.has('france-follows-britain') ||
        flags.has('endorsed-munich')) &&
      s.aggression < 10,
    blurb:
      'You traded principle for time, time for principle, and finally had neither. Peace in your time — but not your successors’.',
  },
  {
    id: 'peacemaker',
    name: 'The Peacemaker',
    test: (s, flags) =>
      !flags.has('wwii') && s.diplomacy >= 55 && s.aggression <= 5,
    blurb:
      'Against every current, you held the line for talks over guns. History gave you a chance, and you took it.',
  },
  {
    id: 'lost-opportunity',
    name: 'The Lost Opportunity',
    test: (s, flags) => flags.has('wwii') && s.diplomacy >= 60 && s.aggression < 15,
    blurb:
      'You saw clearly, spoke wisely, built alliances — and still the catastrophe came. History will note that you tried.',
  },
  {
    id: 'reformer',
    name: 'The Reformer',
    test: (s) => s.economy >= 60 && s.stability >= 55 && s.aggression < 10,
    blurb:
      'You bent the state to feed and house its people. The bridges and bonds you built outlasted every dictator of the decade.',
  },
  {
    id: 'cynic',
    name: 'The Cynic',
    test: (s) => s.diplomacy >= 50 && s.aggression >= 10 && s.stability < 50,
    blurb:
      'You played every side and trusted none. The chess pieces moved as you wished — only the country beneath them suffered.',
  },
  {
    id: 'idealist',
    name: 'The Idealist',
    test: (s) => s.diplomacy >= 55 && s.aggression <= 0,
    blurb:
      'You believed institutions and treaties could tame the wolves. The wolves disagreed; your faith is not therefore worthless.',
  },
  {
    id: 'survivor',
    name: 'The Survivor',
    test: () => true, // fallback
    blurb:
      'You navigated impossible currents and your nation, somehow, came through. No grand vision, perhaps — but the lights stayed on.',
  },
]

// ---------- Historical comparisons (per nation) ----------
const HISTORICAL = {
  us: [
    {
      id: 'fdr',
      name: 'Franklin D. Roosevelt',
      test: (s, flags) =>
        flags.has('new-deal') && (flags.has('cash-and-carry') || flags.has('quarantine-speech') || flags.has('interventionist')),
      blurb: 'New Deal at home, quiet arsenal of democracy abroad — the path of the historical Roosevelt.',
    },
    {
      id: 'wilson',
      name: 'Woodrow Wilson',
      test: (s, flags) => s.diplomacy >= 60 && flags.has('interventionist') && !flags.has('cash-and-carry'),
      blurb: 'High principle, international ambition — and the chronic American gap between word and act.',
    },
    {
      id: 'lindbergh',
      name: 'America First — a Lindbergh path',
      test: (s, flags) => flags.has('isolationist') && flags.has('neutrality-act') && s.aggression < 0,
      blurb: 'You kept America out — even from the fight others say she should have joined.',
    },
    {
      id: 'hoover',
      name: 'A second Hoover',
      test: (s) => s.economy < 30,
      blurb: 'Too cautious in too dangerous a decade. The Depression outlasted you.',
    },
    {
      id: 'tr',
      name: 'A Theodore Roosevelt for the thirties',
      test: (s) => s.military >= 55 && s.aggression >= 10,
      blurb: 'Big stick, big speech, big build-up. America walked tall.',
    },
  ],
  britain: [
    {
      id: 'churchill',
      name: 'Winston Churchill',
      test: (s, flags) => (flags.has('british-rearm-early') || flags.has('british-rearm-modest')) && flags.has('declared-war'),
      blurb: 'Rearmament early, no Munich illusions, and the will to fight when the time came.',
    },
    {
      id: 'chamberlain',
      name: 'Neville Chamberlain',
      test: (s, flags) => flags.has('munich') && flags.has('british-appeasement'),
      blurb: 'You believed Hitler could be reasoned with, and bought a year of peace at the cost of a continent.',
    },
    {
      id: 'baldwin',
      name: 'Stanley Baldwin',
      test: (s, flags) => !flags.has('munich') && !flags.has('declared-war') && s.stability >= 55,
      blurb: 'Steady, unspectacular, broadly trusted. You held the line without quite knowing what was coming.',
    },
    {
      id: 'halifax',
      name: 'Lord Halifax',
      test: (s, flags) => flags.has('halifax-visit') || (flags.has('munich') && s.diplomacy >= 55),
      blurb: 'A diplomat to the core. You believed every problem could yield to the right private conversation.',
    },
    {
      id: 'eden',
      name: 'Anthony Eden',
      test: (s, flags) => flags.has('british-stands-firm') || flags.has('anti-italy-firm'),
      blurb: 'You broke with the appeasers when it counted, even when it cost you office.',
    },
  ],
  france: [
    {
      id: 'reynaud',
      name: 'Paul Reynaud',
      test: (s, flags) =>
        (flags.has('france-rhineland-strike') || flags.has('declared-war')) && s.military >= 55,
      blurb: 'A French Premier who saw what was coming, rearmed hard, and was ready to fight.',
    },
    {
      id: 'daladier',
      name: 'Édouard Daladier',
      test: (s, flags) => flags.has('munich') && flags.has('daladier-disgust'),
      blurb: 'You signed at Munich knowing it was a betrayal, hating yourself the whole way.',
    },
    {
      id: 'blum',
      name: 'Léon Blum',
      test: (s, flags) => flags.has('popular-front') || flags.has('matignon'),
      blurb: 'A government of the workers; the rich panicked, the franc tumbled, and Spain bled while you watched.',
    },
    {
      id: 'petain',
      name: 'Philippe Pétain (in waiting)',
      test: (s, flags) => flags.has('poland-betrayal') || (s.stability < 30 && s.aggression < 0),
      blurb: 'A France too tired to fight begins to look for the old marshal who will accept any terms.',
    },
    {
      id: 'barthou',
      name: 'Louis Barthou',
      test: (s, flags) => flags.has('eastern-allies') || flags.has('france-italy-axis'),
      blurb: 'A foreign minister who built alliances east and south, gathering France’s friends before the storm.',
    },
  ],
  germany: [
    {
      id: 'hitler',
      name: 'Adolf Hitler',
      test: (s, flags) =>
        flags.has('hitler-chancellor') || flags.has('invaded-poland') || flags.has('long-knives'),
      blurb: 'You walked the historical path: emergency powers, rearmament, expansion, war.',
    },
    {
      id: 'stresemann',
      name: 'A second Gustav Stresemann',
      test: (s, flags) =>
        (flags.has('weimar-survives') || flags.has('negotiated-rearm')) && s.diplomacy >= 50 && s.aggression < 15,
      blurb: 'Patient revision of Versailles, integration with the West, no appetite for ruin. A road not taken.',
    },
    {
      id: 'schleicher',
      name: 'A General Schleicher state',
      test: (s, flags) =>
        flags.has('authoritarian-not-nazi') && s.stability >= 40 && s.military >= 45,
      blurb: 'Military authoritarianism without the racial mania. Hard, narrow, but not apocalyptic.',
    },
    {
      id: 'goering',
      name: 'A Hermann Göring-led Reich',
      test: (s, flags) => flags.has('hitler-chancellor') && s.aggression < 25 && !flags.has('invaded-poland'),
      blurb: 'The Nazi state survived without lunging at the East. Repression at home, peace abroad. For now.',
    },
  ],
  italy: [
    {
      id: 'mussolini',
      name: 'Benito Mussolini',
      test: (s, flags) => flags.has('italy-axis') || flags.has('italy-at-war'),
      blurb: 'You signed the Pact of Steel and rode the German wave into catastrophe.',
    },
    {
      id: 'mussolini-west',
      name: 'A Western Mussolini',
      test: (s, flags) => flags.has('italy-with-west') && flags.has('stresa-front'),
      blurb: 'Fascism with a Western alignment. You stayed Britain’s friend and Hitler’s rival.',
    },
    {
      id: 'ciano',
      name: 'Galeazzo Ciano (in spirit)',
      test: (s, flags) => flags.has('italy-non-belligerent') || flags.has('italy-quiet'),
      blurb: 'You kept Italy out of the disaster — at the cost of letting Germany write Europe’s new map.',
    },
    {
      id: 'crispi',
      name: 'A Crispi-style imperialist',
      test: (s, flags) => flags.has('conquered-ethiopia') && !flags.has('italy-axis'),
      blurb: 'Empire first, ideology second. The Mediterranean and Africa belong to Italy, whatever Berlin thinks.',
    },
    {
      id: 'giolitti',
      name: 'A Giolittian restoration',
      test: (s, flags) =>
        flags.has('italy-with-west') && !flags.has('conquered-ethiopia') && !flags.has('italy-axis'),
      blurb: 'A cautious, liberal Italy. The Fascist costume kept; the Fascist program quietly abandoned.',
    },
  ],
  ussr: [
    {
      id: 'stalin',
      name: 'Joseph Stalin',
      test: (s, flags) => flags.has('great-terror') || flags.has('molotov-ribbentrop'),
      blurb: 'Terror at home, pact with Hitler abroad. The historical path, in all its violence.',
    },
    {
      id: 'litvinov',
      name: 'A Litvinov foreign policy',
      test: (s, flags) =>
        (flags.has('ussr-collective-security') || flags.has('grand-alliance-signed')) && !flags.has('molotov-ribbentrop'),
      blurb: 'Soviet diplomacy in service of collective security — and, just possibly, of preventing the war altogether.',
    },
    {
      id: 'trotsky',
      name: 'A Trotskyist permanent revolution',
      test: (s, flags) => flags.has('ussr-aided-republic') && s.aggression >= 15 && !flags.has('molotov-ribbentrop'),
      blurb: 'Open support for revolutions abroad, hostility to fascism everywhere. The path Trotsky preached and Stalin abandoned.',
    },
    {
      id: 'bukharin',
      name: 'A Bukharinist USSR',
      test: (s, flags) => flags.has('no-great-terror') && s.economy >= 45 && s.stability >= 45,
      blurb: 'Industrialization without terror, the NEP rebuilt. A USSR that might have looked like a country.',
    },
    {
      id: 'fortress',
      name: 'Fortress Russia',
      test: (s, flags) => flags.has('fortress-socialism') || flags.has('soviet-neutral'),
      blurb: 'Trust no one, arm everyone, wait for the capitalists to exhaust themselves. A Russian instinct, older than Bolshevism.',
    },
  ],
}

// ---------- Per-nation hidden objective scoring ----------
// Each objective returns 0 (failed), 1 (partial), or 2 (achieved).
const OBJECTIVES = {
  us: [
    {
      label: 'Pull America out of the Great Depression',
      score: (s) => (s.economy >= 60 ? 2 : s.economy >= 40 ? 1 : 0),
    },
    {
      label: 'Define America’s world role',
      score: (s, f) =>
        f.has('cash-and-carry') || f.has('interventionist') || f.has('arsenal-of-democracy') ? 2 :
        f.has('quarantine-speech') ? 1 :
        f.has('strict-neutrality') || f.has('isolationist') ? 1 : 0,
    },
    {
      label: 'Keep American sons out of an unwanted war',
      score: (s, f) =>
        !f.has('wwii') ? 2 :
        f.has('cash-and-carry') || f.has('arsenal-of-democracy') ? 1 : 0,
    },
  ],
  britain: [
    {
      label: 'Preserve the Empire and dominion loyalty',
      score: (s) => (s.stability >= 55 && s.diplomacy >= 55 ? 2 : s.stability >= 40 ? 1 : 0),
    },
    {
      label: 'Avoid another continental war',
      score: (s, f) => (!f.has('wwii') ? 2 : f.has('chamberlain-peace') ? 1 : 0),
    },
    {
      label: 'Balance the dictators rather than be dominated by them',
      score: (s, f) =>
        f.has('grand-alliance') || f.has('british-stands-firm') ? 2 :
        f.has('british-rearm-early') || f.has('british-rearm-modest') ? 1 : 0,
    },
  ],
  france: [
    {
      label: 'Secure France against German aggression',
      score: (s, f) =>
        f.has('france-rhineland-strike') || f.has('germany-humiliated') ? 2 :
        s.military >= 65 && s.diplomacy >= 55 ? 1 : 0,
    },
    {
      label: 'Maintain working alliances in the East and with Britain',
      score: (s, f) =>
        (f.has('eastern-allies') ? 1 : 0) +
        (f.has('anglo-french-firm') || f.has('grand-alliance') || f.has('franco-soviet-pact-strong') ? 1 : 0),
    },
    {
      label: 'Hold the Republic together at home',
      score: (s) => (s.stability >= 55 ? 2 : s.stability >= 35 ? 1 : 0),
    },
  ],
  germany: [
    {
      label: 'Restore German economic strength',
      score: (s) => (s.economy >= 55 ? 2 : s.economy >= 35 ? 1 : 0),
    },
    {
      label: 'Revise or overturn the Treaty of Versailles',
      score: (s, f) =>
        f.has('anschluss') || f.has('rhineland-remilitarized') || f.has('rearm-openly') ? 2 :
        f.has('negotiated-rearm') ? 1 : 0,
    },
    {
      label: 'Reclaim Germany’s great-power status without provoking a coalition',
      score: (s, f) =>
        !f.has('wwii') && s.diplomacy >= 35 ? 2 :
        !f.has('wwii') ? 1 : 0,
    },
  ],
  italy: [
    {
      label: 'Build a Mediterranean empire',
      score: (s, f) =>
        (f.has('conquered-ethiopia') ? 1 : 0) + (f.has('albania-conquered') ? 1 : 0),
    },
    {
      label: 'Place Italy with the winning side',
      score: (s, f) =>
        f.has('italy-non-belligerent') && f.has('wwii') ? 2 :
        f.has('italy-with-west') && !f.has('italy-at-war') ? 2 :
        !f.has('italy-at-war') ? 1 : 0,
    },
    {
      label: 'Modernize without bankrupting the regime',
      score: (s) => (s.economy >= 45 && s.stability >= 45 ? 2 : s.economy >= 30 ? 1 : 0),
    },
  ],
  ussr: [
    {
      label: 'Industrialize the Soviet Union',
      score: (s) => (s.economy >= 55 ? 2 : s.economy >= 35 ? 1 : 0),
    },
    {
      label: 'Defend the revolution from foreign enemies',
      score: (s, f) =>
        f.has('grand-alliance-signed') ? 2 :
        f.has('molotov-ribbentrop') ? 1 :
        s.military >= 55 ? 1 : 0,
    },
    {
      label: 'Make a coherent choice of alliance',
      score: (s, f) =>
        f.has('grand-alliance-signed') || f.has('molotov-ribbentrop') || f.has('fortress-socialism') ? 2 : 1,
    },
  ],
}

// ---------- Public API ----------
export function computeEnding({ nationId, stats, flags, tension, history }) {
  const flagSet = new Set(flags)
  const stateForTest = { ...stats, tension }

  const wwii = flagSet.has('wwii') || tension >= TENSION_FOR_WAR

  // Pick first matching archetype (ordered roughly by strength of claim).
  const archetype = ARCHETYPES.find((a) => a.test(stateForTest, flagSet))

  // Pick first matching historical figure for the nation; fall back to first.
  const figures = HISTORICAL[nationId] || []
  const historical =
    figures.find((h) => h.test(stateForTest, flagSet)) || figures[figures.length - 1]

  // Score objectives.
  const objectives = (OBJECTIVES[nationId] || []).map((o) => ({
    label: o.label,
    score: Math.max(0, Math.min(2, o.score(stats, flagSet))),
  }))
  const objectiveTotal = objectives.reduce((sum, o) => sum + o.score, 0)
  const objectiveMax = objectives.length * 2

  // Tier computation: base on objectives + outcome modifiers.
  let tierScore = objectiveTotal / objectiveMax // 0..1
  if (wwii && flagSet.has('invaded-poland')) tierScore -= 0.15 // started the war
  if (!wwii) tierScore += 0.1 // averted war as a bonus
  if (stats.stability < 20) tierScore -= 0.1
  if (stats.stability >= 70) tierScore += 0.05
  if (flagSet.has('great-terror') || flagSet.has('kristallnacht') || flagSet.has('holodomor'))
    tierScore -= 0.1
  tierScore = Math.max(0, Math.min(1, tierScore))

  const tier =
    tierScore >= 0.85 ? 'S' :
    tierScore >= 0.7  ? 'A' :
    tierScore >= 0.5  ? 'B' :
    tierScore >= 0.3  ? 'C' : 'D'

  return {
    wwii,
    tension,
    archetype: { name: archetype.name, blurb: archetype.blurb, id: archetype.id },
    historical: historical
      ? { name: historical.name, blurb: historical.blurb, id: historical.id }
      : null,
    objectives,
    objectiveTotal,
    objectiveMax,
    tier,
    historyCount: history.length,
  }
}
