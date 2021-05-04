import { User } from "./type";

export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState: User) => {
    return {
        type: "SIGN_IN",
        payload: {
            isSignedIn: userState.isSignedIn,
            uid: userState.uid,
            username: userState.username
        }
    }
};
export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
    return {
        type: "SIGN_OUT",
        payload: null
    }
};

export const UPDATE_USER = "UPDATE_USER";
export const updateUserAction = (userState: User) => {
    return {
        type: "UPDATE_USER",
        payload: {
            uid: userState.uid,
            username: userState.username
        }
    }
};