import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

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
        </View>
    );
}

const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#faf9f9',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 20,
        paddingLeft: 20,
    },
    balanceCardsList: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
    },
});
