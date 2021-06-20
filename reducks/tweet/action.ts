import { Tweet } from "./type";

export const NEW_POST = "NEW_POST";
export const newPostAction = (TweetState: Tweet) => {
    return {
        type: "NEW_POST",
        payload: {
            uid: TweetState.uid,
            title: TweetState.title,
            detail: TweetState.detail,
        }
    }
};

export const FETCH_TWEETS = "FETCH_TWEETS";
export const fetchTweetsAction = (TweetState: Tweet[]) => {
    return {
        type: "FETCH_TWEETS",
        payload: TweetState
    }
};
