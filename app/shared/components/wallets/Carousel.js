import React, { useState } from 'react';

// Components
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

// Icons
import PieChartIcon from '../../../../assets/icons/pie-chart.svg';
import PlusIcon from '../../../../assets/icons/plus.svg';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 5);

const renderItem = ({ item, index }) => {
    return (
        <TouchableOpacity style={[styles.carouselCard, { backgroundColor: item.color }]} activeOpacity={0.8}>
            <View style={styles.topSection}>
                <Text style={styles.cardName}>{item.name}</Text>
            </View>
            <View style={styles.bottomSection}>
                {item.logo}
                <View style={styles.infoSection}>
                    <View style={styles.performanceContainer}>
                        {
                            item.performanceStatus === 'up' ?
                                <>
                                    <Text style={[styles.performanceStatus, { color: "#00C853" }]}>+</Text>
                                    <Text style={[styles.performance, { color: "#00C853" }]}>{item.performance}</Text>
                                </>
                                : item.performanceStatus === 'down' ?
                                    <>
                                        <Text style={[styles.performanceStatus, { color: "#D80027" }]}>-</Text>
                                        <Text style={[styles.performance, { color: "#D80027" }]}>{item.performance}</Text>
                                    </>
                                    :
                                    <>
                                        <Text style={[styles.performance, { color: "#323232" }]}>{item.performance}</Text>
                                    </>
                        }
                    </View>
                    <View style={styles.cardBalance}>
                        <Text style={styles.cardCurrency}>{item.currency}</Text>
                        <Text style={styles.cardValue}>{item.balance}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity >
    )
}

const renderDeafult = () => {
    return (
        <TouchableOpacity style={styles.defaultCard} activeOpacity={0.4}>
            <PlusIcon width="48" height="48" stroke="#4E4E4E" />
            {/* <Text style={styles.defaultMessage}>Nada</Text> */}
        </TouchableOpacity >
    )
}

export const CompleteCarousel = ({ title, getAccounts }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const logoProps = {
        width: 100,
        height: 50,
    };
    const carouselItems = getAccounts(logoProps);

    return (
        <View style={styles.walletTypeContainer}>
            <View style={styles.carouselHeader}>
                <Text style={styles.carouselTitle}>{title}</Text>
                <View style={styles.participationContainer}>
                    <PieChartIcon width="18" height="18" strokeWidth="2" stroke="#C4C4C4" />
                    <Text style={styles.participationText}>73.7%</Text>
                </View>
            </View>
            <View style={styles.carouselContainer}>
                <Carousel
                    layout={"default"}
                    data={carouselItems}
                    sliderWidth={SLIDER_WIDTH - 20}
                    itemWidth={SLIDER_WIDTH - 38}
                    renderItem={carouselItems.length > 0 ? carouselItems[0].name ? renderItem : renderDeafult : renderDeafult}
                    onSnapToItem={index => setActiveIndex(index)}
                />
                <Pagination
                    dotsLength={carouselItems.length}
                    activeDotIndex={activeIndex}
                    containerStyle={styles.paginationContainer}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 8,
                        backgroundColor: '#323232'
                    }}
                    inactiveDotStyle={{
                        backgroundColor: '#C4C4C4'
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    walletTypeContainer: {
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 20,
        paddingBottom: 20,
    },
    carouselHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
        marginBottom: 20,
    },
    carouselTitle: {
        fontSize: 20,
        fontFamily: 'Nunito-Bold',
        color: '#323232',
    },
    participationContainer: {
        width: 90,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#F5F5F5",
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    participationText: {
        fontSize: 14,
        fontFamily: 'Nunito-Bold',
        color: '#323232',
    },
    carouselContainer: {
        height: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselCard: {
        width: "100%",
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
        padding: 20,
    },
    defaultCard: {
        width: "99%",
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F2F2F2",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#4E4E4E",
        borderStyle: "dashed",
        marginLeft: 1,
        padding: 20,
    },
    topSection: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardName: {
        width: '100%',
        fontSize: 30,
        fontFamily: 'Nunito-Bold',
        color: '#fff',
        lineHeight: 35,
    },
    performanceContainer: {
        width: 76,
        height: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 5,
        borderRadius: 2,
        paddingHorizontal: 5,
    },
    performanceStatus: {
        fontSize: 12,
        fontFamily: 'Nunito-Bold',
        color: '#000',
    },
    performance: {
        fontSize: 12,
        fontFamily: 'Nunito-Bold',
        color: '#000',
    },
    bottomSection: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    infoSection: {
        width: 'auto',
        height: 'auto',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    cardBalance: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        height: 'auto',
    },
    cardCurrency: {
        fontSize: 24,
        fontFamily: 'Nunito-Regular',
        color: '#fff',
        marginRight: 5,
    },
    cardValue: {
        fontSize: 24,
        fontFamily: 'Nunito-Bold',
        color: '#fff',
    },
    paginationContainer: {
        width: '100%',
        height: 'auto',
        margin: 0,
        padding: 0,
    },
});
