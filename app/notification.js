
import {Platform} from 'react-native';
import notifee,{AndroidStyle,AndroidColor,EventType} from '@notifee/react-native';

export const display=()=>{
    console.log('====================================');
    console.log('Notification Functions');
    console.log(Platform.OS);
    console.log(Platform.Version);
    console.log('====================================');
}
 export default class NotificationHandler{
     handleNotifee=()=>{
         console.log('this is class function');
     }


     getNotification=async(payload)=>{

      
      
      
          const channelId = await notifee.createChannel({
            id:payload.channelId || 'default',
            name:payload.name || 'default channel',
          }); 
      
           
      
        await notifee.requestPermission();
         await notifee.displayNotification({
            id:payload.notificationId || '111',
            title: payload.title|| 'default',
            body: payload.body,
            android: {
              channelId,
              smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
              style: {type: AndroidStyle.BIGTEXT, text: payload.body },
              showTimestamp: true,
              color:payload.color || '#495371', 
            }, 
            
          })}


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