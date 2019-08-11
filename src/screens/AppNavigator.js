import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from 'screens/Home';

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#ef5350',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

export default createAppContainer(AppNavigator);
