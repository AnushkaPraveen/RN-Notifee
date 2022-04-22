

import React,{useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,Alert
} from 'react-native';
import notifee, { TimestampTrigger, TriggerType, TimeUnit ,AndroidVisibility,AndroidCategory,AndroidImportance } from '@notifee/react-native';
import {display,getNotification,setNotification} from './app/notification';
import NotificationHandler from './app/notification';


let notificiationHandler=new NotificationHandler();

const App = () => {
  
useEffect(()=>{
 
 notificiationHandler.handleNotifee()
 
},[])

const setNotification=()=>{
  
  const payload={
    channelId:'test41',
    name:'default1f',
    notificationId:'1243',
    importance:4,
    title:'Test upted check 1',
    body:'This is notifciation pass by function hshdus suhdsihd sygdsud ugsdsdg sgdusgd gyudgs',
    color:'#523b82',
    foregroundService:false,
    /* Icon:require('./app/wta.png'),  */
    /* Icon:'https://drive.google.com/file/d/1cwoCxrH7bC-v6hlddClZEPh3MPymvIrn/view?usp=sharing', */
    /* image:{type:0,picture:'https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688'}, */
    AndroidActions:[
      {
        title:'test',
        pressAction:{
          id:'test1'
        }
      },
      {
        title:'test 2',
        pressAction:{
          id:'test2'
        }
      },
      {
        title:'test 3',
        pressAction:{
          id:'test3'
        }
      }
    ],
    IosActionId:'post',
    IosActions:[
      {
        title:'test',
        id:'test',
        destructive: true,
          // Only show if device is unlocked
          authenticationRequired: true,
    }
  ],
  IosImage:[{
    
    url: 'https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688',
    thumbnailHidden:false,
  }],
  }
  notificiationHandler.getNotification(payload);
}
const schedule=()=>{
  const payload={
    dateTime:'04/21/2022 00:50:00'
  }
  notificiationHandler.scheduleNotification(payload)
}
const Timeschedule=()=>{
  const payload={
    hour:0,
    minute:55
  }
  notificiationHandler.TimeScheduleNotification(payload)
}



const cancelNotification=()=>{
  notificiationHandler.cancelNotification('123')
}

  const onDisplayNotification=async()=>{
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.requestPermission();
   await notifee.displayNotification({
     
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'ic_launcher',  // optional, defaults to 'ic_launcher'.
         // Recommended to set a category
    category: AndroidCategory.CALL,
    // Recommended to set importance to high
    importance: AndroidImportance.HIGH,
    fullScreenAction: {
      id: 'default',
    },
      },
    });
  }


  const interval=()=>{
    const payload={
      channelId:'test41',
      name:'default1f',
      notificationId:'1243',
      importance:4,
      title:'Interval Trigger',
      body:'This is interval trigger notifciation',
      color:'#523b82',
      foregroundService:false,}
      notificiationHandler.IntervalScheduleNotification(payload)
  }

  const progressIndicator=()=>{
    const payload={
      channelId:'asd',
      name:'default1f',
      notificationId:'1243',
      importance:4,
      visibility:0,
      title:'Progress Indicator',
      body:'This is progress indicator notifciation',
      time:false,
      ongoing:false,
      progressSize:10,
      currentSize:8,
      indeterminate:false

    }

    notificiationHandler.progressNotification(payload)
  }


  const batteryOptimizationEnabled =async()=>{
    const batteryOptimizationEnabled =await notifee.isBatteryOptimizationEnabled();
    if (batteryOptimizationEnabled) {
      // 2. ask your users to disable the feature
      Alert.alert(
          'Restrictions Detected',
          'To ensure notifications are delivered, please disable battery optimization for the app.',
          [
            // 3. launch intent to navigate the user to the appropriate screen
            {
              text: 'OK, open settings',
              onPress: async () => await notifee.openBatteryOptimizationSettings(),
            },
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
          ],
          { cancelable: false }
        );
    };}






  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
    
    <Text>Hello</Text>
    <Button title="get notification" onPress={onDisplayNotification}/>
    <View style={{marginTop:10}}>
    <Button title="Notification Function" onPress={setNotification}/>
    </View>
    <View style={{marginTop:10}}>
    <Button title="Set Notification" onPress={notificiationHandler.updateNotification}/>
    </View>
    <View style={{marginTop:10}}>
    <Button title="Cancel Notification" onPress={cancelNotification}/>
    </View>
    <View style={{marginTop:10}}>
    <Button title="Schedule Notification" onPress={schedule}/>
    </View>
    <View style={{marginTop:10}}>
    <Button title="Time Schedule Notification" onPress={Timeschedule}/>
    </View>
    
    <View style={{marginTop:10}}>
    <Button title="Progress Notification" onPress={progressIndicator}/>
    </View>
    <View style={{marginTop:10}}>
    <Button title="Optimization" onPress={notificiationHandler.setBadgeCount}/>
    </View>
    <View style={{marginTop:10}}>
    <Button title="Interval Trigger" onPress={interval}/>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
