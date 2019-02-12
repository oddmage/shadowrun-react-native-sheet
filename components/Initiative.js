import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View
} from 'react-native';

import styles from '../styles';

export default class Initiative extends Component<{}> {
  render() {
    const {text, value='', onChangeFunction, roller, initiativeDice} = this.props;

    return (
      <View style={[styles.textInputView, {width: 75, alignItems: 'baseline'}]}>
        <Text style={styles.clickableLabel}
          onPress={()=>roller({text, statValue: value, initiativeDice})}>
          {text}
        </Text>
        <View style={[styles.subContainer, {alignItems: 'baseline', justifyContent: 'center', width: '100%'}]}>
          <TextInput style={[styles.inputBox, {width: 10, textAlignVertical: 'bottom', padding: 0}]}
            keyboardType='numeric'
            editable = {true}
            maxLength = {1}
            value = {initiativeDice + ''}
            onChangeText={(newValue) => onChangeFunction({field: text,value: newValue})}
          />
          <Text style={styles.inputBoxLabel}>
            d6+{value}
          </Text>
        </View>
      </View>
    );
  }
}