import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

import { getLinkedBankAccounts, getLinkedApplicationAccounts, getLinkedCryptoAccounts, getLinkedManualAccounts } from '../functions/HomeFunctions';

// Components
import { CompleteCarousel } from '../shared/components/wallets/Carousel';

export default function Wallets() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollerView}>
                <CompleteCarousel title="Bancos" getAccounts={getLinkedBankAccounts} />
                <CompleteCarousel title="Criptomonedas" getAccounts={getLinkedApplicationAccounts} />
                <CompleteCarousel title="Billeteras virtuales" getAccounts={getLinkedCryptoAccounts} />
                <CompleteCarousel title="Billeteras físicas" getAccounts={getLinkedManualAccounts} />
            </ScrollView>
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
