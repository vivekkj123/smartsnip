import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import React, {useEffect} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';

GoogleSignin.configure({
  webClientId:
    '321026905024-dn235j4b89v0un84mj4m1iliqdc138bl.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}
const SignInScreen = ({navigation}) => {
  useEffect(() => {
    if (auth().currentUser) {
      navigation.navigate('HomeScreen');
    }
  }, [navigation]);
  return (
    <View style={styles.SignInScreen}>
      <ImageBackground
        style={styles.ImageBackground}
        source={require('../assets/blobs.png')}
        resizeMode="cover">
        <View style={styles.container}>
          <View style={styles.container}>
            <Image
              source={require('../assets/logo.png')}
              height={100}
              width={100}
            />
            <Text style={styles.appTitle}>SmartSnip</Text>
          </View>

          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={() =>
              onGoogleButtonPress().then(() =>
                navigation.navigate('HomeScreen'),
              )
            }
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  SignInScreen: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FAD110',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginVertical: 20,
  },
  ImageBackground: {
    flex: 1,
  },
});
