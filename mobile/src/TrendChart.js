import React from 'react';
import {View,Text} from 'react-native';
import Svg,{Defs,LinearGradient,Stop,Path,Line,Text as SvgText} from 'react-native-svg';

const salesLine = 'M24 111 C35 103 42 113 53 108 S70 96 82 101 S98 112 110 101 S129 66 143 74 S156 103 169 100 S190 63 202 68 S221 91 234 79 S249 58 262 68 S282 95 294 76 S310 35 323 47 S340 70 351 43';
const visitsLine = 'M24 119 C36 112 43 117 54 114 S71 109 82 111 S99 117 111 110 S130 98 143 105 S158 116 170 111 S190 95 202 100 S220 111 233 103 S251 92 263 96 S281 111 294 100 S311 91 323 96 S340 102 351 91';

export default function TrendChart({colors}) {
  const grid = [17,44,71,98,125];
  const labels = ['£8k','£6k','£4k','£2k','£0'];
  const dates = [['01 Oct',24],['05 Oct',78],['10 Oct',132],['15 Oct',187],['20 Oct',242],['25 Oct',297],['31 Oct',351]];

  return <View style={{backgroundColor:'white',borderWidth:1,borderColor:colors.line,borderRadius:14,padding:16,gap:6}}>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:10}}>
      <Text style={{color:colors.ink,fontSize:15,fontWeight:'600'}}>Revenue & activity</Text>
      <View style={{flexDirection:'row',alignItems:'center',gap:11}}>
        <View style={{flexDirection:'row',alignItems:'center',gap:4}}><View style={{width:7,height:7,borderRadius:4,backgroundColor:colors.green}}/><Text style={{color:colors.muted,fontSize:10}}>Sales</Text></View>
        <View style={{flexDirection:'row',alignItems:'center',gap:4}}><View style={{width:7,height:7,borderRadius:4,backgroundColor:'#b8cbb1'}}/><Text style={{color:colors.muted,fontSize:10}}>Visits*</Text></View>
      </View>
    </View>
    <Text style={{color:colors.muted,fontSize:11}}>October 2026 · demo period</Text>
    <Svg width="100%" height={185} viewBox="0 0 360 170" style={{marginTop:13}} accessible accessibilityLabel="Illustrative October sales and indexed Wi-Fi visit trends">
      <Defs><LinearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor="#dcebdd" stopOpacity="0.8"/><Stop offset="1" stopColor="#ffffff" stopOpacity="0"/></LinearGradient></Defs>
      {grid.map((y,index)=><React.Fragment key={y}><Line x1="24" x2="352" y1={y} y2={y} stroke="#e8ede8" strokeWidth="1" strokeDasharray="2 3"/><SvgText x="1" y={y+3} fill="#9aa69d" fontSize="7">{labels[index]}</SvgText></React.Fragment>)}
      <Path d={`${salesLine} L351 125 L24 125 Z`} fill="url(#salesFill)"/>
      <Path d={visitsLine} stroke="#adc4a7" strokeWidth="1.2" strokeDasharray="3 3" fill="none"/>
      <Path d={salesLine} stroke={colors.green} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {dates.map(([label,x])=><SvgText key={label} x={x} y="148" textAnchor={x===24?'start':x===351?'end':'middle'} fill="#a2ada5" fontSize="7">{label}</SvgText>)}
    </Svg>
    <Text style={{color:colors.muted,fontSize:10}}>*Wi-Fi visit trend indexed for comparison.</Text>
  </View>;
}
