import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import MotherModal from 'react-native-modal';

import styles from '../styles';

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '0' };
  }

  _renderButtons = (closeModal, extraButtons, content) => {
    const buttonComponents = [];
    extraButtons.forEach(element => {
      buttonComponents.push(
      <TouchableOpacity style={styles.modalButton} onPress={() => {
          element.f({...content, adjustment: Number(this.state.text)})
        }}>
        <Text style={{color:'#39ff14'}}>{element.text}</Text>
      </TouchableOpacity>);
    });

    return (
    <View style={{flexDirection: 'row'}}>
      {buttonComponents}
      <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
          <Text style={{color:'#39ff14'}}>Close</Text>
      </TouchableOpacity>
    </View>
    );
  };

  _renderModalContent = (message, closeModal, extraButtons, content) => (
    <View style={styles.modalContent}>
      <Text style={{color:'#39ff14'}}>{message}</Text>
      {!content.edged && !content.rolls && (
        <View style={{flexDirection: 'row'}}>
          <Text style={{color:'#39ff14'}}>Adjustment </Text>
          <TextInput style={[styles.inputBox, {width: 10, textAlignVertical: 'top', padding: 0}]}
            keyboardType='numeric'
            editable = {true}
            maxLength = {2}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
        </View>
      )}
      {this._renderButtons(closeModal, extraButtons, content)}
    </View>
  );

  render() {
    const {closeModal, preEdge, postEdge, rollDice, content, isVisible} = this.props;
    const {message, statNumber, initiativeNumber, edge, edged, hits} = content;

    const extraButtons = [];

    if(!edged) {
      if (!hits) {
        extraButtons.push({text: 'Roll dice', f: rollDice});
      }
      if((statNumber || initiativeNumber) && (edge == undefined || Number(edge) >0)) {
        if (hits == undefined) {
          extraButtons.push({text: 'Edge', f: preEdge});
        } else {
          extraButtons.push({text: 'Post-Edge', f: postEdge});
        }
      }
    }

    return (
      <MotherModal isVisible={isVisible}>
        {this._renderModalContent(message, closeModal, extraButtons, content)}
      </MotherModal>
    );
  }
}