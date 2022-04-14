import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, Dimensions } from 'react-native';

//Components
import BalanceCard from '../shared/components/home/BalanceCard';

// Styles

// Funtions
import { getSelectedBadges } from '../functions/HomeFunctions';



export default function Home() {
    const [selectedBadges, setSelectedBadges] = useState([]);

    useEffect(() => {
        getSelectedBadges(setSelectedBadges);
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroller} showsVerticalScrollIndicator={false}>
                <View style={styles.balanceCardsList}>
                    {selectedBadges &&
                        selectedBadges.map((badge) => (
                            <BalanceCard
                                key={badge.id}
                                badgeId={badge.id}
                                value={badge.value}
                            />
                        ))}
                </View>
                <View style={styles.walletsList}>
                    {/* <Text style={{ position: "absolute", bottom: 20 }}>Ocupar espacio</Text> */}
                </View>
                <View style={styles.walletsList}>
                    {/* <Text style={{ position: "absolute", bottom: 20 }}>Ocupar espacio</Text> */}
                </View>
            </ScrollView>
        </View>
    );
}

const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '50%',
        backgroundColor: '#faf9f9',
        flexDirection: 'column',
        /* justifyContent: 'flex-start',
        alignItems: 'flex-start', */
    },
    scroller: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#faf9f9',
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20,
    },
    balanceCardsList: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
        marginTop: 20,
    },
    walletsList: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: 300,
        backgroundColor: '#383838',
        borderRadius: 12,
        marginBottom: 20,
    },
});
