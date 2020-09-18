import { StyleSheet } from 'react-native';
import scaling from '../../config/device/normalize';
const { normalize } = scaling;
const styles = StyleSheet.create({
    homeScreenContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    homeScreenText: { fontSize: 20, fontWeight: "bold", color: '#D1D1D1' }
});

export default styles;
