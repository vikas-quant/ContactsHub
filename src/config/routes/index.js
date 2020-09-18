import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';

import home from '../../screens/home/home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function MainStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={home} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function mapStateToProps(state) {
  return {
    register: state.register,
  };
}

export default connect(mapStateToProps)(MainStack);
