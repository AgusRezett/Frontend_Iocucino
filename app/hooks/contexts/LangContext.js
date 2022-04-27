import React, { useState, createContext } from 'react';

// Components
import AsyncStorage from '@react-native-async-storage/async-storage';
import IntlProvider from 'react-intl-native';

// Languages
import EnglishUsLang from '../../languages/en-US.json';
import SpanishArLang from '../../languages/es-AR.json';

// Functions

export const langContext = createContext();

export const LangProvider = ({ children }) => {
    AsyncStorage.setItem('lang-code', 'en-US');

    const [language, setLanguage] = useState(SpanishArLang);
    const [locale, setLocale] = useState("fr-FR");
    const [firstFetch, setFirstFetch] = useState(true);

    AsyncStorage.getItem('lang-code').then(value => {
        if (value) {
            setLocale(value);
        } else {
            setLocale('es-AR');
        }
    }).catch(error => {
        //console.log(error);
    });

    const changeLang = (newLang) => {
        if (typeof newLang === "object") {
            newLang = newLang.code;
        }
        //console.log(newLang);
        //console.log("newLang: ", newLang);
        //await AsyncStorage.setItem('lang-code', newLang);
        switch (newLang) {
            case 'es-AR':
                setLanguage(SpanishArLang);
                setLocale('es-AR');
                break;
            case 'en-US':
                setLanguage(EnglishUsLang);
                setLocale('en-US');
                //console.log(locale);
                break;
            default:
                setLanguage(SpanishArLang);
                setLocale('es-AR');
                break;
        }
    };

    if (firstFetch) {
        //console.log("locale1: ", locale);
        changeLang("en-US");
        //console.log("locale2: ", locale);

        setFirstFetch(false);
    }

    return (
        <langContext.Provider value={{ changeLang: changeLang }}>
            {/* <IntlProvider locale={locale} messages={language}> */}
            {children}
            {/* </IntlProvider> */}
        </langContext.Provider>
    );
}
