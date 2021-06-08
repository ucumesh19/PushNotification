import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const App = () => {

  useEffect(() => {
    requestUserPermission();

    //Foreground Handler,when the app is open or in view
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, [])

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken()
      console.log('Authorization status:', authStatus);
    }
  }

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      console.log("Your Firebase Token is:", fcmToken);
    } else {
      console.log("Failed", "No token received");
    }
  }

  return (
    <View style={styles.mainView}>
      <Text style={styles.txt}>Push Notification</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    justifyContent: "center",
    alignItems: "center"
  },
  txt: {
    fontSize: 40
  }
})

export default App;