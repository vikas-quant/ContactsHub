import { StyleSheet } from 'react-native';
import scaling from 'ContactsHub/src/config/device/normalize';
const { normalize, heightScale, widthScale } = scaling;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page: {
        flex: 1,
    },
    loginWrapper: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: widthScale(50),
        marginTop: heightScale(50)
    },
    formField: {
        width: '100%'
    },
    buttonContainer:{
        alignItems: "center",
        marginVertical: heightScale(50)
    },
    heading:{
        fontSize: normalize(40),
        fontWeight: 'bold',
        textAlign: "center"
    }
})
export default styles;
