import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { inject, observer } from 'mobx-react';
import constants from '../../constants';

class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    
    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.state.params.title}`,
            headerStyle: {
                backgroundColor: constants.colors.BASE_RED,
            },
            headerTitleStyle: {
                fontWeight: '700',
                fontFamily: 'varela',
                color: constants.colors.BASE_WHITE,
            },
            headerTintColor: constants.colors.BASE_WHITE,
        }
    };
    
    render() {
        return (
            <View style={styles.container}>
                <Text>Issa settings</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default inject('store')(observer(SettingsScreen));