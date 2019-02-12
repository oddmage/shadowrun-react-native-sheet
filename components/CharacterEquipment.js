import React, { Component } from 'react';
import {
  Button,
  ScrollView,
  View
} from 'react-native';

import Equipment from './Equipment';
import styles from '../styles';

export default class CharacterEquipment extends Component<{}> {
  render() {
    const {equipment = [], addEquipment, confirmDeleteEquipment, updateEquipment} = this.props;

    const entries = [];

    equipment.forEach((eq, index) => {
      entries.push(
        <Equipment
          eq={eq}
          key={`eq_${index}_${eq.Name}`}
          index={index}
          confirmDeleteEquipment={confirmDeleteEquipment}
          updateEquipment={updateEquipment}
      />);
    });

    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={[styles.subContainer]}>  
          <View style={{flex:1}}><Button title={'Weapon'} onPress={() => {addEquipment('Weapon')}} /></View>
          <View style={{flex:1}}><Button title={'Armor'} onPress={() => {addEquipment('Armor')}} /></View>
          <View style={{flex:1}}><Button title={'Item'} onPress={() => {addEquipment('Item')}} /></View>
        </View>
        {
          entries
        }
	    </ScrollView>
    );
  }
}