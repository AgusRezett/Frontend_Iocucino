import React, { useState } from 'react'
import { StyleSheet, View, Button } from 'react-native'

import { getLinkedAccounts } from '../../../functions/HomeFunctions';
import { WalletCard } from './WalletCard';

import { connect, useDispatch, useSelector } from 'react-redux'

export const WalletCardsLists = () => {
    const dispatch = useDispatch()
    const linkedAccounts = useSelector(state => state.wallets.linkedAccounts)

    return (
        <View style={styles.walletsList}>
            <Button
                title="Agregar billetera"
                onPress={() => {
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
                }}
            ></Button>
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
        height: 'auto',
        borderRadius: 12,
        marginTop: -20,
    },
});
