import React, {useRef} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
} from 'react-native';
import {moderateScale, scale, verticalScale} from './utils/Scaling';

const {width} = Dimensions.get('window');

const images = [
  {
    id: '1',
    uri: 'https://th.bing.com/th/id/OIP.Pq8MPxEGieC4WCJZzGYV2wHaEo?w=254&h=180&c=7&r=0&o=5&pid=1.7',
  },
  {
    id: '2',
    uri: 'https://th.bing.com/th/id/OIP._QDcbqpMcOrHvBlj8cEEhQHaEo?w=254&h=180&c=7&r=0&o=5&pid=1.7',
  },
  {
    id: '3',
    uri: 'https://th.bing.com/th/id/OIP.MCLzVoExgXPyNi_V5gb1AwHaE7?w=268&h=180&c=7&r=0&o=5&pid=1.7',
  },
];

const ImageSlider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const scaleX = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={[styles.imageContainer, {opacity, transform: [{scaleX}]}]}>
              <Image source={{uri: item.uri}} style={styles.image} />
            </Animated.View>
          );
        }}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert('Watch Now')}>
        <Text style={styles.buttonText}>Watch Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageContainer: {
    width: width,
  },
  image: {
    marginVertical: verticalScale(20),
    width: '97%',
    height: '80%',
    borderRadius: moderateScale(10),
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    width: scale(100),
    height: verticalScale(40),
    alignSelf: 'center',
    borderRadius: moderateScale(20),
    position: 'absolute',
    top: verticalScale(500),
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ImageSlider;
