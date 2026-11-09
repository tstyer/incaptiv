import React,{useState,useEffect} from 'react';
import {View,Text,Pressable,Modal,ScrollView,BackHandler,KeyboardAvoidingView,Platform,Alert} from 'react-native';
import {SafeAreaProvider,SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from '@expo/vector-icons';
import {Card,Copy,Title,Button,Row,colors,money,TextScale} from './src/ui';
import demo from './src/demo.json';
import BrandLogo from './src/BrandLogo';
import HomeScreen from './src/screens/HomeScreen';
import ZonesScreen from './src/screens/ZonesScreen';
import EventsScreen from './src/screens/EventsScreen';
import RevenueScreen from './src/screens/RevenueScreen';
import VisitorsScreen from './src/screens/VisitorsScreen';
import InsightsScreen from './src/screens/InsightsScreen';
import MoreScreen from './src/screens/MoreScreen';
import ManagementScreen from './src/screens/ManagementScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import HelpScreen from './src/screens/HelpScreen';
import ChatScreen from './src/screens/ChatScreen';
const screens={Home:HomeScreen,Zones:ZonesScreen,Events:EventsScreen,Revenue:RevenueScreen,Visitors:VisitorsScreen,Insights:InsightsScreen,More:MoreScreen,Management:ManagementScreen,Settings:SettingsScreen,Help:HelpScreen};
const tabs=[['Home','home-outline'],['Chat','chatbubble-outline'],['Zones','grid-outline'],['Events','calendar-outline'],['More','ellipsis-horizontal']];
export default function App(){
 const [screen,setScreen]=useState('Home'),[menu,setMenu]=useState(false),[record,setRecord]=useState(null),[data,setData]=useState(demo),[prompt,setPrompt]=useState(''),[messages,setMessages]=useState([]),[reviews,setReviews]=useState([]),[venueName,setVenueName]=useState(demo.venue),[prefs,setPrefs]=useState({}),[loaded,setLoaded]=useState(false);
 useEffect(()=>{AsyncStorage.getItem('incaptiv-settings').then(raw=>{if(raw){const saved=JSON.parse(raw);setPrefs(saved.prefs||{});setReviews(saved.reviews||[]);setVenueName(saved.venueName||demo.venue);}}).catch(()=>Alert.alert('Could not load saved preferences')).finally(()=>setLoaded(true));},[]);
 useEffect(()=>{if(loaded)AsyncStorage.setItem('incaptiv-settings',JSON.stringify({prefs,reviews,venueName})).catch(()=>Alert.alert('Could not save preferences'));},[prefs,reviews,venueName,loaded]);
 useEffect(()=>{const sub=BackHandler.addEventListener('hardwareBackPress',()=>{if(menu){setMenu(false);return true;}if(record){setRecord(null);return true;}if(screen!=='Home'){setScreen('Home');return true;}return false;});return()=>sub.remove();},[screen,menu,record]);
 const navigate=s=>{setScreen(s);setMenu(false);};const detail=(item,type)=>setRecord({item,type});const ask=q=>{setPrompt(q);navigate('Chat');setRecord(null);};const Screen=screens[screen];
 return <SafeAreaProvider><SafeAreaView style={{flex:1,backgroundColor:colors.bg}}><KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS==='ios'?'padding':undefined}><View style={{paddingHorizontal:21,paddingVertical:12,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}><View><BrandLogo/><Copy>{venueName}</Copy></View><Pressable accessibilityRole="button" accessibilityLabel="Open menu" hitSlop={12} onPress={()=>setMenu(true)}><Ionicons name="menu-outline" size={27} color={colors.ink}/></Pressable></View><View style={{flex:1}}>{screen==='Chat'?<ChatScreen data={data} prompt={prompt} clearPrompt={()=>setPrompt('')} messages={messages} setMessages={setMessages}/>:<TextScale.Provider value={prefs.largerText?1.2:1}><Screen data={data} navigate={navigate} detail={detail} ask={ask} reviews={reviews} setReviews={setReviews} prefs={prefs} setPrefs={setPrefs} venueName={venueName} setVenueName={setVenueName}/></TextScale.Provider>}</View><View style={{flexDirection:'row',backgroundColor:'white',borderTopWidth:1,borderColor:colors.line,paddingVertical:12}}>{tabs.map(([name,icon])=><Pressable key={name} accessibilityRole="tab" accessibilityState={{selected:screen===name}} onPress={()=>navigate(name)} style={{flex:1,alignItems:'center',gap:4}}><Ionicons name={icon} size={22} color={screen===name&&name!=='Chat'?colors.green:colors.muted}/><Text style={{fontSize:10,color:colors.muted}}>{name==='Chat'?'Ask':name}</Text></Pressable>)}</View></KeyboardAvoidingView><Modal visible={menu||!!record} transparent animationType="none" onRequestClose={()=>{setMenu(false);setRecord(null);}}><View style={{flex:1,backgroundColor:'#20332955',justifyContent:'flex-end',paddingTop:65}}><Pressable style={{position:'absolute',inset:0}} onPress={()=>{setMenu(false);setRecord(null);}}/><SafeAreaView edges={['bottom']} style={{maxHeight:'96%',backgroundColor:colors.bg,borderTopLeftRadius:26,borderTopRightRadius:26,overflow:'hidden'}}><ScrollView contentContainerStyle={{padding:24,gap:12}}><Button title="Close ×" onPress={()=>{setMenu(false);setRecord(null);}}/>{menu?<><Title>Your workspace</Title><Copy>Travis Styer · Demo administrator</Copy>{Object.keys(screens).map(name=><Button key={name} title={name==='Management'?'Venue management':name} onPress={()=>navigate(name)}/>)}<Button title="Ask Incaptiv" onPress={()=>navigate('Chat')}/></>:record&&<><Title>{record.item.name}</Title><Copy>{record.type} · October demo record</Copy><Row label="Estimated visits" value={record.item.visits.toLocaleString()}/><Row label="Linked revenue" value={money(record.item.revenue)}/><Row label="Allocated costs" value={money(record.item.cost)}/><Row label="Operating profit" value={money(record.item.revenue-record.item.cost)}/><Button title="Ask about this record →" onPress={()=>ask('How is '+record.item.name+' doing?')}/></>}</ScrollView></SafeAreaView></View></Modal></SafeAreaView></SafeAreaProvider>;
}
