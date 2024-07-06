import React, {useRef} from 'react';
import {
  View,
  Image,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const ImageViewer = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  let lastScale = 1;
  let lastRotate = 0;
  let lastPan = {x: 0, y: 0};

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => {
      pan.setOffset(lastPan);
      pan.setValue({x: 0, y: 0});
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.numberActiveTouches === 2) {
    
        let touch1 = evt.nativeEvent.touches[0];
        let touch2 = evt.nativeEvent.touches[1];

        let dx = touch1.pageX - touch2.pageX;
        let dy = touch1.pageY - touch2.pageY;

        let distance = Math.sqrt(dx * dx + dy * dy);
        let angle = Math.atan2(dy, dx) * (180 / Math.PI);

        if (lastScale === 1) {
          lastScale = distance;
        }
        if (lastRotate === 0) {
          lastRotate = angle;
        }

        let scaleFactor = distance / lastScale;
        let rotation = angle - lastRotate;

        scale.setValue(scaleFactor);
        rotate.setValue(rotation);
      } else {
        // Handle pan
        pan.x.setValue(gestureState.dx);
        pan.y.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      lastPan = {
        x: lastPan.x + gestureState.dx,
        y: lastPan.y + gestureState.dy,
      };
      pan.flattenOffset();

      if (gestureState.numberActiveTouches === 2) {
        lastScale = 1;
        lastRotate = 0;
      }
    },
  });

  const transformStyle = {
    transform: [
      {translateX: pan.x},
      {translateY: pan.y},
      {scale},
      {
        rotate: rotate.interpolate({
          inputRange: [-180, 180],
          outputRange: ['-180deg', '180deg'],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        {...panResponder.panHandlers}
        source={{
          uri: 'https://th.bing.com/th?id=OIP.1d6tBbNiJTFQNEK_k0sSjQHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
        }}
        style={[styles.image, transformStyle]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  image: {
    width: width,
    height: height,
  },
});

export default ImageViewer;
