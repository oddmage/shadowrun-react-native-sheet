import React, { Component } from 'react';
import {
  ScrollView
} from 'react-native';

import Spell from './Spell';

export default class CharacterMagic extends Component<{}> {
  render() {
    const {character, confirmDeleteSpell, updateSpell} = this.props;
    const spells = character.spells || [];

    const entries = [];
    
    spells.forEach((spell, index) => 
      entries.push(
        <Spell
          spell={spell}
          confirmDeleteSpell={confirmDeleteSpell}
          key={`spell_${index}_${spell.Name}`}
          index={index}
          updateSpell={updateSpell}
      />)
    );

    entries.push(
      <Spell
        index={spells.length}
        updateSpell={updateSpell} 
    />);

    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {
          entries
        }
	    </ScrollView>
    );
  }
}