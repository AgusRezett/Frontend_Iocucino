import React from 'react'

// Components
import { StyleSheet, Text, View } from 'react-native';

// Icons
import ChevronRightIcon from '../../../../assets/icons/chevron-right.svg';

export const ActionButton = ({ title }) => {
    return (
        <View style={styles.actionContainer}>
            <Text style={styles.actionTitle}>{title}</Text>
            <ChevronRightIcon width="24" height="24" stroke="#C4C4C4" />
        </View>
    )
}

const styles = StyleSheet.create({
    actionContainer: {
        position: 'relative',
        width: '100%',
        height: 60,
        zIndex: 2,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionTitle: {
        fontFamily: 'Nunito-Regular',
        fontSize: 18,
        color: '#323232',
        lineHeight: 20,
    },
})