import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './reducks/store/store';
import { RouteStack } from './components/stacks/RouteStack';


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RouteStack />
      </NavigationContainer>
    </Provider>
  );
}
