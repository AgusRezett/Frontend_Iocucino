import { StyleSheet, Text, View, Dimensions } from 'react-native';

//Components

// Styles

// Funtions
//import { getSelectedBadges } from '../functions/HomeFunctions';

export default function Settings() {
    return (
        <View style={styles.container}>
            <Text>Settings</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: 'purple',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 20,
        paddingLeft: 20,
    },
});
