import React from 'react';
import {Pressable, StyleSheet, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../utils/theme';

export const Button = ({onPress, text}) => {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={[theme.colors.orange, theme.colors.yellow]}
        style={styles.button}>
        <Text>{text}</Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 6,
    margin: 30,
  },
});
