// Each event has: id, year, month (1-12, for ordering), title, appliesTo (nation ids),
// and variants keyed by nation id. Each variant has a short description + 2-3 short choices.
// Each choice has: label, outcome (1 sentence), effects (stat deltas), tension (delta to
// hidden global war-tension stat), and optional flags written to the player record.
//
// Hidden global "tension" starts at 30. If tension >= 70 at the end of 1939, World War II
// breaks out. Aggression on the player's record colors their final archetype.

export const events = [
  // ============================================================
  // 1933 — The Year of the Dictators
  // ============================================================
  {
    id: 'shared-1933-hitler-appointed',
    year: 1933, month: 1, title: 'A New German Chancellor',
    variants: {
      germany: {
        title: 'Hindenburg’s Dilemma',
        description: 'The President must name a Chancellor. The Reichstag is paralyzed; the streets are aflame.',
        choices: [
          { label: 'Appoint Hitler', outcome: 'Hitler is sworn in. Torchlight parades flood Berlin.', effects: { stability: +5, economy: +3, aggression: +12, diplomacy: -8 }, tension: +6, flags: ['hitler-chancellor'] },
          { label: 'Keep General Schleicher', outcome: 'A military-bureaucratic government holds the line for now.', effects: { stability: -5, military: +5, aggression: +3 }, tension: -2, flags: ['authoritarian-not-nazi'] },
          { label: 'Force a coalition with the Social Democrats', outcome: 'A fragile democratic cabinet survives the week.', effects: { stability: -8, diplomacy: +8, aggression: -8 }, tension: -4, flags: ['weimar-survives'] },
        ],
      },
      us: {
        description: 'Berlin telegraphs: Hitler is Chancellor. The State Department asks how to respond.',
        choices: [
          { label: 'Issue cautious congratulations', outcome: 'A polite note. Europe is reminded America stays at arm’s length.', effects: { diplomacy: 0 }, tension: +1 },
          { label: 'Privately warn Berlin against extremism', outcome: 'A back-channel message. Hitler files it away.', effects: { diplomacy: +3, aggression: +3 }, tension: 0 },
          { label: 'No comment — Europe is Europe', outcome: 'Silence. The isolationists are pleased.', effects: { stability: +3 }, tension: +2, flags: ['isolationist'] },
        ],
      },
      britain: {
        description: 'Hitler is Chancellor of Germany. The Foreign Office considers its line.',
        choices: [
          { label: 'Sound out Hitler — he may be reasonable', outcome: 'Quiet talks open with the new regime.', effects: { diplomacy: +5, aggression: -3 }, tension: +2, flags: ['british-engagement'] },
          { label: 'Cool, formal recognition only', outcome: 'A correct diplomatic minimum.', effects: { diplomacy: 0 }, tension: 0 },
          { label: 'Privately tell Paris we will support firmness', outcome: 'The Anglo-French line stiffens.', effects: { diplomacy: +5, aggression: +3 }, tension: -2, flags: ['anglo-french-firm'] },
        ],
      },
      france: {
        description: 'A new German Chancellor speaks of tearing up Versailles. France is alarmed.',
        choices: [
          { label: 'Demand a British guarantee at once', outcome: 'Whitehall is evasive but a joint protest is drafted.', effects: { diplomacy: +5 }, tension: 0, flags: ['anglo-french-firm'] },
          { label: 'Reinforce Eastern alliances (Poland, Czechs)', outcome: 'The Little Entente is reaffirmed.', effects: { diplomacy: +8 }, tension: -2, flags: ['eastern-allies'] },
          { label: 'Accelerate the Maginot Line', outcome: 'Concrete pours faster along the German frontier.', effects: { military: +8, economy: -3 }, tension: 0 },
        ],
      },
      italy: {
        description: 'Hitler is in power. He claims you as ideological father. The world watches Rome.',
        choices: [
          { label: 'Welcome him as a fellow Fascist', outcome: 'A warm telegram to Berlin. The democracies stiffen.', effects: { diplomacy: -3, aggression: +5 }, tension: +3, flags: ['italy-flirts-germany'] },
          { label: 'Keep him at arm’s length — Italy first', outcome: 'Polite but cool reception. Hitler is annoyed.', effects: { diplomacy: +3, aggression: 0 }, tension: 0 },
          { label: 'Lean toward London and Paris instead', outcome: 'You signal you are still a Western statesman.', effects: { diplomacy: +8, aggression: -3 }, tension: -2, flags: ['italy-with-west'] },
        ],
      },
      ussr: {
        description: 'Hitler is Chancellor. Mein Kampf names you the enemy. The Politburo wants your line.',
        choices: [
          { label: 'Pivot to collective security with the West', outcome: 'Litvinov packs his bags for Geneva.', effects: { diplomacy: +10, aggression: -3 }, tension: -3, flags: ['ussr-collective-security'] },
          { label: 'Quietly keep Berlin channels open', outcome: 'A Soviet attaché in Berlin is told to listen.', effects: { aggression: +5 }, tension: +2, flags: ['ussr-flirts-germany'] },
          { label: 'Fortress socialism — trust no capitalist', outcome: 'Litvinov is sidelined; the Comintern radicalizes.', effects: { military: +5, diplomacy: -8, aggression: +5 }, tension: +1, flags: ['fortress-socialism'] },
        ],
      },
      poland: {
        description: 'Hitler is Chancellor. A new chapter for a 200-year-old problem with your western neighbor.',
        choices: [
          { label: 'Press France to confront Berlin now', outcome: 'Paris is uninterested; you make the case anyway.', effects: { diplomacy: +5, aggression: +5 }, tension: 0 },
          { label: 'Sound out Berlin for a settlement', outcome: 'Quiet talks begin; Hitler is unexpectedly receptive.', effects: { diplomacy: +5 }, tension: -1 },
          { label: 'Accelerate the army modernization', outcome: 'Beck orders the General Staff to plan for a two-front war.', effects: { military: +8, economy: -3 }, tension: 0 },
        ],
      },
      czechoslovakia: {
        description: 'Hitler is Chancellor. Three million Sudeten Germans inside your borders watch Berlin closely.',
        choices: [
          { label: 'Reinforce the French alliance', outcome: 'Beneš travels to Paris; Laval is reassuring but vague.', effects: { diplomacy: +8 }, tension: 0 },
          { label: 'Begin fortifying the German frontier', outcome: 'Concrete pours along the Bohemian mountains; the Sudetenland watches.', effects: { military: +10, economy: -5 }, tension: 0, flags: ['czech-fortifications'] },
          { label: 'Open quiet talks with Berlin', outcome: 'A correct diplomatic minimum; the press at home is uneasy.', effects: { diplomacy: +3 }, tension: 0 },
        ],
      },
      yishuv: {
        description: 'Hitler is Chancellor. Reports reach Tel Aviv of Jewish lawyers struck off the rolls, synagogues defaced, the first arrests. The Jewish Agency must prepare.',
        choices: [
          { label: 'Open an emergency immigration office in Berlin', outcome: 'A pipeline begins; the Mandate quietly assists.', effects: { economy: +5, stability: +5, diplomacy: +3 }, tension: 0, flags: ['emergency-aliyah'] },
          { label: 'Lead the worldwide Jewish boycott of Germany', outcome: 'The Yishuv aligns with diaspora protest; Berlin retaliates against German Jews.', effects: { diplomacy: +5, economy: -3 }, tension: 0, flags: ['boycott-germany'] },
          { label: 'Prioritize quietly building the institutions of state', outcome: 'Land, settlements, schools, defense — the foundations deepen.', effects: { economy: +5, stability: +5, military: +3 }, tension: 0, flags: ['state-building'] },
        ],
      },
    },
  },

  {
    id: 'germany-1933-reichstag-fire',
    year: 1933, month: 2, title: 'The Reichstag Burns',
    appliesTo: ['germany'],
    requires: ['hitler-chancellor'],
    variants: {
      germany: {
        description: 'A Dutch Communist is arrested at the scene. The Nazis demand emergency powers.',
        choices: [
          { label: 'Sign the Reichstag Fire Decree', outcome: 'Civil liberties are suspended overnight.', effects: { stability: +5, diplomacy: -5, aggression: +8 }, tension: +3, flags: ['fire-decree'] },
          { label: 'Crack down on the KPD alone', outcome: 'Communists are arrested; the constitution stands.', effects: { stability: +3, aggression: +3 }, tension: +1 },
          { label: 'Refuse — defend the rule of law', outcome: 'Nazi press denounces you as a traitor.', effects: { stability: -8, diplomacy: +3, aggression: -8 }, tension: -2, flags: ['weimar-survives'] },
        ],
      },
    },
  },

  {
    id: 'us-1933-banks',
    year: 1933, month: 3, title: 'Bank Holiday',
    appliesTo: ['us'],
    variants: {
      us: {
        description: 'The banking system is collapsing. Thirty-eight states have declared bank holidays.',
        choices: [
          { label: 'Declare a national bank holiday', outcome: 'You freeze the banks for four days to halt the panic.', effects: { economy: +10, stability: +8 }, tension: 0, flags: ['bank-holiday'] },
          { label: 'Let states handle it', outcome: 'The crisis deepens; runs continue.', effects: { economy: -8, stability: -5 }, tension: 0 },
          { label: 'Nationalize the failing banks', outcome: 'Wall Street howls. The left cheers.', effects: { economy: +5, diplomacy: -3, aggression: +5 }, tension: 0, flags: ['radical-recovery'] },
        ],
      },
    },
  },

  {
    id: 'us-1933-fireside',
    year: 1933, month: 3, title: 'The First Fireside Chat',
    appliesTo: ['us'],
    variants: {
      us: {
        description: 'The country is listening. How do you address it?',
        choices: [
          { label: '"Nothing to fear but fear itself"', outcome: 'A line that will outlive the decade.', effects: { stability: +8, economy: +3 }, tension: 0 },
          { label: 'Stark warning about hard times ahead', outcome: 'Honest, but the markets shudder.', effects: { stability: -3, economy: -3 }, tension: 0 },
          { label: 'Skip it — let policy speak', outcome: 'No radio address. The press is puzzled.', effects: { stability: -5 }, tension: 0 },
        ],
      },
    },
  },

  {
    id: 'us-1933-new-deal',
    year: 1933, month: 5, title: 'The Hundred Days',
    appliesTo: ['us'],
    variants: {
      us: {
        description: 'Congress will pass whatever you send. What goes first?',
        choices: [
          { label: 'AAA, NIRA, CCC — the full New Deal', outcome: 'Federal power expands as never before in peacetime.', effects: { economy: +12, stability: +5 }, tension: 0, flags: ['new-deal'] },
          { label: 'Banking reform only', outcome: 'Glass-Steagall passes; broader programs wait.', effects: { economy: +5 }, tension: 0, flags: ['moderate-recovery'] },
          { label: 'Balance the budget first', outcome: 'Austerity from a new President shocks the left.', effects: { economy: -5, stability: -5 }, tension: 0, flags: ['austerity-turn'] },
        ],
      },
    },
  },

  {
    id: 'germany-1933-enabling',
    year: 1933, month: 3, title: 'The Enabling Act',
    appliesTo: ['germany'],
    requires: ['hitler-chancellor'],
    variants: {
      germany: {
        description: 'The Nazi-Center coalition can pass an act letting the Chancellor rule by decree for four years.',
        choices: [
          { label: 'Pass the Enabling Act', outcome: 'The Reichstag votes itself out of relevance.', effects: { stability: +10, diplomacy: -10, aggression: +15 }, tension: +6, flags: ['enabling-act', 'one-party-state'] },
          { label: 'Refuse — keep parliamentary rule', outcome: 'The Nazis cannot rule alone. Streets erupt.', effects: { stability: -10, diplomacy: +5, aggression: -10 }, tension: -3, flags: ['weimar-survives'] },
        ],
      },
    },
  },

  {
    id: 'germany-1933-one-party',
    year: 1933, month: 7, title: 'Other Parties Banned',
    appliesTo: ['germany'],
    requires: ['hitler-chancellor'],
    variants: {
      germany: {
        description: 'Goebbels proposes dissolving every party but the NSDAP.',
        choices: [
          { label: 'Ban every other party', outcome: 'Germany becomes a one-party state.', effects: { stability: +8, diplomacy: -5, aggression: +10 }, tension: +3, flags: ['one-party-state'] },
          { label: 'Ban only the SPD and KPD', outcome: 'Conservative parties survive on paper.', effects: { stability: +3, aggression: +5 }, tension: +1 },
          { label: 'Refuse — multi-party Reich', outcome: 'Hitler is furious; the SA mutinous.', effects: { stability: -10, aggression: -5 }, tension: -2 },
        ],
      },
    },
  },

  {
    id: 'ussr-1933-famine',
    year: 1933, month: 4, title: 'The Ukrainian Famine',
    appliesTo: ['ussr'],
    variants: {
      ussr: {
        description: 'Whole villages are dying in the wheat belt. Quotas have stripped them bare.',
        choices: [
          { label: 'Deny it; keep the requisitions', outcome: 'Borders to Ukraine are closed; the dead are buried in mass graves.', effects: { economy: +8, stability: -8, diplomacy: -5, aggression: +10 }, tension: 0, flags: ['holodomor'] },
          { label: 'Quietly ease quotas in the worst oblasts', outcome: 'Food trickles back. Industrialization slows.', effects: { economy: -3, stability: +3 }, tension: 0 },
          { label: 'Accept Red Cross aid', outcome: 'Foreign relief arrives. Stalin loses face.', effects: { stability: +8, diplomacy: +8, aggression: -8 }, tension: -2 },
        ],
      },
    },
  },

  {
    id: 'ussr-1933-five-year',
    year: 1933, month: 6, title: 'The Second Five-Year Plan',
    appliesTo: ['ussr'],
    variants: {
      ussr: {
        description: 'Gosplan submits the next plan. The targets are yours to set.',
        choices: [
          { label: 'Heavy industry and arms above all', outcome: 'Tanks and tractors. Consumer goods wait.', effects: { economy: +5, military: +10, stability: -5 }, tension: +2, flags: ['red-army-buildup'] },
          { label: 'Balance industry with consumer goods', outcome: 'A more livable USSR; slower military growth.', effects: { economy: +10, stability: +5 }, tension: 0 },
          { label: 'Slow the pace — let the country breathe', outcome: 'Bukharinite voices return; production lags.', effects: { economy: +3, stability: +8, military: -3 }, tension: 0, flags: ['slow-industry'] },
        ],
      },
    },
  },

  {
    id: 'italy-1933-iri',
    year: 1933, month: 6, title: 'Rescue the Banks',
    appliesTo: ['italy'],
    variants: {
      italy: {
        description: 'Italian finance is in crisis. Your ministers propose the IRI to absorb failing firms.',
        choices: [
          { label: 'Found the IRI — state takes industry', outcome: 'The Fascist state owns more industry than any Western nation.', effects: { economy: +10, stability: +5, military: +3 }, tension: 0, flags: ['state-industry'] },
          { label: 'Push autarky — close the borders', outcome: 'Tariffs rise; Italians eat black bread for the Empire.', effects: { economy: -5, military: +8, diplomacy: -8, aggression: +5 }, tension: +2, flags: ['autarky'] },
          { label: 'Open to foreign capital', outcome: 'British and American firms return to Milan.', effects: { economy: +12, diplomacy: +8, aggression: -3 }, tension: -2, flags: ['western-aligned'] },
        ],
      },
    },
  },

  {
    id: 'italy-1933-empire',
    year: 1933, month: 9, title: 'The Empire Question',
    appliesTo: ['italy'],
    variants: {
      italy: {
        description: 'Generals draft plans for Ethiopia. Diplomats counsel patience.',
        choices: [
          { label: 'Approve war planning quietly', outcome: 'The General Staff begins preparations.', effects: { military: +5, aggression: +5 }, tension: +2, flags: ['ethiopia-planning'] },
          { label: 'Insist on a colonial deal with London first', outcome: 'A Western-flavoured imperial path.', effects: { diplomacy: +5 }, tension: 0 },
          { label: 'Drop the Ethiopian project', outcome: 'The army sulks; Africa shelved.', effects: { military: -3, diplomacy: +8, aggression: -5 }, tension: -2, flags: ['no-ethiopia'] },
        ],
      },
    },
  },

  {
    id: 'britain-1933-rearm',
    year: 1933, month: 10, title: 'The Ten-Year Rule Falls',
    appliesTo: ['britain'],
    variants: {
      britain: {
        description: 'The Defence Requirements Committee wants rearmament. The Treasury wants none.',
        choices: [
          { label: 'Full rearmament aimed at Germany', outcome: 'Yards and air bases get new orders.', effects: { military: +12, economy: -8 }, tension: +2, flags: ['british-rearm-early'] },
          { label: 'Modest air defence and fleet only', outcome: 'Spitfires on the drawing board; the army waits.', effects: { military: +6, economy: -3 }, tension: +1, flags: ['british-rearm-modest'] },
          { label: 'No rearmament — trust the League', outcome: 'Geneva is asked to handle Berlin.', effects: { military: -3, economy: +5, aggression: -5 }, tension: 0, flags: ['league-faith'] },
        ],
      },
    },
  },

  {
    id: 'france-1933-stavisky',
    year: 1933, month: 12, title: 'The Stavisky Scandal',
    appliesTo: ['france'],
    variants: {
      france: {
        description: 'A financial swindler is dead and the right blames the Radical cabinet.',
        choices: [
          { label: 'Defend the ministers', outcome: 'Right-wing leagues march nightly in Paris.', effects: { stability: -8 }, tension: 0, flags: ['weak-republic'] },
          { label: 'Sacrifice the implicated ministers', outcome: 'Heads roll; confidence stabilizes.', effects: { stability: +5 }, tension: -1 },
          { label: 'Ban the right-wing leagues', outcome: 'The right cries dictatorship; the left applauds.', effects: { stability: -3, aggression: +5 }, tension: 0, flags: ['ban-leagues'] },
        ],
      },
    },
  },

  {
    id: 'shared-1933-leave-league',
    year: 1933, month: 10, title: 'Germany Quits the League',
    appliesTo: ['us', 'britain', 'france', 'italy', 'ussr'],
    variants: {
      us: { description: 'Berlin walks out of Geneva. America must say something — or not.', choices: [
        { label: 'Express concern', outcome: 'A polite note from Hull.', effects: { diplomacy: +2 }, tension: +1 },
        { label: 'Stay out of it', outcome: 'Silence. The isolationists approve.', effects: { stability: +3 }, tension: +2, flags: ['isolationist'] },
      ]},
      britain: { description: 'Berlin walks out of Geneva. London weighs how firm to be.', choices: [
        { label: 'Court Hitler back', outcome: 'Quiet talks; the principle of collective security wobbles.', effects: { diplomacy: +3 }, tension: +3, flags: ['british-engagement'] },
        { label: 'Join France in a stern protest', outcome: 'An Anglo-French note condemns the walkout.', effects: { diplomacy: +5, aggression: +3 }, tension: -1, flags: ['anglo-french-firm'] },
      ]},
      france: { description: 'Germany walks out of Geneva. France feels naked.', choices: [
        { label: 'Demand British solidarity', outcome: 'A joint protest is issued; little more.', effects: { diplomacy: +5 }, tension: 0, flags: ['anglo-french-firm'] },
        { label: 'Open talks with Moscow', outcome: 'Soviet diplomats are received in Paris.', effects: { diplomacy: +5, stability: -3 }, tension: -2, flags: ['franco-soviet-pact'] },
      ]},
      italy: { description: 'Berlin walks out of Geneva. You can be Europe’s arbiter.', choices: [
        { label: 'Side with London and Paris', outcome: 'You signal Mediterranean partnership with the West.', effects: { diplomacy: +8 }, tension: -3, flags: ['italy-with-west'] },
        { label: 'Quiet warmth toward Berlin', outcome: 'Goering thanks you privately.', effects: { aggression: +5 }, tension: +4, flags: ['italy-flirts-germany'] },
      ]},
      ussr: { description: 'Berlin walks out. The capitalist order is cracking.', choices: [
        { label: 'Apply to join the League', outcome: 'Stunning reversal: Litvinov goes to Geneva.', effects: { diplomacy: +10, aggression: -3 }, tension: -3, flags: ['ussr-collective-security'] },
        { label: 'Reach quietly toward Berlin', outcome: 'A Soviet attaché in Berlin is given new orders.', effects: { aggression: +5 }, tension: +3, flags: ['ussr-flirts-germany'] },
      ]},
    },
  },

  // ============================================================
  // 1934
  // ============================================================
  {
    id: 'germany-1934-coalition',
    year: 1934, month: 4, title: 'Holding the Coalition',
    appliesTo: ['germany'],
    requires: ['weimar-survives'],
    variants: {
      germany: {
        description: 'The Grand Coalition is fragile. Industrialists, the army, and the Nazi rump press from different sides.',
        choices: [
          { label: 'Make concessions to industry', outcome: 'Krupp and Thyssen breathe easier; the SPD seethes.', effects: { economy: +8, stability: -3 }, tension: 0 },
          { label: 'Press a public-works programme', outcome: 'Roads, rail, and unemployment offices spring up; deficits widen.', effects: { economy: +10, stability: +5 }, tension: 0, flags: ['public-works'] },
          { label: 'Ban the NSDAP after the failed coup', outcome: 'Hitler is arrested; the Republic shows its teeth.', effects: { stability: +5, aggression: +3 }, tension: -2, flags: ['nazis-banned'] },
        ],
      },
    },
  },

  {
    id: 'germany-1934-army-oath',
    year: 1934, month: 8, title: 'Hindenburg is Dead',
    appliesTo: ['germany'],
    variants: {
      germany: {
        description: 'The old President is dead. The army wonders to whom it now swears its oath.',
        choices: [
          { label: 'Combine the offices — Führer of the Reich', outcome: 'Every soldier swears personal loyalty to you.', effects: { stability: +10, military: +5, aggression: +10 }, tension: +3, flags: ['fuhrer'], requires: ['hitler-chancellor'] },
          { label: 'Elect a centrist president', outcome: 'A constitutional succession; the Republic holds.', effects: { stability: +8, diplomacy: +5, aggression: -3 }, tension: -1, flags: ['weimar-survives'], excludes: ['hitler-chancellor'] },
          { label: 'Elect a conservative-military president', outcome: 'A general takes the highest office; the Reichswehr is reassured.', effects: { stability: +5, military: +5 }, tension: 0, excludes: ['hitler-chancellor'] },
          { label: 'Elect a new president', outcome: 'A new presidency preserves a fig leaf of separation.', effects: { stability: +3, aggression: 0 }, tension: 0, requires: ['hitler-chancellor'] },
        ],
      },
    },
  },

  {
    id: 'germany-1934-long-knives',
    year: 1934, month: 6, title: 'The SA Problem',
    appliesTo: ['germany'],
    requires: ['hitler-chancellor'],
    variants: {
      germany: {
        description: 'Röhm’s SA wants to absorb the Army. The generals demand a choice.',
        choices: [
          { label: 'Purge the SA leadership', outcome: 'Röhm and dozens of others are shot; the Army swears loyalty.', effects: { military: +10, stability: +8, aggression: +12 }, tension: +3, flags: ['long-knives', 'ss-supremacy'] },
          { label: 'Reform the SA peacefully', outcome: 'Röhm is shunted aside; no blood.', effects: { stability: -3, military: -3, aggression: -3 }, tension: -1 },
          { label: 'Side with Röhm against the Army', outcome: 'The Reichswehr revolts; the regime convulses.', effects: { stability: -20, military: -15 }, tension: +5, flags: ['army-revolt'] },
        ],
      },
    },
  },

  {
    id: 'shared-1934-dollfuss',
    year: 1934, month: 7, title: 'Dollfuss is Murdered',
    variants: {
      germany: {
        description: 'Austrian Nazis have killed Dollfuss. Mussolini moves divisions to the Brenner.',
        altDescriptions: [
          { when: ['weimar-survives'], text: 'Austrian Nazis — encouraged by emigrés in Munich — have killed Dollfuss. Mussolini moves divisions to the Brenner. The Republic must answer for what was done in Germany’s name.' },
        ],
        choices: [
          { label: 'Disavow the coup', outcome: 'You publicly mourn Dollfuss; Mussolini is mollified.', effects: { diplomacy: +8, aggression: -5 }, tension: -3, flags: ['austria-restraint'] },
          { label: 'Praise the rebels privately', outcome: 'A defiant note to Rome; the Anschluss is delayed by force.', effects: { aggression: +8, diplomacy: -8 }, tension: +4, requires: ['hitler-chancellor'] },
          { label: 'Arrest the Munich plotters and apologize to Rome', outcome: 'A republican government does not stand by political murder.', effects: { diplomacy: +12, stability: +5, aggression: -8 }, tension: -4, excludes: ['hitler-chancellor'] },
        ],
      },
      us: { description: 'Austrian Nazis killed Dollfuss. Mussolini mobilized. Europe holds its breath.', choices: [
        { label: 'Endorse Austrian independence', effects: { diplomacy: +3 }, outcome: 'Symbolic; Berlin shrugs.', tension: -1 },
        { label: 'No comment', effects: { stability: +3 }, outcome: 'Silence from Washington.', tension: +1, flags: ['isolationist'] },
      ]},
      britain: { description: 'Dollfuss is dead; Mussolini acted where you did not.', choices: [
        { label: 'Endorse Italy’s stand', outcome: 'A quiet thank-you to Mussolini.', effects: { diplomacy: +5 }, tension: -3, flags: ['stresa-front'] },
        { label: 'Stay above the fray', outcome: 'Whitehall deplores the violence and proposes nothing.', effects: { diplomacy: -3 }, tension: +2 },
      ]},
      france: { description: 'Vienna in chaos. Mussolini, not France, saved Austria.', choices: [
        { label: 'Court Italy — a Latin entente', outcome: 'Barthou travels to Rome.', effects: { diplomacy: +8, military: +3 }, tension: -3, flags: ['france-italy-axis', 'stresa-front'] },
        { label: 'Move troops to the Rhine in solidarity', outcome: 'A show of force; the Reichswehr stays in barracks.', effects: { military: +5, diplomacy: -3, aggression: +5 }, tension: +3 },
      ]},
      italy: { description: 'Your protégé Dollfuss is dead. Italian divisions are at the Brenner.', choices: [
        { label: 'Hold the Brenner; lead an anti-Hitler front', outcome: 'You become Europe’s arbiter.', effects: { diplomacy: +12, military: +5, aggression: +5 }, tension: -5, flags: ['stresa-front', 'italy-with-west'] },
        { label: 'Stand alone — Italy defends Austria', outcome: 'Italian prestige soars; the treasury bleeds.', effects: { military: +5, economy: -5, aggression: +8 }, tension: -2 },
        { label: 'Withdraw the troops after a week', outcome: 'You posture, then retreat. Hitler reads weakness.', effects: { aggression: -3 }, tension: +3 },
      ]},
      ussr: { description: 'Fascists have killed fascists. The Politburo wants the Soviet line.', choices: [
        { label: 'Endorse Western resistance to Berlin', outcome: 'Litvinov writes a supportive note.', effects: { diplomacy: +5 }, tension: -2, flags: ['ussr-collective-security'] },
        { label: 'Stay silent — let capitalists fight', outcome: 'Comintern propaganda celebrates the chaos.', effects: { aggression: +3 }, tension: +2 },
      ]},
    },
  },

  {
    id: 'ussr-1934-join-league',
    year: 1934, month: 9, title: 'Geneva Calls',
    appliesTo: ['ussr'],
    variants: {
      ussr: {
        description: 'The Western powers offer the USSR a seat at the League.',
        choices: [
          { label: 'Accept — Litvinov takes the seat', outcome: 'The USSR is, suddenly, a respectable power.', effects: { diplomacy: +12, aggression: -3 }, tension: -3, flags: ['ussr-collective-security'] },
          { label: 'Decline — bourgeois club', outcome: 'A Marxist refusal; the West is bewildered.', effects: { diplomacy: -8, stability: +3 }, tension: +2, flags: ['fortress-socialism'] },
        ],
      },
    },
  },

  {
    id: 'ussr-1934-kirov',
    year: 1934, month: 12, title: 'A Bullet in Leningrad',
    appliesTo: ['ussr'],
    variants: {
      ussr: {
        description: 'Kirov, the popular Party boss of Leningrad, has been shot dead.',
        choices: [
          { label: 'Launch mass arrests at once', outcome: 'The Kirov Decree suspends due process. The Terror begins.', effects: { stability: +5, military: -5, diplomacy: -8, aggression: +12 }, tension: 0, flags: ['great-terror'] },
          { label: 'Quietly investigate; punish the killer alone', outcome: 'Nikolayev is shot; the Party is shaken but intact.', effects: { stability: -3, aggression: -3 }, tension: 0, flags: ['no-great-terror'] },
          { label: 'A selective purge of rivals only', outcome: 'Zinoviev and Kamenev are arrested. The message is received.', effects: { aggression: +6 }, tension: 0, flags: ['selective-purge'] },
        ],
      },
    },
  },

  {
    id: 'france-1934-riots',
    year: 1934, month: 2, title: 'Riots in Paris',
    appliesTo: ['france'],
    variants: {
      france: {
        description: 'February 6: right-wing leagues storm the Place de la Concorde. The Chamber wavers.',
        choices: [
          { label: 'Order police to fire', outcome: 'Fifteen dead. The Republic survives the night.', effects: { stability: -5, aggression: +5 }, tension: 0 },
          { label: 'Call out the army', outcome: 'Soldiers in the streets. The crisis subsides; the precedent is grim.', effects: { stability: -8, military: +3, aggression: +5 }, tension: 0 },
          { label: 'Negotiate with the leagues', outcome: 'A cabinet falls; appeasement at home.', effects: { stability: -3, diplomacy: -3 }, tension: 0, flags: ['weak-republic'] },
        ],
      },
    },
  },

  {
    id: 'us-1934-securities',
    year: 1934, month: 6, title: 'Wall Street Reform',
    appliesTo: ['us'],
    variants: {
      us: {
        description: 'The Securities and Exchange Commission is ready to be born — if you sign.',
        choices: [
          { label: 'Sign — federal regulation of Wall Street', outcome: 'A new sheriff on Wall Street.', effects: { economy: +8, stability: +3 }, tension: 0 },
          { label: 'Veto — markets should be free', outcome: 'Wall Street toasts your name.', effects: { economy: -3, stability: -3 }, tension: 0 },
        ],
      },
    },
  },

  {
    id: 'britain-1934-india',
    year: 1934, month: 11, title: 'India Stirs',
    appliesTo: ['britain'],
    variants: {
      britain: {
        description: 'The Government of India Bill offers limited self-rule. Churchill calls it surrender.',
        choices: [
          { label: 'Pass the Bill — gradual reform', outcome: 'India edges toward dominion status.', effects: { stability: +5, diplomacy: +5 }, tension: 0 },
          { label: 'Block it — preserve direct rule', outcome: 'Indian nationalism hardens.', effects: { stability: -5, diplomacy: -3 }, tension: 0 },
        ],
      },
    },
  },

  // ============================================================
  // 1935
  // ============================================================
  {
    id: 'germany-1935-stresemann',
    year: 1935, month: 5, title: 'A Stresemann for Our Time',
    appliesTo: ['germany'],
    requires: ['weimar-survives'],
    variants: {
      germany: {
        description: 'France offers serious treaty-revision talks if Germany commits to the existing frontiers. Stresemann’s heirs see an opening.',
        choices: [
          { label: 'Accept — guarantee frontiers, win revision', outcome: 'A new Locarno; Germany returns to the European concert.', effects: { diplomacy: +15, economy: +5, aggression: -3 }, tension: -5, flags: ['new-locarno'] },
          { label: 'Counter-propose: revision first, frontiers later', outcome: 'Paris bristles; the talks limp along.', effects: { diplomacy: +3 }, tension: +1 },
          { label: 'Reject — German rights are not for sale', outcome: 'A nationalist hardening; the Western powers stiffen.', effects: { diplomacy: -8, aggression: +8, stability: +3 }, tension: +5, flags: ['nationalist-republic'] },
        ],
      },
    },
  },

  {
    id: 'germany-1935-saar',
    year: 1935, month: 1, title: 'The Saar Plebiscite',
    appliesTo: ['germany'],
    variants: {
      germany: {
        description: 'Saarlanders vote to return to the Reich, 90%. The propaganda value is enormous.',
        choices: [
          { label: 'Triumphal welcome; rallies and parades', outcome: 'The Saar reunion is a propaganda windfall.', effects: { stability: +8, aggression: +5 }, tension: +1 },
          { label: 'Quiet, dignified ceremony', outcome: 'You absorb the territory without fanfare.', effects: { stability: +3 }, tension: 0 },
        ],
      },
    },
  },

  {
    id: 'shared-1935-german-rearm',
    year: 1935, month: 3, title: 'Germany Rearms Openly',
    variants: {
      germany: {
        description: 'Goering already runs a secret Luftwaffe. Generals ask: do we tell the world?',
        altDescriptions: [
          { when: ['weimar-survives'], text: 'The Reichswehr asks for equality of arms with France. The Foreign Ministry warns that defiance of Versailles risks isolation; the General Staff warns that obedience to it risks invasion.' },
        ],
        choices: [
          { label: 'Announce conscription and the Luftwaffe', outcome: 'Crowds cheer; France mobilizes; Britain shrugs.', effects: { military: +18, stability: +8, aggression: +12 }, tension: +8, flags: ['rearm-openly'], requires: ['hitler-chancellor'] },
          { label: 'Keep rearming in secret', outcome: 'The buildup continues; foreign powers pretend not to know.', effects: { military: +10, aggression: +5 }, tension: +3, flags: ['rearm-secret'] },
          { label: 'Negotiate arms parity through Geneva', outcome: 'A legal, gradual rearmament; Stresemann’s ghost smiles.', effects: { military: +6, diplomacy: +10, aggression: 0 }, tension: -3, flags: ['negotiated-rearm'], excludes: ['hitler-chancellor'] },
        ],
      },
      us: { description: 'Berlin announces an air force and a 550,000-man army.', choices: [
        { label: 'Sign the new Neutrality Act', outcome: 'Aggressor and victim treated as moral equals.', effects: { diplomacy: -5, aggression: -8 }, tension: +4, flags: ['neutrality-act', 'isolationist'] },
        { label: 'Veto it — keep the President’s hand free', outcome: 'Congress overrides you; the fight is on the record.', effects: { diplomacy: +5, stability: -5, aggression: +3 }, tension: -1, flags: ['interventionist'] },
      ]},
      britain: { description: 'Berlin announces an air force and a 550,000-man army.', choices: [
        { label: 'Sign the Anglo-German Naval Agreement', outcome: 'A 35% deal accepts German naval growth. Paris is appalled.', effects: { military: +3, diplomacy: -8 }, tension: +4, flags: ['naval-agreement', 'british-engagement'] },
        { label: 'Join Stresa — protest and rearm', outcome: 'Britain, France, Italy stand together.', effects: { military: +8, diplomacy: +8, aggression: +5 }, tension: -2, flags: ['stresa-front', 'british-rearm-modest'] },
        { label: 'Stern note, no action', outcome: 'Whitehall protests; Berlin laughs.', effects: { diplomacy: -3 }, tension: +4 },
      ]},
      france: { description: 'Berlin announces an air force and a 550,000-man army.', choices: [
        { label: 'March into the Rhineland to enforce Versailles', outcome: 'A bold gamble; you stand without Britain.', effects: { military: +3, diplomacy: -8, aggression: +12, stability: -5 }, tension: +10, flags: ['france-rhineland-strike'] },
        { label: 'Join the Stresa Front', outcome: 'France, Britain, Italy condemn Berlin together.', effects: { military: +8, diplomacy: +8 }, tension: -3, flags: ['stresa-front'] },
        { label: 'Sign the Franco-Soviet Pact', outcome: 'Laval signs reluctantly; the right calls you a Bolshevik.', effects: { military: +5, diplomacy: +5, stability: -5 }, tension: -2, flags: ['franco-soviet-pact'] },
      ]},
      italy: { description: 'Berlin rearms. Stresa invites you to join Britain and France.', choices: [
        { label: 'Sign Stresa', outcome: 'A united Western front — for now.', effects: { diplomacy: +10, aggression: 0 }, tension: -4, flags: ['stresa-front', 'italy-with-west'] },
        { label: 'Attend; promise nothing', outcome: 'You smile in photographs and keep your options open.', effects: { diplomacy: +3, aggression: +3 }, tension: -1 },
        { label: 'Decline — fascist Italy is not London’s servant', outcome: 'Berlin notes Italian independence with interest.', effects: { diplomacy: -8, aggression: +8 }, tension: +6, flags: ['italy-flirts-germany'] },
      ]},
      ussr: { description: 'Berlin rearms. Litvinov urges you to seal mutual-assistance pacts.', choices: [
        { label: 'Sign with France and Czechoslovakia', outcome: 'The USSR is, for the first time, embedded in Europe’s security system.', effects: { diplomacy: +12, military: +3 }, tension: -4, flags: ['ussr-collective-security', 'franco-soviet-pact'] },
        { label: 'Pour everything into the Red Army', outcome: 'Soviet steel becomes Soviet tanks.', effects: { military: +12, economy: -5, aggression: +8 }, tension: +2, flags: ['red-army-buildup'] },
      ]},
    },
  },

  {
    id: 'shared-1935-ethiopia',
    year: 1935, month: 10, title: 'Italy Invades Ethiopia',
    variants: {
      italy: { description: 'The legions are mustered in Eritrea. Will you give the order?', choices: [
        { label: 'Invade Ethiopia', outcome: 'Mustard gas falls on Addis Ababa. Sanctions follow; the Stresa Front is dead.', effects: { military: +5, economy: -12, diplomacy: -15, aggression: +15 }, tension: +6, flags: ['conquered-ethiopia', 'left-stresa'] },
        { label: 'Demand a British colonial deal first', outcome: 'You wait. London hedges; Paris is sympathetic.', effects: { diplomacy: +5, aggression: -3 }, tension: -2, flags: ['italy-with-west'] },
        { label: 'Cancel the war', outcome: 'The army is humiliated; the Stresa Front holds.', effects: { military: -5, stability: -8, diplomacy: +10, aggression: -10 }, tension: -4, flags: ['no-ethiopia'] },
      ]},
      britain: { description: 'Mussolini has invaded Ethiopia. You hold the Suez Canal.', choices: [
        { label: 'Close Suez; oil sanctions', outcome: 'You may stop fascism here — or trigger a war.', effects: { diplomacy: +10, aggression: +8 }, tension: +3, flags: ['anti-italy-firm', 'left-stresa'] },
        { label: 'Light League sanctions only', outcome: 'A halfway measure; the worst of both worlds.', effects: { diplomacy: -8 }, tension: +4 },
        { label: 'Hoare-Laval — carve up Ethiopia with Rome', outcome: 'The plan leaks; outrage; Hoare resigns.', effects: { diplomacy: -12, stability: -8 }, tension: +2, flags: ['hoare-laval', 'cynical-empire'] },
      ]},
      france: { description: 'Your would-be ally Mussolini is now a treaty-breaking aggressor.', choices: [
        { label: 'Side with Britain — full sanctions', outcome: 'Italy is lost as an ally; Stresa collapses.', effects: { diplomacy: +8, military: -3, aggression: +3 }, tension: +4, flags: ['left-stresa', 'anti-italy-firm'] },
        { label: 'Push the Hoare-Laval pact', outcome: 'The plan leaks; France is humiliated.', effects: { diplomacy: -12, stability: -8 }, tension: +2, flags: ['hoare-laval'] },
        { label: 'Token sanctions to keep Italy', outcome: 'You drag your feet at Geneva; Mussolini is grateful.', effects: { diplomacy: -3 }, tension: +3, flags: ['france-italy-axis'] },
      ]},
      germany: { description: 'Mussolini’s war divides the West. How does the Reich profit?', choices: [
        { label: 'Supply Italy with coal and steel', outcome: 'A Roman debt to Berlin grows; the Axis is seeded.', effects: { economy: -3, diplomacy: +5, aggression: +3 }, tension: +3, flags: ['germany-helps-italy'] },
        { label: 'Pose as a respectable European power', outcome: 'Hitler appears reasonable; Mussolini is enraged.', effects: { diplomacy: +3, aggression: -3 }, tension: -2 },
      ]},
      ussr: { description: 'Italy invades a fellow League member.', choices: [
        { label: 'Lead the call for sweeping sanctions', outcome: 'The Western democracies must follow your lead.', effects: { diplomacy: +8 }, tension: -3, flags: ['ussr-collective-security'] },
        { label: 'Denounce all imperialism — Italian and British', outcome: 'A pure ideological stand; few thanks.', effects: { stability: +3 }, tension: +2 },
        { label: 'Quietly trade with Italy', outcome: 'Soviet oil reaches Italian ports.', effects: { economy: +8, diplomacy: -5, aggression: +3 }, tension: +1 },
      ]},
      us: { description: 'Italian planes bomb Ethiopian villages. Congress passes Neutrality.', choices: [
        { label: 'Use Neutrality + "moral embargo"', outcome: 'You stretch the law as far as it bends.', effects: { diplomacy: +5, aggression: +3 }, tension: -1 },
        { label: 'Strict, even-handed embargo', outcome: 'Ethiopia suffers; principle is preserved.', effects: { stability: +3, aggression: -3 }, tension: +2, flags: ['isolationist'] },
      ]},
    },
  },

  {
    id: 'germany-1935-nuremberg',
    year: 1935, month: 9, title: 'The Nuremberg Laws',
    appliesTo: ['germany'],
    requires: ['hitler-chancellor'],
    variants: {
      germany: {
        description: 'Hitler wants racial citizenship laws ready for the Party Rally.',
        choices: [
          { label: 'Enact the full Nuremberg Laws', outcome: 'Jews are stripped of citizenship; the world recoils, briefly.', effects: { stability: +3, diplomacy: -10, aggression: +10 }, tension: +2, flags: ['nuremberg'] },
          { label: 'Pass a watered-down version', outcome: 'Discrimination by statute, but less savage.', effects: { diplomacy: -3, aggression: +5 }, tension: +1 },
          { label: 'Refuse — preserve the legal order', outcome: 'Goebbels rages; the Party radicals are furious.', effects: { stability: -8, diplomacy: +5, aggression: -5 }, tension: -1 },
        ],
      },
    },
  },

  {
    id: 'us-1935-neutrality',
    year: 1935, month: 8, title: 'Congress and Neutrality',
    appliesTo: ['us'],
    variants: {
      us: {
        description: 'Congress demands embargo authority against any war abroad.',
        choices: [
          { label: 'Sign the Neutrality Act', outcome: 'You sign; isolationists triumph.', effects: { diplomacy: -5, stability: +3, aggression: -5 }, tension: +3, flags: ['neutrality-act', 'isolationist'] },
          { label: 'Veto and accept the override', outcome: 'You lose, on the record. The interventionists rally.', effects: { stability: -5, aggression: +3 }, tension: 0, flags: ['interventionist'] },
        ],
      },
    },
  },

  {
    id: 'ussr-1935-comintern',
    year: 1935, month: 7, title: 'The Seventh Comintern',
    appliesTo: ['ussr'],
    variants: {
      ussr: {
        description: 'Will the Comintern endorse Popular Fronts with Western socialists, or hold the pure line?',
        choices: [
          { label: 'Order Popular Fronts everywhere', outcome: 'Communists ally with Socialists across Europe.', effects: { diplomacy: +8, aggression: -3 }, tension: -3, flags: ['popular-fronts'] },
          { label: 'Hold the revolutionary line', outcome: 'The Comintern keeps its purity, and its irrelevance.', effects: { aggression: +5 }, tension: +2 },
        ],
      },
    },
  },

  // ============================================================
  // 1936
  // ============================================================
  {
    id: 'shared-1936-rhineland',
    year: 1936, month: 3, title: 'The Rhineland Crisis',
    variants: {
      germany: {
        description: 'Locarno’s demilitarized zone is the last Versailles fetter on German soil.',
        altDescriptions: [
          { when: ['weimar-survives'], text: 'Locarno’s demilitarized zone is the last Versailles fetter on German soil. The Reichstag debates whether the Republic should revise it openly, in concert with London, or live with it.' },
        ],
        choices: [
          { label: 'Remilitarize the Rhineland', outcome: 'Three battalions cross the bridges; France does not move.', effects: { military: +12, stability: +12, aggression: +15 }, tension: +10, flags: ['rhineland-remilitarized'], requires: ['hitler-chancellor'] },
          { label: 'Hold back — wait for the army to grow', outcome: 'Hitler is overruled; the moment passes.', effects: { military: +3, aggression: +3 }, tension: -2, requires: ['hitler-chancellor'] },
          { label: 'Propose a negotiated Rhineland status', outcome: 'You ask London to mediate; Paris is suspicious but receptive.', effects: { diplomacy: +12, military: +3 }, tension: -3, flags: ['rhineland-negotiated'], excludes: ['hitler-chancellor'] },
          { label: 'Live with the demilitarized zone', outcome: 'A Republic that honours its treaties.', effects: { diplomacy: +5, military: -3 }, tension: -2, excludes: ['hitler-chancellor'] },
        ],
      },
      france: {
        description: 'German battalions are crossing the Rhine. The Wehrmacht is weak; the British refuse to back you.',
        altDescriptions: [
          { when: ['rhineland-negotiated'], text: 'Berlin has proposed a negotiated revision of the Rhineland’s status. The Quai d’Orsay must answer: stand on Versailles, or accept the new offer?' },
        ],
        choices: [
          { label: 'Order the army across the frontier', outcome: 'French divisions expel the Wehrmacht; Hitler is humiliated.', effects: { military: +8, diplomacy: -8, aggression: +15, stability: -8 }, tension: -8, flags: ['france-rhineland-strike', 'germany-humiliated'], excludes: ['rhineland-negotiated'] },
          { label: 'Wait for Britain', outcome: 'London declines; the Wehrmacht digs in.', effects: { military: -8, diplomacy: -8, aggression: -8 }, tension: +12, flags: ['rhineland-failed'], excludes: ['rhineland-negotiated'] },
          { label: 'Mobilize as a show of force', outcome: 'Half measures. The Germans see through it.', effects: { military: +3, diplomacy: -3 }, tension: +6, excludes: ['rhineland-negotiated'] },
          { label: 'Accept the negotiated revision', outcome: 'A diplomatic settlement, formally guaranteed. Versailles is dead by paper, not by tanks.', effects: { diplomacy: +10, military: -3 }, tension: -4, requires: ['rhineland-negotiated'] },
          { label: 'Refuse the German offer; insist on the status quo', outcome: 'France stands on Versailles; Berlin grumbles but accepts.', effects: { diplomacy: +5, military: +3 }, tension: -2, requires: ['rhineland-negotiated'] },
        ],
      },
      britain: { description: 'German troops are in the Rhineland. France presses for joint action.', choices: [
        { label: 'Stand with France — joint mobilization', outcome: 'Hitler backs down; the Cabinet splits.', effects: { military: +5, diplomacy: +8, aggression: +8 }, tension: -6, flags: ['britain-stands-firm'] },
        { label: 'Counsel France against action', outcome: 'Eden lectures Paris on restraint.', effects: { diplomacy: -5, aggression: -5 }, tension: +8, flags: ['british-appeasement-starts'] },
      ]},
      italy: { description: 'Hitler marches into the Rhineland while you are mired in Ethiopia.', choices: [
        { label: 'Form the Rome-Berlin Axis', outcome: 'Ciano flies to Berlin; the Axis is born.', effects: { military: +5, aggression: +10 }, tension: +6, flags: ['rome-berlin-axis'] },
        { label: 'Reconcile with Britain and France', outcome: 'You crawl back to London.', effects: { diplomacy: +5, aggression: -5 }, tension: -3, flags: ['italy-with-west'] },
      ]},
      us: { description: 'Hitler tears up Locarno. Congress passes a stricter Neutrality Act.', choices: [
        { label: 'Speak against aggression', outcome: 'An interventionist speech; isolationist press howls.', effects: { diplomacy: +3, aggression: +3 }, tension: -1, flags: ['interventionist'] },
        { label: 'Stay quiet', outcome: 'Silence. Berlin notes Washington’s indifference.', effects: { stability: +3 }, tension: +3, flags: ['isolationist'] },
      ]},
      ussr: { description: 'Hitler tramples Locarno. The League does nothing.', choices: [
        { label: 'Push harder for collective security', outcome: 'Soviet diplomacy thunders at Geneva.', effects: { diplomacy: +5, aggression: +3 }, tension: -2, flags: ['ussr-collective-security'] },
        { label: 'Quietly consider a deal with Hitler', outcome: 'Kremlin voices whisper of necessity.', effects: { aggression: +5 }, tension: +3, flags: ['ussr-flirts-germany'] },
        { label: 'Accelerate the purges instead', outcome: 'Yezhov is empowered; the USSR turns inward.', effects: { military: -8, stability: +3, diplomacy: -8, aggression: +8 }, tension: 0, flags: ['great-terror'] },
      ]},
    },
  },

  {
    id: 'shared-1936-spain',
    year: 1936, month: 7, title: 'Civil War in Spain',
    variants: {
      france: { description: 'Spanish generals have risen against the Popular Front in Madrid.', choices: [
        { label: 'Arm the Spanish Republic openly', outcome: 'French weapons reach Madrid; the right erupts at home.', effects: { stability: -8, aggression: +8 }, tension: +3, flags: ['aided-republic'] },
        { label: 'Sign Non-Intervention', outcome: 'France leads the fiction; the Republic is strangled.', effects: { diplomacy: +3, stability: +3, aggression: -8 }, tension: +2, flags: ['non-intervention'] },
        { label: 'Smuggle arms quietly', outcome: 'Trains cross the Pyrenees at night.', effects: { stability: -3, aggression: +3 }, tension: +2 },
      ]},
      britain: { description: 'The Royal Navy watches Italian ships unload weapons for Franco.', choices: [
        { label: 'Push Non-Intervention', outcome: 'The fiction is preserved; fascists cheat freely.', effects: { stability: +3, aggression: -8 }, tension: +2, flags: ['non-intervention', 'british-appeasement'] },
        { label: 'Lift the embargo on the Republic', outcome: 'The Republic gets a fighting chance; conservatives revolt.', effects: { stability: -5, aggression: +5 }, tension: -2, flags: ['britain-against-franco'] },
        { label: 'Quietly help Franco', outcome: 'Better fascists than Bolsheviks in Madrid.', effects: { diplomacy: -3, aggression: +3 }, tension: +3, flags: ['britain-helps-franco'] },
      ]},
      germany: { description: 'Franco needs planes. Goering wants to test the new Luftwaffe.', choices: [
        { label: 'Send the Condor Legion', outcome: 'Guernica burns; the Wehrmacht learns.', effects: { military: +12, diplomacy: -5, aggression: +8 }, tension: +3, flags: ['condor-legion', 'guernica'] },
        { label: 'Covert aid only', outcome: 'A discreet German hand keeps Franco fighting.', effects: { military: +6, aggression: +5 }, tension: +2 },
        { label: 'Stay clear', outcome: 'The legions stay in Germany.', effects: { military: +3 }, tension: +1 },
      ]},
      italy: { description: 'Franco needs men. The General Staff warns of cost.', choices: [
        { label: 'Send 75,000 volunteers', outcome: 'Italian divisions deploy and are humiliated at Guadalajara.', effects: { military: -3, economy: -10, aggression: +12 }, tension: +3, flags: ['ctv-spain', 'spain-ally'] },
        { label: 'Send arms but not troops', outcome: 'Italian rifles reach Franco; Italian boys stay home.', effects: { economy: -3, aggression: +5 }, tension: +2 },
        { label: 'Stay out of Spain', outcome: 'Franco frowns; you keep your treasure.', effects: { economy: +3 }, tension: 0 },
      ]},
      ussr: { description: 'A workers’ government in Madrid begs for Soviet aid.', choices: [
        { label: 'Send tanks, advisers, the Brigades', outcome: 'Soviet T-26s roll into Madrid; the NKVD purges Trotskyists.', effects: { military: +3, diplomacy: -3, aggression: +8, economy: +3 }, tension: +3, flags: ['ussr-aided-republic'] },
        { label: 'Send limited material aid only', outcome: 'Soviet rifles reach Spain via Mexico.', effects: { aggression: +3 }, tension: +1 },
        { label: 'Stay out', outcome: 'The Comintern radicals are betrayed.', effects: { diplomacy: -5, aggression: -3 }, tension: 0 },
      ]},
      us: { description: 'American volunteers sail to join the Lincoln Battalion. Congress legislates strict neutrality between democracy and fascism.', choices: [
        { label: 'Sign the Spanish embargo', outcome: 'The legal Republic is denied American arms.', effects: { diplomacy: -3, aggression: -5 }, tension: +2, flags: ['spanish-embargo', 'isolationist'] },
        { label: 'Veto — preserve the right to aid Madrid', outcome: 'Congress overrides you; the principle is on the record.', effects: { stability: -3, aggression: +3 }, tension: 0, flags: ['interventionist'] },
      ]},
    },
  },

  {
    id: 'france-1936-popular-front',
    year: 1936, month: 5, title: 'The Popular Front Wins',
    appliesTo: ['france'],
    variants: {
      france: {
        description: 'Socialists, Radicals, Communists have won. Workers occupy the factories.',
        choices: [
          { label: 'Sign the Matignon Accords', outcome: '40-hour week, paid vacations, collective bargaining.', effects: { stability: +10, economy: -8, military: -3 }, tension: 0, flags: ['popular-front', 'matignon'] },
          { label: 'Crack down on the strikes', outcome: 'Police clear factories; the government falls.', effects: { stability: -12, economy: +3, aggression: +5 }, tension: 0, flags: ['repressed-strikes'] },
          { label: 'Negotiate without major concessions', outcome: 'Patched compromise; nobody is satisfied.', effects: { stability: -3, economy: -3 }, tension: 0 },
        ],
      },
    },
  },

  {
    id: 'britain-1936-abdication',
    year: 1936, month: 12, title: 'The Abdication Crisis',
    appliesTo: ['britain'],
    variants: {
      britain: {
        description: 'King Edward VIII wishes to marry Mrs. Simpson.',
        choices: [
          { label: 'Force the abdication', outcome: 'Edward goes; George VI takes the throne.', effects: { stability: +5 }, tension: 0, flags: ['abdication'] },
          { label: 'Permit a morganatic marriage', outcome: 'A constitutional novelty; the Empire wobbles.', effects: { stability: -8, diplomacy: -3 }, tension: 0 },
        ],
      },
    },
  },

  {
    id: 'us-1936-reelection',
    year: 1936, month: 11, title: 'A Second Term',
    appliesTo: ['us'],
    variants: {
      us: {
        description: 'You win re-election in a landslide. The agenda must be set now.',
        choices: [
          { label: 'Second New Deal — Wagner, Social Security', outcome: 'You reshape American capitalism.', effects: { economy: +10, stability: +5 }, tension: 0, flags: ['second-new-deal'] },
          { label: 'Pivot to warning America about Europe', outcome: 'A "quarantine" speech; mixed reception.', effects: { diplomacy: +8, stability: -3, aggression: +3 }, tension: -2, flags: ['quarantine-speech', 'interventionist'] },
          { label: 'Court-pack the Supreme Court', outcome: 'A bruising fight; the New Deal coalition cracks.', effects: { stability: -10, economy: +3 }, tension: 0 },
        ],
      },
    },
  },

  {
    id: 'ussr-1936-show-trials',
    year: 1936, month: 8, title: 'The Show Trials Begin',
    appliesTo: ['ussr'],
    variants: {
      ussr: {
        description: 'Yezhov presents lists of "Trotskyist-Zinovievite" conspirators.',
        choices: [
          { label: 'Execute the Old Bolsheviks', outcome: 'Zinoviev and Kamenev confess and die.', effects: { stability: +5, military: -10, diplomacy: -12, aggression: +15, economy: -5 }, tension: 0, flags: ['great-terror', 'old-bolsheviks-purged'] },
          { label: 'Try them in camera', outcome: 'A quieter terror; the message lands inside the Party.', effects: { stability: +3, diplomacy: -3, aggression: +8 }, tension: 0, flags: ['quiet-terror'] },
          { label: 'Halt the purges', outcome: 'Yezhov is dismissed; you have made dangerous enemies.', effects: { stability: -8, diplomacy: +8, military: +5, aggression: -8 }, tension: -2, flags: ['no-great-terror'] },
        ],
      },
    },
  },

  {
    id: 'germany-1936-olympics',
    year: 1936, month: 8, title: 'The Berlin Olympics',
    appliesTo: ['germany'],
    variants: {
      germany: {
        description: 'The Games come to Berlin. How will the regime use the spotlight?',
        choices: [
          { label: 'Soften appearances — hide the racial laws', outcome: 'The world admires Nazi efficiency for a fortnight.', effects: { diplomacy: +8, aggression: 0 }, tension: -2, flags: ['olympics-charm'] },
          { label: 'Showcase Aryan triumph', outcome: 'Owens wins anyway; the propaganda is uneven.', effects: { stability: +3, diplomacy: -3, aggression: +5 }, tension: +1 },
        ],
      },
    },
  },

  {
    id: 'italy-1936-axis',
    year: 1936, month: 11, title: 'The Rome-Berlin Axis',
    appliesTo: ['italy'],
    variants: {
      italy: {
        description: 'Hitler proposes a formal "axis" between Rome and Berlin.',
        choices: [
          { label: 'Proclaim the Axis publicly', outcome: 'Banners over Rome; the West stiffens.', effects: { diplomacy: -8, military: +5, aggression: +12 }, tension: +6, flags: ['rome-berlin-axis', 'italy-axis'] },
          { label: 'Quiet alignment, no announcement', outcome: 'Hitler grumbles; the British wonder if you’re still in play.', effects: { aggression: +5 }, tension: +2 },
          { label: 'Refuse — Italy will not be Berlin’s appendage', outcome: 'You stun Berlin; Stresa logic flickers back.', effects: { diplomacy: +8, stability: -5, aggression: -5 }, tension: -4, flags: ['italy-with-west'] },
        ],
      },
    },
  },

  // ============================================================
  // 1937
  // ============================================================
  {
    id: 'shared-1937-anticomintern',
    year: 1937, month: 11, title: 'The Anti-Comintern Pact Expands',
    variants: {
      italy: { description: 'Japan and Germany signed last year. Now they want you.', choices: [
        { label: 'Sign with great ceremony', outcome: 'The Axis becomes a trilateral fact.', effects: { military: +5, aggression: +10 }, tension: +6, flags: ['axis-formed', 'italy-axis'] },
        { label: 'Sign quietly', outcome: 'A subdued ceremony; you keep some maneuvering room.', effects: { aggression: +5 }, tension: +3 },
        { label: 'Refuse', outcome: 'Berlin is stunned; Stresa might yet return.', effects: { diplomacy: +8, stability: -5 }, tension: -3, flags: ['no-axis', 'italy-with-west'] },
      ]},
      germany: { description: 'Italy joins the Anti-Comintern Pact. The Axis hardens.', choices: [
        { label: 'Welcome it as Europe’s new order', outcome: 'The democracies stiffen; Stalin notices.', effects: { military: +3, aggression: +8 }, tension: +4, flags: ['axis-formed'] },
        { label: 'Welcome it coolly', outcome: 'A guarded embrace; Mussolini smarts.', effects: { aggression: +3 }, tension: +2 },
      ]},
      britain: { description: 'Berlin, Rome, Tokyo are now openly aligned.', choices: [
        { label: 'Send Halifax to charm Hitler', outcome: 'Halifax tells Hitler Britain "would not stand in the way" of central European change.', effects: { diplomacy: -3, aggression: -8 }, tension: +6, flags: ['halifax-visit', 'british-appeasement'] },
        { label: 'Accelerate rearmament', outcome: 'New squadrons and radar funded.', effects: { military: +10, economy: -5 }, tension: -2, flags: ['british-rearm-late'] },
        { label: 'Build a counter-alliance with France and USSR', outcome: 'Eden links London, Paris, Moscow.', effects: { diplomacy: +10, aggression: +5 }, tension: -4, flags: ['grand-alliance'] },
      ]},
      france: { description: 'The Axis hardens. The Franco-Soviet Pact remains an unfinished sentence.', choices: [
        { label: 'Add staff talks to the Soviet pact', outcome: 'Soviet officers tour Paris; the right is horrified.', effects: { diplomacy: +5, military: +5, stability: -5 }, tension: -3, flags: ['franco-soviet-pact-strong'] },
        { label: 'Follow Chamberlain’s lead', outcome: 'France subordinates her policy to London.', effects: { diplomacy: +3, aggression: -3 }, tension: +4, flags: ['france-follows-britain'] },
        { label: 'Pour everything into the Maginot Line', outcome: 'Concrete and steel; the army feels almost ready.', effects: { military: +10, economy: -5 }, tension: 0, flags: ['maginot-strong'] },
      ]},
      ussr: { description: 'You are being encircled. The Politburo demands a course.', choices: [
        { label: 'Push for a Grand Alliance with the West', outcome: 'Litvinov visits London; the British are unenthused.', effects: { diplomacy: +8 }, tension: -2, flags: ['grand-alliance'] },
        { label: 'Purge the Red Army', outcome: 'Tukhachevsky and 35,000 officers are shot.', effects: { military: -20, stability: +3, diplomacy: -8, aggression: +12 }, tension: 0, flags: ['tukhachevsky-purge'] },
        { label: 'Open very quiet channels to Berlin', outcome: 'A Soviet attaché in Berlin is told to listen.', effects: { aggression: +5 }, tension: +3, flags: ['ussr-flirts-germany'] },
      ]},
      us: { description: 'Tokyo, Berlin, Rome are formally aligned. Roosevelt contemplates a "quarantine."', choices: [
        { label: 'Deliver the Quarantine Speech', outcome: 'You speak; isolationist press denounces you.', effects: { diplomacy: +5, stability: -3, aggression: +5 }, tension: -2, flags: ['quarantine-speech'] },
        { label: 'Sign a stricter Neutrality Act', outcome: 'America hardens her retreat from the world.', effects: { stability: +3, diplomacy: -5, aggression: -8 }, tension: +4, flags: ['neutrality-act', 'isolationist'] },
      ]},
    },
  },

  {
    id: 'us-1937-recession',
    year: 1937, month: 9, title: 'The Roosevelt Recession',
    appliesTo: ['us'],
    variants: {
      us: {
        description: 'Cutting the New Deal too quickly has tipped the country back into slump.',
        choices: [
          { label: 'Resume deficit spending', outcome: 'You reverse course; the economy stabilizes.', effects: { economy: +8, stability: +3 }, tension: 0 },
          { label: 'Stay the course — balanced budget', outcome: 'Unemployment climbs; faith in you ebbs.', effects: { economy: -8, stability: -5 }, tension: 0, flags: ['austerity-turn'] },
        ],
      },
    },
  },

  {
    id: 'britain-1937-chamberlain',
    year: 1937, month: 5, title: 'A New Prime Minister',
    appliesTo: ['britain'],
    variants: {
      britain: {
        description: 'Baldwin is retiring. Chamberlain expects to inherit.',
        choices: [
          { label: 'Accept the Chamberlain line — personal diplomacy with the dictators', outcome: 'Appeasement becomes official policy.', effects: { diplomacy: -3, aggression: -8 }, tension: +4, flags: ['chamberlain-line'] },
          { label: 'Promote Eden instead — firmness with Germany', outcome: 'An anti-appeasement Cabinet takes shape.', effects: { diplomacy: +5, aggression: +5 }, tension: -3, flags: ['eden-line', 'british-rearm-modest'] },
        ],
      },
    },
  },

  {
    id: 'germany-1937-revision',
    year: 1937, month: 6, title: 'The Treaty Revision Conference',
    appliesTo: ['germany'],
    requires: ['weimar-survives'],
    variants: {
      germany: {
        description: 'A great-power conference at Lausanne offers serious revisions of Versailles in exchange for German commitments to peaceful resolution of frontier issues.',
        choices: [
          { label: 'Sign — full revision package', outcome: 'Reparations gone, arms parity, Saar confirmed. Germany is, once more, a normal state.', effects: { diplomacy: +18, economy: +10, stability: +8, military: +5 }, tension: -6, flags: ['lausanne-revision'] },
          { label: 'Demand more — Anschluss recognition included', outcome: 'You overreach; the conference deadlocks.', effects: { diplomacy: -5, aggression: +5 }, tension: +3 },
          { label: 'Walk out — the price is too high', outcome: 'A nationalist gesture; revisionist papers cheer, foreign offices file the message.', effects: { diplomacy: -10, stability: +3, aggression: +8 }, tension: +5, flags: ['nationalist-republic'] },
        ],
      },
    },
  },

  {
    id: 'germany-1937-hossbach',
    year: 1937, month: 11, title: 'The Hossbach Conference',
    appliesTo: ['germany'],
    requires: ['hitler-chancellor'],
    variants: {
      germany: {
        description: 'Hitler privately reveals a timetable for war with Czechoslovakia and Austria.',
        choices: [
          { label: 'Approve — set the eastern timetable', outcome: 'War planning accelerates.', effects: { military: +8, aggression: +10 }, tension: +5, flags: ['hossbach'] },
          { label: 'Counsel patience — Germany is not ready', outcome: 'Hitler delays, fuming.', effects: { aggression: +3 }, tension: +1 },
        ],
      },
    },
  },

  {
    id: 'france-1937-devaluation',
    year: 1937, month: 6, title: 'The Franc Cracks',
    appliesTo: ['france'],
    variants: {
      france: {
        description: 'Capital flight, strikes, recession. Devaluation again?',
        choices: [
          { label: 'Devalue and slash spending', outcome: 'The franc stabilizes; the workers seethe.', effects: { economy: +5, stability: -5 }, tension: 0 },
          { label: 'Defend the franc, expand spending', outcome: 'The franc collapses; the Popular Front falls.', effects: { economy: -8, stability: -8 }, tension: 0 },
        ],
      },
    },
  },

  // ============================================================
  // 1938
  // ============================================================
  {
    id: 'shared-1938-anschluss',
    year: 1938, month: 3, title: 'The Anschluss',
    variants: {
      germany: {
        description: 'Schuschnigg has called a referendum on Austrian independence.',
        altDescriptions: [
          { when: ['weimar-survives'], text: 'Austrian Christian Socialists ask whether a customs union or even confederation with the Republic might be negotiated. Mussolini is wary but no longer rushes troops to the Brenner.' },
        ],
        choices: [
          { label: 'Send in the Wehrmacht', outcome: 'Vienna goes mad with joy and terror; Austria is yours.', effects: { military: +8, economy: +8, stability: +8, aggression: +12 }, tension: +8, flags: ['anschluss'], requires: ['hitler-chancellor'] },
          { label: 'Engineer an Austrian Nazi coup', outcome: 'Seyss-Inquart invites you in; the optics are gentler.', effects: { stability: +5, aggression: +8 }, tension: +5, flags: ['anschluss'], requires: ['hitler-chancellor'] },
          { label: 'Postpone — wait for a better moment', outcome: 'Schuschnigg’s referendum holds; your moment passes.', effects: { stability: -5, aggression: -3 }, tension: -2, requires: ['hitler-chancellor'] },
          { label: 'Negotiate a customs union with Vienna', outcome: 'A peaceful Mitteleuropa takes shape; the dictators sulk.', effects: { economy: +10, diplomacy: +8, stability: +5 }, tension: -3, flags: ['customs-union'], excludes: ['hitler-chancellor'] },
          { label: 'Respect Austrian independence; offer mutual recognition', outcome: 'A Republic that honours its neighbors.', effects: { diplomacy: +12, aggression: -5 }, tension: -3, excludes: ['hitler-chancellor'] },
        ],
      },
      italy: {
        description: 'Hitler asks your permission to absorb Austria — your border with him.',
        altDescriptions: [
          { when: ['italy-with-west'], text: 'Hitler asks your permission to absorb Austria. The Stresa Front you helped build in 1935 still stands; Britain and France will follow your lead.' },
          { when: ['italy-axis'], text: 'Hitler informs you of his intention to absorb Austria. The Axis bound you to this moment in 1936.' },
        ],
        choices: [
          { label: 'Acquiesce — the Axis is more important', outcome: 'Hitler weeps with gratitude; Italian prestige in central Europe is finished.', effects: { diplomacy: -3, aggression: +5 }, tension: +4, flags: ['italy-accepts-anschluss'] },
          { label: 'Move to the Brenner, as in 1934', outcome: 'Hitler hesitates; the Axis is fatally wounded.', effects: { military: +5, diplomacy: +8, aggression: +5 }, tension: -3, flags: ['italy-blocks-anschluss'], excludes: ['italy-axis'] },
          { label: 'Coordinate an Anglo-French response from Rome', outcome: 'You convene London and Paris in Stresa-revived form. Hitler hesitates.', effects: { diplomacy: +12, military: +3, aggression: +5 }, tension: -5, flags: ['stresa-revived', 'italy-blocks-anschluss'], requires: ['italy-with-west'] },
        ],
      },
      france: { description: 'German troops are in Vienna. France has no Cabinet — Chautemps has just resigned.', choices: [
        { label: 'Mobilize anyway and demand British solidarity', outcome: 'A gesture from a France without a Premier.', effects: { military: +3, diplomacy: -3, aggression: +5 }, tension: +3 },
        { label: 'Accept the Anschluss; lodge a protest', outcome: 'The right is satisfied; Czechoslovakia is half-encircled.', effects: { diplomacy: -8, aggression: -5 }, tension: +6, flags: ['france-accepts-anschluss'] },
      ]},
      britain: { description: 'Chamberlain calls the Anschluss a "natural development."', choices: [
        { label: 'Accept it — formal protest only', outcome: 'The dictators conclude London will not fight.', effects: { diplomacy: -5, aggression: -8 }, tension: +8, flags: ['british-appeasement', 'britain-accepts-anschluss'] },
        { label: 'Joint warning with France', outcome: 'Hitler ignores it; next time he will think.', effects: { diplomacy: +5, aggression: +5 }, tension: 0, flags: ['britain-stands-firm'] },
        { label: 'Public rearmament push', outcome: 'Spitfire production doubles; the Empire prepares quietly.', effects: { military: +8, economy: -3 }, tension: 0, flags: ['british-rearm-late'] },
      ]},
      us: { description: 'Vienna is occupied. The State Department wants a line.', choices: [
        { label: 'Condemn German aggression', outcome: 'You speak; Berlin laughs.', effects: { diplomacy: +3, aggression: +3 }, tension: 0 },
        { label: 'No comment', outcome: 'Silence; the isolationist press approves.', effects: { stability: +3 }, tension: +3, flags: ['isolationist'] },
      ]},
      ussr: { description: 'Litvinov proposes a four-power conference. Chamberlain refuses.', choices: [
        { label: 'Press the proposal anyway', outcome: 'Soviet diplomacy holds the moral high ground.', effects: { diplomacy: +5, aggression: +3 }, tension: -2, flags: ['grand-alliance'] },
        { label: 'Drop collective security — fortress USSR', outcome: 'Litvinov is sidelined; the Red Army prepares to fight alone.', effects: { military: +5, diplomacy: -8, aggression: +5 }, tension: +2, flags: ['fortress-socialism'] },
      ]},
      poland: {
        description: 'Austria is German. Czechoslovakia is now three-sided in. Beck calculates Polish exposure rises with each German step.',
        choices: [
          { label: 'Reinforce the western army', outcome: 'New divisions raised; the budget bleeds.', effects: { military: +8, economy: -5 }, tension: +1 },
          { label: 'Send a stern note to Berlin about Polish minority in Austria', outcome: 'A token gesture; Berlin promises nothing.', effects: { diplomacy: 0 }, tension: 0 },
          { label: 'Quietly explore an understanding with Berlin over Czech borders', outcome: 'A grim possibility takes shape: Cieszyn for Polish quiescence.', effects: { aggression: +5 }, tension: +3 },
        ],
      },
      czechoslovakia: {
        description: 'Austria is gone. Three of your frontiers are now Reich frontiers. The Sudeten radicals are emboldened. The army goes to alert.',
        choices: [
          { label: 'Order partial mobilization', outcome: 'Reserves to the frontier; the Mandate of Versailles trembles.', effects: { military: +10, stability: +5, aggression: +5 }, tension: 0, flags: ['czech-mobilized'] },
          { label: 'Beg for an explicit Anglo-French commitment', outcome: 'London hedges, Paris reassures vaguely.', effects: { diplomacy: -3 }, tension: +2 },
          { label: 'Open exploratory talks with Berlin', outcome: 'Hitler is delighted; you have shown weakness.', effects: { diplomacy: -8, aggression: -5 }, tension: +5 },
        ],
      },
      yishuv: {
        description: 'Austria is German. Two hundred thousand Austrian Jews face the same persecution as Germans. The Mandate quota is already exhausted.',
        choices: [
          { label: 'Send Hagana agents to Vienna to organize evacuation', outcome: 'Adolf Eichmann’s Central Office for Jewish Emigration becomes the unwilling counterpart.', effects: { stability: +5, economy: +3 }, tension: +1, flags: ['vienna-rescue'] },
          { label: 'Lobby London for emergency immigration certificates', outcome: 'Some additional certificates granted; the quota holds.', effects: { diplomacy: +5, stability: +3 }, tension: 0 },
          { label: 'Massively expand illegal immigration operations', outcome: 'Ships are bought, crews recruited; the first wave reaches Haifa by autumn.', effects: { stability: +5, diplomacy: -8, military: +3 }, tension: 0, flags: ['aliyah-bet-expanded'] },
        ],
      },
    },
  },

  {
    id: 'shared-1938-sudeten',
    year: 1938, month: 5, title: 'The Sudetenland Demands',
    excludes: ['weimar-survives'],
    variants: {
      germany: { description: 'Henlein’s Sudeten Germans agitate for "autonomy." The Wehrmacht updates Case Green.', choices: [
        { label: 'Escalate openly — demand the Sudetenland', outcome: 'Europe knows war is being prepared.', effects: { military: +5, aggression: +10 }, tension: +6 },
        { label: 'Keep pressure quiet for now', outcome: 'A slow boil; everyone notices anyway.', effects: { aggression: +5 }, tension: +3 },
      ]},
      britain: { description: 'Hitler demands the Sudeten Germans. The Cabinet is split.', choices: [
        { label: 'Press Prague to make concessions', outcome: 'You begin the slope toward Munich.', effects: { diplomacy: -3, aggression: -5 }, tension: +5, flags: ['pressuring-czechs'] },
        { label: 'Warn Berlin off publicly', outcome: 'A bold statement; Hitler is briefly checked.', effects: { diplomacy: +5, aggression: +5 }, tension: -2, flags: ['britain-stands-firm'] },
      ]},
      france: { description: 'France has a treaty with Czechoslovakia. The Cabinet wavers.', choices: [
        { label: 'Reaffirm the Czech alliance', outcome: 'Daladier tells Prague France will fight if needed.', effects: { diplomacy: +5, aggression: +5 }, tension: -2 },
        { label: 'Pressure Prague to yield', outcome: 'France begins to back away from her ally.', effects: { diplomacy: -5, aggression: -5 }, tension: +5, flags: ['pressuring-czechs'] },
      ]},
      ussr: { description: 'The USSR has a treaty with Czechoslovakia, contingent on French action.', choices: [
        { label: 'Publicly promise to honour it', outcome: 'Moscow mobilizes 90 divisions just in case.', effects: { diplomacy: +5, military: +5, aggression: +5 }, tension: -2 },
        { label: 'Wait for France to act first', outcome: 'A careful, dependent stance.', effects: { aggression: 0 }, tension: +2 },
      ]},
      italy: { description: 'Hitler asks for Italian backing in the coming crisis.', choices: [
        { label: 'Promise full diplomatic backing', outcome: 'Mussolini is Hitler’s shield.', effects: { aggression: +5 }, tension: +3 },
        { label: 'Offer to mediate', outcome: 'You position yourself as Europe’s honest broker.', effects: { diplomacy: +8 }, tension: -2, flags: ['italy-mediator'] },
      ]},
      us: { description: 'The Sudeten crisis brews. The State Department asks how to message it.', choices: [
        { label: 'Privately urge European leaders to negotiate', outcome: 'Back-channels to London, Paris, Berlin.', effects: { diplomacy: +5 }, tension: -1 },
        { label: 'Stay quiet', outcome: 'Silence; America watches.', effects: { stability: +3 }, tension: +2, flags: ['isolationist'] },
      ]},
      czechoslovakia: {
        description: 'Henlein’s Sudetendeutsche Partei demands "autonomy" — code for transfer to the Reich. Berlin amplifies every grievance. The General Staff briefs the Castle on Plan VII.',
        choices: [
          { label: 'Concede broad Sudeten autonomy', outcome: 'Henlein declares the offer insufficient within hours.', effects: { stability: -3, diplomacy: +3 }, tension: +2 },
          { label: 'Stand firm; reinforce the fortifications', outcome: 'Concrete and barbed wire along the frontier; the army on alert.', effects: { military: +10, stability: +3, aggression: +5 }, tension: -1, flags: ['czech-firm'] },
          { label: 'Beg London and Paris for explicit war guarantees', outcome: 'Chamberlain demurs; Daladier murmurs. The General Staff curses.', effects: { diplomacy: -5 }, tension: +3 },
        ],
      },
      poland: {
        description: 'The Sudeten crisis. Berlin signals it would welcome Polish "interest" in Cieszyn. Beck weighs the temptation against Czechoslovak survival.',
        choices: [
          { label: 'Coordinate with Berlin over Czechoslovakia', outcome: 'A grim alignment; the General Staff begins planning the Cieszyn move.', effects: { diplomacy: -8, aggression: +8 }, tension: +3 },
          { label: 'Press for an Anglo-Polish-French stand for Prague', outcome: 'London hedges; Paris is grateful but inactive.', effects: { diplomacy: +5 }, tension: -1 },
          { label: 'Stay quiet and prepare for the consequences', outcome: 'You wait to see what Munich brings.', effects: { stability: +3 }, tension: 0 },
        ],
      },
    },
  },

  {
    id: 'shared-1938-munich',
    year: 1938, month: 9, title: 'Munich',
    excludes: ['weimar-survives'],
    variants: {
      germany: { description: 'Mussolini proposes a four-power conference. Take the Sudetenland with paper signatures, or by force?', choices: [
        { label: 'Accept Munich', outcome: 'A bloodless triumph; Czechoslovakia is dismembered with British signatures.', effects: { military: +8, stability: +12, aggression: +10 }, tension: +4, flags: ['munich', 'sudetenland-taken'] },
        { label: 'Reject Munich; invade now', outcome: 'War in October 1938; the Wehrmacht is not ready.', effects: { military: -10, economy: -10, aggression: +18 }, tension: +20, flags: ['early-war', 'wwii'] },
        { label: 'Sign and plan to take all Czechoslovakia in spring', outcome: 'You smile in Munich and order Case Green updated.', effects: { stability: +8, aggression: +12 }, tension: +6, flags: ['munich', 'planning-prague'] },
      ]},
      britain: { description: 'Hitler demands the Sudetenland by October 1. Mussolini proposes a four-power conference.', choices: [
        { label: 'Sign Munich — "peace for our time"', outcome: 'Crowds cheer at Heston aerodrome.', effects: { diplomacy: -8, stability: +5, aggression: -12 }, tension: +6, flags: ['munich', 'chamberlain-peace'] },
        { label: 'Refuse Munich; stand with France', outcome: 'War in autumn 1938; less ready than 1939.', effects: { military: -5, diplomacy: +8, aggression: +15 }, tension: +20, flags: ['no-munich', 'wwii'] },
        { label: 'Demand Soviet participation at Munich', outcome: 'Hitler refuses; the conference collapses.', effects: { diplomacy: +10, aggression: +8 }, tension: +12, flags: ['grand-alliance', 'no-munich'] },
      ]},
      france: { description: 'You are bound by treaty to Czechoslovakia. Daladier is summoned to Munich.', choices: [
        { label: 'Sign Munich, hating yourself', outcome: 'Daladier returns expecting to be lynched; he is cheered instead.', effects: { diplomacy: -10, stability: +5, aggression: -12 }, tension: +6, flags: ['munich', 'daladier-disgust'] },
        { label: 'Refuse; honour the Czech alliance', outcome: 'France stands without Britain; the principle is preserved.', effects: { diplomacy: +12, aggression: +15 }, tension: +20, flags: ['no-munich', 'wwii'] },
        { label: 'Demand the Soviets attend', outcome: 'The conference is broken; so is the prospect of peace.', effects: { diplomacy: +8, aggression: +8 }, tension: +12, flags: ['grand-alliance', 'no-munich'] },
      ]},
      italy: { description: 'You convene the Munich conference — the peak of your diplomatic prestige.', choices: [
        { label: 'Broker the deal', outcome: 'Italy is, for a moment, Europe’s arbiter.', effects: { diplomacy: +12, stability: +8 }, tension: +4, flags: ['munich', 'italy-arbiter'] },
        { label: 'Side with Hitler more openly', outcome: 'You become his lieutenant; the democracies are alarmed.', effects: { diplomacy: -8, aggression: +12 }, tension: +10 },
      ]},
      ussr: { description: 'You are excluded from Munich. The lesson is unmistakable.', choices: [
        { label: 'Denounce Munich publicly', outcome: 'Litvinov thunders at Geneva; the West turns away.', effects: { aggression: +5 }, tension: +4, flags: ['munich-betrayal'] },
        { label: 'Begin overtures to Berlin', outcome: 'The Molotov-Ribbentrop wheel begins turning.', effects: { diplomacy: -3, aggression: +8 }, tension: +4, flags: ['ussr-toward-germany'] },
      ]},
      us: { description: 'Chamberlain has signed away the Sudetenland. The public is relieved.', choices: [
        { label: 'Endorse Munich publicly', outcome: 'A speech that reads better in polls than in history.', effects: { stability: +5, aggression: -8 }, tension: +4, flags: ['endorsed-munich'] },
        { label: 'Express grave concern; accelerate aircraft production', outcome: 'Factories begin to tool up; the world barely notices.', effects: { military: +8, diplomacy: +3, aggression: +5 }, tension: -2, flags: ['secret-rearm'] },
      ]},
      czechoslovakia: {
        description: 'Chamberlain and Daladier have agreed to give the Sudetenland to Hitler — without consulting Prague. Beneš is informed by telegram.',
        choices: [
          { label: 'Accept Munich under protest', outcome: 'You sign because you must. The frontier fortifications, the heart of the army, the heart of the Republic — all gone.', effects: { stability: -15, diplomacy: -15, military: -15, aggression: -10 }, tension: +5, flags: ['munich', 'munich-accepted'] },
          { label: 'Refuse — fight alone if necessary', outcome: 'A doomed defense. The Wehrmacht crushes you within weeks; the army dies fighting.', effects: { military: -25, stability: -20, aggression: +20 }, tension: +20, flags: ['czech-resists', 'wwii'] },
          { label: 'Fight; appeal to the USSR for direct aid', outcome: 'Soviet aircraft transit through Romania; the war is longer and bloodier.', effects: { military: -15, diplomacy: +5, aggression: +15 }, tension: +18, flags: ['czech-resists', 'soviet-intervention', 'wwii'] },
        ],
      },
    },
  },

  {
    id: 'germany-1938-mitteleuropa',
    year: 1938, month: 6, title: 'Mitteleuropa',
    appliesTo: ['germany'],
    requires: ['weimar-survives'],
    variants: {
      germany: {
        description: 'With Austria peacefully linked by customs union, central Europe gravitates toward Berlin economically. Prague, Warsaw, Budapest watch nervously.',
        choices: [
          { label: 'Build an open economic bloc with all neighbors', outcome: 'A genuine common market in central Europe; small states join voluntarily.', effects: { economy: +12, diplomacy: +10 }, tension: -3, flags: ['mitteleuropa-open'] },
          { label: 'Use economic leverage to extract political concessions', outcome: 'Small states bend; old fears of German hegemony return.', effects: { economy: +8, diplomacy: -5, aggression: +8 }, tension: +3, flags: ['mitteleuropa-strong'] },
          { label: 'Stay strictly bilateral; no bloc', outcome: 'A more modest German role in the region.', effects: { economy: +3, diplomacy: +3 }, tension: 0 },
        ],
      },
    },
  },

  {
    id: 'germany-1938-kristallnacht',
    year: 1938, month: 11, title: 'Kristallnacht',
    appliesTo: ['germany'],
    requires: ['hitler-chancellor'],
    variants: {
      germany: {
        description: 'A diplomat is shot in Paris by a Jewish refugee. Goebbels proposes a "spontaneous" pogrom.',
        choices: [
          { label: 'Unleash the pogrom', outcome: 'Synagogues burn; hundreds dead; thirty thousand sent to camps.', effects: { stability: -3, diplomacy: -15, aggression: +15 }, tension: +5, flags: ['kristallnacht'] },
          { label: 'Use the killing only for new laws', outcome: 'Harsh statutes without the burning streets.', effects: { diplomacy: -8, aggression: +8 }, tension: +2 },
          { label: 'Restrain Goebbels', outcome: 'A muted response; Party radicals are furious.', effects: { stability: -5, diplomacy: +3 }, tension: -1 },
        ],
      },
    },
  },

  // ============================================================
  // 1939
  // ============================================================
  {
    id: 'shared-1939-prague',
    year: 1939, month: 3, title: 'Prague Falls',
    excludes: ['weimar-survives'],
    variants: {
      germany: { description: 'Slovak separatists invite "protection." The Czechs are defenseless.', choices: [
        { label: 'Occupy Bohemia and Moravia', outcome: 'German tanks roll into Prague; the world finally understands.', effects: { military: +10, economy: +8, aggression: +12, diplomacy: -15 }, tension: +14, flags: ['prague-occupied'] },
        { label: 'Allow Slovak independence only', outcome: 'A limited triumph; the Western powers are not yet galvanized.', effects: { military: +3, diplomacy: -5, aggression: +5 }, tension: +6 },
        { label: 'Honour Munich; hold back', outcome: 'Hitler astonishes the army by restraint.', effects: { aggression: -8, diplomacy: +8 }, tension: -3, flags: ['hitler-restrained'] },
      ]},
      britain: { description: 'German troops are in Prague. The Munich pledge is in ruins.', choices: [
        { label: 'Guarantee Poland', outcome: 'A revolution in British foreign policy.', effects: { diplomacy: +10, military: +3, aggression: +12, stability: +5 }, tension: +6, flags: ['polish-guarantee'] },
        { label: 'Continue negotiating with Berlin', outcome: 'Chamberlain holds the line; the Cabinet revolts.', effects: { stability: -12, diplomacy: -8 }, tension: +8, flags: ['continued-appeasement'] },
        { label: 'Open serious talks with Moscow', outcome: 'Halifax travels east; the talks are slow and grudging.', effects: { diplomacy: +5, aggression: +3 }, tension: -2, flags: ['grand-alliance-tried'] },
      ]},
      france: { description: 'Prague has fallen. France’s Eastern alliance system lies in ruins.', choices: [
        { label: 'Match the British guarantee to Poland', outcome: 'France commits to fight if Germany moves east.', effects: { military: +3, aggression: +8 }, tension: +3, flags: ['polish-guarantee'] },
        { label: 'Push for full alliance with the USSR', outcome: 'Bonnet opens reluctant talks in Moscow.', effects: { diplomacy: +5, aggression: +3 }, tension: -2, flags: ['grand-alliance-tried'] },
        { label: 'Withdraw into the Maginot Line', outcome: 'France abandons the East; small allies feel abandoned.', effects: { military: +8, diplomacy: -8, aggression: -3 }, tension: +4 },
      ]},
      italy: { description: 'Hitler took Prague without telling you. Mussolini fumes.', choices: [
        { label: 'Invade Albania', outcome: 'A parade-ground conquest; King Zog flees.', effects: { military: +3, economy: -3, aggression: +8 }, tension: +3, flags: ['albania-conquered'] },
        { label: 'Demand Tunisia, Corsica, Nice from France', outcome: '"Tunis! Corsica! Nice!" — France stiffens.', effects: { diplomacy: -10, aggression: +8 }, tension: +6 },
        { label: 'Stay quiet', outcome: 'A discreet pause; the hawks complain.', effects: { aggression: -3 }, tension: -2, flags: ['italy-quiet'] },
      ]},
      ussr: { description: 'The Western democracies stir at last but treat you like a leper at the table.', choices: [
        { label: 'Open formal talks with Berlin', outcome: 'Soviet trade negotiations slip into political ones.', effects: { aggression: +8 }, tension: +3, flags: ['molotov-tracks'] },
        { label: 'Replace Litvinov with Molotov', outcome: 'A signal to Berlin and to history.', effects: { diplomacy: -3, aggression: +5 }, tension: +3 },
        { label: 'Last great offer to the West', outcome: 'A tripartite mission opens; Polish transit blocks it.', effects: { diplomacy: +5 }, tension: -1, flags: ['grand-alliance-tried'] },
      ]},
      us: { description: 'Prague has fallen. Roosevelt asks Congress for cash-and-carry.', choices: [
        { label: 'Push cash-and-carry', outcome: 'The Senate passes it by a hair.', effects: { diplomacy: +8, economy: +5, aggression: +6 }, tension: -3, flags: ['cash-and-carry'] },
        { label: 'Ask for new aircraft and ships', outcome: 'The arsenal of democracy stirs.', effects: { military: +8, economy: +3 }, tension: 0, flags: ['us-rearm-1939'] },
        { label: 'Stay neutral', outcome: 'Berlin notes American passivity once more.', effects: { stability: +3, diplomacy: -5 }, tension: +3, flags: ['isolationist'] },
      ]},
      poland: {
        description: 'Prague has fallen. Beck knows you are next. Britain offers a guarantee; Hitler demands Danzig.',
        choices: [
          { label: 'Accept the British guarantee', outcome: 'A treaty, however hollow, is signed; Polish honour is committed.', effects: { diplomacy: +12, military: +3, aggression: +5 }, tension: -2, flags: ['british-guaranteed'] },
          { label: 'Propose a Polish-Soviet alliance', outcome: 'Moscow is interested; the right at home is appalled. The talks drag.', effects: { diplomacy: +5, stability: -5 }, tension: -2, flags: ['polish-soviet-attempt'] },
          { label: 'Stand alone — trust no foreign guarantee', outcome: 'Polish exceptionalism. The General Staff prepares for war on two fronts.', effects: { military: +5, aggression: +5 }, tension: +3 },
        ],
      },
    },
  },

  {
    id: 'shared-1939-pact',
    year: 1939, month: 8, title: 'The Pact',
    variants: {
      ussr: {
        description: 'Ribbentrop offers eastern Poland, the Baltics, and Bessarabia in secret. Western talks drift.',
        altDescriptions: [
          { when: ['ussr-collective-security', 'grand-alliance-tried'], text: 'Litvinov spent six years on collective security. The West finally sent a military mission to Moscow — even if it travelled by slow steamer. Ribbentrop, meanwhile, is on his way with a different offer.' },
          { when: ['ussr-flirts-germany'], text: 'Berlin has been signaling for years. Ribbentrop arrives in Moscow with an offer the Western powers will not match.' },
          { when: ['tukhachevsky-purge'], text: 'The Red Army, decapitated by your purges, is in no shape to fight Germany alone. Ribbentrop arrives with a tempting offer.' },
        ],
        choices: [
          { label: 'Sign the Molotov-Ribbentrop Pact', outcome: 'Champagne in the Kremlin; the Wehrmacht crosses Poland next week.', effects: { military: +8, economy: +5, diplomacy: -8, aggression: +18 }, tension: +14, flags: ['molotov-ribbentrop'] },
          { label: 'Sign the tripartite alliance with the West', outcome: 'A miracle of diplomacy; Hitler must face a two-front war.', effects: { diplomacy: +18, military: +5, aggression: +8 }, tension: +6, flags: ['grand-alliance-signed'], requires: ['ussr-collective-security'] },
          { label: 'Sign nothing — fortress USSR', outcome: 'You gamble that capitalists will exhaust each other.', effects: { military: +5, diplomacy: -12, aggression: +3 }, tension: +6, flags: ['soviet-neutral'] },
        ],
      },
      germany: {
        description: 'Ribbentrop is in Moscow. The Eastern Front is about to vanish.',
        altDescriptions: [
          { when: ['weimar-survives'], text: 'The Polish question — Danzig and the Corridor — comes to a head. The Republic must decide how to revise the frontier without war.' },
        ],
        choices: [
          { label: 'Sign the pact and invade Poland', outcome: 'Britain and France declare war on September 3.', effects: { aggression: +20, diplomacy: -20 }, tension: +25, flags: ['invaded-poland', 'wwii'], requires: ['hitler-chancellor'] },
          { label: 'Pursue Danzig by diplomacy alone', outcome: 'Hitler rages but consents; the crisis is postponed.', effects: { aggression: +5, stability: -3 }, tension: +3, flags: ['no-poland-invasion'], requires: ['hitler-chancellor'] },
          { label: 'Submit Danzig to League arbitration', outcome: 'A peaceful settlement; Versailles is amended by paper, not by tanks.', effects: { diplomacy: +15, military: -3, aggression: -3 }, tension: -8, flags: ['danzig-arbitration'], excludes: ['hitler-chancellor'] },
          { label: 'Offer Poland a transit and customs deal', outcome: 'A negotiated, mutually beneficial arrangement.', effects: { economy: +5, diplomacy: +10 }, tension: -5, flags: ['poland-deal'], excludes: ['hitler-chancellor'] },
        ],
      },
      britain: {
        description: 'Berlin and Moscow have signed. German troops are at the Polish border.',
        altDescriptions: [
          { when: ['british-rearm-early'], text: 'Berlin and Moscow have signed. German troops mass on the Polish border. Six years of British rearmament put fighter command, the fleet, and an Expeditionary Force on a war footing.' },
          { when: ['british-appeasement', 'chamberlain-peace'], text: 'Berlin and Moscow have signed. German troops are at the Polish border. The Munich illusion lies in ashes; the country expects a war it does not want.' },
        ],
        choices: [
          { label: 'Declare war when Poland is invaded', outcome: 'September 3: Chamberlain on the wireless.', effects: { military: +3, diplomacy: +5, aggression: +18 }, tension: +20, flags: ['declared-war', 'wwii'] },
          { label: 'Ultimatum with a window to back down', outcome: 'A two-day delay; war comes anyway.', effects: { aggression: +8 }, tension: +18, flags: ['delayed-war', 'wwii'] },
          { label: 'Renege on the Polish guarantee', outcome: 'Cabinet collapses; the new government declares war anyway.', effects: { stability: -18, diplomacy: -12, aggression: -8 }, tension: +18, flags: ['cabinet-collapse', 'wwii'], excludes: ['british-stands-firm'] },
        ],
      },
      france: { description: 'Berlin and Moscow have signed. The Polish frontier is burning.', choices: [
        { label: 'Declare war alongside Britain', outcome: 'France enters her second war with Germany in a generation.', effects: { military: +3, diplomacy: +5, aggression: +18 }, tension: +20, flags: ['declared-war', 'wwii'] },
        { label: 'Sue for a new Munich for Poland', outcome: 'Bonnet tries; London refuses; you enter the war anyway.', effects: { diplomacy: -12, stability: -8 }, tension: +18, flags: ['poland-betrayal', 'wwii'] },
        { label: 'Order an offensive into the Saar', outcome: 'A brief crossing; not enough to relieve Poland.', effects: { military: +3, aggression: +12 }, tension: +18, flags: ['declared-war', 'saar-offensive', 'wwii'] },
      ]},
      italy: { description: 'Hitler did not consult you. The military reports Italy needs three more years.', choices: [
        { label: 'Declare non-belligerency', outcome: 'Mussolini swallows his pride; the regime survives 1940.', effects: { diplomacy: +5, stability: +5, aggression: -8 }, tension: 0, flags: ['italy-non-belligerent'] },
        { label: 'Honour the Pact of Steel', outcome: 'Italy enters the war disastrously unprepared.', effects: { military: -8, economy: -12, aggression: +18 }, tension: +5, flags: ['italy-at-war', 'wwii'] },
        { label: 'Offer to mediate one more time', outcome: 'A conference proposed; the British refuse to attend.', effects: { diplomacy: 0 }, tension: +3 },
      ]},
      us: { description: 'The Pact stuns Washington. The Wehrmacht crosses the Polish frontier.', choices: [
        { label: 'Neutral in law, Allied in spirit', outcome: 'You signal where America’s heart lies.', effects: { diplomacy: +8, aggression: +5 }, tension: 0, flags: ['allies-friendly'] },
        { label: 'Strict neutrality', outcome: 'America turns away; Britain and France stand alone.', effects: { stability: +3, diplomacy: -8, aggression: -8 }, tension: +3, flags: ['strict-neutrality', 'isolationist'] },
        { label: 'Ask Congress to repeal the arms embargo', outcome: 'Cash and Carry will pass in November; materiel flows.', effects: { diplomacy: +10, economy: +5, aggression: +8 }, tension: -3, flags: ['cash-and-carry', 'arsenal-of-democracy'] },
      ]},
      poland: {
        description: 'Berlin and Moscow have signed in secret. The Wehrmacht is at the western frontier; the Red Army gathers in the east. There is no good answer left.',
        choices: [
          { label: 'Fight on both fronts to the last cartridge', outcome: 'Polish cavalry charges Panzers; Warsaw holds for three weeks. The Republic dies in arms.', effects: { military: +5, aggression: +20, stability: -25 }, tension: +25, flags: ['poland-fights', 'wwii'] },
          { label: 'Order the army to fall back to the Romanian bridgehead', outcome: 'A planned retreat saves what can be saved; the government escapes to the West.', effects: { military: -10, diplomacy: +5, aggression: +10 }, tension: +20, flags: ['romanian-bridgehead', 'wwii'] },
          { label: 'Sue for terms', outcome: 'Hitler will not accept terms; you fight anyway, with morale halved.', effects: { stability: -20, military: -10, aggression: -8 }, tension: +20, flags: ['polish-collapse', 'wwii'] },
        ],
      },
      yishuv: {
        description: 'Europe is at war. The British Mandate forbids you arms; Hitler is the worst enemy a Jewish state could imagine. Ben-Gurion’s formula must be put into practice.',
        choices: [
          { label: 'Volunteer the Yishuv to fight alongside Britain', outcome: 'Tens of thousands enlist; Jewish brigades are formed eventually.', effects: { military: +12, diplomacy: +10, aggression: +5 }, tension: -2, flags: ['fight-with-britain'] },
          { label: 'Focus everything on Aliyah Bet — saving European Jews', outcome: 'Hagana ships run the British blockade; some saved, many drowned.', effects: { stability: +5, diplomacy: -8, aggression: +5 }, tension: +2, flags: ['rescue-priority'] },
          { label: 'Build the underground army in secret', outcome: 'Hagana, Palmach, hidden arms caches. The war for after the war begins now.', effects: { military: +15, stability: +5 }, tension: 0, flags: ['hidden-army'] },
        ],
      },
    },
  },

  // ============================================================
  // POLAND — DOMESTIC EVENTS
  // ============================================================
  {
    id: 'poland-1934-german-pact',
    year: 1934, month: 1, title: 'Beck’s Gamble',
    appliesTo: ['poland'],
    variants: {
      poland: {
        description: 'Foreign Minister Beck proposes a ten-year non-aggression pact with Hitler’s Germany — a stunning break with the old French-led system.',
        choices: [
          { label: 'Sign the Polish-German Non-Aggression Pact', outcome: 'A diplomatic coup; Berlin is calmed. Paris is appalled.', effects: { diplomacy: +5, stability: +5, aggression: 0 }, tension: -2, flags: ['polish-german-pact'] },
          { label: 'Hold to the French alliance only', outcome: 'No deal with Berlin; the French alliance is preserved unsullied.', effects: { diplomacy: +3, military: +3 }, tension: 0 },
          { label: 'Propose a parallel pact with Moscow as well', outcome: 'A balanced posture between the giants; both are wary.', effects: { diplomacy: +8 }, tension: -3, flags: ['polish-balance'] },
        ],
      },
    },
  },
  {
    id: 'poland-1935-pilsudski',
    year: 1935, month: 5, title: 'The Marshal is Dead',
    appliesTo: ['poland'],
    variants: {
      poland: {
        description: 'Piłsudski has died. The Sanacja regime he built must now stand without him. The Colonels — Beck, Rydz-Śmigły, Mościcki — propose to keep his system.',
        choices: [
          { label: 'Continue the Colonels’ regime', outcome: 'Authoritarian continuity. The opposition is suppressed; the state limps on.', effects: { stability: +5, diplomacy: -3 }, tension: 0, flags: ['colonels-regime'] },
          { label: 'Liberalize — restore parliamentary rule', outcome: 'Free elections return; the regime fragments but breathes.', effects: { stability: -5, diplomacy: +8, economy: +3 }, tension: 0, flags: ['polish-democracy'] },
          { label: 'Concentrate power in Marshal Rydz-Śmigły', outcome: 'A military dictatorship in all but name.', effects: { stability: +8, military: +5, diplomacy: -5 }, tension: 0 },
        ],
      },
    },
  },
  {
    id: 'poland-1936-industrial',
    year: 1936, month: 9, title: 'The Central Industrial District',
    appliesTo: ['poland'],
    variants: {
      poland: {
        description: 'Deputy Premier Kwiatkowski proposes a four-year plan: build a heavy-industrial heartland in the southern interior, safe from invasion routes.',
        choices: [
          { label: 'Approve the full COP programme', outcome: 'Steel and arms plants rise around Stalowa Wola; the economy modernizes.', effects: { economy: +10, military: +8, stability: +3 }, tension: 0, flags: ['polish-industry'] },
          { label: 'A more modest expansion', outcome: 'Some new plants, no transformation. The army gets what it gets.', effects: { economy: +3, military: +3 }, tension: 0 },
          { label: 'Spend on agricultural reform instead', outcome: 'Peasant smallholdings get loans and machinery. The army remains under-equipped.', effects: { economy: +5, stability: +8, military: -3 }, tension: 0 },
        ],
      },
    },
  },
  {
    id: 'poland-1938-cieszyn',
    year: 1938, month: 10, title: 'Cieszyn',
    appliesTo: ['poland'],
    variants: {
      poland: {
        description: 'With Czechoslovakia carved up at Munich, Beck sees a chance to grab the long-disputed Cieszyn (Teschen) region from the dying Czech state.',
        choices: [
          { label: 'Issue the ultimatum; take Cieszyn', outcome: 'Polish troops occupy the territory. The world calls you a jackal feeding on a corpse.', effects: { military: +3, economy: +3, diplomacy: -10, aggression: +10 }, tension: +3, flags: ['cieszyn-taken'] },
          { label: 'Stand with Czechoslovakia, demand only Polish minority rights', outcome: 'A principled stand; Prague offers gratitude that does not survive its own collapse.', effects: { diplomacy: +8, aggression: -5 }, tension: -2, flags: ['polish-honour'] },
          { label: 'Stay silent, demand nothing', outcome: 'A passive posture; nothing is gained, nothing is lost.', effects: { diplomacy: 0 }, tension: 0 },
        ],
      },
    },
  },
  {
    id: 'poland-1939-danzig',
    year: 1939, month: 3, title: 'The Danzig Demand',
    appliesTo: ['poland'],
    variants: {
      poland: {
        description: 'Ribbentrop demands Danzig and an extraterritorial road across the Corridor. Beck calls a public assembly: Poland will fight, or Poland will fold.',
        choices: [
          { label: '"We do not know the word peace at any price"', outcome: 'Beck’s defiant speech to the Sejm. Britain offers a guarantee within weeks.', effects: { diplomacy: +12, military: +5, aggression: +8, stability: +8 }, tension: +5, flags: ['polish-defiance'] },
          { label: 'Open negotiations — perhaps a deal can be found', outcome: 'You stall for time; Hitler reads weakness.', effects: { diplomacy: -3, aggression: -5 }, tension: +3, flags: ['polish-negotiate'] },
          { label: 'Concede Danzig in exchange for guarantees on the Corridor', outcome: 'A partial surrender; Hitler demands more next month.', effects: { diplomacy: -8, stability: -8, aggression: -8 }, tension: +2, flags: ['polish-concession'] },
        ],
      },
    },
  },

  // ============================================================
  // CZECHOSLOVAKIA — DOMESTIC EVENTS
  // ============================================================
  {
    id: 'czech-1933-henlein',
    year: 1933, month: 10, title: 'The Sudeten German Front',
    appliesTo: ['czechoslovakia'],
    variants: {
      czechoslovakia: {
        description: 'Konrad Henlein has founded the Sudetendeutsche Heimatfront — a movement of three million Sudeten Germans whose loyalty to the Republic is, at best, conditional.',
        choices: [
          { label: 'Allow it; treat it as a normal opposition party', outcome: 'Czechoslovak democracy holds firm. Henlein grows steadily, funded from Berlin.', effects: { stability: +3, diplomacy: +5 }, tension: +2, flags: ['henlein-tolerated'] },
          { label: 'Ban the movement; arrest its leaders', outcome: 'A crackdown. Henlein becomes a martyr; Berlin acquires a casus belli for the future.', effects: { stability: -5, diplomacy: -5, aggression: +5 }, tension: +5, flags: ['henlein-banned'] },
          { label: 'Negotiate concessions to Sudeten German cultural autonomy', outcome: 'Schools, civil-service jobs, and budget shares to the Sudeten regions.', effects: { stability: +8, diplomacy: +5 }, tension: 0, flags: ['sudeten-concessions'] },
        ],
      },
    },
  },
  {
    id: 'czech-1935-benes',
    year: 1935, month: 12, title: 'Masaryk Retires',
    appliesTo: ['czechoslovakia'],
    variants: {
      czechoslovakia: {
        description: 'The father of the Republic is too old. The presidency must pass. Edvard Beneš, foreign minister for seventeen years, is the obvious heir — but the agrarians have other ideas.',
        choices: [
          { label: 'Elect Beneš — continuity in foreign policy', outcome: 'Beneš takes the Castle. The alliance system he built is now his to defend.', effects: { diplomacy: +8, stability: +5 }, tension: 0, flags: ['benes-president'] },
          { label: 'Choose an agrarian compromise candidate', outcome: 'A more domestically focused presidency. Beneš stays at the foreign ministry.', effects: { stability: +3 }, tension: 0 },
        ],
      },
    },
  },
  {
    id: 'czech-1935-soviet-treaty',
    year: 1935, month: 5, title: 'The Soviet Treaty',
    appliesTo: ['czechoslovakia'],
    variants: {
      czechoslovakia: {
        description: 'Moscow proposes a mutual-assistance pact — conditional on France acting first. Soviet aid in any war with Germany, in exchange for Czech recognition.',
        choices: [
          { label: 'Sign the Czechoslovak-Soviet Treaty', outcome: 'A second great-power guarantor; the right at home is appalled.', effects: { diplomacy: +10, military: +5, stability: -3 }, tension: -2, flags: ['czech-soviet-treaty'] },
          { label: 'Demand unconditional Soviet aid first', outcome: 'Moscow refuses; the deal falls through.', effects: { diplomacy: -3 }, tension: +1 },
          { label: 'Reject — Bolshevism is no ally of democracy', outcome: 'You hold to the French alliance alone. The right cheers; the General Staff worries.', effects: { diplomacy: +3, stability: +3, military: -3 }, tension: +1, flags: ['czech-no-soviet'] },
        ],
      },
    },
  },
  {
    id: 'czech-1938-may-crisis',
    year: 1938, month: 5, title: 'The May Crisis',
    appliesTo: ['czechoslovakia'],
    variants: {
      czechoslovakia: {
        description: 'Reports — perhaps false — of German troops massing at the frontier. The General Staff requests partial mobilization.',
        choices: [
          { label: 'Mobilize the reserves', outcome: 'The army stands ready; Hitler postpones his plans, briefly. London is annoyed.', effects: { military: +10, diplomacy: -3, aggression: +5, stability: +5 }, tension: -2, flags: ['czech-mobilized'] },
          { label: 'Mobilize only the frontier units', outcome: 'A measured response; the threat passes without alarm.', effects: { military: +5, diplomacy: +3 }, tension: 0 },
          { label: 'Stand down — refuse to be provoked', outcome: 'No mobilization. Berlin notes how easily you flinch from a phantom.', effects: { military: -3, diplomacy: -5, aggression: -3 }, tension: +3 },
        ],
      },
    },
  },
  {
    id: 'czech-1938-second-republic',
    year: 1938, month: 11, title: 'After Munich',
    appliesTo: ['czechoslovakia'],
    variants: {
      czechoslovakia: {
        description: 'The Sudetenland is gone. The frontier fortifications are gone. Beneš has resigned and fled. Slovakia and Subcarpathian Ruthenia demand autonomy. What is left of the Republic?',
        choices: [
          { label: 'Grant Slovak and Ruthenian autonomy; preserve a federation', outcome: 'A "Czecho-Slovakia" hyphenated and weakened; the state survives, briefly.', effects: { stability: -5, diplomacy: -3 }, tension: 0, flags: ['czechoslovakia-federated'] },
          { label: 'Hold the centralized state by force', outcome: 'Slovakia revolts; the army cannot hold both flanks.', effects: { stability: -15, military: -5 }, tension: 0 },
          { label: 'Seek a German guarantee against further dismemberment', outcome: 'A humiliating dependence on the same power that just dismembered you.', effects: { stability: +3, diplomacy: -8, aggression: -10 }, tension: +2, flags: ['czech-german-protectorate'] },
        ],
      },
    },
  },
  {
    id: 'czech-1939-prague-falls',
    year: 1939, month: 3, title: 'The German Demand',
    appliesTo: ['czechoslovakia'],
    requires: ['czechoslovakia-federated'],
    variants: {
      czechoslovakia: {
        description: 'Hitler summons President Hácha to Berlin. Slovak separatists, backed from Berlin, have declared independence. The Wehrmacht is across the frontier by dawn.',
        choices: [
          { label: 'Sign the protectorate decree under duress', outcome: 'Hácha collapses in Berlin; Bohemia and Moravia become a German protectorate.', effects: { stability: -20, diplomacy: -10, aggression: -15 }, tension: +10, flags: ['protectorate'] },
          { label: 'Refuse — order the army to resist', outcome: 'Sporadic fighting; Prague falls within days. The state is destroyed but not surrendered.', effects: { military: -15, stability: -25, aggression: +15 }, tension: +12, flags: ['czech-fought'] },
        ],
      },
    },
  },

  // ============================================================
  // YISHUV — DOMESTIC EVENTS
  // ============================================================
  {
    id: 'yishuv-1933-haavara',
    year: 1933, month: 8, title: 'The Transfer Agreement',
    appliesTo: ['yishuv'],
    variants: {
      yishuv: {
        description: 'Nazi Germany has proposed an unprecedented arrangement: emigrating German Jews may transfer their wealth to Palestine — but only as payment for German exports. The Jewish Agency must answer.',
        choices: [
          { label: 'Sign the Haavara Agreement', outcome: 'Tens of thousands of German Jews and their capital reach Palestine. The international Jewish boycott of Germany is fatally weakened.', effects: { economy: +12, diplomacy: -8, stability: +5 }, tension: 0, flags: ['haavara'] },
          { label: 'Reject — uphold the global boycott of Nazi Germany', outcome: 'The boycott is preserved as a moral instrument. German Jews must flee with nothing.', effects: { economy: -5, diplomacy: +5 }, tension: 0, flags: ['boycott-upheld'] },
          { label: 'Allow private transfers, no official agreement', outcome: 'A workable compromise. Some capital flows quietly; the boycott is bent but not broken.', effects: { economy: +5 }, tension: 0 },
        ],
      },
    },
  },
  {
    id: 'yishuv-1934-aliyah',
    year: 1934, month: 5, title: 'The Aliyah Question',
    appliesTo: ['yishuv'],
    variants: {
      yishuv: {
        description: 'European refugees are arriving in numbers that strain the British quota. The Mandate sets immigration certificates each year by "economic absorptive capacity." How does the Yishuv work the system?',
        choices: [
          { label: 'Maximize official immigration through the quota', outcome: 'Cooperative pressure on the Mandate; numbers climb steadily.', effects: { economy: +5, stability: +5, diplomacy: +3 }, tension: 0, flags: ['aliyah-legal'] },
          { label: 'Organize Aliyah Bet — illegal immigration by sea', outcome: 'Ships slip past British patrols; the Mandate fumes.', effects: { stability: +3, diplomacy: -5 }, tension: 0, flags: ['aliyah-bet'] },
          { label: 'Prioritize trained pioneers over refugees', outcome: 'The kibbutz movement grows; the refugees in Vienna are left to wait.', effects: { economy: +8, stability: +3, military: +3 }, tension: 0, flags: ['pioneer-priority'] },
        ],
      },
    },
  },
  {
    id: 'yishuv-1936-arab-revolt',
    year: 1936, month: 4, title: 'The Arab Revolt',
    appliesTo: ['yishuv'],
    variants: {
      yishuv: {
        description: 'A general strike by the Arab population has escalated into rural violence against Jews, the Mandate, and Arab "collaborators." The Yishuv must decide how the Haganah responds.',
        choices: [
          { label: 'Havlagah — strict restraint, defensive only', outcome: 'The Haganah holds its fire; the Yishuv earns British and international sympathy.', effects: { diplomacy: +10, stability: +5, aggression: -5 }, tension: 0, flags: ['havlagah'] },
          { label: 'Endorse Irgun retaliation against Arab targets', outcome: 'The revisionist underground strikes back; the cycle of violence deepens.', effects: { diplomacy: -8, stability: -3, aggression: +10, military: +5 }, tension: 0, flags: ['irgun-active'] },
          { label: 'Cooperate openly with the British — joint patrols, Jewish Settlement Police', outcome: 'Haganah members are armed and trained by the Mandate; a generation of officers emerges.', effects: { military: +10, diplomacy: +8, stability: +3 }, tension: 0, flags: ['british-cooperation'] },
        ],
      },
    },
  },
  {
    id: 'yishuv-1937-peel',
    year: 1937, month: 7, title: 'The Peel Commission',
    appliesTo: ['yishuv'],
    variants: {
      yishuv: {
        description: 'The Royal Commission proposes partition: a small Jewish state in the coastal plain and Galilee, an Arab state federated with Transjordan, a population transfer between them.',
        choices: [
          { label: 'Accept the principle — a small state now is sovereignty', outcome: 'Ben-Gurion’s line carries the Zionist Congress; the Mandate is asked to act.', effects: { diplomacy: +10, stability: +5, aggression: 0 }, tension: 0, flags: ['accepted-partition'] },
          { label: 'Reject — the boundaries are inadequate', outcome: 'The maximalist line wins. The partition proposal dies in committee.', effects: { diplomacy: -5, aggression: +5 }, tension: 0, flags: ['rejected-partition'] },
          { label: 'Accept in principle, demand expanded borders', outcome: 'A negotiating posture. Endless debate; little progress before the Revolt resumes.', effects: { diplomacy: +3 }, tension: 0 },
        ],
      },
    },
  },
  {
    id: 'yishuv-1938-tower-stockade',
    year: 1938, month: 6, title: 'Tower and Stockade',
    appliesTo: ['yishuv'],
    variants: {
      yishuv: {
        description: 'A new technique: prefabricated settlements erected in a single day on contested land. The Mandate’s "homa u-migdal" tolerance lets you create facts on the ground.',
        choices: [
          { label: 'Push hard — fifty new settlements in two years', outcome: 'The Galilee and Negev gain a chain of fortified kibbutzim.', effects: { economy: +8, military: +8, stability: +3, aggression: +5 }, tension: 0, flags: ['settlement-push'] },
          { label: 'Build cautiously, only on legally purchased land', outcome: 'Slower growth; less Arab antagonism; less ground gained.', effects: { economy: +3, diplomacy: +5 }, tension: 0 },
          { label: 'Concentrate investment in existing settlements', outcome: 'The kibbutzim deepen; the map does not change.', effects: { economy: +5, stability: +5 }, tension: 0 },
        ],
      },
    },
  },
  {
    id: 'yishuv-1939-white-paper',
    year: 1939, month: 5, title: 'The White Paper',
    appliesTo: ['yishuv'],
    variants: {
      yishuv: {
        description: 'Britain announces: 75,000 Jewish immigrants over five years, then nothing without Arab consent. Land sales restricted. With Hitler’s shadow over Europe, the gates of Palestine are closing.',
        choices: [
          { label: '"We will fight the war as if there is no White Paper, the White Paper as if there is no war"', outcome: 'Ben-Gurion’s formula: full cooperation against Hitler, total resistance to immigration limits.', effects: { military: +5, diplomacy: 0, aggression: +5, stability: +5 }, tension: +3, flags: ['ben-gurion-formula'] },
          { label: 'Open revolt against British authority', outcome: 'The Irgun’s line. Bombings, attacks on Mandate officials; the British turn fully against the Yishuv.', effects: { diplomacy: -20, military: +3, aggression: +15, stability: -8 }, tension: +3, flags: ['british-revolt'] },
          { label: 'Acquiesce — accept the limits, work within them', outcome: 'The legal path. European Jews continue to die at the docks of Haifa.', effects: { diplomacy: +5, stability: -10, aggression: -10 }, tension: 0, flags: ['white-paper-accepted'] },
          { label: 'Massive Aliyah Bet — flotillas of illegals', outcome: 'Hagana ships run the blockade; many drown, many reach the shore.', effects: { stability: +5, diplomacy: -10, aggression: +5 }, tension: +2, flags: ['aliyah-bet-massive'] },
        ],
      },
    },
  },
]
