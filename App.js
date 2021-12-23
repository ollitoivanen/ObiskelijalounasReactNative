import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import HomeScreen from 'HomeScreen/HomeScreen';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <SafeAreaView style={styles.view_container}>
      <StatusBar barStyle={'dark-content'} />
      <HomeScreen />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  view_container: {
    backgroundColor: '#d6ffc7',
    flex: 1,
  },
});
export default App;
