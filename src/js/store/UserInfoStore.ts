import { PrivateKey } from "../services/providers/IProvider";
import AuthService from "../services/AuthService";

export interface UserInfo {
    info: {
        fullName: string;
        wallpaper: string;
        balance: string;
        currencyTicker: string;
    },
    settings: string[],
}

const defaultState: UserInfo = {
    info: {
        fullName: '',
        wallpaper: '',
        balance: '0',
        currencyTicker: 'N/A',
    },
    settings: [''],
};

const currentState = defaultState;

function UserInfoStore(state = defaultState, action: any) {
    let newState = false;

    if (action.type === 'SET_USER_INFO') {
        newState = true;
        currentState.info = action.payload;
    } else if (action.type === 'SET_USER_SETTINGS') {
        newState = true;
        currentState.settings = action.payload;
    }

    if (newState) return JSON.parse(JSON.stringify(currentState));

    return currentState;
}

export function loadUserInfo(keys: PrivateKey) {
    return async (dispatch: any) => {
        const user = await AuthService.getAccountInfo(keys);

        // Make sure we preload the background image to get a nice effect
        const response = await fetch(user.wallpaper);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        user.wallpaper = blobUrl;

        dispatch(setUserInfo(user));
    }
}

export function setUserInfo(payload: any) {
    return {
        type: 'SET_USER_INFO',
        payload,
    };
}

export function setUserSettings(payload: any) {
    return {
        type: 'SET_USER_SETTINGS',
        payload,
    };
}

export default UserInfoStore;
