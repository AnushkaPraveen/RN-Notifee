

import React,{useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';
import notifee, { TimestampTrigger, TriggerType, TimeUnit  } from '@notifee/react-native';
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
    channelId:'test',
    name:'default',
    notificationId:'123',
    title:'Test',
    body:'This is notifciation pass by function hshdus suhdsihd sygdsud ugsdsdg sgdusgd gyudgs',
    color:'#139487'
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
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      },
    });
  }


  const onCreateTriggerNotification=async()=> {
    const date = new Date(Date.now());
    console.log(date);
    date.setHours(1);
    date.setMinutes(26);

    // Create a time-based trigger
    /* const trigger= {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
    }; */

    const trigger=IntervalTrigger = {
      type: TriggerType.INTERVAL,
      interval: 15,
      timeUnit: TimeUnit.MINUTES
    };




    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: 'Meeting with Jane',
        body: 'Today at 11:20am',
        android: {
          channelId
        },
      },
      trigger,
    );
  }

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
