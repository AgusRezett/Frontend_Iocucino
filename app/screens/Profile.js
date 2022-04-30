import { StyleSheet, Text, View, Dimensions } from 'react-native';

//Components

// Styles

// Funtions
//import { getSelectedBadges } from '../functions/HomeFunctions';

export default function Profile() {
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: 'orange',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 20,
        paddingLeft: 20,
    },
});
