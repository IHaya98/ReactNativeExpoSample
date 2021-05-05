import { Tweet } from "./type";
import { db, FirebaseTimestamp, storage } from '../../firebase/index'
import { fetchTweetsAction } from "./action";

export const getUniqueStr = (myStrong?: number): string => {
    let strong = 1000;
    if (myStrong) strong = myStrong;
    return (
        new Date().getTime().toString(16) +
        Math.floor(strong * Math.random()).toString(16)
    );
}

const postsRef = db.collection('posts');

export const newPost = (Tweet: Tweet, navigation: any) => {
    return async (dispatch: any) => {
        if (Tweet.title === "" || Tweet.detail === "") {
            return alert("未入力です")
        }

        const timestamp = FirebaseTimestamp.now()
        const id = getUniqueStr();
        const data = {
            uid: Tweet.uid,
            id: id,
            title: Tweet.title,
            detail: Tweet.detail,
            image: Tweet.image,
            updated_at: timestamp
        }

        return postsRef.doc(id).set(data)
            .then(() => {
                navigation.navigate('Home')
                dispatch(fetchTweets())
            }).catch((error) => {
                throw new Error(error)
            })
    }
}
export const deletePost = (id: string | undefined) => {
    return async (dispatch: any) => {
        return postsRef.doc(id).delete()
            .then(() => {
                dispatch(fetchTweets())
            }).catch((error) => {
                throw new Error(error)
            })
    }
}
export const fetchTweets = () => {

    return async (dispatch: any) => {
        const postList: Tweet[] = []
        postsRef.orderBy('updated_at', 'desc').get()
            .then((snapshots) => {
                snapshots.forEach((snapshots) => {
                    const data: Tweet = snapshots.data();
                    const post: Tweet = {
                        id: data.id,
                        uid: data.uid,
                        title: data.title,
                        detail: data.detail,
                        image: data.image,
                        username: "",
                        email: ""
                    }
                    postList.push(post)
                })
            }).then(() => {
                Promise.all(postList.map(async (data) => {
                    const snapshots = await db.collection('users').doc(data.uid).get()
                    const user: any = snapshots.data();
                    data.username = user.username;
                    data.email = user.email
                })).then(() => {
                    dispatch(fetchTweetsAction(postList))
                })
            })
    }
}

