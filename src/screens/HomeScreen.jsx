import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import Text from '../components/CustomText';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import SubjectCard from '../components/SubjectCard';
import {ScrollView} from 'react-native-gesture-handler';
import {Dialog, Input} from '@rneui/themed';
import firestore from '@react-native-firebase/firestore';
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
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState('');
  const userId = auth().currentUser?.uid;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('subjects')
      .where('userId', '==', userId)
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          const subjectsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSubjects(subjectsData);
        }
      });

    return () => unsubscribe();
  }, [userId]);

  const addSubject = async () => {
    try {
      await firestore().collection('subjects').add({
        name: newSubject,
        userId,
      });
      setNewSubject('');
      setDialogVisible(false);
    } catch (error) {
      console.error(error);
    }
  };
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
        <TouchableOpacity
          onPress={() => {
            auth()
              .signOut()
              .then(() => {
                navigation.navigate('SignInScreen');
              });
          }}
          style={{
            width: '22%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1e1e1e',
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 25,
          }}>
          <Text style={{fontSize: 16, color: '#fff'}}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.createSubjectButton}
        onPress={() => {
          setDialogVisible(true);
        }}>
        <Text style={styles.createSubjectButtonText}>Create New Subject</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.SubjectContainer}>
        {subjects.length === 0 && (
          <Text style={styles.noSubjectsText}>
            No Subjects Found, Create a new one to begin
          </Text>
        )}
        {subjects.map((sub, i) => (
          <SubjectCard
            onPress={() => {
              navigation.navigate('SubjectScreen', {subjectId: sub.id});
            }}
            subject={sub.name}
            key={sub.id}
          />
        ))}
      </ScrollView>
      <Dialog isVisible={DialogVisible} overlayStyle={styles.overlayStyle}>
        <Dialog.Title
          titleStyle={styles.DialogTitle}
          title={'Create New Subject'}
        />
        <Input
          placeholder="Subject Title, Eg: Maths"
          value={newSubject}
          onChangeText={text => setNewSubject(text)}
        />
        <Dialog.Actions>
          <Dialog.Button title={'Create'} onPress={addSubject} />
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
    paddingRight: 10,
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
  overlayStyle: {
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  DialogTitle: {color: '#000', fontSize: 20},
  noSubjectsText: {
    textAlign: 'center',
    marginVertical: '50%',
  },
});
