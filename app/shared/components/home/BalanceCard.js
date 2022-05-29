import { StyleSheet, Image, Text, View, Dimensions } from 'react-native';

// Components
import { LinearGradient } from 'expo-linear-gradient';

// Styles

// Functions
import { badgeDictionary } from '../../../functions/GlobalFunctions';

export default function BalanceCard({ badgeId, value }) {
    const flagProps = {
        width: 60,
        height: 60,
    };

    const badge = badgeDictionary(flagProps)[badgeId];

    return (
        <View style={styles.balanceCardSpace}>
            <LinearGradient
                colors={flagsBackgroundColors[badge.backgroundClass]}
                style={{
                    width: '100%', height: 'auto',
                    borderRadius: 12,
                }}
            >
                <View style={styles.balanceCardContainer}>
                    <View style={styles.balanceCardTitleContainer}>
                        {/* <FormattedMessage
                    id={badgeDictionary[badgeId].title}
                    defaultMessage="Error"
                /> */}
                        <Text style={styles.balanceCardTitleContent}>{badge.title}</Text>
                    </View>
                    <View style={styles.balanceCardBody}>
                        <View style={styles.balanceCardValueContainer}>
                            <Text style={styles.balanceCarBadgeContent}>{badge.badge}</Text>
                            <Text
                                style={styles.balanceCardValueContent}
                                numberOfLines={1}
                            >
                                {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </Text>
                        </View>
                        <View style={styles.balanceCardFlagContainer}>
                            {badge.flag}
                        </View>
                    </View>
                    <Text style={{ width: "100%", textAlign: "left", fontFamily: "Nunito-Regular", color: "#fff" }}>disponibles</Text>
                </View>

            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    balanceCardSpace: {
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: "auto",
        marginBottom: 20,
        /* transition: all 170ms ease-in-out, */
    },
    balanceCardContainer: {
        position: "relative",
        width: '100%',
        height: 155,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 30,
        overflow: 'hidden',
        //backgroundColor: 'red',
    },
    balanceCardTitleContainer: {
        position: "absolute",
        top: 20,
        left: 30,
        zIndex: 2,
    },
    balanceCardTitleContent: {
        fontFamily: 'Nunito-ExtraBold',
        fontSize: 20,
        color: "#fff",
    },
    balanceCardBody: {
        position: "relative",
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    balanceCardValueContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    balanceCarBadgeContent: {
        fontFamily: 'Nunito-Regular',
        fontSize: 18,
        color: "#fff",
        marginRight: 5,
    },
    balanceCardValueContent: {
        marginBottom: -4,
        fontFamily: 'Nunito-Bold',
        fontSize: 28,
        color: "#fff",
        width: 170,
    },
    balanceCardFlagContainer: {
        width: 60,
        height: 60,
        position: "absolute",
        bottom: -20,
        right: 0,
        borderRadius: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});

const flagsBackgroundColors = {
    "arg-flag": ["#338af3", "#094af7"],
    "eur-flag": ["#004aa2", "#001f45"],
    "usd-flag": ["#2da06e", "#147a4d"],
    "btc-flag": ["#ffae00", "#f57f00"],
}
