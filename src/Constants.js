
export default {

  ActionTypes: {
    CREATED_MATCH: 'cm',
    DRAW_CARDS: 'dc',
    END_TURN: 'et',
    SELECTED_MATCH: 'sm',
    MATCH_READY: 'mr',
    MATCH_AVAILABLE: 'ma',
    JOINED_MATCH: 'jm',
    UPDATE_MATCH: 'um',
    DELETE_MATCH: 'dm',
    MATCH_START: 'ms',
    CREATE_NEW_PLAYER: 'cnp',
    DELETE_PLAYER: 'dp',
    START_TIMER_TICK: 'stt',
    GAME_TIMER_TICK: 'gtt',
    TIMER_UPDATE: 'tu',
    DISABLE_JOIN_BUTTON: 'djb',
    CHOOSE_DECK: 'cd',
    SELECTED_DECK: 'sd',
    DELETE_DECK: 'dd',
    CREATE_DECK: 'crd',
    TOGGLE_CARD: 'tc',
    CARD_MOVED: 'crm',
    CARD_MODIFIED: 'cmd',
    CARD_UNMODIFIED: 'cum'
  },

  CardTypes: {
    resource:{
      imagePath: './res/img/greencardtemplate.png'
    },
    story: {
      imagePath: './res/img/bluecardtemplate.png'
    },
    delay: {
      imagePath: './res/img/greycardtemplate.jpg'
    },
    boost: {
      imagePath: './res/img/whitecardtemplate.png'
    }
  },

  Decks: [
    {
      deckId: 'SBP',
      name: 'Standard Business Practices',
      cardIds: ['juniorEngineer', 'juniorEngineer2', 'engineerII', 'engineerII2', 'seniorEngineer',
              'IPO', 'fancyDropDown', 'loginScreen', 'hotCheckbox', 'scopeCreep', 'scopeCreep2']
    },
    {
      deckId: 'VCM',
      name: 'VC Money',
      cardIds: ['juniorEngineer', 'juniorEngineer2', 'engineerII', 'engineerII2', 'seniorEngineer',
        'VC', 'fancyDropDown', 'loginScreen', 'hotCheckbox', 'scopeCreep', 'scopeCreep2']
    },
    {
      deckId: 'Custom',
      name: 'Custom Deck',
      cardIds: []
    }
  ],

  Cards: [
    {
      cardId: 'juniorEngineer',
      modifiers: [],
      name: 'Junior Engineer',
      text: 'I\'ll just watch.',
      imagePath: './res/img/rgreen.png',
      type: 'resource',
      ppt: 1,
      cost: 1
    },
    {
      cardId: 'juniorEngineer2',
      modifiers: [],
      name: 'Junior Engineer',
      text: 'I\'ll just watch.',
      imagePath: './res/img/rgreen.png',
      type: 'resource',
      ppt: 1,
      cost: 1
    },
    {
      cardId: 'engineerII',
      modifiers: [],
      name: 'Engineer II',
      text: 'Paring is sharing.',
      imagePath: './res/img/techLlama.png',
      type: 'resource',
      ppt: 2,
      cost: 2
    },
    {
      cardId: 'engineerII2',
      modifiers: [],
      name: 'Engineer II',
      text: 'Paring is sharing.',
      imagePath: './res/img/techLlama.png',
      type: 'resource',
      ppt: 2,
      cost: 2
    },
    {
      cardId: 'seniorEngineer',
      modifiers: [],
      name: 'Senior Engineer',
      text: 'I used to work at a startup.',
      imagePath: './res/img/rgreen.png',
      type: 'resource',
      ppt: 4,
      cost: 5
    },
    {
      cardId: 'productOwner',
      modifiers: [],
      name: 'Product Owner',
      text: 'I own the products.',
      imagePath: './res/img/rgreen.png',
      type: 'resource',
      pptBonus: 1,
      cost: 2
    },
    {
      cardId: 'scrumMaster',
      modifiers: [],
      name: 'Scrum Master',
      text: 'Hug it out.',
      imagePath: './res/img/rgreen.png',
      type: 'resource',
      pptBonus: 1,
      cost: 2
    },
    {
      cardId: 'salesGuy',
      modifiers: [],
      name: 'Sales Guy',
      text: 'Make it rain!',
      imagePath: './res/img/software.png',
      type: 'resource',
      value: 3,
      cost: 1
    },
    {
      cardId: 'seniorSalesGuy',
      modifiers: [],
      name: 'Head Sales Guy',
      text: 'Get the cream ya\'ll.',
      imagePath: './res/img/software.png',
      type: 'resource',
      value: 6,
      cost: 3
    },
    {
      cardId: 'IPO',
      modifiers: [],
      name: 'IPO',
      text: 'We know what we\'re doing, give us money.',
      imagePath: './res/img/stock.png',
      type: 'resource',
      value: 20,
      upkeep: 1
    },
    {
      cardId: 'VC',
      modifiers: [],
      name: 'VC Money',
      text: 'We know what we\'re doing, give us money.',
      imagePath: './res/img/stock.png',
      type: 'resource',
      value: 10,
      upkeep: 1
    },
    {
      cardId: 'fancyDropDown',
      modifiers: [],
      name: 'Fancy Drop Down',
      text: 'It drops it on down',
      imagePath: './res/img/ddl.png',
      type: 'story',
      points: 3
    },
    {
      cardId: 'ext4',
      modifiers: [],
      name: 'Ext4 Upgrade',
      text: 'Oh no. please dear God no whyyyyy.',
      imagePath: './res/img/ddl.png',
      type: 'story',
      points: 10
    },
    {
      cardId: 'sharedviews',
      modifiers: [],
      name: 'Shaved Views',
      text: 'Make a view and show it to someone',
      imagePath: './res/img/ddl.png',
      type: 'story',
      points: 6
    },
    {
      cardId: 'loginScreen',
      modifiers: [],
      name: 'Login Screen',
      text: 'It logs it on in',
      imagePath: './res/img/login.png',
      type: 'story',
      points: 5
    },
    {
      cardId: 'hotCheckbox',
      modifiers: [],
      name: 'Hot Checkbox',
      text: 'So hot',
      imagePath: './res/img/chxbox.png',
      type: 'story',
      points: 3
    },
    {
      cardId: 'scopeCreep',
      modifiers: [],
      name: 'Scope Creep',
      text: 'Scope it be Creepin',
      imagePath: './res/img/scope.png',
      type: 'delay',
      points: 2,
      cost: 1
    },
    {
      cardId: 'scopeCreep2',
      modifiers: [],
      name: 'Scope Creep',
      text: 'Scope it be Creepin',
      imagePath: './res/img/scope.png',
      type: 'delay',
      points: 2,
      cost: 1
    },
    {
      cardId: 'sickDay',
      modifiers: [],
      name: 'Sick Day',
      text: 'I think I have the black lung, pop.',
      imagePath: './res/img/scope.png',
      type: 'delay',
      points: 2,
      cost: 1
    },
    {
      cardId: 'hackathon',
      modifiers: [],
      name: 'Hackathon!',
      text: 'We\'ll be faster after though.',
      imagePath: './res/img/scope.png',
      type: 'delay',
      points: 6,
      pptBonus: 2,
      cost: 3
    },
    {
      cardId: 'powderDay',
      modifiers: [],
      name: 'Powder Day',
      text: 'It\'s going to melt though.',
      imagePath: './res/img/scope.png',
      type: 'delay',
      points: 3,
      cost: 2
    },
    {
      cardId: 'longLunch',
      modifiers: [],
      name: '3 hour lunch',
      text: 'CA\'s paying.',
      imagePath: './res/img/scope.png',
      type: 'delay',
      points: 1,
      cost: 1
    },
    {
      cardId: 'jarvis',
      modifiers: [],
      name: 'Jarvis',
      text: 'Jarvis make me a sandwich. Jarvis?',
      imagePath: './res/img/scope.png',
      type: 'delay',
      points: 1,
      cost: 1
    },
    {
      cardId: 'raise',
      modifiers: [],
      name: 'Raise!',
      text: 'This close to buying my island.',
      imagePath: './res/img/scope.png',
      type: 'boost',
      points: -1,
      cost: 1
    },
    {
      cardId: 'ssd',
      modifiers: [],
      name: 'Solid State Drive',
      text: 'No more beach balls.',
      imagePath: './res/img/scope.png',
      type: 'boost',
      points: -1,
      cost: 1
    },
    {
      cardId: 'foosBall',
      modifiers: [],
      name: 'Foos?',
      text: 'Click click, boom.',
      imagePath: './res/img/scope.png',
      type: 'boost',
      points: -1,
      cost: 1
    },
    {
      cardId: 'jenkins',
      modifiers: [],
      name: 'Jenkins',
      text: 'My shell is so lonely now.',
      imagePath: './res/img/scope.png',
      type: 'boost',
      points: -3,
      cost: 2
    },
    {
      cardId: 'react',
      modifiers: [],
      name: 'React',
      text: 'Why were we using Ext again?',
      imagePath: './res/img/scope.png',
      type: 'boost',
      points: -5,
      cost: 4
    }
  ],

  FileServerIP: 'localhost'
};
