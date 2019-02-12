import React, { Component } from 'react';
import {
  TextInput,
  View
} from 'react-native';

import GestureRecognizer from 'react-native-swipe-gestures';

import styles from '../styles';

export default class Spell extends Component<{}> {
  constructor(props) {
    const {spell = {}} = props;
    super(props);
    this.state = {};
    spellFields.forEach(field => this.state[field] = spell[field] || null);
  }

  render() {
    const {spell = {}, index, confirmDeleteSpell = ()=>{}, updateSpell} = this.props;

    const fields = []
    spellFields.forEach(field =>
      fields.push(<TextInput style={[styles.inputBox, overrides[field]? overrides[field].style : '']}
        placeholder={field}
        key={`Spell_${field}_${index}`}
        value={this.state[field]}
        editable={true}
        maxLength={overrides[field] ? overrides[field].length || 40 : 40}
        numberOfLines={overrides[field] ? overrides[field].lines || 1 : 1}
        multiline={overrides[field] && overrides[field].lines && overrides[field].lines > 1 ? true : false}
        onChangeText={text=>this.setState({[field]:text})}
        onEndEditing={(e) => updateSpell({...spell, index, [field]: e.nativeEvent.text})}
      />));

      const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
      };
  
      return (
        <GestureRecognizer
          style={[styles.subContainer, {padding: 2}]}
          onSwipeLeft={() => confirmDeleteSpell(index)}
          config={config}>
          <View style={[styles.subContainer]}>
            {
              fields
            }
          </View>
        </GestureRecognizer>
    );
  }
}

const spellFields = ['Name', 'CN', 'Time', 'Ing.', 'Description'];
const overrides = {
  'Description': {lines: 2, length: 999}
};