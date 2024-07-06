import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ImageViewer from '../ImageViewer';
import MyTask from '../MyTask';
import LikesViews from '../LikesViews';
import ImageSlider from '../ImageSlider';
import FreetrialButton from '../FeetrialButton';
import SearchBar from '../SearchBar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function NavigationScreen({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MyTask" component={MyTask} />
        <Stack.Screen name="ImageViewer" component={ImageViewer} />
        <Stack.Screen name="LikesViews" component={LikesViews} />
        <Stack.Screen name="ImageSlider" component={ImageSlider} />
        <Stack.Screen name="FreetrialButton" component={FreetrialButton} />
        <Stack.Screen name="SearchBar" component={SearchBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
