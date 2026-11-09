import React from 'react';
import {View,Text,Pressable} from 'react-native';
import Svg,{Path} from 'react-native-svg';
import {Page,Title,Copy,Card,Button,Row,Metric,Grid,Trend,colors,money} from '../ui';

function AskVenueButton({onPress}) {
  return <Pressable accessibilityRole="button" accessibilityLabel="Ask a question about your venue" onPress={onPress} style={({pressed})=>({backgroundColor:'#edf4e8',borderWidth:1,borderColor:'#dbe8d4',borderRadius:13,padding:16,flexDirection:'row',alignItems:'center',gap:12,opacity:pressed ? 0.75 : 1})}>
    <View style={{width:38,height:38,borderRadius:10,backgroundColor:'#dcebd4',alignItems:'center',justifyContent:'center'}}>
      <Svg width={20} height={20} viewBox="0 0 24 24" accessible={false}><Path d="M12 2.5 L14.2 9.8 L21.5 12 L14.2 14.2 L12 21.5 L9.8 14.2 L2.5 12 L9.8 9.8 Z" stroke={colors.green} strokeWidth="1.5" strokeLinejoin="round" fill="none"/></Svg>
    </View>
    <View style={{flex:1,gap:3}}><Text style={{color:colors.ink,fontSize:13,fontWeight:'600'}}>A question about your venue?</Text><Text style={{color:colors.muted,fontSize:11}}>Ask Incaptiv. Get straight to the insight.</Text></View>
    <Text style={{color:colors.green,fontSize:20,fontWeight:'300'}}>→</Text>
  </Pressable>;
}

export default function HomeScreen({data,navigate,detail}) {
  return <Page>
    <Copy>YOUR VENUE, AT A GLANCE · OCTOBER 2026</Copy>
    <Title>Good decisions start{'\n'}with a clear picture.</Title>
    <Card style={{backgroundColor:colors.green}}><Copy style={{color:'#d2e0d0'}}>Linked sales revenue</Copy><Text style={{fontSize:38,color:'white'}}>{money(data.zones.reduce((n,z)=>n+z.revenue,0))}</Text><Copy style={{color:'#d2e0d0'}}>October demonstration records</Copy></Card>
    <Grid><Metric label="Estimated footfall" value="14,680"/><Metric label="Operating profit" value={money(data.zones.reduce((n,z)=>n+z.profit,0))}/></Grid>
    <Trend/>
    <AskVenueButton onPress={()=>navigate('Chat')}/>
    <Title>Spaces that stand out</Title>
    {[data.zones[0],data.zones[3]].map(zone=><Button key={zone.id} title={`${zone.name} · ${money(zone.revenue)} →`} onPress={()=>detail(zone,'Zone')}/>)}
    <Card><Row label="Peak estimated occupancy" value="76%"/><Copy>380 / 500 people · calibrated demo estimate</Copy></Card>
  </Page>;
}
