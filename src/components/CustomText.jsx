import React from 'react';
import {StyleSheet, Text} from 'react-native';
const CustomText = props => (
  <Text {...props} style={[styles.style, {...props.style}]}>
    {props.children}
  </Text>
);
export default CustomText;
let styles = StyleSheet.create({
  style: {
    fontFamily: 'MPLUSRounded1c-Regular',
    fontSize: 20,
    color: '#000',
  },
});
