import React, { Component } from 'react';
import {
  ScrollView
} from 'react-native';

import CustomSkill from './CustomSkill';
import Skill from './Skill';
import Skills from '../data/skills.json';

export default class CharacterSkills extends Component<{}> {
  render() {
    const {character, customSkills={}, updateCustomSkill, deleteCustomSkill, updateCharacterInfo, roller} = this.props;
    const children = [];
    const skillArray = [];

    // children.push(Object.entries(character.customSkills || {}).map(([index, skill]) => 
    //   <CustomSkill
    //     key={`cs_${skill.name}_${index}`}
    //     skill={skill}
    //     index={index}
    //     onChangeFunction={updateCustomSkill}
    //     onCustomSkillSwipe={deleteCustomSkill}
    //     statValue={Number(character[skill.stat]) || 0}
    //     roller={roller}
    //   />
    // ));

    Skills.map(skill => skillArray.push({
      ...skill,
      skillValue: (Number(character[skill.name]) || 0),
      statValue: (Number(character[skill.stat]) || 0)}
    ));

    skillArray.sort(function(a, b){
      if(a.skillValue != b.skillValue) {
        return b.skillValue - a.skillValue;
      } else {
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
      }
    });

    children.push(skillArray.map(skill =>
      <Skill
        key={skill.name}
        skillInfo={skill}
        onChangeFunction={updateCharacterInfo}
        specialization={character[`${skill.name}Specialization`] ||''}
        roller={roller}
      />
    ));

    // children.push(<CustomSkill key={character.customSkillLength} index={'new'} onChangeFunction={updateCustomSkill} value={''} lengthCheck={character.customSkillLength} />);

    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {children}
      </ScrollView>
    );
  }
}
