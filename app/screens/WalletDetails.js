import React, { useEffect, useState } from 'react';


// Components
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, TouchableOpacity, Vibration } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Functions
import { badgeDictionary } from '../functions/GlobalFunctions';
import { getWalletData } from '../functions/HomeFunctions';

// Icons
import { Ionicons } from '@expo/vector-icons';
import OkCircle from '../../assets/svgs/ok-circle.svg';
import BadCircle from '../../assets/svgs/bad-circle.svg';
import Link from '../../assets/svgs/link.svg';
import MoneyFace from '../../assets/svgs/expense-money-face.svg';
import MoneyWings from '../../assets/svgs/expense-money-wings.svg';
import PartyPopper from '../../assets/svgs/expense-party-popper.svg';

// Styles
import { background, logo, status, text } from '../shared/styles/colors';
import { loginStack } from '../shared/styles/loginStack';

export default function WalletDetails({ route }) {
    const { account } = route.params;
    const navigation = useNavigation();

    const [wallet, setWallet] = useState();
    const [performanceSign, setPerformanceSign] = useState();
    const [performanceColor, setPerformanceColor] = useState();

    const getBadge = () => {
        const badge = badgeDictionary().find((badge) => {
            return badge.id === account.currency;
        });
        return badge.badge;
    }
    const [currency, setCurrency] = useState(getBadge());

    useEffect(() => {
        setCurrency(getBadge());
        setWallet(getWalletData(account.id));

        switch (account.performanceStatus) {
            case "up":
                setPerformanceSign("+");
                setPerformanceColor({ stroke: status.success, fill: status.successBg });
                break;
            case "down":
                setPerformanceSign("-");
                setPerformanceColor({ stroke: status.error, fill: status.errorBg });
                break;
            default:
                setPerformanceSign(null);
                setPerformanceColor({ stroke: text.principal, fill: background.naviconDisable });
                break;
        }
    }, [account.currency, account.id]);


    return (
        <ScrollView View style={styles.container}>
            <TouchableOpacity
                style={styles.backBtn}
                onPress={() => {
                    Vibration.vibrate(20);
                    navigation.goBack()
                    setWallet(null);
                    setPerformanceColor(null);
                    setPerformanceSign(null);
                }}
            >
                <Ionicons
                    name={`ios-arrow-back`}
                    size={24}
                    color={text.placeholder}
                />
            </TouchableOpacity>
            {
                wallet && performanceColor ?

                    <>
                        <View style={styles.cardContainer}>
                            <View style={styles.card}>
                                <View style={{ ...styles.cardHeader, backgroundColor: wallet.color }}>
                                    <Text style={styles.cardHeaderText}>{wallet.name}</Text>
                                </View>
                                <View style={styles.cardBody}>
                                    <View style={styles.cardBodyRow}>
                                        <Text style={styles.cardBodyText}>Dinero disponible</Text>
                                    </View>
                                    <View style={styles.cardBodyRow}>
                                        <Text style={{ ...styles.cardBodyTextBold, fontFamily: 'Nunito-SemiBold', fontSize: 22, marginBottom: 2 }}>{currency}</Text>
                                        <Text style={{ ...styles.cardBodyTextBold, fontSize: 26 }}>
                                            {wallet.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </Text>
                                    </View>
                                    <View style={styles.divisor} />
                                    {
                                        wallet.cardAvailable ?
                                            <>
                                                <View style={{ ...styles.cardBodyRow, alignItems: 'center' }}>
                                                    <OkCircle
                                                        width={24}
                                                        height={24}
                                                        stroke={status.success}
                                                        fill={status.successBg}
                                                        style={{ marginRight: 10 }}
                                                    />
                                                    <Text style={styles.cardBodyTextBold}>Tarjeta disponible</Text>
                                                </View>
                                                <View style={{ ...styles.cardBodyRow, marginTop: 10, marginLeft: 34 }}>
                                                    <Text style={styles.cardBodyText}>Titular:</Text>
                                                    <Text style={styles.cardBodyTextBold}>{wallet.cardName}</Text>
                                                </View>
                                                <View style={{ ...styles.cardBodyRow, marginTop: 10, marginLeft: 34 }}>
                                                    <Text style={styles.cardBodyText}>Número:</Text>
                                                    <Text style={styles.cardBodyTextBold}>{wallet.cardNumber}</Text>
                                                </View>
                                                <View style={{ ...styles.cardBodyRow, marginTop: 10, marginLeft: 34 }}>
                                                    <Text style={styles.cardBodyText}>Fecha de expiración:</Text>
                                                    <Text style={styles.cardBodyTextBold}>{wallet.cardExpiration}</Text>
                                                </View>
                                                <View style={{ ...styles.cardBodyRow, marginTop: 10, marginLeft: 34 }}>
                                                    <Text style={styles.cardBodyText}>CVV:</Text>
                                                    <Text style={styles.cardBodyTextBold}>{wallet.cardCvv}</Text>
                                                </View>
                                                <View style={{ ...styles.cardBodyRow, marginTop: 10, alignItems: 'center' }}>
                                                    <Link
                                                        width={18}
                                                        height={18}
                                                        fill={text.attribute}
                                                        style={{ marginRight: 10 }}
                                                    />
                                                    <View style={{ borderBottomColor: text.placeholderInverted, borderBottomWidth: 1, paddingBottom: 2, flexDirection: 'row' }}>
                                                        <Text style={{ ...styles.cardBodyText, color: text.attribute, marginRight: 5 }}>Abrir mi cuenta de</Text>
                                                        <Text style={{ ...styles.cardBodyTextBold, color: text.attribute, margin: 0 }}>{wallet.name}</Text>
                                                    </View>
                                                </View>
                                            </>
                                            :
                                            <View style={{ ...styles.cardBodyRow, alignItems: 'center' }}>
                                                <BadCircle
                                                    width={24}
                                                    height={24}
                                                    stroke={status.error}
                                                    fill={status.errorBg}
                                                    style={{ marginRight: 10 }}
                                                />
                                                <Text style={styles.cardBodyTextBold}>Tarjeta no disponible</Text>
                                            </View>
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={styles.expensesContainer}>
                            <View style={styles.expensesHeader}>
                                <Text style={{ ...styles.expensesHeaderText, fontSize: 20 }}>Última actividad</Text>
                                <View style={{ ...styles.walletPerformance, backgroundColor: performanceColor.fill }}>
                                    <Text style={{ ...styles.expensesHeaderText, color: performanceColor.stroke, marginRight: 4 }}>{performanceSign}</Text>
                                    <Text style={{ ...styles.expensesHeaderText, color: performanceColor.stroke }}>{wallet.performance}</Text>
                                </View>
                            </View>
                            <View style={styles.expensesBody}>
                                {
                                    wallet.transactions && wallet.transactions.length > 0
                                        ? wallet.transactions.map((transaction) => {
                                            return <View style={styles.expensesRow} key={transaction.id}>
                                                <View style={styles.expensesRowLeft}>
                                                    <View style={styles.expensesIcon}>
                                                        {
                                                            transaction.type === 'Compra' ?
                                                                <MoneyFace width={24} height={24} />
                                                                :
                                                                transaction.type === 'Ingreso' ?
                                                                    <PartyPopper width={24} height={24} />
                                                                    :
                                                                    <MoneyWings width={24} height={24} />
                                                        }
                                                    </View>
                                                    <Text style={styles.expensesType}>{transaction.type}</Text>
                                                </View>
                                                <View style={styles.expensesRowRight}>
                                                    <Text style={{
                                                        ...styles.expensesAmount,
                                                        color: transaction.type === "Ingreso"
                                                            ? status.success
                                                            : transaction.type === "Compra"
                                                                ? status.error
                                                                : text.principal
                                                    }}>{
                                                            `${currency} ${transaction.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                                                        }</Text>
                                                    <Text style={styles.expensesDate}>{transaction.date}</Text>
                                                </View>
                                            </View>
                                        })
                                        :
                                        <View style={styles.activityDefaultContainer}>
                                            <Text style={styles.activityDefault}>No se encontró actividad en esta cuenta</Text>
                                        </View>
                                }
                            </View>
                        </View>
                        <View style={{ width: '100%', height: 120, backgroundColor: background.secondary }}></View>
                    </>
                    :
                    <ActivityIndicator
                        size="large"
                        color={text.placeholder}
                        style={{
                            marginTop: 20,
                            marginBottom: 20,
                            marginLeft: 20,
                            marginRight: 20,
                            alignSelf: 'center'

                        }} />
            }
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: background.secondary,
        flexDirection: 'column',
        paddingTop: 20,
        paddingBottom: 60,
        paddingRight: 20,
        paddingLeft: 20,
    },
    backBtn: {
        width: 40,
        borderRadius: 20,
        backgroundColor: background.secondary,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardContainer: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#bfbfbf',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
    },
    card: {
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    cardHeader: {
        width: '100%',
        height: 100,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 20,
    },
    cardHeaderText: {
        fontFamily: 'Nunito-Bold',
        fontSize: 30,
        color: background.principal,
    },
    cardBody: {
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 20,
    },
    cardBodyRow: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    cardBodyTextBold: {
        fontFamily: 'Nunito-Bold',
        fontSize: 16,
        color: text.principal,
        marginRight: 10,
    },
    cardBodyText: {

        fontFamily: 'Nunito-Regular',
        fontSize: 16,
        color: text.principal,
        marginRight: 10,
    },
    divisor: {
        width: '100%',
        height: 1,
        backgroundColor: text.placeholder,
        marginVertical: 20,
    },
    expensesContainer: {
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: background.principal,
        borderRadius: 12,
        shadowColor: '#bfbfbf',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 20,
        paddingBottom: 5,
    },
    expensesHeader: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    walletPerformance: {
        width: 'auto',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    expensesHeaderText: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 14,
        color: text.principal,
    },
    expensesBody: {
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 15,
    },
    expensesRow: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        borderTopColor: text.placeholderInverted,
        borderTopWidth: 1,
        marginBottom: 15,
    },
    expensesRowLeft: {
        width: 'auto',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    expensesIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FDFDFD',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#E2E2E2',
        borderWidth: 1,
    },
    expensesType: {
        fontFamily: 'Nunito-Regular',
        fontSize: 18,
        color: text.principal,
        marginLeft: 10,
    },
    expensesRowRight: {
        width: 'auto',
        height: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    expensesAmount: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 16,
        color: text.principal,
    },
    expensesDate: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 12,
        color: text.placeholder,
    },
    activityDefaultContainer: {
        width: '100%',
        height: 90,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    activityDefault: {
        marginTop: -20,
        color: text.placeholder,
    }
});
