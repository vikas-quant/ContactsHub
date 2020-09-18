import React from 'react';
import { View, Text } from 'react-native';
import styles from './home.styles';

const HomeScreen = ({ text }) =>
    <View
        style={styles.homeScreenContainer}
    >
        <Text
            textBreakStrategy='simple'
            style={styles.homeScreenText}>
            {text || 'Coming Soon'}
        </Text>
    </View>
export default HomeScreen