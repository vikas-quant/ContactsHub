import { StyleSheet } from 'react-native';
import scaling from '../../config/device/normalize';
const { normalize } = scaling;
const styles = StyleSheet.create({
    homeScreenContainer: { flex: 1 },
    filterContent: {
        flexDirection: 'row',
    },
    heading:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    }
});

export default styles;
