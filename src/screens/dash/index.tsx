import React from 'react';

import {View, Text, StyleSheet, Dimensions} from 'react-native';

import IsAuth from '../../components/IsAuth';

const dash: React.FC = () => {
  return (
    <View style={styles.default}>
      <Text>Dashboard</Text>
      <IsAuth />
    </View>
  );
};

export default dash;

const styles = StyleSheet.create({
  default: {
    height: Dimensions.get('window').height,
    alignContent: 'center',
    alignItems: 'center',
  },
});
