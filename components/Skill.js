import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View
} from 'react-native';

import {Select} from 'teaset';

import styles from '../styles';

export default class Skill extends Component<{}> {
  render() {
    const {specialization, onChangeFunction, roller, skillInfo} = this.props;

  //   {
  //     "name": "Archery",
  //     "stat": "Agility",
  //     "defaultable": true,
  //     "specializations": [
  //         "Bow",
  //         "Crossbow",
  //         "Non-Standard Ammunition",
  //         "Slingshot"
  //     ]
  // },roller({text, statValue: value})
    skillInfo.specializations.includes('') ? '' : skillInfo.specializations.push('');

    const baseText = `${skillInfo.name}`;
    const specText = `${skillInfo.name} (${specialization})`;
    const dicePool = skillInfo.skillValue + skillInfo.statValue;
    const specializationDicePool = dicePool + 2;
    const canRoll = skillInfo.defaultable || skillInfo.skillValue > 0;

    return (
      <View style={[styles.subContainer, {padding: 2, flex: 1}]}>
        <Text style={[canRoll ? styles.clickableLabel : styles.inputBoxLabel, {width: '35%'}]}
          onPress={()=> canRoll ? roller({text: baseText, statValue: dicePool}) : ''}>
          {skillInfo.name}
        </Text>
        <Text style={[canRoll ? styles.clickableLabel : styles.inputBoxLabel,{width: '20%'}]}
          onPress={()=> canRoll ? roller({text: baseText, statValue: dicePool}) : ''}>
          {skillInfo.stat}
        </Text>
        <TextInput style={[styles.inputBox, {width: '5%', paddingHorizontal: 0}]}
          keyboardType='numeric'
          maxLength = {2}
          placeholder = {'X'}
          value = {(skillInfo.skillValue === 0 ? '' : skillInfo.skillValue.toString())}
          onChangeText={(newValue) => !Number.isNaN(Number(newValue)) && onChangeFunction({field: skillInfo.name,value: newValue})}
        />
        <View style={{width: '35%'}}>
          <Select
            items={skillInfo.specializations}
            placeholder='None'
            pickerType='popover'
            value={specialization || ''}
            style={{margin: 2}}
            onLongPress={()=> canRoll ? roller({text: specText, statValue: specializationDicePool}) : ''}
            onSelected={(newValue) => onChangeFunction({field: `${skillInfo.name}Specialization`, value: newValue})}
          />
        </View>
      </View>
    );
  }
}

const values = [
  'Trained',
  '+10',
  '+20'
];
