import { auth, db, FirebaseTimestamp } from '../../firebase/index'
import { SignInNavigationProp, SignUpNavigationProp } from '../../RouteStack';
import { signInAction } from './action';

type SignIn = {
    email: string,
    password: string,
    navigation: SignInNavigationProp
}
// 新規登録ボタンを押した時の処理
export const signIn = (param: SignIn) => {
    // このメソッドを呼ぶだけ
    return async (dispatch: any) => {
        return auth.signInWithEmailAndPassword(param.email, param.password)
            .then((result) => {
                const user = result.user
                if (user) {
                    const uid = user.uid
                    db.collection('users').doc(uid).get()
                        .then(snapshot => {
                            const data:any = snapshot.data()

                            dispatch(signInAction({
                                isSignedIn: true,
                                uid: uid,
                                username: data.username
                            }))

                            param.navigation.navigate('Home');
                        })
                }
            }).catch((error) => {
                console.log(error);
                // 失敗時の処理
            });
    }
}

type SignUp = {
    email: string,
    username: string,
    password: string,
    navigation: SignUpNavigationProp
}
// 新規登録ボタンを押した時の処理
export const signUp = (param: SignUp) => {
    // このメソッドを呼ぶだけ
    return async () => {
        return auth.createUserWithEmailAndPassword(param.email, param.password)
            .then((result) => {
                const user = result.user

                if (user) {
                    const uid = user.uid
                    const timestamp = FirebaseTimestamp.now()

                    const userInitialData = {
                        created_at: timestamp,
                        email: param.email,
                        uid: uid,
                        updated_at: timestamp,
                        username: param.username
                    }

                    db.collection('users').doc(uid).set(userInitialData)
                        .then(() => {
                            param.navigation.navigate('SignIn');
                        })
                }
            }).catch((error) => {
                console.log(error);
                // 失敗時の処理
            });
    }
}

export const listenAuthState = () => {
    return async(dispatch:any) => {
        return auth.onAuthStateChanged(user=>{
            if(user){
                const uid =user.uid

                db.collection('users').doc(uid).get()
                    .then(snapshot => {
                        const data:any = snapshot.data()

                        dispatch(signInAction({
                            isSignedIn:true,
                            uid: uid,
                            username:data.username
                        }))
                    })
            }else{
                
            }
        })
    }

}