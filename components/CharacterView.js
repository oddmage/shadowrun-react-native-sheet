import React, { Component } from 'react';
import {
  Alert,
  Animated,
  Easing,
  Platform,
  ScrollView,
  Text,
  View
} from 'react-native';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import SortableList from 'react-native-sortable-list';

import Modal from './Modal'

import CharacterEquipment from './CharacterEquipment';
import CharacterInfo from './CharacterInfo';
import CharacterStats from './CharacterStats';
import CharacterButtons from './CharacterButtons';
import CharacterSkills from './CharacterSkills';
import CharacterTalents from './CharacterTalents';
import CharacterMagic from './CharacterMagic';
import TextComponent from './TextComponent';

import styles from '../styles'
import * as Actions from '../actions';

getMainTab = (currentTab, character, boundActionCreators) => {
  const Tab = tabLookupMap[currentTab];
  if(currentTab === 'Equip') {
    return <Tab equipment={character.equipment} {...boundActionCreators} />;
  }
  return <Tab character={character} {...boundActionCreators} />;
}

class CharacterView extends Component<{}> {
    constructor(props) {
    super(props);

    const {dispatch} = props;

    if (props.character && (props.navigation.state.params && props.navigation.state.params.characterName) !== props.character.Name) {
        props.navigation.setParams({ characterName: props.character.Name });
    }

    this.boundActionCreators = bindActionCreators(Actions, dispatch);
  }

  static navigationOptions = ({navigation}) => {
    const title = navigation.state.params && navigation.state.params.characterName || 'Character Info';
    return {
      title,
      headerTitleStyle: {
        fontFamily: 'Roboto',
        color: '#39ff14'
      },
      headerStyle: {
        backgroundColor: 'black'
      },
      style: {
        backgroundColor: 'black'
      },
      headerTintColor: '#39ff14'
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.character && (this.props.navigation.state.params && this.props.navigation.state.params.characterName) !== nextProps.character.Name) {
        this.props.navigation.setParams({ characterName: nextProps.character.Name });
    }
  }

  render() {
    const {character, currentTab, modalInfo, confirmationInfo, sortTabs} = this.props;

    if (confirmationInfo) {
      Alert.alert(
        'Confirm',
        confirmationInfo.text,
        [
          {text: 'Cancel', onPress: () => this.boundActionCreators.dismissAlert()},
          {text: 'OK', onPress: () => this.boundActionCreators[confirmationInfo.actionName](confirmationInfo)},
        ],
        { cancelable: false }
      );
    }
    const firstTab = !sortTabs && getMainTab(currentTab, character, this.boundActionCreators);

    const currentTabOrder = character.tabs || defaultTabOrder;

    const changeFunction = (newOrder) => {
      const newTabs = [];

      newOrder.forEach(value=>newTabs.push(currentTabOrder[value]));

      this.currentOrder = newTabs;
    }

    const releaseFunction = () =>{
      this.boundActionCreators.changeTabOrder(this.currentOrder);
    }

    return (
      <View style={[styles.container, {flexDirection: 'column', flexWrap: 'nowrap'}]}>
        <Modal
          isVisible={!!modalInfo}
          closeModal={this.boundActionCreators.closeModal}
          preEdge={this.boundActionCreators.preEdge}
          postEdge={this.boundActionCreators.postEdge}
          rollDice={this.boundActionCreators.rollDice}
          content={modalInfo || {}} />
        <ScrollView style={[styles.container, {}]}>
          { sortTabs ? 
              (<SortableList
              onChangeOrder={changeFunction}
              onReleaseRow={releaseFunction}
              style={styles.subContainer}
              contentContainerStyle={styles.contentContainer}
              data={character.tabs || defaultTabOrder}
              renderRow={this._renderRow} />)
            : 
              firstTab
          }
        </ScrollView>
        <CharacterButtons currentTab={currentTab} tabs={currentTabOrder} changeTab={this.boundActionCreators.changeCharacterTab} sortTabs={this.boundActionCreators.sortTabs}/>
      </View>
    );
  }

  _renderRow = ({data, active}) => {
    return <Row data={data} active={active} />
  }

}
console.disableYellowBox = true;
class Row extends Component {

  constructor(props) {
    super(props);

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            }),
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.07],
            }),
          }],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
      }).start();
    }
  }

  render() {
   const {data, active} = this.props;

    return (
      <Animated.View style={styles.subContainer}>
        <Text style={styles.tabOrderLabel} >{data}</Text>
      </Animated.View>
    );
  }
}


const mapStateToProps = (state) => {
  const appState = state.app;
  return {
    character: appState.characters[appState.currentCharacter] || {},
    currentTab: appState.currentTab || 'Info',
    modalInfo: appState.modalInfo,
    confirmationInfo: appState.confirmationInfo || false,
    sortTabs: appState.sortTabs
  }
};
const defaultTabOrder = ['Info', 'Stats', 'Skills', 'Talents', 'Equip', 'Magic'];
const tabLookupMap = {
  'Info': CharacterInfo,
  'Stats': CharacterStats,
  'Skills': CharacterSkills,
  'Talents': CharacterTalents,
  'Equip': CharacterEquipment,
  'Magic': CharacterMagic
}

export default connect(mapStateToProps)(CharacterView)