import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ImageBackground,
    Image,
    SafeAreaView,
    FlatList,
    ActivityIndicator
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import styles from './profile.styles';
import scaling from 'ContactsHub/src/config/device/normalize';
import AppConstants from 'ContactsHub/src/constants/appConstants';
import * as Yup from 'yup';
import { Input, Button } from 'react-native-elements';
import { Formik } from 'formik';
import ImagePicker from 'react-native-image-picker';
import { profile } from '../../../assets/images';
import { ScrollView } from 'react-native-gesture-handler';
import { _getUser } from '../../utils/asyncUtil';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registerUserProfile } from './ducks/ProfileScreen.actions';

const { normalize, heightScale, widthScale } = scaling;

class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            avatar: profile,
            userData: {}
        }
        this.multiSelect = React.createRef()
    }

    async componentDidMount() {
        const { usersProfile } = this.props;
        let user = await _getUser();
        let userData = usersProfile[user];
        console.log(usersProfile, user)
        this.setState({ userData, avatar: userData.avatar });
    }

    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        this.setState({ date: currentDate });
    };


    handlePicker = () => {
        // console.log('edit');
        ImagePicker.showImagePicker({}, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({ avatar: response });
                // here we can call a API to upload image on server
            }
        });
    };

    /**
     * Formik validation schema for otp
     */
    validationSchemaMobile = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        dob: Yup.date()
            .typeError('Invalid Date')
            .required('D.O.B. is required'),
        gender: Yup.string().required('Gender is required'),
        interest: Yup.string().required('Interest is required'),
        location: Yup.string().required('Location is required'),
    });

    handleSubmit = async (formData) => {
        const { registerUserProfile } = this.props;
        this.setState({ isEdit: false })
        let user = await _getUser();
        registerUserProfile(user, {...formData, avatar: this.state.avatar});

    }

    getInitialValues = () => {
        const { userData = {} } = this.state;
        const {
            name = '',
            dob = '',
            gender = '',
            interest = '',
            location = '',
        } = userData;
        return {
            name,
            dob,
            gender,
            interest,
            location,
        };
    }

    render() {
        const { isEdit = false, avatar, } = this.state;
        // console.log(this.props.usersProfile)
        return (
            <SafeAreaView style={[styles.container]}>
                <Formik
                    initialValues={this.getInitialValues()}
                    enableReinitialize={true}
                    onSubmit={this.handleSubmit}
                    validationSchema={this.validationSchemaMobile}
                >
                    {({ handleChange, values, errors, handleSubmit }) => {
                        return (
                            <ScrollView
                                contentContainerStyle={styles.profileWrapper}
                            >
                                <Text style={styles.heading}>{AppConstants.PROFILE}</Text>
                                <TouchableOpacity style={styles.imageContainer}
                                    onPress={this.handlePicker}
                                >
                                    <Image
                                        source={avatar}
                                        PlaceholderContent={<ActivityIndicator />}
                                        style={styles.profileImage}
                                    />
                                </TouchableOpacity>
                                <View>

                                    <View style={styles.formField}>
                                        <Input
                                            label={isEdit ? '' : AppConstants.NAME}
                                            inputContainerStyle={isEdit ? {} : { borderBottomWidth: 0 }}
                                            placeholder={isEdit ? AppConstants.NAME : ''}
                                            value={values.name}
                                            onChangeText={handleChange('name')}
                                            errorMessage={errors.name}
                                            editable={isEdit}
                                        />
                                    </View>


                                    <View style={styles.picker}>
                                        {isEdit ?
                                            <View>
                                                <MultiSelect
                                                    single={true}
                                                    styleDropdownMenuSubsection={{ backgroundColor: 'transparent', borderBottomColor: '#86939e' }}
                                                    styleTextDropdown={[{ color: '#86939e', fontSize: 17 }, isEdit ? null : { fontWeight: 'bold' }]}
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
                                                {errors.gender ? <Text style={{ fontSize: 12, color: '#ff190c', marginHorizontal: 13 }}>{errors.gender}</Text> : null}
                                            </View>
                                            :
                                            <View style={{ paddingHorizontal: 10, marginBottom: 40 }}>
                                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#86939e', marginBottom: 10 }}>Genders</Text>
                                                {values.gender ?
                                                    <View>

                                                        {
                                                            AppConstants.GENDER.map((item) => {
                                                                let element = values.gender.indexOf(item.id)
                                                                console.log(element, item)
                                                                if (element > -1) {
                                                                    return (<Text>{item.name}</Text>)
                                                                }
                                                            })
                                                        }
                                                    </View>
                                                    : null}
                                            </View>
                                        }
                                    </View>
                                    <View style={styles.formField}>
                                        <Input
                                            label={isEdit ? '' : 'DOB'}
                                            inputContainerStyle={isEdit ? {} : { borderBottomWidth: 0 }}
                                            placeholder={isEdit ? 'DOB (Date Month Year)' : ''}
                                            value={values.dob}
                                            onChangeText={handleChange('dob')}
                                            errorMessage={errors.dob}
                                            editable={isEdit}
                                        />
                                    </View>
                                    <View style={styles.picker}>

                                        {isEdit ?
                                            <View>
                                                <MultiSelect
                                                    //   hideTags
                                                    styleDropdownMenuSubsection={{ backgroundColor: 'transparent', borderBottomColor: '#86939e' }}
                                                    styleTextDropdown={[{ color: '#86939e', fontSize: 17 }, isEdit ? null : { fontWeight: 'bold' }]}
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
                                                {errors.interest ? <Text style={{ fontSize: 12, color: '#ff190c', marginHorizontal: 13 }}>{errors.interest}</Text> : null}
                                            </View>
                                            :
                                            <View style={{ paddingHorizontal: 10, marginBottom: 40 }}>
                                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#86939e', marginBottom: 10 }}>Interests</Text>
                                                {values.interest ?
                                                    <View>
                                                        {
                                                            AppConstants.INTERESTS.map((item) => {
                                                                let element = values.interest.indexOf(item.id)
                                                                console.log(element, item)
                                                                if (element > -1) {
                                                                    return (<Text>{item.name}</Text>)
                                                                }
                                                            })
                                                        }
                                                    </View>
                                                    : null}
                                            </View>
                                        }
                                    </View>
                                    <View style={styles.formField}>
                                        <Input
                                            label={isEdit ? '' : 'Location'}
                                            inputContainerStyle={isEdit ? {} : { borderBottomWidth: 0 }}
                                            placeholder={isEdit ? 'Location' : ''}
                                            value={values.location}
                                            onChangeText={handleChange('location')}
                                            errorMessage={errors.location}
                                            editable={isEdit}
                                        />
                                    </View>
                                </View>

                                <View style={styles.buttonContainer}>
                                    <Button
                                        raised
                                        buttonStyle={styles.button}
                                        containerStyle={{ width: widthScale(100) }}
                                        onPress={(data) => {
                                            if (isEdit) {
                                                handleSubmit(data)
                                            }
                                            else {
                                                this.setState({ isEdit: true })
                                            }
                                        }}
                                        title={isEdit ? "Save" : 'Edit'}
                                    />
                                </View>

                            </ScrollView>
                        );
                    }}
                </Formik>
            </SafeAreaView>
        )
    }
}


const mapStateToProps = ({ profileReducer: usersProfile }) => (
    usersProfile
);

const mapDispatchToProps = dispatch => bindActionCreators({
    registerUserProfile: (user, data) => dispatch(registerUserProfile(user, data))
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileScreen);