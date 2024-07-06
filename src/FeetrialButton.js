import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ActivityIndicator,
  ImageBackground,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import {moderateScale, scale, verticalScale} from './utils/Scaling';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FreetrialButton = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonText, setButtonText] = useState('Click Me');
  const scrollY = useRef(new Animated.Value(0)).current;
  const widthAnim = useRef(new Animated.Value(scale(200))).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    setLoading(true);
    setButtonText('');
    Animated.timing(widthAnim, {
      toValue: scale(50),
      duration: 400,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      setLoading(false);
      setModalVisible(true);
    }, 2000);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setLoading(true);
    setButtonText('');

    setTimeout(() => {
      setLoading(false);
      setButtonText('Click Me');
      Animated.timing(widthAnim, {
        toValue: scale(200),
        duration: 400,
        useNativeDriver: false,
      }).start();
    }, 1000);
  };

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > verticalScale(200)) {
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(headerOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={[styles.stickyHeader, {opacity: headerOpacity}]}>
        <Text style={styles.headerText}>Sticky Header</Text>
      </Animated.View>
      <ScrollView
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <ImageBackground
          source={{
            uri: 'https://th.bing.com/th/id/OIP.vxUy1zLpKiINAb8ElwQrdAHaHa?w=177&h=180&c=7&r=0&o=5&pid=1.7',
          }}
          style={styles.imageBackground}>
          <Animated.View
            style={[
              styles.buttonContainer,
              {
                width: widthAnim,
                backgroundColor: loading ? 'transparent' : 'orange',
              },
            ]}>
            <TouchableOpacity
              onPress={handlePress}
              style={styles.touchable}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>{buttonText}</Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        </ImageBackground>
        <Image
          style={styles.image}
          source={{
            uri: 'https://th.bing.com/th/id/OIP.pQMIypDzLHPLG3WDFk5p6wHaEc?rs=1&pid=ImgDetMain',
          }}
        />
        <Image
          style={styles.imageone}
          source={{
            uri: 'https://th.bing.com/th/id/OIP.fpsU-sMFGyiiNQ-Vh4ECCwHaIR?w=158&h=180&c=7&r=0&o=5&pid=1.7',
          }}
        />
      </ScrollView>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={handleCloseModal}
        swipeDirection="down"
        backdropOpacity={0}
        onSwipeComplete={handleCloseModal}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.headingContainer}>
            <Text style={styles.Description}>Description</Text>
            <TouchableOpacity onPress={handleCloseModal}>
              <Ionicons name="close-circle" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalText}>This is a modal</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  imageBackground: {
    width: '100%',
    height: verticalScale(400),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: verticalScale(300),
  },
  imageone: {
    width: '100%',
    height: verticalScale(500),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: verticalScale(10),
    borderRadius: moderateScale(25),
    overflow: 'hidden',
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    height: moderateScale(490),
    paddingVertical: moderateScale(20),
    paddingHorizontal: scale(10),
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: scale(330),
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: verticalScale(10),
  },
  Description: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: moderateScale(18),
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalText: {
    fontSize: moderateScale(16),
    color: '#000',
  },
  closeButton: {
    marginTop: verticalScale(20),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    backgroundColor: 'orange',
    borderRadius: moderateScale(10),
  },
  closeButtonText: {
    fontSize: moderateScale(16),
    color: '#fff',
    fontWeight: 'bold',
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: verticalScale(50),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  headerText: {
    color: '#000',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
});

export default FreetrialButton;
