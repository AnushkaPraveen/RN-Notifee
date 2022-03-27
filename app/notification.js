
import notifee,{AndroidStyle,AndroidColor,EventType} from '@notifee/react-native';

export const display=()=>{
    console.log('====================================');
    console.log('Notification Functions');
    console.log('====================================');
}
 export default class NotificationHandler{
     handleNotifee=()=>{
         console.log('this is class function');
     }
 }

export const getNotification=async(data)=>{

notifee.onForegroundEvent(({type,detail})=>{
    console.log(type);
    if(type==EventType.ACTION_PRESS && detail.pressAction.id){
        console.log('user pressed aan action with id:',detail.pressAction.id);
    }
})


    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

     await notifee.setNotificationCategories([
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

  
   await notifee.displayNotification({
     
      title: data.title,
      body: data.body,
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        style: {type: AndroidStyle.BIGTEXT, text: 'This is notifciation pass by function bncgt dytyff vdyy dyyydud ddty dydd dyddttfu fytut '  },
        showTimestamp: true,
        color:'#E8210C',
        actions:[
            {
                title:'View',
                pressAction:{
                    id:'open'
                }
            },
            {
                title:'Read',
                pressAction:{
                    id:'read'
                }
            }
        ]
        
      },
      ios:{
       categoryId:'post'
      }
    })}

   
    