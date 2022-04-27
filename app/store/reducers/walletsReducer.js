import { getLinkedAccounts } from '../../functions/HomeFunctions';
import { SELECT_WALLET, ADD_WALLET } from '../actions/walletActions'

const initialState = {
	linkedAccounts: getLinkedAccounts(),
	selectedAccount: null,
}

export default WalletReducer = (state = initialState, action) => {
	switch (action.type) {
		case SELECT_WALLET:
			return {
				...state,
				selectedAccount: action.payload
			}
		case ADD_WALLET:
			return {
				...state,
				linkedAccounts: [...state.linkedAccounts, action.payload]
			}
		default:
			return state;
	}
};
