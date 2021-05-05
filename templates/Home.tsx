import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, SafeAreaView, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchTweets } from '../reducks/tweet/operation';
import { State } from '../reducks/store/type';
import { Tweet } from '../reducks/tweet/type';
import { TweetCard } from '../components/tweet';
import { ScrollView } from 'react-native-gesture-handler';
import { TwoButtonAlert } from '../components/ui-kit';
import { Modal } from 'react-native-paper';

const Home: React.FC = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const selector = useSelector((state: State) => state.tweet)
    const tweets: Tweet[] = selector.list
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        dispatch(fetchTweets())
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={async () => {
                            setRefreshing(true)
                            await dispatch(fetchTweets())
                            setRefreshing(false)
                        }
                        }
                    />
                }
            >
                {tweets.length > 0 && (
                    tweets.map((tweet: Tweet) => (
                        <TweetCard
                            key={tweet.id} title={tweet.title} detail={tweet.detail}
                            username={tweet.username} email={tweet.email} id={tweet.id}
                            images={tweet.image}
                        />
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 24,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        alignSelf: 'center',
        marginBottom: 24,
    },
    input: {
        backgroundColor: '#ddd',
        height: 48,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
    },
    button: {
        height: 48,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        width: '60%',
        alignSelf: 'center',
        margin: 10,
    },
    buttonTitle: {
        fontSize: 18,
        color: '#fff',
    },
});

export default Home;