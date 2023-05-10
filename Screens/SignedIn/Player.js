import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Button, Text, Dimensions} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';



const Player = ({navigation, route}) => {
    const [feeds, setFeeds] = useState(route.params.item);
    
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
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          }}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
          onFullscreenUpdate={setOrientation}
        />
        <View style={styles.buttons}>
          <Button
            title={status.isPlaying ? 'Pause' : 'Play'}
            onPress={() =>
              status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }
          />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'red'
    },
    video:{
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
})

export default Player;
