import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import styles from '../styles';

export default class CharacterButtons extends Component<{}> {
  render() {
    const {changeTab, currentTab, sortTabs, tabs} = this.props;

    // const visibleTabs = tabs.filter((tab, index) => tab !== currentTab && index < 6);

    return (
      <View style={[styles.subContainer, {minHeight: 30, minWidth: '100%', alignSelf: 'flex-end'}]}>
        {
          tabs.map(tab =>
            <View style={{flex:1, padding: 1}} key={tab}>
              <TouchableHighlight
                style={styles.smallButton}
                onPress={() => {changeTab(tab)}}>
                  <Text style={styles.smallButtonText}>{tab}</Text>
              </TouchableHighlight>
            </View>
          )
        }
        {/* <View style={{flex:1, padding: 1}} key={'dots'}>
          <TouchableHighlight
            style={styles.smallButton}
            onPress={() => {sortTabs()}}
            underlayColor='#fff'>
              <Text style={styles.smallButtonText}>...</Text>
          </TouchableHighlight>
        </View> */}
      </View>
    );
  }
}