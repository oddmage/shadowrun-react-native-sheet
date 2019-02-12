import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View
} from 'react-native';

import styles from '../styles';

export default class Stat extends Component<{}> {
  render() {
    const {text, value='', onChangeFunction, roller, readOnly} = this.props;

    return (
      <View style={[styles.textInputView, {width: 65}]}>
        <Text style={styles.clickableLabel}
          onPress={()=>roller({text, statValue: value})}>
          {text}
        </Text>
        <TextInput style={styles.inputBox}
          keyboardType='numeric'
          editable = {true}
          maxLength = {2}
          placeholder = {text}
          numberOfLines = {1}
          value = {value}
          editable = {!readOnly}
          onChangeText={(newValue) => !Number.isNaN(Number(newValue)) && onChangeFunction({field: text,value: newValue})}
        />
      </View>
    );
  }
}