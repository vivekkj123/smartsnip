import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import Text from '../components/CustomText';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import SubjectCard from '../components/SubjectCard';
import {ScrollView} from 'react-native-gesture-handler';
import {Dialog, Input} from '@rneui/themed';
// display greeting according to time
var date = new Date();
var hours = date.getHours();
let message;
if (hours < 12) {
  message = 'Good Morning';
} else if (hours < 18) {
  message = 'Good Afternoon';
} else {
  message = 'Good Evening';
}
const HomeScreen = ({navigation}) => {
  let subjects = [
    'Computer Networks',
    'System Software',
    'Sustainable Engineering',
    'Logical System Design',
    'Formal Language and Automata Theory',
  ];
  const [DialogVisible, setDialogVisible] = useState(false);
  return (
    <View>
      <View style={styles.topBar}>
        <Text style={styles.greetingText}>
          {message}, {'\n'}
          {auth().currentUser.displayName}
        </Text>
        <Image
          source={{uri: auth().currentUser.photoURL}}
          style={styles.avatar}
        />
      </View>
      <TouchableOpacity
        style={styles.createSubjectButton}
        onPress={() => {
          setDialogVisible(true);
        }}>
        <Text style={styles.createSubjectButtonText}>Create New Subject</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.SubjectContainer}>
        {subjects.map((sub, i) => (
          <SubjectCard
            onPress={() => {
              navigation.navigate('SubjectScreen');
            }}
            subject={sub}
            key={i}
          />
        ))}
      </ScrollView>
      <Dialog
        isVisible={DialogVisible}
        overlayStyle={{
          backgroundColor: '#fff',
          borderRadius: 30,
        }}>
        <Dialog.Title
          titleStyle={{color: '#000', fontSize: 20}}
          title={'Create New Subject'}
        />
        <Input placeholder="Subject Title, Eg: Maths" />
        <Dialog.Actions>
          <Dialog.Button title={'Create'} />
          <Dialog.Button
            title={'Cancel'}
            onPress={() => {
              setDialogVisible(false);
            }}
          />
        </Dialog.Actions>
      </Dialog>
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
    fontFamily: 'MPLUSRounded1c-ExtraBold',
    fontSize: 22,
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 100,
  },
  SubjectContainer: {
    width: '100%',
    marginTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 200,
  },
  createSubjectButton: {
    height: 80,
    width: '75%',
    borderRadius: 50,
    backgroundColor: '#1E1E1E',
    position: 'absolute',
    top: 120,
    marginLeft: 'auto',
    zIndex: 10,
    left: '12.5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createSubjectButtonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'MPLUSRounded1c-Bold',
  },
});
