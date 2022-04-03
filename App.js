

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
 display()
 notificiationHandler.handleNotifee()
 
},[])

const testNotification=()=>{
  
  const payload={
    channelId:'test41',
    name:'default1f',
    notificationId:'1234',
    importance:4,
    title:'Test fff',
    body:'This is notifciation pass by function hshdus suhdsihd sygdsud ugsdsdg sgdusgd gyudgs',
    color:'#523b82',
    /* Icon:require('./app/wta.png'),  */
    /* Icon:'https://drive.google.com/file/d/1cwoCxrH7bC-v6hlddClZEPh3MPymvIrn/view?usp=sharing', */
    image:{type:0,picture:'https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688'},
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
          id:'test1'
        }
      },
      {
        title:'test 3',
        pressAction:{
          id:'test1'
        }
      }
    ],
    IosActionId:'post',
    IosActions:[
      {
        title:'test',
        id:'test'
    }
  ],
  IosImage:[{
    
    url: 'https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688',
    thumbnailHidden:false,
  }],
  }
  notificiationHandler.getNotification(payload);
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


  const onCreateTriggerNotification=async()=> {
    const date = new Date(Date.now());
    console.log(date);
    date.setHours(13);
    date.setMinutes(54);

    // Create a time-based trigger
    const trigger= {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
    };

  /*   const trigger=IntervalTrigger = {
      type: TriggerType.INTERVAL,
      interval: 15,
      timeUnit: TimeUnit.MINUTES
    }; */




    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: 'Meeting with Jane',
        body: 'Today at 11:20am',
        showTimestamp: true,
        android: {
          channelId
        },
      },
      trigger,
    );
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
    <Button title="Notification Function" onPress={testNotification}/>
    </View>
    <View style={{marginTop:10}}>
    <Button title="Set Notification" onPress={notificiationHandler.updateNotification}/>
    </View>
    <View style={{marginTop:10}}>
    <Button title="Cancel Notification" onPress={cancelNotification}/>
    </View>
    <View style={{marginTop:10}}>
    <Button title="Schedule Notification" onPress={onCreateTriggerNotification}/>
    </View>
    <View style={{marginTop:10}}>
    <Button title="Progress Notification" onPress={notificiationHandler.progressNotification}/>
    </View>
    <View style={{marginTop:10}}>
    <Button title="Optimization" onPress={notificiationHandler.powerMangement}/>
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
