import auth from '@react-native-firebase/auth';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const HomeScreen = () => {
  return (
    <View>
      <View style={styles.topBar}>
        <Text style={styles.greetingText}>
          Good Morning, {'\n'}
          {auth().currentUser.displayName}
        </Text>
        <Image
          source={{uri: auth().currentUser.photoURL}}
          style={styles.avatar}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  topBar: {
    height: 150,
    width: '100%',
    backgroundColor: '#FAD110',
    flexDirection: 'row',
    borderBottomEndRadius: 60,
    borderBottomStartRadius: 60,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greetingText: {
    color: '#000',
    fontWeight: '800',
    fontSize: 22,
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 100,
  },
});
