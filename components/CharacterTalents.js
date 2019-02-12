import React, { Component } from 'react';
import {
  TextInput,
  View
} from 'react-native';

import TextComponent from './TextComponent';
import styles from '../styles';

export default class CharacterTalents extends Component<{}> {
  render() {
    const {character, updateCharacterInfo} = this.props;

    return (
      <View style={styles.subContainer}>
	      <TextInput
          style={{width: '100%'}}
          value={character['talents'] || ''}
          multiline= {true}
          autoGrow= {false}
          placeholder={'Enter talents here'}
          onChangeText={(newValue) => updateCharacterInfo({field: 'talents',value: newValue})}
        />
	    </View>
      );
  }
}