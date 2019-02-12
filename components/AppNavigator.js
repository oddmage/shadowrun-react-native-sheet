import React, {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import styles from '../styles';
import CharacterView from './CharacterView';
import HomeScreen from './HomeScreen';

const AppNavigator = StackNavigator({
	Home: {screen: HomeScreen},
	CharacterView: {screen: CharacterView}
}, {
  initialRouteName: 'Home'
});

export default AppNavigator;