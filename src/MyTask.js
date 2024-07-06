import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {moderateScale, scale, verticalScale} from './utils/Scaling';

const MyTask = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ImageViewer')}
        style={styles.button}>
        <Icon name="image" size={30} color="#fff" />
        <Text style={styles.buttonText}>Image Viewer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('FreetrialButton')}
        style={styles.button}>
        <Icon name="spinner" size={30} color="#fff" />
        <Text style={styles.buttonText}>Free Trial Button</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('LikesViews')}
        style={styles.button}>
        <Icon name="bar-chart" size={30} color="#fff" />
        <Text style={styles.buttonText}>Likes & Views</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ImageSlider')}
        style={styles.button}>
        <Icon name="arrows-h" size={30} color="#fff" />
        <Text style={styles.buttonText}>Slide Feature</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('SearchBar')}
        style={styles.button}>
        <Icon name="search" size={30} color="#fff" />
        <Text style={styles.buttonText}>Search Bar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200EE',
    padding: moderateScale(10),
    marginVertical: verticalScale(5),
    width: '80%',
    borderRadius: moderateScale(5),
  },
  buttonText: {
    color: '#fff',
    fontSize: moderateScale(18),
    marginLeft: scale(10),
  },
});
