import React, { Component } from 'react';
import {
  View
} from 'react-native';

import Initiative from './Initiative';
import Stat from './Stat';
import styles from '../styles';

export default class CharacterStats extends Component<{}> {
  render() {
    const {character, updateCharacterInfo, roller} = this.props;

    return (
      <View style={[styles.subContainer, {flexDirection: 'column'}]} >
        <View style={styles.subContainer}>
          {
            primaryStats.map(stat =>
              <Stat
                text={stat}
                key={stat}
                value={character[stat] || ''}
                onChangeFunction={updateCharacterInfo}
                roller={roller}
              />
            )
          }
        </View>
        <View style={styles.subContainer}>
          {
            combinedStats.map(stat => {
              let total = 0;
              stat.stats.forEach((subStat) => total += parseInt(character[subStat]) || 0)
              return <Stat
                text={stat.name}
                key={stat.name}
                value={total + ''}
                roller={roller}
                readOnly={true}
              />
            }
            )
          }
        </View>
        <View style={styles.subContainer}>
          {
            initiatives.map(init => {
              let total = 0;
              init.stats.forEach((subStat) => total += parseInt(character[subStat]) || 0)
              return <Initiative
                text={init.name}
                key={init.name}
                initiativeDice={character[init.name] == undefined ? init.defaultDice : character[init.name]}
                value={total + ''}
                onChangeFunction={updateCharacterInfo}
                roller={roller}
              />
            }
            )
          }
        </View>
      </View>
    );
  }
}

const emptyFunction = function() {};

const primaryStats = [
  'Body',
  'Agility',
  'Reaction',
  'Strength',
  'Charisma',
  'Intuition',
  'Logic',
  'Willpower',
  'Edge',
  'Essence',
  'Magic',
  'Attack', 
  'Sleaze', 
  'Data P.',
  'Firewall'
];

const combinedStats = [
  {
    name: 'Composure',
    stats: ['Charisma', 'Willpower']
  },
  {
    name: 'Judge Int.',
    stats: ['Charisma', 'Intuition']
  },
  {
    name: 'Lift/Carry',
    stats: ['Body', 'Strength']
  },
  {
    name: 'Memory',
    stats: ['Logic', 'Willpower']
  }
];

const initiatives = [
  {
    name: 'Physical',
    stats: ['Reaction', 'Intuition'],
    defaultDice: 1
  },
  {
    name: 'Astral',
    stats: ['Intuition', 'Intuition'],
    defaultDice: 2
  },
  {
    name: 'AR',
    stats: ['Reaction', 'Intuition'],
    defaultDice: 1
  },
  {
    name: 'Cold-sim',
    stats: ['Data P.', 'Strength'],
    defaultDice: 3
  },
  {
    name: 'Hot-sim',
    stats: ['Data P.', 'Strength'],
    defaultDice: 4
  },
  {
    name: 'Rigging AR',
    stats: ['Reaction', 'Intuition'],
    defaultDice: 1
  }
];