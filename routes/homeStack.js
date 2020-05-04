import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/Home';
import Result from '../screens/Result'

const screens =
{
    Home:
    {
        screen: Home
    },
    Result:
    {
        screen: Result
    }
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);