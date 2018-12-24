import {
    createStackNavigator,
    createSwitchNavigator,
} from 'react-navigation';
import DetailsScreen from '../components/Details';
import LoginScreen from '../components/Login';
import HomeScreen from '../components/Home';
import SettingsScreen from '../components/Settings';

const AuthStack = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        },
    },
});

const AppStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: null,
        },
    },
    Details: {
        screen: DetailsScreen,
    },
    Settings: {
        screen: SettingsScreen,
    },
});

export default createSwitchNavigator({
    Login: AuthStack,
    App: AppStack,
}, {
    initialRouteName: 'Login'
});