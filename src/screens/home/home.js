import React from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import styles from './home.styles';

const listItem = () => {
    return (
        <ListItem/>
    )
}

const HomeScreen = ({data }) => {
    return (
        <View
            style={styles.homeScreenContainer}
        >
            <View>

            </View>
            <View>
                <FlatList
                    renderItem={listItem}
                    data={data}
                    keyExtractor={user => user.username}
                />
            </View>
        </View>
    )
}
export default HomeScreen