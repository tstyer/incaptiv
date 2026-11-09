import React from 'react';
import {View,Text} from 'react-native';
import {colors} from './ui';

export default function BrandLogo() {
  return <View accessible accessibilityLabel="incaptiv" style={{flexDirection:'row',alignItems:'center',gap:8}}>
    <View importantForAccessibility="no-hide-descendants" style={{height:24,flexDirection:'row',alignItems:'center',gap:2}}>
      {[14,22,14].map((height,index)=><View key={index} style={{width:4,height,borderRadius:2,backgroundColor:colors.green}}/>)}
    </View>
    <Text style={{fontSize:23,fontWeight:'700',letterSpacing:-.7,color:colors.ink}}>incaptiv</Text>
  </View>;
}
