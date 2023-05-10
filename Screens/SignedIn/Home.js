import React, { useState, useEffect, useRef } from 'react';

import { View, StyleSheet, Text, FlatList, TouchableOpacity, ScrollView, ViewBase, ActivityIndicator, Image, SafeAreaView, LogBox } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '@env';
import { useScrollToTop } from '@react-navigation/native';



const Home = ({ navigation, route }) => {

    // scroll to the top
    const ref = useRef(null);
    useScrollToTop(ref)
    const [feeds, setFeeds] = useState([]);


    useEffect(() => {
        axios({
            url: `${BASE_URL}/api/videos`,
            method: 'GET',
        }).then((response) => {
            console.log(response.data.videos)
            if (response.status === 200) {
                setFeeds(response.data.videos)
                console.log("feeds", feeds)
            }
        }).catch(error => {
            console.log("video error", error);
        })
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);


    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.video} onPress={() => navigation.navigate('Player', {
                item
            })}>
                <Image style={styles.thumbnail} source={{ uri: `${BASE_URL}/${item.thumbnail}` }} />
                <View style={styles.details}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.channel}>{item.category.category}</Text>
                    <View style={styles.viewCount}>
                        <Text style={styles.views}>{item.views}</Text>
                        <Text style={styles.duration}>{item.duration}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (


        <ScrollView>
            <View style={styles.mainView}>
                <Text style={styles.Heading}>Latest Updates</Text>
                <View style={styles.mainViewPost}>
                    {
                        feeds.length < 1 ? <ActivityIndicator size={'large'} color={'#2fb8f0'} /> :
                            <FlatList
                                ref={ref}
                                data={feeds}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            />

                    }
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainView: {
        width: '100%',
        flex: 1,
        alignItems: 'center'
    },
    Heading: {
        fontSize: 32,
        marginTop: 60,
        marginLeft: 15,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    mainViewPost: {
        width: '90%',

    },

    video: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 20,
        width: '100%',
        backgroundColor: '#21abc1'
    },
    thumbnail: {
        width: '35%',
        height: '100%',
        aspectRatio: 16 / 15,
        // borderRadius: 5,
    },
    details: {
        padding: 10,
        width: '65%',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    channel: {
        color: '#999',
        fontSize: 14,
        marginTop: 5,
    },
    viewCount: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },

    views: {
        color: '#999',
        fontSize: 14,
        backgroundColor: '#73a9c2',
        padding:2,
        borderRadius:100
    },
    duration: {
        color: '#999',
        fontSize: 14,
        marginLeft: 10,
    },
})

export default Home;
