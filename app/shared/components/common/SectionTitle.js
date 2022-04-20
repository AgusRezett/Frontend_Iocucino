import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export const SectionTitle = ({ title }) => {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        position: 'relative',
        width: '97%',
        height: 60,
        zIndex: 2,
        backgroundColor: '#fff',
        padding: 10,
        paddingLeft: 20,
        marginBottom: 20,
        borderRadius: 12,
        shadowColor: '#bfbfbf',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf: 'center',
    },
    titleText: {
        fontFamily: 'Nunito-Bold',
        fontSize: 20,
        color: '#323232',
    },
})
