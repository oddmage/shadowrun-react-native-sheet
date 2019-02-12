import React, { Component } from 'react';
import {
  Button,
  View
} from 'react-native';

import TextComponent from './TextComponent';
import styles from '../styles';

export default class CharacterInfo extends Component<{}> {
  render() {
    const {character, updateCharacterInfo} = this.props;

    return (
      <View style={styles.subContainer}>
	    {
	      characterInfoFields.map(field =>
	        <TextComponent
	          text={field.attribute}
	          key={field.attribute}
	          value={character[field.attribute] || ''}
	          overrides={field.overrides || {}}
	          onChangeFunction={updateCharacterInfo}
	        />
	      )
	    }
	    </View>
    );
  }
}

const characterInfoFields = [
  {
    attribute: 'Name'
  },
  {
    attribute: 'Metatype'
  },
  {
    attribute: 'Karma'
  },
  {
    attribute: 'Total Karma'
  },
  {
    attribute: 'Gender'
  },
  {
    attribute: 'Age'
  },
  {
    attribute: 'Height'
  },
  {
    attribute: 'Weight'
  },
  {
    attribute: 'Hair'
  },
  {
    attribute: 'Eyes'
  },
  {
    attribute: 'Street Cred'
  },
  {
    attribute: 'Notoriety'
  }
];