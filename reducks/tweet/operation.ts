import { Tweet } from "./type";
import { db, FirebaseTimestamp } from '../../firebase/index'
import { fetchTweetsAction } from "./action";
const getUniqueStr = (myStrong?: number): string => {
    let strong = 1000;
    if (myStrong) strong = myStrong;
    return (
        new Date().getTime().toString(16) +
        Math.floor(strong * Math.random()).toString(16)
    );
}
type UserInfo = {
    uid: string,
    username: string,
    email: string
}
const postsRef = db.collection('posts');

export const newPost = (Tweet: Tweet, navigation: any) => {
    return async (dispatch: any) => {

        const timestamp = FirebaseTimestamp.now()
        if (Tweet.uid != "") {
            await db.collection('users').doc(Tweet.uid).get().then(snapshot => {
                const ref: UserInfo | any = snapshot.data()
                Tweet.uid = ref.uid
                Tweet.username = ref.username
                Tweet.email = ref.email
            });

        }
        const id = getUniqueStr();
        const data = {
            username: Tweet.username,
            uid: Tweet.uid,
            email: Tweet.email,
            id: id,
            title: Tweet.title,
            detail: Tweet.detail,
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

export const fetchTweets = () => {

    return async (dispatch: any) => {
        const postList: Tweet[] = []
        postsRef.orderBy('updated_at', 'desc').get()
        .then((snapshots)=>{
            snapshots.forEach((snapshots) => {
                const data: Tweet = snapshots.data();
                const post: Tweet = {
                    id: data.id,
                    uid: data.uid,
                    title: data.title,
                    detail: data.detail,
                    username: "",
                    email: ""
                }
                postList.push(post)
            })
        }).then(()=>{
            Promise.all(postList.map(async (data) => {
                const snapshots = await db.collection('users').doc(data.uid).get()
                const user: any = snapshots.data();
                data.username = user.username;
                data.email = user.email
            })).then(()=>{
                dispatch(fetchTweetsAction(postList))
            })
        })
    }
}

