import { StyleSheet, Text, View } from 'react-native';

// Styles

export default function Bottombar() {
    return (
        <View style={[styles.navbarContainer, styles.navbarShadow]}>
            <View style={styles.navbarContent}>
                <Text style={styles.navbarBrand}>Mino</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    navbarContainer: {
        width: '100%',
        height: 75,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    navbarShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 15,
    },
});