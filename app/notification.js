
import { Platform } from 'react-native';
import notifee, { AndroidStyle, AndroidColor, EventType,AndroidImportance,AndroidVisibility } from '@notifee/react-native';
import {
 Alert
} from 'react-native';


export const display = async() => {
  const access=await notifee.requestPermission();
  console.log(access);
  console.log('====================================');
  console.log('Notification Functions');
  console.log(Platform.OS);
  console.log(Platform.Version);
  console.log('====================================');
}
export default class NotificationHandler {
  
  handleNotifee = () => {
    console.log('this is class function');
  }
 
  getIOSPermission=async()=>{
    await notifee.requestPermission();
  }

  getNotification = async (payload) => {

    notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.ACTION_PRESS && detail.pressAction.id) {
        console.log('User pressed an action with the id: ', detail.pressAction.id);
      }
    });

    notifee.registerForegroundService((notification) => {
      return new Promise(() => {
        // Long running task...
      });
    });
    

   
console.log('pority',AndroidImportance.HIGH);
    const channelId = await notifee.createChannel({
      id: payload.channelId || 'default',
      name: payload.name || 'default channel',
      importance: payload.importance || 3,
      vibration: true,
      lights:true,
      visibility:payload.visibility || 0,
    /*   badge:payload.badge || false */
    });
    
    await notifee.setNotificationCategories([
      {
          id: payload.IosActionId || 'default',
          actions: 
            payload.IosActions || []
          
        },
     ])     
try{
    await notifee.displayNotification({
      id: payload.notificationId || '111',
      title: payload.title || 'default',
      subtitle:payload.subtitle || '',
      body: payload.body,
      android: {
        channelId,
       largeIcon:payload.Icon || 'ic_launcher',
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        style: { type: AndroidStyle.BIGTEXT, text: payload.body },
        style: payload.image || undefined,
        showTimestamp: true,
        importance: payload.importance || 3,
        color: payload.color || '#495371',
        visibility:payload.visibility || 0,
        ongoing:payload.ongoing || false,
        asForegroundService: false,
        colorized: payload.colorized || false,
        pressAction: {
          id: 'default',
        },
        actions:payload.AndroidActions || [],
       
      },
      ios:{
        categoryId: payload.IosActionId || 'default',
        attachments: 
          payload.IosImage || []
        
      }

    })
  }catch(e){
    console.log(e);
  }


  notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.APP_BLOCKED) {
      console.log('User toggled app blocked', detail.blocked);
    }
  
    if (type === EventType.CHANNEL_BLOCKED) {
      console.log('User toggled channel block', detail.channel.id, detail.blocked);
    }
  
    if (type === EventType.CHANNEL_GROUP_BLOCKED) {
      console.log('User toggled channel group block', detail.channelGroup.id, detail.blocked);
    }
  });


  }



  updateNotification=async(payload)=>{
    const channelId = await notifee.createChannel({
      id:payload.channelId || 'default',
      name:payload.name || 'default channel',
    });

    await notifee.displayNotification({
      id: payload.notificationId || '111',
      title: payload.title || 'default',
      body: payload.body,
      android: {
        channelId,
      },
    }); 
  }


  cancelNotification=async(notificationId)=>{
    await notifee.cancelNotification(notificationId)
  }

  deleteChannel=async(channelId)=>{
    await notifee.deleteChannel(channelId)
  }

  progressNotification=async()=>{

    const channelId = await notifee.createChannel({
      id: 'default',
      name:'default channel',
    });

    notifee.displayNotification({
      android: {
        channelId,
        progress: {
          max: 10,
          current: 5,
          indeterminate: false,
        },
      },
    });
    
  }


  batteryOptimizationEnabled =async()=>{
    
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
  };
}



powerMangement=async()=>{
  console.log("working");
const powerManagerInfo = await notifee.getPowerManagerInfo();
console.log(powerManagerInfo);
if (powerManagerInfo.activity) {
  
  // 2. ask your users to adjust their settings
  Alert.alert(
      'Restrictions Detected',
      'To ensure notifications are delivered, please adjust your settings to prevent the app from being killed',
      [
        // 3. launch intent to navigate the user to the appropriate screen
        {
          text: 'OK, open settings',
          onPress: async () => await notifee.openPowerManagerSettings(),
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




}








/* await notifee.setNotificationCategories([
 {
     id: 'post',
     actions: [
       {
         id: 'like',
         title: 'Reply',
       },
       {
         id: 'dislike',
         title: 'Close',
       },
     ],
   },
])

notifee.onForegroundEvent(({type,detail})=>{
 console.log(type);
 if(type==EventType.ACTION_PRESS && detail.pressAction.id){
     console.log('user pressed aan action with id:',detail.pressAction.id);
 }
}) */