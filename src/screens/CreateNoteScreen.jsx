import {Input} from '@rneui/themed';
import axios from 'axios';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';
const CreateNoteScreen = ({route, navigation}) => {
  const {subjectId} = route.params;
  const [Topic, setTopic] = useState('');
  const [Note, setNote] = useState('');
  const userId = auth().currentUser?.uid;

  const addNote = async () => {
    try {
      await firestore().collection('notes').add({
        content: Note,
        title: Topic,
        userId,
        subjectId,
      });
      navigation.navigate('SubjectScreen', {subjectId: subjectId});
    } catch (error) {
      console.error(error);
    }
  };
  let getSummarizedNote = () => {
    console.info('CLICKED');
    axios
      .post('https://g4f-server.onrender.com/chat', {
        messages: [
          {role: 'user', content: Topic},
          {
            role: 'system',
            content:
              'You are a teacher who summarizes and simplifies large concepts so that even a weak student can understand. Dont add any AI generated words like certainly, here is the note things. Just i need only the simplified concept of the given concept. Dont add references to external websites',
          },
        ],
      })
      .then(res => {
        setNote(res.data.response);
      });
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Create a New Note</Text>
      </View>
      <Input
        style={styles.TopicInput}
        placeholder="Give me the topic to simplify"
        onChangeText={text => {
          setTopic(text);
        }}
        value={Topic}
      />
      <TouchableOpacity
        disabled={Topic.trim() === ''}
        style={styles.generateButton}
        onPress={getSummarizedNote}>
        <Text style={styles.generateButtonText}>Generate</Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.NoteView}>
          <Text style={styles.NoteText}>{Note}</Text>
        </View>
      </ScrollView>
      {Note.trim() !== '' && (
        <TouchableOpacity style={styles.createNoteBtn} onPress={addNote}>
          <Text style={styles.createNoteBtnText}>Save Note</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CreateNoteScreen;

const styles = StyleSheet.create({
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
  TopicInput: {fontSize: 20, marginVertical: 10},
  generateButton: {
    width: '70%',
    alignSelf: 'center',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#FAD110',
  },
  generateButtonText: {color: '#000'},
  NoteView: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    paddingBottom: 120,
  },
  NoteText: {
    fontSize: 20,
    color: '#1E1E1E',
  },
  createNoteBtn: {
    position: 'absolute',
    width: '70%',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#FAD110',
  },
  createNoteBtnText: {
    fontFamily: 'MPLUSRounded1c-Bold',
    color: '#000',
  },
});
