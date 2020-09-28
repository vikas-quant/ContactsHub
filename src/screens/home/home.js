import React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { ListItem, Avatar, Overlay, Input } from 'react-native-elements';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MultiSelect from 'react-native-multiple-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './home.styles';
import AppConstants from 'ContactsHub/src/constants/appConstants';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { ceil } from 'react-native-reanimated';
import { _getUser } from '../../utils/asyncUtil';
import { addContact } from './ducks/home.actions';
class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
            modalState: false,
            search: {},
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

    addContact = (singleUser) => {
        const { allUsers, mainUser } = this.state;
        console.log('user particular', singleUser);
        if (singleUser.key) {
            let updatedArr = singleUser.key;
            this.props.addContact(mainUser, singleUser);
            this.setState({ allUsers: allUsers });
        }
    }

    listItem = ({ item }) => {
        const { usersContacts = {} } = this.props;
        const { mainUser } = this.state;
        let contacts = usersContacts[mainUser];
        let isAlreadyinContacts = false;
        if (contacts && contacts.includes(item.name)) {
            isAlreadyinContacts = true
        }
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
                <TouchableOpacity
                    onPress={() => {
                        if (!isAlreadyinContacts) {
                            this.addContact(item);
                        }
                    }}
                >
                    <ListItem.Chevron
                        name={isAlreadyinContacts ? 'checkmark-outline' : 'add-circle-outline'}
                        size={40}
                    />
                </TouchableOpacity>
            </ListItem>
        )
    }

    validationSchemaMobile = Yup.object().shape({
        name: Yup.string(),
        age: Yup.number(),
        gender: Yup.string(),
        interest: Yup.string(),
        location: Yup.string(),
    });

    handleSubmit = (searchData) => {
        const { listUsers } = this.state;
        const {
            name = '*',
            age = 0,
            gender = '*',
            interest = '*',
            location = '*',
        } = searchData
        let searchedUser = [];
        listUsers.forEach((user) => {
            console.log(user, searchData);
            const {
                name: username = '',
                dob = '',
                gender: usergender = '',
                interest: userinterest = '',
                location: userlocation = '',
            } = user
            let userdob = new Date(dob);
            var diff_ms = Date.now() - userdob.getTime();
            var age_dt = new Date(diff_ms);
            let userage = Math.abs(age_dt.getUTCFullYear() - 1970);
            if (
                username.includes(name) ||
                age == userage ||
                usergender.includes(gender) ||
                userinterest.includes(interest) ||
                userlocation.includes(location)
            ) {
                searchedUser.push(user)
            }
        });
        this.setState({ allUsers: searchedUser, search: searchData })
        this.toggleModal();
    }

    toggleModal = () => {
        this.setState({ modalState: !this.state.modalState })
    }

    render() {
        const { allUsers, search, modalState } = this.state;
        // console.log(allUsers);
        return (
            <SafeAreaView
                style={styles.homeScreenContainer}
            >
                <Text style={styles.heading}>Find people with your Interest</Text>
                <Button
                    title={'Filter'}
                    onPress={this.toggleModal}
                />
                <View style={{ flex: 1, }}>
                    {allUsers && allUsers.length ?
                        <FlatList
                            style={{ width: '100%' }}
                            renderItem={this.listItem}
                            data={allUsers}
                            keyExtractor={user => user.name}
                        />
                        :
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text>No Data Found</Text>
                        </View>
                    }
                </View>
                <Overlay
                    isVisible={modalState}
                    onBackdropPress={this.toggleModal}
                    overlayStyle={{ height: '80%', width: '80%' }}
                >
                    <Formik
                        onSubmit={this.handleSubmit}
                        validationSchema={this.validationSchemaMobile}
                        initialValues={{}}
                    >
                        {({ handleChange, values = {}, errors, handleSubmit }) => {
                            return (
                                <ScrollView
                                    contentContainerStyle={styles.profileWrapper}
                                >
                                    <Text style={styles.heading}>{AppConstants.PROFILE}</Text>

                                    <View>

                                        <View style={styles.formField}>
                                            <Input
                                                placeholder={AppConstants.NAME}
                                                value={values.name}
                                                onChangeText={handleChange('name')}
                                            />
                                        </View>
                                        <View style={styles.picker}>
                                            <MultiSelect
                                                hideTags
                                                single={true}
                                                items={AppConstants.GENDER}
                                                uniqueKey="id"
                                                ref={(component) => { this.multiSelect = component }}
                                                onSelectedItemsChange={(selectedItems) => { handleChange('gender')({ target: { value: selectedItems } }) }}
                                                selectedItems={values.gender}
                                                selectText="Gender"
                                                searchInputPlaceholderText="Search Items..."
                                                onChangeInput={(text) => console.log(text)}
                                                tagRemoveIconColor="#000"
                                                tagBorderColor="#000"
                                                tagTextColor="#000"
                                                selectedItemTextColor="#000"
                                                selectedItemIconColor="#000"
                                                itemTextColor="#000"
                                                displayKey="name"
                                                searchInputStyle={{ color: '#000', padding: 10 }}
                                                submitButtonColor="#2089DC"
                                                submitButtonText="Submit"
                                                styleMainWrapper={{ paddingHorizontal: 10, paddingRight: 0 }}
                                            />
                                        </View>
                                        <View style={styles.formField}>
                                            <Input
                                                value={values.age}
                                                onChangeText={handleChange('age')}
                                            />
                                        </View>
                                        <View style={styles.picker}>
                                            <MultiSelect
                                                hideTags

                                                items={AppConstants.INTERESTS}
                                                uniqueKey="id"
                                                ref={(component) => { this.multiSelect = component }}
                                                onSelectedItemsChange={(selectedItems) => { handleChange('interest')({ target: { value: selectedItems } }) }}
                                                selectedItems={values.interest}
                                                selectText="Interests"
                                                searchInputPlaceholderText="Search Items..."
                                                onChangeInput={(text) => console.log(text)}
                                                tagRemoveIconColor="#000"
                                                tagBorderColor="#000"
                                                tagTextColor="#000"
                                                selectedItemTextColor="#000"
                                                selectedItemIconColor="#000"
                                                itemTextColor="#000"
                                                displayKey="name"
                                                searchInputStyle={{ color: '#000', padding: 10 }}
                                                submitButtonColor="#2089DC"
                                                submitButtonText="Submit"
                                                styleMainWrapper={{ paddingHorizontal: 10, paddingRight: 0 }}
                                            />
                                        </View>
                                        <View style={styles.formField}>
                                            <Input
                                                placeholder={'Location'}
                                                value={values.location}
                                                onChangeText={handleChange('location')}
                                            />
                                        </View>
                                        <View style={styles.buttonContainer}>
                                            <Button
                                                raised
                                                buttonStyle={styles.button}
                                                containerStyle={{ width: 100 }}
                                                onPress={(data) => {
                                                    handleSubmit(data)
                                                }}
                                                title={"Save"}
                                            />
                                        </View>
                                    </View>
                                </ScrollView>
                            );
                        }}
                    </Formik>


                </Overlay>
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
)(HomeScreen);