
// Components
//import AsyncStorage from '@react-native-async-storage/async-storage';

// Flags
import Arg from '../../assets/svgs/flags/ar.svg';
import Bra from '../../assets/svgs/flags/br.svg';
import Btc from '../../assets/svgs/flags/btc.svg';
import Chn from '../../assets/svgs/flags/cn.svg';
import Esp from '../../assets/svgs/flags/es.svg';
import Deu from '../../assets/svgs/flags/de.svg';
import Eur from '../../assets/svgs/flags/european_union.svg';
import Fra from '../../assets/svgs/flags/fr.svg';
import Gbr from '../../assets/svgs/flags/gb.svg';
import Ita from '../../assets/svgs/flags/it.svg';
import Jpn from '../../assets/svgs/flags/jp.svg';
import Rus from '../../assets/svgs/flags/ru.svg';
import Sau from '../../assets/svgs/flags/sa.svg';
import Usa from '../../assets/svgs/flags/us.svg';

export const badgeDictionary = (flagProps = null) => {
    return [
        {
            id: 0,
            title: 'Bitcoins',
            flag: <Btc {...flagProps} />,
            badge: 'BTC',
            color: "#ffae00",
            backgroundClass: "btc-flag",
        },
        {
            id: 1,
            title: 'Dólares estadounidenses',
            flag: <Usa {...flagProps} />,
            badge: 'USD',
            color: "#2da06e",
            backgroundClass: "usd-flag",
        },
        {
            id: 2,
            title: 'Euros',
            flag: <Eur {...flagProps} />,
            badge: 'EUR',
            color: "#004aa2",
            backgroundClass: "eur-flag"
        },
        {
            id: 3,
            title: 'Pesos argentinos',
            flag: <Arg {...flagProps} />,
            badge: 'ARS',
            color: "#338af3",
            backgroundClass: "arg-flag"
        }
    ]
};

export const nationalitiesFlagsLang = [
    {
        language: 'language.option.ar',
        region: null,
        flag: Sau,
        code: 'ar-AR'
    },
    {
        language: 'language.option.de',
        region: null,
        flag: Deu,
        code: 'de-DE'
    },
    {
        language: 'language.option.es',
        region: 'region.option.ar',
        flag: Arg,
        code: 'es-AR'
    },
    {
        language: 'language.option.es',
        region: 'region.option.es',
        flag: Esp,
        code: 'es-ES'
    },
    {
        language: 'language.option.en',
        region: 'region.option.gb',
        flag: Gbr,
        code: 'en-GB'
    },
    {
        language: 'language.option.en',
        region: 'region.option.us',
        flag: Usa,
        code: 'en-US'
    },
    {
        language: 'language.option.fr',
        region: null,
        flag: Fra,
        code: 'fr-FR'
    },
    {
        language: 'language.option.it',
        region: null,
        flag: Ita,
        code: 'it-IT'
    },
    {
        language: 'language.option.jp',
        region: null,
        flag: Jpn,
        code: 'jp-JP'
    },
    {
        language: 'language.option.pt',
        region: 'region.option.br',
        flag: Bra,
        code: 'pt-BR'
    },
    {
        language: 'language.option.ru',
        region: null,
        flag: Rus,
        code: 'ru-RU'
    },
    {
        language: 'language.option.zh',
        region: 'region.option.cn',
        flag: Chn,
        code: 'zh-CN'
    },
]

export const nationalBadgeDictionary = ["ARS", "USD", "EUR"];

export const getPrincipalCurrency = () => {
    return localStorage.getItem("principalCurrency") || "ARS";
}

//? Get the current blue usd price in Argentina
export const getUsdPrice = async () => {
    return fetch(`https://www.dolarsi.com/api/api.php?type=valoresprincipales`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return parseFloat(data[1].casa.venta).toFixed(2);
            /* data.forEach((item) => {
                if (item.casa.nombre === 'Dolar Blue') {
                    return (parseFloat(item.casa.venta));
                }
            }); */
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getTokenPrice = async (token) => {
    let api;
    token = token.toUpperCase();
    if (token !== "MDX") {
        api = `https://api.binance.com/api/v3/ticker/price?symbol=${token}USDT`;
    } else {
        api = `https://api.huobi.pro/market/trade?symbol=mdxusdt`;
    }

    return await fetch(api)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (api.includes("binance")) {
                return parseFloat(data.price).toFixed(2);
            } else {
                return parseFloat(data.tick.data[0].price).toFixed(2);
            }
        })
        .catch((err) => {
            console.log(err);
        });
};
