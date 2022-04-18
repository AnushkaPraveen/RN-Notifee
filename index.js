/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

notifee.onBackgroundEvent(({ type, detail }) => {
    if (type === EventType.ACTION_PRESS && detail.pressAction.id) {
      console.log('User pressed an action with the id: ', detail.pressAction.id);
    }
  });

AppRegistry.registerComponent(appName, () => App);
