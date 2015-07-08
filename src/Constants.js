
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
      imagePath: '/res/img/greencardtemplate.png'
    },
    story: {
      imagePath: '/res/img/bluecardtemplate.png'
    },
    delay: {
      imagePath: '/res/img/blackcardtemplate.png'
    },
    boost: {
      imagePath: '/res/img/whitecardtemplate.png'
    }
  },

  Decks: [
    {
      deckId: 'SBP',
      name: 'Standard Business Practices',
      cardIds: ['juniorEngineer', 'juniorEngineer2', 'engineerII', 'engineerII2', 'seniorEngineer', 'asset', 'asset2', 'asset3',
              'IPO', 'fancyDropDown', 'loginScreen', 'hotCheckbox', 'scopeCreep', 'scopeCreep2']
    },
    {
      deckId: 'VCM',
      name: 'VC Money',
      cardIds: ['juniorEngineer', 'juniorEngineer2', 'engineerII', 'engineerII2', 'seniorEngineer', 'asset', 'asset2', 'asset3',
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
      cardId: 'asset',
      modifiers: [],
      name: 'Asset',
      text: 'It has been monetized!',
      imagePath: './res/img/software.png',
      type: 'resource',
      value: 2
    },
    {
      cardId: 'asset2',
      modifiers: [],
      name: 'Asset',
      text: 'It has been monetized!',
      imagePath: './res/img/software.png',
      type: 'resource',
      value: 1
    },
    {
      cardId: 'asset3',
      modifiers: [],
      name: 'Asset',
      text: 'It has been monetized!',
      imagePath: './res/img/software.png',
      type: 'resource',
      value: 3
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
      points: 2
    },
    {
      cardId: 'scopeCreep2',
      modifiers: [],
      name: 'Scope Creep',
      text: 'Scope it be Creepin',
      imagePath: './res/img/scope.png',
      type: 'delay',
      points: 2
    }

  ],

  FileServerIP: '10.32.64.156'
};
