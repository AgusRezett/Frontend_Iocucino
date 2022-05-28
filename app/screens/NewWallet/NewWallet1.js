import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

// Components

export default function NewWallet1() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>NewWallet</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '50%',
        backgroundColor: '#faf9f9',
        flexDirection: 'column',
        paddingBottom: 95,
    },
    scrollerView: {
        position: 'relative',
        zIndex: 1,
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#faf9f9',
        flexDirection: 'column',
        paddingTop: 20,
        paddingRight: 20,
        paddingLeft: 20,
    },
});
