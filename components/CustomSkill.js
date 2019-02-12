import React, { Component } from 'react';
import {
  TextInput,
  View
} from 'react-native';
import {Select} from 'teaset';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import styles from '../styles';

export default class CustomSkill extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      inputValue : props.skill ? props.skill.name : '',
    };
  }

  render() {
    const {skill={}, statValue, onChangeFunction, onCustomSkillSwipe, roller, advanced=false, index} = this.props;
    let rollValue;

    const stat = skill.stat || '';
    const value = skill.value || '';

    if(value === '') {
      rollValue = advanced ? 0 : Math.ceil(statValue/2);
    } else if(value === 'Trained') {
      rollValue = Number(statValue);
    } else if (value ==='+10') {
      rollValue = Number(statValue) + 10;
    } else if (value==='+20') {
      rollValue = Number(statValue) + 20;
    }

    const text = `${this.state.inputValue} (${stat}, ${value||'Untrained'} = ${rollValue})`;
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <GestureRecognizer
        style={[styles.subContainer, {padding: 2}]}
        onSwipeLeft={() => onCustomSkillSwipe ? onCustomSkillSwipe({index, skillName: this.state.inputValue}) : {}}
        config={config}>
        <View style={{width: '40%'}}>
          <TextInput style={[styles.inputBoxLabel]}
            onLongPress={()=> roller({text, statValue: rollValue})}
            onChangeText={(text) => this.setState({inputValue : text})}
            editable = {true}
            placeholder={'New Skill'}
            value={this.state.inputValue}
          />
        </View>
        <View style={{width: '20%'}}>
          <Select
            items={stats}
            placeholder=''
            pickerType='popover'
            value={stat}
            style={{margin: 2}}
            onLongPress={()=> roller({text, statValue: rollValue})}
            onSelected={(newValue) => onChangeFunction({name: this.state.inputValue, stat:newValue, value, index})}
          />
        </View>
        <View style={{width: '40%'}}>
          <Select
            items={levelValues}
            placeholder='Untrained'
            pickerType='popover'
            value={value}
            style={{margin: 2}}
            onLongPress={()=> roller({text, statValue: rollValue})}
            onSelected={(newValue) => onChangeFunction({name: this.state.inputValue, stat, value:newValue, index})}
          />
        </View>
      </GestureRecognizer>
    );
  }
}

const levelValues = [
  'Trained',
  '+10',
  '+20'
];

const stats = [
  'WS',
  'BS',
  'S',
  'T',
  'Ag',
  'Int',
  'WP',
  'Fel'
];