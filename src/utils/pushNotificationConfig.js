import PushNotification from 'react-native-push-notification'
import { PushNotificationIOS, DeviceEventEmitter } from 'react-native'
import RNExitApp from 'react-native-exit-app'

(function() {
  // Register all the valid actions for notifications here and add the action handler for each action
  PushNotification.registerNotificationActions([' Ok','Close' ]);
  DeviceEventEmitter.addListener('notificationActionReceived', (action) => {
    console.log ('Notification action received: ' + action);
    const info = JSON.parse(action.dataJSON);
    if (info.action == 'Ok') {
      // Do work pertaining to Accept action here
    } else if (info.action == 'Close') {
      // Do work pertaining to Reject action here
      RNExitApp.exitApp()
    }
    // Add all the required actions handlers
  });
})()

const configure = PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: (token) => {
    console.log( 'TOKEN:', token )
  },
  // (required) Called when a remote or local notification is opened or received
  onNotification: (notification) => {
    console.log( 'NOTIFICATION:', notification )
    // process the notification
    // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
    notification.finish(PushNotificationIOS.FetchResult.NoData)
  },
  // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: "YOUR GCM SENDER ID",
  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },
  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,
  /**
    * (optional) default: true
    * - Specified if permissions (ios) and token (android and ios) will requested or not,
    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    */
  requestPermissions: true,
})

const localNotification = () => {
  PushNotification.localNotification({
    id: 64,
    ticker: "Application Hub is running on the background",
    autoCancel: true,
    ongoing: true,
    largeIcon: "ic_launcher",
    smallIcon: "ic_notification",
    bigText: "My big text that will be shown when notification is expanded",
    // subText: "This is a subText",
    color: "green",
    vibrate: false,
    // vibration: 300,
    title: "Application Hub",
    message: "Server running on the background.",
    playSound: false,
    // soundName: 'default',
    actions: '["Ok", "Close"]',
  })
 }

const cancelNotification = id => PushNotification.cancelLocalNotifications({id });

const cancelAllNotifications = () => PushNotification.cancelAllLocalNotifications()
 
export {
  configure,
  localNotification,
  cancelNotification,
  cancelAllNotifications
 }
 