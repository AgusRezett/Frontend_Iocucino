import { StyleSheet, Text, View, Dimensions } from 'react-native';

//Components

// Styles

// Funtions
//import { getSelectedBadges } from '../functions/HomeFunctions';

export default function Wallets() {
    return (
        <View style={styles.container}>
            <Text>Wallets</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: 'green',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 20,
        paddingLeft: 20,
    },
});
