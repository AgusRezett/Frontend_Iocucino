import { badgeDictionary, getPrincipalCurrency, getTokenPrice, nationalBadgeDictionary } from "./GlobalFunctions";

// Logos
import BrubankLogo from "../../assets/images/logos/brubank.svg";
import BbvaLogo from "../../assets/images/logos/bbva.svg";
import UalaLogo from "../../assets/images/logos/uala.svg";
import MercadoPagoLogo from "../../assets/images/logos/mercadopago.svg";
import BinanceLogo from "../../assets/images/logos/binance.svg";

export const getSelectedBadges = () => {
    let badges = [];
    const linkedAccounts = getLinkedAccounts();
    const userCurrencies = getUserCurrencies();

    linkedAccounts.forEach((account) => {
        if (userCurrencies.includes(account.currency)) {
            const exist = badges.find((badge) => {
                return badge.id === account.currency;
            });
            if (!exist) {
                badges.push({ id: account.currency, value: parseFloat(account.balance) });
            } else {
                badges.forEach((badge) => {
                    if (badge.id === account.currency) {
                        badge.value += parseFloat(account.balance);
                    }
                });
            }
        }
    });

    return badges;
}

export const getLinkedAccounts = (logoProps = null) => {
    return [
        {
            id: 1,
            name: "Brubank",
            balance: "6337.00",
            currency: 3,
            color: "#6440D9",
            performance: "8.00%",
            performanceStatus: "down",
        },
        {
            id: 2,
            name: "Ualá",
            balance: "7235.06",
            currency: 3,
            color: "#FE4F5A",
            performance: "138.00%",
            performanceStatus: "up",
        },
        {
            id: 3,
            name: "BBVA",
            balance: "189600.00",
            currency: 3,
            color: "#005096",
            performance: "53.00%",
            performanceStatus: "",
        },
        {
            id: 4,
            name: "Mercadopago",
            balance: "36000.00",
            currency: 3,
            color: "#02A6E7",
            performance: "5.00%",
            performanceStatus: "down",
        },
        {
            id: 5,
            name: "Binance",
            balance: "0.0004",
            currency: 0,
            color: "#E8B30B",
            performance: "47.00%",
            performanceStatus: "up",
        }
    ];
}

export const getLinkedBankAccounts = (logoProps = null) => {
    return [
        {
            id: 1,
            name: "Brubank",
            balance: "6,337.00",
            currency: "AR$",
            color: "#6440D9",
            performance: "8.00%",
            performanceStatus: "down",
            logo: <BrubankLogo {...logoProps} />,
        },
        {
            id: 3,
            name: "BBVA",
            balance: "189,600.00",
            currency: "AR$",
            color: "#005096",
            performance: "53.00%",
            performanceStatus: "",
            logo: <BbvaLogo {...logoProps} />,
        },
    ];
}

export const getLinkedApplicationAccounts = (logoProps = null) => {
    return [
        {
            id: 2,
            name: "Ualá",
            balance: "7,235.06",
            currency: "AR$",
            color: "#FE4F5A",
            performance: "138.00%",
            performanceStatus: "up",
            logo: <UalaLogo {...logoProps} />,
        },
        {
            id: 4,
            name: "Mercadopago",
            balance: "36,000.00",
            currency: "AR$",
            color: "#02A6E7",
            performance: "5.00%",
            performanceStatus: "down",
            logo: <MercadoPagoLogo {...logoProps} />,
        },
    ];
}

export const getLinkedCryptoAccounts = (logoProps = null) => {
    return [
        {
            id: 5,
            name: "Binance",
            balance: "0.0004",
            currency: "BTC",
            color: "#E8B30B",
            performance: "47.00%",
            performanceStatus: "up",
            logo: <BinanceLogo {...logoProps} />,
        }
    ];
}

export const getLinkedManualAccounts = (logoProps = null) => {
    return [
        {}
    ];
}

export const getWalletData = (id) => {
    const wallets = [
        {
            id: 1,
            name: "Brubank",
            balance: "6337.00",
            currency: 3,
            color: "#6440D9",
            performance: "8.00%",
            performanceStatus: "down",
            cardAvailable: true,
            cardNumber: "**** **** **** ****",
            cardExpiration: "12/20",
            cardCvv: "***",
            cardName: "Juan Perez",
            cardType: "Crédito",
            cardService: "Visa",
            cardLimit: "2,000.00",
            transactions: [
                {
                    id: 1,
                    type: "Transaccion",
                    date: "14/05/2022",
                    amount: "20030.00",
                },
                {
                    id: 2,
                    type: "Ingreso",
                    date: "14/05/2022",
                    amount: "20030.00",
                },
                {
                    id: 3,
                    type: "Transaccion",
                    date: "14/05/2022",
                    amount: "20030.00",
                },
                {
                    id: 4,
                    type: "Transaccion",
                    date: "14/05/2022",
                    amount: "20030.00",
                },
                {
                    id: 5,
                    type: "Compra",
                    date: "14/05/2022",
                    amount: "20030.00",
                },
            ]

        },
        {
            id: 2,
            name: "Ualá",
            balance: "7235.06",
            currency: 3,
            color: "#FE4F5A",
            performance: "138.00%",
            performanceStatus: "up",
        },
        {
            id: 3,
            name: "BBVA",
            balance: "142189600.00",
            currency: 3,
            color: "#005096",
            performance: "53.00%",
            performanceStatus: "",
        },
        {
            id: 4,
            name: "Mercadopago",
            balance: "36000.00",
            currency: 3,
            color: "#02A6E7",
            performance: "5.00%",
            performanceStatus: "down",
        },
        {
            id: 5,
            name: "Binance",
            balance: "0.0004",
            currency: 0,
            color: "#E8B30B",
            performance: "47.00%",
            performanceStatus: "up",
        }
    ];

    const wallet = wallets.find((wallet) => {
        return wallet.id === id;
    });
    return wallet;
}

export const getAccountsSeries = (accounts, usdValue) => {
    let series = [];
    const principalCurrency = getPrincipalCurrency();

    accounts.forEach(account => {
        //? In case the account isn't in the principal currency, we need to know the account value in the principal currency
        if (account.currency === principalCurrency.toUpperCase()) {
            series.push(parseFloat(account.balance));
        } else {
            if (nationalBadgeDictionary.includes(account.currency)) {
                series.push(parseFloat(account.balance) * usdValue);
            } else {
                getTokenPrice(account.currency).then(res => {
                    series.push(parseFloat((account.balance * (res * usdValue)).toFixed(2)));
                });
            }
        }
    });
    return series;
}

export const getOptionsLabels = (accounts) => {
    let labels = [];
    accounts.forEach(account => {
        labels.push(account.name);
    });
    return labels;
}

export const getOptionsColors = (accounts) => {
    let colors = [];
    accounts.forEach(account => {
        colors.push(account.color);
    });
    return colors;
}

export const darkenColor = (col, amt) => {
    var usePound = false;
    if (col[0] === '#') {
        col = col.slice(1);
        usePound = true;
    }
    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    var b = ((num >> 8) & 0x00ff) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    var g = (num & 0x0000ff) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}

export const toggleNewWallet = (option) => {
    const newWallet = document.getElementById("new-wallet-container");
    const walletConatiner = document.getElementById("wallet-items-container");

    switch (option) {
        case "open":
            newWallet.classList.add("open");
            walletConatiner.classList.add("fade");
            break;
        case "close":
            newWallet.classList.remove("open");
            walletConatiner.classList.remove("fade");
            break;
        default:
            break;
    }
}

export const getUserCurrencies = () => {
    return [3, 2, 0]
}

