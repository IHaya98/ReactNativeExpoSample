import { auth, db, FirebaseTimestamp } from '../../firebase/index'
import { signInAction, signOutAction, updateUserAction } from './action';
import { User } from './type';

export const updateUserInfo = (user:User) => {
    return async(dispatch: any) =>{
        if(user.username === ""){
            alert("必須項目が未入力です")
            return false
        }else{
            db.collection('users').doc(user.uid).set({username:user.username},{merge: true})
            .then(()=>{
                dispatch(updateUserAction(user))
            })
        }

    }
}

type SignIn = {
    email: string,
    password: string,
    navigation: any
}
// 新規登録ボタンを押した時の処理
export const signIn = (param: SignIn) => {
    // このメソッドを呼ぶだけ
    return async (dispatch: any) => {
        if(param.email === "" || param.password ===""){
            alert("必須項目が未入力です。")
            return false
        }
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

                            param.navigation.navigate('HomeStack');
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
    navigation: any
}
// 新規登録ボタンを押した時の処理
export const signUp = (param: SignUp) => {
    // このメソッドを呼ぶだけ
    return async () => {
        if(param.email === "" || param.password ==="" || param.username === ""){
            alert("必須項目が未入力です。")
            return false
        }
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
                            param.navigation.navigate('SignInStack');
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

export const resetPassword = (email:string,navigation:any) => {
    return async() =>{
        if(email === ""){
            alert("必須項目が未入力です")
            return false
        }else{
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert("入力されたアドレスにパスワードリセット用のメールを送りました。")
                    navigation.navigate('SignIn');
                }).catch(() => {
                    alert("パスワードリセットに失敗しました。")
                })
        }

    }
}

export const signOut = (navigation:any) => {
    return async(dispatch:any) => {
        auth.signOut()
            .then(() => {
                dispatch(signOutAction());
                navigation.navigate('SignInStack');
            })
    }
}