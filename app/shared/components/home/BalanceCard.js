import { StyleSheet, Image, Text, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Styles

// Functions
import { badgeDictionary } from '../../../functions/GlobalFunctions';

export default function BalanceCard({ badgeId, value }) {
    const badge = badgeDictionary[badgeId];

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
                        <Text style={styles.balanceCardTitleContent}>Pesos Argentinos</Text>
                    </View>
                    <Text style={{ color: "black", position: "absolute" }}>
                        {badge.backgroundClass}
                    </Text>
                    <Image
                        style={styles.balanceCardFlag}
                        source={require(`../../../../assets/svgs/shield.png`)}
                    // source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                    />
                    {/* <img src={badgeDictionary[badgeId].flag} alt="" /> */}
                </View>
                {/*
            <div className="balance-card-bottom">
                {`${badgeDictionary[badgeId].badge} ${value}`}
                <div className='secondary-curreny-value'>
                    <FormattedMessage
                        id="home.card.balance.total"
                        defaultMessage="Total"
                    />
                    : {badgeDictionary[badgeId].badge} {parseInt(value) + 6066.45}
                </div>
                <div className="expand-toggler" onClick={(e) => expandCardBottom(e)}>
                    <svg
                        width="48px"
                        height="48px"
                        viewBox="0 0 24 24"
                        stroke="#000"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill='none'
                    >
                        <polyline id={`cardArrow${badgeId}`} points="6 10 12 16 18 10" />
                    </svg>
                </div>
            </div> */}
            </LinearGradient>
        </View>
    );
}

const screenHeight = Dimensions.get('window').height;
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
        height: 140,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 5,
        overflow: 'hidden',
        //backgroundColor: 'red',
    },
    balanceCardTitleContainer: {
        position: "absolute",
        top: 20,
        left: 28,
        zIndex: 2,
    },
    balanceCardTitleContent: {
        fontFamily: 'Nunito-ExtraBold',
        fontSize: 22,
        color: "#fff",
    },
    balanceCardFlag: {
        width: 60,
        height: 60,
        margin: 20
    }
});

const flagsBackgroundColors = {
    "arg-flag": ["#338af3", "#094af7"],
    "eur-flag": ["#004aa2", "#001f45"],
    "usd-flag": ["#2da06e", "#147a4d"],
    "btc-flag": ["#ffae00", "#f57f00"],
}
