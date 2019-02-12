import {
  ADD_EQUIPMENT,
  CONFIRM_DELETE_EQUIPMENT,
  DELETE_EQUIPMENT,
  CHANGE_CHARACTER_TAB,
  CLOSE_MODAL,
  CONFIRM_DELETION,
  DELETE_CUSTOM_SKILL,
  DISMISS_ALERT,
  ROLLER,
  ROLL_DICE,
  POST_EDGE,
  PRE_EDGE,
  SET_CURRENT_CHARACTER,
  SORT_TABS,
  UPDATE_CHARACTER_INFO,
  UPDATE_CUSTOM_SKILL,
  UPDATE_EQUIPMENT,
  CONFIRM_DELETE_SPELL,
  DELETE_SPELL,
  UPDATE_SPELL
} from '../actions';

const hasCharacterState = {
  characters: {
    0: {
      Name: 'Tester1',
      Race: 'Halfling',
      DOB: 'Stuff'
    }
  },
  currentCharacter: 0,
  currentIndex: 1
};

  const noCharacterState = {
    characters: {},
    currentCharacter: undefined,
    currentIndex: 0
  };

const reducer = (state = noCharacterState, action) => {
  const {type, info={}, index, tabs} = action;
  const {field, value} = info;
  const currentCharacter = state.currentCharacter;
  var char, newState,confirmationText;

  switch (type) {
    case DISMISS_ALERT:
      let {confirmationInfo, ...newState} = state;
      return newState;
    case CONFIRM_DELETION:
      var {confirmationInfo: confirmInfo, ...deletedState} = state;

      char = state.characters[currentCharacter];
      delete char.customSkills[confirmInfo.index];
      return {
        ...deletedState,
        characters: {
          ...deletedState.characters,
          [currentCharacter]: {
            ...char
          }
        } 
      };
    case UPDATE_CHARACTER_INFO:
      return {...state, characters: {...state.characters, [currentCharacter]: {...state.characters[currentCharacter], [field]: value}}};
    case CONFIRM_DELETE_EQUIPMENT:
      confirmationText = 'Are you sure you want to delete ' + state.characters[currentCharacter].equipment[index].Name + '?';
      return {...state, confirmationInfo: {text: confirmationText, index: index, actionName:'deleteEquipment'}};
    case DELETE_CUSTOM_SKILL:
      confirmationText = 'Are you sure you want to delete ' + info.skillName + '?';
      return {...state, confirmationInfo: {text: confirmationText, index: info.index, actionName:'confirmDeletion'}};
    case ADD_EQUIPMENT:
      char = state.characters[currentCharacter];

      newState = {
        ...state, 
        characters: {
          ...state.characters, 
          [currentCharacter]: {
            ...char,
            equipment: [
              ...char.equipment || [],
            ]
          }
        }
      };

      newState.characters[currentCharacter].equipment.push(equipmentTypes[action.eqType]);

      return newState;
    case DELETE_EQUIPMENT:
      char = state.characters[currentCharacter];

      var {confirmationInfo: confirmInfo, ...newState} = state;

      char.equipment.splice(confirmInfo.index, 1);

      newState.characters[currentCharacter].equipment = char.equipment;

      return newState;
    case UPDATE_EQUIPMENT:
      char = state.characters[currentCharacter];

      newState = {
        ...state, 
        characters: {
          ...state.characters, 
          [currentCharacter]: {
            ...char,
            equipment: [
              ...char.equipment,
            ]
          }
        }
      };

      newState.characters[currentCharacter].equipment[info.index] = {...info};

      return newState;
    case UPDATE_SPELL:
      char = state.characters[currentCharacter];

      newState = {
        ...state, 
        characters: {
          ...state.characters, 
          [currentCharacter]: {
            ...char,
            spells: [
              ...char.spells || [],
            ]
          }
        }
      };

      newState.characters[currentCharacter].spells[info.index] = {...info};

      return newState;
    case DELETE_SPELL:
      char = state.characters[currentCharacter];

      var {confirmationInfo: confirmInfo, ...newState} = state;

      char.spells.splice(confirmInfo.index, 1);

      newState.characters[currentCharacter].equipment = char.equipment;

      return newState;
    case CONFIRM_DELETE_SPELL:
      confirmationText = 'Are you sure you want to delete ' + state.characters[currentCharacter].spells[index].Name + '?';
      return {...state, confirmationInfo: {text: confirmationText, index: index, actionName:'deleteSpell'}};
    case UPDATE_CUSTOM_SKILL:
      char = state.characters[currentCharacter];
      let customSkillLength = char.customSkills && !isNaN(char.customSkillLength) ? char.customSkillLength : 0;
      let skillIndex;
      if( info.index === 'new' ) {
        skillIndex = customSkillLength;
        customSkillLength = customSkillLength + 1;
      } else {
        skillIndex = info.index
      }

      newState = {
        ...state, 
        characters: {
          ...state.characters, 
          [currentCharacter]: {
            ...char,
            customSkillLength,
            customSkills: {
              ...char.customSkills,
              [skillIndex]: {
                ...info,
                index: skillIndex
              }
            }
          }
        }
      };

      return newState;
    case ROLLER:
      const {text, statValue, initiativeDice} = action.rollInfo;

      const statNumber = Number(statValue);
      const initiativeNumber = Number(initiativeDice);
      var message = '';

      if (isNaN(statNumber) || (statNumber === 0 && (initiativeNumber === NaN || initiativeNumber === 0))) {
        return {...state, modalInfo: 'Invalid roll'};
      }

      if(isNaN(initiativeNumber) || initiativeNumber === 0) {
        message = `Rolling ${statValue} dice for ${text}`;
      } else {
        message = `Rolling ${initiativeNumber}d6 + ${statNumber} for ${text}`;
      }

      return {...state, modalInfo: {message, statNumber, initiativeNumber, edge: state.characters[currentCharacter].edge}};
    case PRE_EDGE:
    case POST_EDGE:
    case ROLL_DICE:
      const {statNumber: stat, initiativeNumber: initDice, edge, adjustment = 0} = info;
      var rolls = [];
      let edged = false, ones = 0, hits = 0, preEdge = false, postEdge = false;
      var currentRoll;

      if(type === PRE_EDGE) {
        edged = true;
        preEdge = true;
      } else if(type === POST_EDGE) {
        edged = true;
        postEdge = true;
        hits = info.hits;
        rolls = info.rolls;
      }

      if(initDice) {
        let base = stat + (adjustment || 0)
        let total = base;
        edged = true;
        const toRoll = preEdge ? 5 : initDice;
        for(var roller = 0 ; roller < toRoll ; roller++){
          currentRoll = Math.floor(Math.random()*6)+1;
          rolls.push(currentRoll);
          total += currentRoll;
        }

        message = `Rolled ${preEdge ? 5 : initDice}d6 + ${base} for ${total}`;
      } else {
        message ='';
        const toRoll = (postEdge ? (stat - info.hits) : stat) + adjustment;
        for(var roller = 0 ; roller < toRoll ; roller++){
          do {
            currentRoll = Math.floor(Math.random()*6)+1;
            rolls.push(currentRoll);

            if(currentRoll == 1) {
              ones++;
            } else if(currentRoll >= 5) {
              hits++;
            }
          } while (preEdge && currentRoll === 6);
        }

        if(ones > Math.ceil(stat/2)){
          message = !hits ? `CRITICAL GLITCH!` : `GLITCH`;
          messsge += '\n';
          edged = true;
        }

        message += `Rolled ${hits} hits and ${ones} ones on ${rolls.length} dice`;
      }

      rolls.sort((a,b) => b-a);
      message += '\nRolls: ' + rolls;

      return {...state, modalInfo: {message, statNumber: stat, edge, edged, hits, rolls}};
    case CLOSE_MODAL:
      return {...state, modalInfo: ''};
    case SET_CURRENT_CHARACTER:
      if(index === 'new') {
        newState = {
          ...state,
          currentCharacter: state.currentIndex,
          characters: {
            ...state.characters,
            [state.currentIndex]: {}
          },
          currentIndex: state.currentIndex + 1,
          currentTab: 'Info'
        };

        return newState;
      } else {
        return {...state, currentCharacter: index, currentTab: 'Info'};
      }
    case CHANGE_CHARACTER_TAB:
      const {tab} = action;
      return {...state, currentTab: tab, sortTabs: false}
    case SORT_TABS:
      return {...state, sortTabs: true}
    default:
      return state;
  }
};

const equipmentTypes = {
  Armor: {
    Name: '',
    Cost: '',
    Enc: '',
    AP: '',
    Qualities:''
  },
  Item: {
    Name: '',
    Cost: '',
    Enc: '',
    Qualities:''
  },
  Weapon: {
    Name: '',
    Cost: '',
    Enc: '',
    Damage: '',
    Group: '',
    Range: '',
    Reload: '',
    Qualities:''
  }
};

export default reducer;