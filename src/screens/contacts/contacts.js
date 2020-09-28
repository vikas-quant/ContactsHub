import React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { ListItem, Avatar, Overlay, Input } from 'react-native-elements';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './contacts.styles';

import { _getUser } from '../../utils/asyncUtil';

class ContactsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
           
            listUsers: []
        }
    }

    async componentDidMount() {
        let user = await _getUser()
        this.convertUserObjectToArray(this.props.usersProfile, user);
    }

    convertUserObjectToArray = (usersObj = {}, own) => {
        let usersArr = [];
        Object.keys(usersObj).forEach((user = {}) => {
            if (own !== user) {
                usersArr.push({ ...usersObj[user], key: user });
            }
        });
        this.setState({ allUsers: usersArr, listUsers: usersArr, mainUser: own });
    }

    listItem = ({ item }) => {
     
        if (!item) {
            return null
        }
        return (
            <ListItem key={item.name} bottomDivider>
                <Avatar source={item.avatar} />
                <ListItem.Content>
                    <ListItem.Title>{item.name + ' (' + item.gender + ')'}</ListItem.Title>
                    <ListItem.Subtitle>{item.dob}</ListItem.Subtitle>
                    <View style={styles.subtitleView}>
                        {/* <Image source={require('../images/rating.png')} style={styles.ratingImage}/> */}
                        <Text style={styles.ratingText}>{item.location}</Text>
                    </View>
                </ListItem.Content>
                
            </ListItem>
        )
    }

    render() {
        const { usersContacts = {} } = this.props;
        const { allUsers, mainUser } = this.state;
        let contactsArr = usersContacts[mainUser];
        let showContacts = allUsers.filter((user) => {
            if(contactsArr && contactsArr.includes(user.name)){
                return user;
            }
        })
        return (
            <SafeAreaView
                style={styles.homeScreenContainer}
            >
                <Text style={styles.heading}>Contacts</Text>
              
                <View style={{ flex: 1, }}>
                    {showContacts && showContacts.length ?
                        <FlatList
                            style={{ width: '100%' }}
                            renderItem={this.listItem}
                            data={showContacts}
                            keyExtractor={user => JSON.stringify(user)}
                        />
                        :
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text>No Data Found</Text>
                        </View>
                    }
                </View>
            </SafeAreaView >
        )
    }
}

const mapStateToProps = ({ profileReducer: usersProfile, homeReducer: { usersContacts } }) => (
    {
        ...usersProfile,
        usersContacts
    }
);

const mapDispatchToProps = dispatch => bindActionCreators({
    addContact: (user, data) => dispatch(addContact(user, data))
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ContactsScreen);