import { getPrincipalCurrency, getTokenPrice, nationalBadgeDictionary } from "./GlobalFunctions";

// Logos
import BrubankLogo from "../../assets/images/logos/brubank.svg";
import BbvaLogo from "../../assets/images/logos/bbva.svg";
import UalaLogo from "../../assets/images/logos/uala.svg";
import MercadoPagoLogo from "../../assets/images/logos/mercadopago.svg";
import BinanceLogo from "../../assets/images/logos/binance.svg";

export const getSelectedBadges = () => {
    return [
        {
            id: 3,
            value: "239,172.00",
        },
        {
            id: 2,
            value: "0",
        },
        {
            id: 0,
            value: "0.0004",
        },
    ];
}

export const getLinkedAccounts = (logoProps = null) => {
    return [
        {
            id: 1,
            name: "Brubank",
            balance: "6,337.00",
            currency: "AR$",
            color: "#6440D9",
            performance: "8.00%",
            performanceStatus: "down",
        },
        {
            id: 2,
            name: "Ualá",
            balance: "7,235.06",
            currency: "AR$",
            color: "#FE4F5A",
            performance: "138.00%",
            performanceStatus: "up",
        },
        {
            id: 3,
            name: "BBVA",
            balance: "189,600.00",
            currency: "AR$",
            color: "#005096",
            performance: "53.00%",
            performanceStatus: "",
        },
        {
            id: 4,
            name: "Mercadopago",
            balance: "36,000.00",
            currency: "AR$",
            color: "#02A6E7",
            performance: "5.00%",
            performanceStatus: "down",
        },
        {
            id: 5,
            name: "Binance",
            balance: "0.0004",
            currency: "BTC",
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
