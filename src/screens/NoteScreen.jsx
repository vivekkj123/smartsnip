import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const NoteScreen = ({route, navigation}) => {
  const {topic, content} = route.params;

  return (
    <View style={{flex: 1}}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>{topic}</Text>
      </View>

      <ScrollView>
        <View style={styles.NoteView}>
          <Text style={styles.NoteText}>{content}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default NoteScreen;

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
  NoteView: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    paddingBottom: 120,
  },
  NoteText: {
    fontSize: 20,
    color: '#1E1E1E',
  },
});
