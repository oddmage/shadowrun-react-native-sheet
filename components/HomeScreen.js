import React from 'react';
import { TouchableHighlight , Text, View } from 'react-native';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';

import * as Actions from '../actions'
import styles from '../styles'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    const {dispatch} = props;

    this.boundActionCreators = bindActionCreators(Actions, dispatch);
  }

  static navigationOptions = {
    title: 'Pick your character',
    headerTitleStyle: {
      fontFamily: 'Roboto',
      color: '#39ff14'
    },
    headerStyle: {
      backgroundColor: 'black'
    },
    style: {
      backgroundColor: 'black'
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    const {characters = {}} = this.props;

    return (
      <View style={{padding: 5, backgroundColor: 'black', flex: 1}}>
        {
          Object.entries(characters).map(([index, character]) => {
            return (
              <TouchableHighlight
                style={styles.button}
                onPress={() => {
                      this.boundActionCreators.setCurrentCharacter(index);
                      navigate('CharacterView');
                  }}
                underlayColor='#fff'>
                  <Text style={styles.buttonText}>{character.Name || 'new' + index}</Text>
              </TouchableHighlight>
            );
          })
        }
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
                this.boundActionCreators.setCurrentCharacter('new');
                navigate('CharacterView');
            }}
          underlayColor='#fff'>
            <Text style={styles.buttonText}>New</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {characters: state.app.characters}
};

export default connect(mapStateToProps)(HomeScreen);