import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../components/CustomText';

const SubjectCard = ({subject, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      backgroundColor="#FFF"
      style={styles.subjectButton}
      onPress={onPress}>
      <ImageBackground
        source={require('../../assets/subject-bg.png')}
        style={styles.SubjectCard}
        imageStyle={styles.SubjectCardImage}
        resizeMode="cover">
        <View style={styles.SubjectCardContent}>
          <Text style={styles.SubjectCardText}>{subject}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default SubjectCard;

const styles = StyleSheet.create({
  SubjectCard: {
    height: 160,
    width: '100%',
    marginVertical: 10,
    justifyContent: 'center',
  },
  SubjectCardImage: {borderRadius: 25},
  SubjectCardText: {
    fontSize: 28,
    fontFamily: 'MPLUSRounded1c-Bold',
    color: '#fff',
    width: '75%',
  },
  SubjectCardContent: {
    padding: 20,
  },
  subjectButton: {height: 200, width: '100%'},
});
