export const ADD_EQUIPMENT = 'ADD_EQUIPMENT';
export const CONFIRM_DELETE_EQUIPMENT = 'CONFIRM_DELETE_EQUIPMENT';
export const DELETE_EQUIPMENT = 'DELETE_EQUIPMENT';
export const CHANGE_CHARACTER_TAB = 'CHANGE_CHARACTER_TAB';
export const CHANGE_TAB_ORDER = 'CHANGE_TAB_ORDER';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SET_CURRENT_CHARACTER = 'SET_CURRENT_CHARACTER';
export const ROLLER = 'ROLLER';
export const UPDATE_CHARACTER_INFO = 'UPDATE_CHARACTER_INFO';
export const UPDATE_CUSTOM_SKILL = 'UPDATE_CUSTOM_SKILL';
export const DELETE_CUSTOM_SKILL = 'DELETE_CUSTOM_SKILL';
export const CONFIRM_DELETION = 'CONFIRM_DELETION';
export const DISMISS_ALERT = 'DISMISS_ALERT';
export const SORT_TABS = 'SORT_TABS';
export const UPDATE_EQUIPMENT = 'UPDATE_EQUIPMENT';
export const CONFIRM_DELETE_SPELL = 'CONFIRM_DELETE_SPELL';
export const DELETE_SPELL = 'DELETE_SPELL';
export const UPDATE_SPELL = 'UPDATE_SPELL';
export const PRE_EDGE = 'PRE_EDGE';
export const POST_EDGE = 'POST_EDGE';
export const ROLL_DICE = 'ROLL_DICE';

export const setCurrentCharacter = (index) => ({
  type: SET_CURRENT_CHARACTER,
  index
});

export const updateCharacterInfo = (info) => ({
  type: UPDATE_CHARACTER_INFO,
  info
});

export const updateCustomSkill = (info) => ({
  type: UPDATE_CUSTOM_SKILL,
  info
});

export const addEquipment = (eqType) => ({
  type: ADD_EQUIPMENT,
  eqType
});

export const confirmDeleteEquipment = (index) => ({
  type: CONFIRM_DELETE_EQUIPMENT,
  index
});

export const deleteEquipment = (index) => ({
  type: DELETE_EQUIPMENT,
  index
});

export const updateEquipment = (info) => ({
  type: UPDATE_EQUIPMENT,
  info
});

export const confirmDeleteSpell = (index) => ({
  type: CONFIRM_DELETE_SPELL,
  index
});

export const deleteSpell = (index) => ({
  type: DELETE_SPELL,
  index
});

export const updateSpell = (info) => ({
  type: UPDATE_SPELL,
  info
});

export const changeCharacterTab = (tab) => ({
  type: CHANGE_CHARACTER_TAB,
  tab
});

export const changeTabOrder = (tabs) => {
 return ({
  type: UPDATE_CHARACTER_INFO,
  info: {field: 'tabs', value: tabs}
})
}

export const roller = (rollInfo) => ({
  type: ROLLER,
  rollInfo
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});

export const deleteCustomSkill = (info) => ({
  type: DELETE_CUSTOM_SKILL,
  info
});

export const confirmDeletion = (info) => ({
  type: CONFIRM_DELETION,
  info
});

export const dismissAlert = () => ({
  type: DISMISS_ALERT
});

export const sortTabs = () => ({
  type: SORT_TABS
});

export const postEdge = (info) => ({
  type: POST_EDGE,
  info
});

export const preEdge = (info) => ({
  type: PRE_EDGE,
  info
});

export const rollDice = (info) => ({
  type: ROLL_DICE,
  info
});