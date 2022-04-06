
import { Platform } from 'react-native';
import notifee, { AndroidStyle,AndroidCategory, AndroidColor, EventType,AndroidImportance,AndroidVisibility,AuthorizationStatus,TimestampTrigger, TriggerType,TimeUnit, RepeatFrequency  } from '@notifee/react-native';
import {
 Alert
} from 'react-native';

export default class NotificationHandler {
  
  handleNotifee = () => {
    console.log('====================================');
    console.log('Notifee Library functions');
    console.log('====================================');
  }
 
  getIOSPermission=async()=>{
    await notifee.requestPermission();
   
      const settings = await notifee.requestPermission();
    
      if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
        console.log('Permission settings:', settings);
      } else {
        console.log('User declined permissions');
      }
    
    
  }

  getNotification = async (payload) => {

    notifee.onForegroundEvent(async({ type, detail }) => {
      if (type === EventType.ACTION_PRESS && detail.pressAction.id) {
        console.log('User pressed an action with the id: ', detail.pressAction.id);
      }

      if (type === EventType.DISMISSED) {
        console.log('User toggled app blocked');
      }
    });

    notifee.onBackgroundEvent(({ type, detail }) => {
      if (type === EventType.ACTION_PRESS && detail.pressAction.id) {
        console.log('User pressed an action with the id: ', detail.pressAction.id);
      }
    });

    notifee.registerForegroundService(() => {
      return new Promise(() => {
        // Long running task...
      });
    });
    

   

    const channelId = await notifee.createChannel({
      id: payload.channelId || 'default',
      name: payload.name || 'default channel',
      importance: payload.importance || 3,
      vibration: payload.vibration || true,
      lights:payload.light || true,
      visibility:payload.visibility || 0,
    
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
        showTimestamp: payload.time || true,
        importance: payload.importance || 3,
        color: payload.color || '#495371',
        visibility:payload.visibility || 0,
        ongoing:payload.ongoing || false,
        asForegroundService: payload.foregroundService || false,
        colorized: payload.colorized || false,
        pressAction: {
          id: 'default',
        },
        actions:payload.AndroidActions || [],
       
      },
      ios:{
        categoryId: payload.IosActionId || 'default',
        sound: 'default',
        attachments: 
          payload.IosImage || []
        
      },
      foregroundPresentationOptions: {
        alert: true,
        badge: true,
        sound: true,
      },

    })
  }catch(e){
    console.log(e);
  }


  /* notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.DISMISSED) {
      console.log('User toggled app blocked', detail.blocked);
    }
  
    if (type === EventType.CHANNEL_BLOCKED) {
      console.log('User toggled channel block', detail.channel.id, detail.blocked);
    }
  
    if (type === EventType.CHANNEL_GROUP_BLOCKED) {
      console.log('User toggled channel group block', detail.channelGroup.id, detail.blocked);
    }
  }); */


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


   scheduleNotification=async(payload)=> {
    const date = new Date(Date.now());
    console.log(date);
    date.setHours(15);
    date.setMinutes(30);
    console.log(date.getTime());

    // Create a time-based trigger
    const trigger= {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
      repeatFrequency: payload.repeatType || undefined
      
    }; 

  /*  const triggerrepeat = {
      type: TriggerType.INTERVAL,
      interval: 30,
      timeUnit: TimeUnit.DAYS,
      
    };  */




    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        id:payload.notificationId || '1111',
        title:payload.title || 'Meeting with Jane',
        body: 'Today at 11:20am',
        showTimestamp: true,
        android: {
          channelId,
        },
      },
      trigger,
    );
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
      title: 'Meeting with Jane',
        body: 'Today at 11:20am',
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
 
const powerManagerInfo = await notifee.getPowerManagerInfo();

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

getBadgeCount=()=>{
  notifee.getBadgeCount().then(count => console.log('Current badge count: ', count));
}
setBadgeCount=(count)=>{
  notifee.setBadgeCount(count).then(() => console.log('Badge count set!'));
}

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