import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {
    observer,
    inject,
} from 'mobx-react';
import constants from '../../constants';
import {
    Icon,
    Button,
} from 'react-native-elements';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { authenticationStore } = this.props.store;
        return (
            <View style={styles.container}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>
                        Hello
                    </Text>
                </View>
                <View style={styles.controlsContainer}>
                    <Icon 
                        name='cogs'
                        type='font-awesome'
                        size={32}
                        iconStyle={styles.controlIconStyle}
                        onPress={() => this.props.navigation.navigate('Settings', {
                            title: authenticationStore.username,
                        })}
                    />
                </View>
            </View>
        );
    }
}
      
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 38,
        paddingLeft: 10,
        flexDirection: 'row',
    },
    headerTextContainer: {
        flex: 0.7
    },
    headerText: {
        fontWeight: '900',
        fontSize: 40,
        fontFamily: 'varela',
    },
    controlsContainer: {
        flex: 0.3,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    controlIconStyle: {
        padding: 10,
    },
});

Header.propTypes = {
    navigation: PropTypes.any.isRequired,
}

export default inject('store')(observer(Header));