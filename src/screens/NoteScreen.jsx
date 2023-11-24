import {FAB} from '@rneui/themed';
import React from 'react';
import {Share, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const NoteScreen = ({route}) => {
  const {topic, content, noteId} = route.params;

  return (
    <View style={styles.NoteScreen}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>{topic}</Text>
      </View>

      <ScrollView>
        <View style={styles.NoteView}>
          <Text style={styles.NoteText}>{content}</Text>
        </View>
      </ScrollView>
      <FAB
        color="#FAD110"
        title={'Share'}
        icon={{name: 'share', color: '#000'}}
        style={styles.shareButton}
        titleStyle={styles.shareButtonTitle}
        onPress={() =>
          Share.share({
            message: `Checkout this short note created using SmartSnip application about ${topic} \n \n Link: https://smartsnip-share.vercel.app/notes/${noteId}`,
          })
        }
      />
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
  NoteScreen: {flex: 1},
  shareButton: {marginBottom: 20},
  shareButtonTitle: {color: '#000'},
});
