import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  buildWebScreen,
  WebScreenRuleConfig,
} from '@react-native-turbo-webview/navigation';
import { default as NativeScreen } from './NumbersScreen';
import ErrorScreen from './ErrorScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

enum Routes {
  NotFound = 'NotFound',
  NumbersScreen = 'NumbersScreen',
  WebviewInitial = 'WebviewInitial',
  New = 'New',
  SuccessScreen = 'SuccessScreen',
  NonExistentScreen = 'NonExistentScreen',
  SignIn = 'SignIn',
  Fallback = 'Fallback',
  NestedTabNative = 'NestedTabNative',
  NestedTabWeb = 'NestedTabWeb',
  NestedTab = 'NestedTab',
}

const webScreenConfig: WebScreenRuleConfig = {
  baseURL: 'http://localhost:45678/',
  routes: {
    [Routes.WebviewInitial]: {
      urlPattern: '',
      title: 'React Native Web Screen',
    },
    [Routes.New]: {
      urlPattern: 'new',
      title: 'A Modal Webpage',
      presentation: 'modal',
    },
    [Routes.SuccessScreen]: {
      urlPattern: 'success',
      title: 'It Worked!',
      presentation: 'modal',
    },
    [Routes.NumbersScreen]: {
      urlPattern: 'numbers',
    },
    [Routes.SignIn]: {
      urlPattern: 'signin',
      title: 'Sign In',
      presentation: 'modal',
    },
    [Routes.NestedTab]: {
      routes: {
        [Routes.NestedTabWeb]: {
          urlPattern: 'nested',
          title: 'Nested Web',
        },
      },
    },
    [Routes.Fallback]: { urlPattern: '*', title: '' },
  },
};

const WebScreen = buildWebScreen(webScreenConfig);

const NestedTab: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen {...WebScreen.screens.NestedTabWeb} />
      <Tab.Screen
        name={Routes.NestedTabNative}
        component={NativeScreen}
        options={{ title: 'Nested Native' }}
      />
    </Tab.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer linking={WebScreen.linking}>
      <Stack.Navigator
        screenOptions={{
          headerBackTitle: 'Back',
          headerTintColor: '#00094a',
        }}
      >
        <Stack.Screen {...WebScreen.screens.WebviewInitial} />
        <Stack.Screen
          name={Routes.NumbersScreen}
          component={NativeScreen}
          options={{ title: 'A List of Numbers' }}
        />
        <Stack.Screen {...WebScreen.screens.New} />
        <Stack.Screen {...WebScreen.screens.SuccessScreen} />
        <Stack.Screen {...WebScreen.screens.SignIn} />
        <Stack.Screen {...WebScreen.screens.Fallback} />
        <Stack.Screen
          name={Routes.NotFound}
          component={ErrorScreen}
          options={{ title: 'Not Found' }}
        />
        <Stack.Screen
          name={Routes.NestedTab}
          component={NestedTab}
          options={{ title: 'Nested Top Tab' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
