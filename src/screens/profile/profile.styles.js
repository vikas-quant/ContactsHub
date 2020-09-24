import { StyleSheet } from 'react-native';
import scaling from 'ContactsHub/src/config/device/normalize';
const { normalize, heightScale, widthScale } = scaling;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileWrapper: {
        marginHorizontal: widthScale(50),
    },
    profileImage: {
        width: 150,
        height: 150,
        
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    heading:{
        textAlign: 'center',
        fontSize: normalize(20)
    },buttonContainer: {
        marginTop: 50
    },
    picker: {
        marginBottom: 10
    }
})
export default styles;