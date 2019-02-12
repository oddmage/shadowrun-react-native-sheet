import React, { Component } from 'react';
import {
  TextInput,
  View
} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import styles from '../styles';

export default class Equipment extends Component<{}> {
  constructor(props) {
    const {eq = {}} = props;
    super(props);
    this.state = {};
    Object.entries(eq).forEach(([key, value])=> {
      this.state[key] = value;
    });
  }

  render() {
    const {eq = {}, index, confirmDeleteEquipment, updateEquipment} = this.props;

    const fields = [];
    allFields.forEach(field => {
      if(eq[field] || eq[field] == '') {
        fields.push(<TextInput style={[styles.inputBox, overrides[field]]}
          placeholder={field}
          key={`${field}_${index}`}
          value={this.state[field]}
          editable = {true}
          maxLength = {40}
          numberOfLines = {1}
          onChangeText={text=>this.setState({[field]:text})}
          onEndEditing={(e) => updateEquipment({...eq, index, [field]: e.nativeEvent.text})}
        />);
      }
    });
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <GestureRecognizer
        style={[styles.subContainer, {padding: 2}]}
        onSwipeLeft={() => confirmDeleteEquipment(index)}
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

const allFields = ['Name', 'Cost', 'Enc', 'Damage', 'AP', 'Group', 'Range', 'Reload', 'Qualities'];

const overrides = {
  'Qualities': {minWidth: '100%'}
};