import React from 'react';

import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import store from './store';

import SignIn from './screens/signin';
import SignUp from './screens/signup';
import Dash from './screens/dash';
import ChangePassword from './screens/change_password';
const {Navigator, Screen} = createStackNavigator();

const Stack: React.FC = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Screen name="Cadastre-se" component={SignUp} />
          <Screen name="Entrar" component={SignIn} />
          <Screen name="dash" component={Dash} />
          <Screen name="ChangePassword" component={ChangePassword} />
        </Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default Stack;
