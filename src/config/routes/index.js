import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';

import home from '../../screens/home/home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import login from 'ContactsHub/src/screens/login/login';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainStack(props) {
  const {isLoggedin} = props;
  return (
    <NavigationContainer>
      {
        !isLoggedin ?
        <Tab.Navigator>
          <Tab.Screen name="Login" component={login} />
        </Tab.Navigator>
        : 
        <Stack.Navigator>
          <Stack.Screen name="home" component={home} />
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
}

function mapStateToProps(state) {
  return {
    isLoggedin: state.LoginReducer.isLoggedin,
  };
}

export default connect(mapStateToProps)(MainStack);
