import React,{useContext,createContext} from 'react';
export const TextScale=createContext(1);
import {View,Text,Pressable,ScrollView,StyleSheet} from 'react-native';
import TrendChart from './TrendChart';
export const colors={bg:'#f7f9f6',ink:'#202e29',muted:'#7b857f',green:'#24634b',mint:'#eaf2ec',line:'#e7ebe7'};
export const money=n=>'£'+Math.round(n).toLocaleString('en-GB');
export function Copy({children,style}){const scale=useContext(TextScale);return <Text style={[styles.copy,{fontSize:12*scale,lineHeight:20*scale},style]}>{children}</Text>}
export function Title({children}){return <Text style={styles.title}>{children}</Text>}
export function Page({children}){return <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">{children}<Copy style={{fontSize:10,marginTop:22}}>INCAPTIV BY VENUELOGIC · Demo data</Copy></ScrollView>}
export function Card({children,style}){return <View style={[styles.card,style]}>{children}</View>}
export function Button({title,onPress,primary=false,disabled=false}){return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={[styles.button,primary&&{backgroundColor:colors.green},disabled&&{opacity:.5}]}><Text style={{color:primary?'white':colors.green,fontWeight:'600'}}>{title}</Text></Pressable>}
export function Row({label,value}){return <View style={styles.row}><Copy style={{flex:1}}>{label}</Copy><Text style={{color:colors.ink,fontWeight:'600',flexShrink:1}}>{value}</Text></View>}
export function Metric({label,value}){return <Card style={{flexGrow:1,flexBasis:'44%'}}><Copy>{label}</Copy><Text style={styles.number}>{value}</Text></Card>}
export function Grid({children}){return <View style={{flexDirection:'row',flexWrap:'wrap',gap:10}}>{children}</View>}
export function Trend(){return <TrendChart colors={colors}/>}
export const styles=StyleSheet.create({page:{padding:20,gap:14,paddingBottom:35},copy:{fontSize:12,lineHeight:20,color:colors.muted},title:{fontSize:27,lineHeight:34,fontWeight:'600',letterSpacing:-.7,color:colors.ink,marginBottom:3},heading:{fontSize:16,fontWeight:'600',color:colors.ink},card:{backgroundColor:'white',borderWidth:1,borderColor:colors.line,borderRadius:14,padding:18,gap:10},button:{padding:14,borderWidth:1,borderColor:colors.line,borderRadius:10,backgroundColor:'white'},number:{fontSize:27,color:colors.ink,letterSpacing:-.6},row:{flexDirection:'row',justifyContent:'space-between',gap:12,paddingVertical:10,borderBottomWidth:1,borderBottomColor:colors.line},input:{backgroundColor:'white',borderWidth:1,borderColor:colors.line,borderRadius:12,padding:14,color:colors.ink}});
