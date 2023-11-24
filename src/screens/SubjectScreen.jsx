import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from '../components/CustomText';

const SubjectScreen = ({route, navigation}) => {
  const {subjectId} = route.params;
  const [notes, setNotes] = useState([]);
  const [subjectName, setSubjectName] = useState('');

  const userId = auth().currentUser?.uid;

  useEffect(() => {
    const fetchSubjectName = async () => {
      try {
        const subjectDoc = await firestore()
          .collection('subjects')
          .doc(subjectId)
          .get();
        if (subjectDoc.exists) {
          setSubjectName(subjectDoc.data().name);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const unsubscribe = firestore()
      .collection('notes')
      .where('userId', '==', userId)
      .where('subjectId', '==', subjectId)
      .onSnapshot(querySnapshot => {
        const notesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(notesData);
      });

    fetchSubjectName();
    return () => {
      unsubscribe();
    };
  }, [userId, subjectId]);

  return (
    <View style={styles.SubjectScreen}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>{subjectName}</Text>
      </View>

      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('NoteScreen', {
                topic: item.title,
                content: item.content,
              })
            }
            style={styles.touchableNote}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.createNoteBtn}
        onPress={() => {
          navigation.navigate('CreateNoteScreen', {subjectId: subjectId});
        }}>
        <Text style={styles.createNoteBtnText}>Create Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubjectScreen;

let styles = StyleSheet.create({
  SubjectScreen: {flex: 1},
  topBar: {
    backgroundColor: '#FAD110',
    height: 70,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitle: {
    color: '#1E1E1E',
    fontSize: 20,
    fontFamily: 'MPLUSRounded1c-Bold',
  },
  createNoteBtn: {
    position: 'absolute',
    width: '90%',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#FAD110',
  },
  createNoteBtnText: {
    fontFamily: 'MPLUSRounded1c-Bold',
  },
  touchableNote: {
    backgroundColor: '#B38FFF',
    borderRadius: 10,
    padding: 10,
    paddingVertical: 20,
    margin: 10,
  },
});
