export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState: { isSignedIn: boolean; uid: any; username: any; }) => {
    return {
        type: "SIGN_IN",
        payload: {
            isSignedIn: userState.isSignedIn,
            uid: userState.uid,
            username: userState.username
        }
    }
};