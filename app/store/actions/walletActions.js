export const SELECT_WALLET = 'SELECT_WALLET';
export const ADD_WALLET = 'ADD_WALLET';

export const selectWallet = (wallet) => {
    return {
        type: SELECT_WALLET,
        payload: wallet
    };
}

export const addWallet = (wallet) => {
    return {
        type: ADD_WALLET,
        payload: wallet
    };
}