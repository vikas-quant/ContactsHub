
import React, { Component } from 'react'
import {
    TouchableOpacity,
    View,
    Text,
    ImageBackground,
    Image,
    SafeAreaView,
} from 'react-native'
import { Input, Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from 'ContactsHub/src/screens/login/login.styles';
import scaling from 'ContactsHub/src/config/device/normalize';
import { Spinner } from 'ContactsHub/src/widgets/Spinner';
import AppConstants from 'ContactsHub/src/constants/appConstants';
import { authorizeUser } from 'ContactsHub/src/utils/asyncUtil';
import { loginSuccess } from './ducks/LoginScreen.actions';

const { normalize, heightScale, widthScale } = scaling;
class LoginScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null
        }
    }

    /**
     * Formik validation schema for otp
     */
    validationSchemaMobile = Yup.object().shape({
        username: Yup.string().required('User Name is required'),
        password: Yup.string()
            .required('No password provided.')
            .min(8, 'Password must be 8 chars.')
    });

    handleSubmit = async (formData) => {
        const { navigation, login } = this.props;
        let user = await authorizeUser(formData);
        if (user) {
            login(true)
            navigation.navigate('home');
        }
        else {
            this.setState({ error: AppConstants.INVALIDUSER })
        }
    }

    render() {
        const { error } = this.state;
        if (this.state.loader) {
            return (
                <View style={{ flex: 1 }}>
                    <Spinner />
                </View>
            )
        }

        return (
            <SafeAreaView style={[styles.container]}>
                <Formik
                    initialValues={{

                    }}
                    onSubmit={this.handleSubmit}
                    validationSchema={this.validationSchemaMobile}
                >
                    {({ handleChange, values, errors, handleSubmit }) => {
                        return (
                            <View style={styles.loginWrapper}>
                                <Text style={styles.heading}>{AppConstants.APPNAME}</Text>
                                <View style={{ flex: 1, justifyContent: "center" }}>

                                    <View style={styles.formField}>
                                        <Input
                                            placeholder={AppConstants.USERNAME}
                                            value={values.username}
                                            onChangeText={handleChange('username')}
                                            errorMessage={errors.username}
                                        />

                                    </View>
                                    <View style={styles.formField}>

                                        <Input
                                            placeholder="Password"
                                            secureTextEntry={true}
                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            errorMessage={errors.password}
                                        />
                                    </View>
                                    {error ? <Text style={styles.error}>{error}</Text> : null}
                                </View>

                                <View style={styles.buttonContainer}>
                                    <Button
                                        raised
                                        buttonStyle={styles.button}
                                        containerStyle={{ width: widthScale(100) }}
                                        onPress={handleSubmit}
                                        title="Login"
                                    />
                                </View>

                            </View>
                        );
                    }}
                </Formik>
            </SafeAreaView>

        )
    }
}


const mapStateToProps = ({ }) => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
    login: (data) => dispatch(loginSuccess(data))
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginScreen);
