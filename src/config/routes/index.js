import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';

import home from '../../screens/home/home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import login from 'ContactsHub/src/screens/login/login';
import signup from 'ContactsHub/src/screens/signup/signup';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class MainStack extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { isLoggedin } = this.props;
    return (
      <NavigationContainer>
        {
          !isLoggedin ?
            <Tab.Navigator>
              <Tab.Screen name="Login" component={login} />
              <Tab.Screen name="Signup" component={signup} />
            </Tab.Navigator>
            :
            <Stack.Navigator>
              <Stack.Screen name="home" component={home} />
            </Stack.Navigator>
        }
      </NavigationContainer>
    );
  }
}

function mapStateToProps(state) {
  let isLoggedin = state.loginReducer && state.loginReducer.isLoggedin;
  return {
    isLoggedin
  };
}

export default connect(mapStateToProps)(MainStack);
