import React, { useState } from 'react'
import { StyleSheet, View, Button, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { WalletCard } from './WalletCard';

import { connect, useDispatch, useSelector } from 'react-redux'

//Icons
import PlusIcon from '../../../../assets/icons/plus.svg';

export const WalletCardsLists = () => {
    const dispatch = useDispatch()
    const linkedAccounts = useSelector(state => state.wallets.linkedAccounts)
    const navigation = useNavigation()

    return (
        <View style={styles.walletsList}>
            <TouchableOpacity
                style={styles.addWalletButton}
                onPress={() => {
                    navigation.navigate('NewWallet1')
                }}
            >
                <PlusIcon
                    width={20}
                    height={20}
                    stroke="#4E4E4E"
                    strokeWidth={2}
                    style={{ marginRight: 5 }}
                />
                <Text style={styles.addWalletButtonText}>Agregar billetera</Text>
            </TouchableOpacity>
            {linkedAccounts &&
                linkedAccounts.map((account) => (
                    <WalletCard
                        key={account.id}
                        account={account}
                    />
                ))}
        </View>
    )
}

export default connect(
    state => ({
        linkedAccounts: state.walletsReducer.linkedAccounts
    }),
    dispatch => ({
        addWallet: () => {
            dispatch({
                type: 'ADD_WALLET',
                payload: {
                    id: Math.random(),
                    name: "Nueva billetera",
                    balance: "56872.00",
                    currency: "ARS",
                    color: "#02A6E7",
                    performance: "100.00%",
                    performanceStatus: "up",
                }
            })
        }
    })
)(WalletCardsLists)

const styles = StyleSheet.create({
    walletsList: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'center',
        width: '97%',
        height: 550,
        borderRadius: 12,
        marginTop: -20,
        paddingBottom: 20,
    },
    addWalletButton: {
        position: 'relative',
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 20,
        borderRadius: 12,
        padding: 20,
        shadowColor: '#bfbfbf',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    addWalletButtonText: {
        fontSize: 16,
        color: '#4E4E4E',
        fontFamily: 'Nunito-Bold',
        lineHeight: 21
    },
})
