import { getPrincipalCurrency, getTokenPrice, nationalBadgeDictionary } from "./GlobalFunctions";

export const getSelectedBadges = (setSelectedBadges) => {
    setSelectedBadges([
        {
            id: 3,
            value: "9600",
        },
        {
            id: 2,
            value: "25",
        },
        {
            id: 1,
            value: "11",
        },
    ]);
}

/* export const getAllAccounts = () => {
    return [
        {
            id: 1,
            name: "Brubank",
            logo: "asd",
        }
    ]
} */

export const getLinkedAccounts = () => {
    return [
        {
            id: 1,
            name: "Brubank",
            balance: "1600",
            currency: "ARS",
            color: "#6440D9",
        },
        {
            id: 2,
            name: "Ualá",
            balance: "2900",
            currency: "ARS",
            color: "#3C67F6",
        },
        {
            id: 3,
            name: "BBVA",
            balance: "2100",
            currency: "ARS",
            color: "#005096",
        },
        {
            id: 6,
            name: "Macro",
            balance: "3000",
            currency: "ARS",
            color: "#017DBC",
        },
        {
            id: 4,
            name: "Binance",
            balance: "0.0004",
            currency: "BTC",
            color: "#E8B30B",
        },
        {
            id: 5,
            name: "Mdex",
            balance: "27",
            currency: "MDX",
            color: "#0E1752",
        },
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
