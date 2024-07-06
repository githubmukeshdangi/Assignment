import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import Modal from 'react-native-modal';
import {moderateScale, scale, verticalScale} from './utils/Scaling';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LikesViews = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const likesAnim = useRef(new Animated.Value(0)).current;
  const viewsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setLikes(prevLikes => prevLikes + 1);
      setViews(prevViews => prevViews + 1);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    animateCount(likesAnim);
  }, [likes]);

  useEffect(() => {
    animateCount(viewsAnim);
  }, [views]);

  const animateCount = animValue => {
    animValue.setValue(0);
    Animated.timing(animValue, {
      toValue: 1,
      duration: 700,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.post}
        source={{
          uri: 'https://th.bing.com/th/id/OIF.CQ7f8THj9VChh6xRZeLbIA?w=252&h=180&c=7&r=0&o=5&pid=1.7',
        }}
      />
      <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.heading}>
          Rohit Sharma made it india deserve It: Shoab Aktar Lauds ...More
        </Text>
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        swipeDirection="down"
        backdropOpacity={0}
        onSwipeComplete={toggleModal}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.headingcontainer}>
            <Text style={styles.Description}>Description</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Ionicons name="close-circle" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.bar}></View>
          <Text style={styles.headingformodal}>
            Rohit Sharma made it india deserve It: Shoab Aktar Lauds
          </Text>
          <View style={styles.countbox}>
            <View style={styles.likeview}>
              <Animated.Text
                style={[
                  styles.count,
                  {
                    transform: [
                      {
                        translateY: likesAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [10, 0],
                        }),
                      },
                    ],
                  },
                ]}>
                {likes}
              </Animated.Text>
              <Text style={styles.countText}>Likes</Text>
            </View>
            <View style={styles.likeview}>
              <Animated.Text
                style={[
                  styles.count,
                  {
                    transform: [
                      {
                        translateY: viewsAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [10, 0],
                        }),
                      },
                    ],
                  },
                ]}>
                {views}
              </Animated.Text>
              <Text style={styles.countText}>Views</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  post: {
    width: scale(350),
    height: verticalScale(200),
  },
  bar: {borderBottomWidth: moderateScale(0.3), borderBottomColor: 'gray'},
  heading: {
    color: 'black',
    fontSize: moderateScale(16),
    marginHorizontal: scale(10),
    fontWeight: 'bold',
    marginVertical: verticalScale(10),
  },
  headingformodal: {
    color: 'black',
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    marginVertical: verticalScale(10),
  },
  Description: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: moderateScale(18),
  },
  headingcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: scale(330),
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: verticalScale(10),
  },
  modalContent: {
    backgroundColor: 'white',
    height: moderateScale(490),
    paddingVertical: moderateScale(20),
    paddingHorizontal: scale(10),
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
  },
  countText: {
    fontSize: moderateScale(15),
    marginVertical: verticalScale(2),
    textAlign: 'center',
  },
  count: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  likeview: {
    alignItems: 'center',
  },
  countbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(30),
    marginVertical: verticalScale(10),
  },
});

export default LikesViews;
