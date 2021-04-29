import { auth, db, FirebaseTimestamp } from '../../firebase/index'
import { SignInNavigationProp, SignUpNavigationProp } from '../../RouteStack';

type SignIn={
    email: string,
    password: string,
    navigation:SignInNavigationProp
}
// 新規登録ボタンを押した時の処理
export const signIn = (param:SignIn) => {
    // このメソッドを呼ぶだけ
    return async () => {
        return auth.signInWithEmailAndPassword(param.email, param.password)
            .then((result) => {
                const user = result.user

                if (user) {
                    const uid = user.uid
                    const timestamp = FirebaseTimestamp.now()

                    const userInitialData = {
                        created_at: timestamp,
                        email: param.email,
                        role: "customer",
                        uid: uid,
                        updated_at: timestamp,
                    }

                    db.collection('users').doc(uid).set(userInitialData)
                        .then(() => {
                            param.navigation.navigate('Home');
                        })
                }
            }).catch((error) => {
                console.log(error);
                // 失敗時の処理
            });
    }
}

type SignUp={
    email: string,
    password: string,
    navigation:SignUpNavigationProp
}
// 新規登録ボタンを押した時の処理
export const signUp = (param:SignUp) => {
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
                        role: "customer",
                        uid: uid,
                        updated_at: timestamp,
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