import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Button, Text, Dimensions, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { BASE_URL } from '@env';



const Player = ({ navigation, route }) => {
    const [feeds, setFeeds] = useState(route.params.item);
    const dateObj = new Date(feeds.created_at);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // set video orientation to landscape or portrait
    function setOrientation() {
        if (Dimensions.get('window').height > Dimensions.get('window').width) {
            //Device is in portrait mode, rotate to landscape mode.
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        }
        else {
            //Device is in landscape mode, rotate to portrait mode.
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
    }

    const video = useRef(null);
    const [status, setStatus] = useState({});
    return (
        <View style={styles.container}>
        {
            feeds.video && feeds.video === null ?
            <ActivityIndicator size={'large'} color={'#2fb8f0'} /> 
            :
            <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: `${BASE_URL}/${feeds.video}`,
                }}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
                onFullscreenUpdate={setOrientation}
            />
        }

            <View style={styles.buttons}>
                <TouchableOpacity
                    onPress={() =>
                        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                    }
                ><Text>{status.isPlaying ? 'Pause' : 'Play'}</Text></TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.container2}>
                    <Text style={styles.title}>{feeds.title}</Text>
                    <View style={styles.meta}>
                        <Text style={styles.author}>{feeds.category.category}</Text>
                        <Text style={styles.date}>{formattedDate}</Text>
                    </View>
                    <Image source={{ uri: `${BASE_URL}/${feeds.thumbnail}` }} style={styles.image} />
                    <Text  style={styles.content}>{feeds.description}</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    video: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    buttons: {
        width: '60%',
        height: 50,
        backgroundColor: '#73a9c2',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 30,
        borderRadius: 50
    },
    container2: {
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10
    },
    meta: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    author: {
        fontSize: 14,
        color: '#999',
        marginRight: 10,
        marginLeft: 10,
        color: '#acac16'
    },
    date: {
        fontSize: 14,
        color: '#acac16',
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        objectFit: 'contain'
    },
    content: {
        fontSize: 16,
        marginTop: 20,
        padding: 8,
        textAlign: "justify",
        letterSpacing: -0.5
    },
})

export default Player;
