// All nations start January 1933. End state determined by player choices through September 1939.
export const nations = {
  us: {
    id: 'us',
    name: 'United States',
    leader: 'President',
    tagline: 'The Reluctant Giant',
    description:
      'It is 1933. Four years of Depression have crushed the economy. Banks are failing, breadlines stretch for blocks, and the new president has just told the nation it has nothing to fear but fear itself. Across the oceans, dictators rise — but most Americans want nothing to do with the Old World’s quarrels.',
    colors: {
      primary: '#1a3a6e',
      accent: '#c8102e',
      paper: '#f1e7c8',
      ink: '#0e1f3a',
    },
    startingStats: {
      military: 35,
      economy: 25,
      diplomacy: 45,
      stability: 40,
      aggression: 0,
    },
    objectives: [
      'Pull America out of the Great Depression.',
      'Decide America\'s role in the world: isolation, or international leader.',
      'Keep American sons out of any European war — or commit to stopping fascism.',
    ],
  },
  britain: {
    id: 'britain',
    name: 'United Kingdom',
    leader: 'Prime Minister',
    tagline: 'The Weary Empire',
    description:
      'It is 1933. The Empire still spans a quarter of the globe, but the Treasury is exhausted, India agitates for self-rule, and a new and dangerous Chancellor has just taken power in Berlin. The British people will not stomach another Somme. The Empire must endure — but how?',
    colors: {
      primary: '#0e3a2a',
      accent: '#b8262b',
      paper: '#f1e7c8',
      ink: '#0a1f17',
    },
    startingStats: {
      military: 60,
      economy: 55,
      diplomacy: 75,
      stability: 60,
      aggression: 0,
    },
    objectives: [
      'Preserve the British Empire and the loyalty of its dominions.',
      'Avoid another continental war — if at all possible.',
      'Contain both Bolshevism and German revanchism through balance of power.',
    ],
  },
  france: {
    id: 'france',
    name: 'French Republic',
    leader: 'Premier',
    tagline: 'Victor and Victim',
    description:
      'It is 1933. France won the last war and has spent fifteen years dreading the next. The Maginot Line rises stone by stone along the German frontier. Governments rise and fall every few months. Across the Rhine, the new German Chancellor speaks openly of tearing up Versailles. France must not be caught alone.',
    colors: {
      primary: '#002395',
      accent: '#ed2939',
      paper: '#f5ecd2',
      ink: '#0a1248',
    },
    startingStats: {
      military: 70,
      economy: 45,
      diplomacy: 65,
      stability: 45,
      aggression: 5,
    },
    objectives: [
      'Guarantee French security against any future German aggression.',
      'Maintain alliances with Britain and the smaller European states.',
      'Hold the Republic together against fascist and communist agitation at home.',
    ],
  },
  germany: {
    id: 'germany',
    name: 'Germany',
    leader: 'Chancellor',
    tagline: 'The Wounded Eagle',
    description:
      'It is January 1933. The Weimar Republic is dying. Six million are unemployed. Nazis and Communists battle in the streets. President Hindenburg, old and tired, must choose a new Chancellor — and the leader of the largest party in the Reichstag is a former Austrian corporal named Adolf Hitler. What kind of Germany will rise from this crisis?',
    colors: {
      primary: '#1c1c1c',
      accent: '#b8860b',
      paper: '#e8dcc4',
      ink: '#0a0a0a',
    },
    startingStats: {
      military: 30,
      economy: 25,
      diplomacy: 30,
      stability: 25,
      aggression: 0,
    },
    objectives: [
      'Restore German economic strength and end mass unemployment.',
      'Revise or overturn the Treaty of Versailles — by diplomacy or by arms.',
      'Reclaim Germany\'s place as a great power without provoking a coalition against you.',
    ],
  },
  italy: {
    id: 'italy',
    name: 'Kingdom of Italy',
    leader: 'Il Duce',
    tagline: 'The New Rome',
    description:
      'It is 1933. Eleven years of Fascist rule have brought order, parades, and a corporatist economy. But Italy is poor, her industry thin, and her empire embarrassing for a self-styled heir of Rome. The dictators of the world look to Mussolini as the inventor of their creed — but Italy stands alone between France, Britain, and a rising Germany.',
    colors: {
      primary: '#1b5e20',
      accent: '#b71c1c',
      paper: '#f1e7c8',
      ink: '#0d2410',
    },
    startingStats: {
      military: 55,
      economy: 35,
      diplomacy: 55,
      stability: 60,
      aggression: 15,
    },
    objectives: [
      'Build a Mediterranean empire worthy of Rome.',
      'Decide whether Italy stands with the Western democracies or with Hitler.',
      'Modernize Italian industry without bankrupting the regime.',
    ],
  },
  ussr: {
    id: 'ussr',
    name: 'Soviet Union',
    leader: 'General Secretary',
    tagline: 'Socialism in One Country',
    description:
      'It is 1933. The first Five-Year Plan has dragged a peasant nation into the industrial age at horrific cost — millions are starving in Ukraine. The Party is consolidated, rivals are silenced, and an entire generation of factories rises from the steppes. Beyond the borders, capitalism reels and fascism rises. The revolution must be defended.',
    colors: {
      primary: '#9b1a1a',
      accent: '#f2cb31',
      paper: '#ecdcb8',
      ink: '#3a0808',
    },
    startingStats: {
      military: 45,
      economy: 30,
      diplomacy: 20,
      stability: 40,
      aggression: 10,
    },
    objectives: [
      'Industrialize the Soviet Union into a true world power.',
      'Defend the revolution from internal enemies and foreign encirclement.',
      'Choose the USSR\'s great alliance: with the capitalist West, with Hitler, or with no one.',
    ],
  },
}

export const nationOrder = ['us', 'britain', 'france', 'germany', 'italy', 'ussr']

export const statLabels = {
  military: 'Military',
  economy: 'Economy',
  diplomacy: 'Diplomacy',
  stability: 'Stability',
  aggression: 'Aggression',
}
