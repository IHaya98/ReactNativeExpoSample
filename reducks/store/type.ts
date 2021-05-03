import { Tweet } from "../tweet/type";

export interface State {
    users: {
        isSignedIn: boolean,
        uid: string,
        username: string,
        email: string
    }
    tweet: {
        list: Tweet[]
    }
}