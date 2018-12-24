import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import constants from '../../constants';
import api from '../../api';
import { Bars } from 'react-native-loader';

class BankCard extends React.Component {
    constructor(props) {
        super(props);
        
        this.goToDetails = this.goToDetails.bind(this);
    }

    async componentDidMount() {
        if(this.props.itemToken === '') {
            return;
        }
        if(api.getAccountData(this.props.itemToken).length === 0) {
            await api.fetchAccountData(this.props.itemToken);
        }
    }

    goToDetails() {
        this.props.navigation.navigate('Details', {
            itemToken: this.props.itemToken,
            title: this.props.name,
        });
    }

    render() {
        if(this.props.loading) {
            return (
                <TouchableScale
                    friction={90}
                    tension={100}
                    activeScale={0.95}
                    onPress={this.goToDetails}>
                    <View style={[styles.listContainer, { flex: 1, alignItems: 'center', justifyContent: 'center'}]} elevation={5}>
                        <Bars color={constants.colors.BASE_BLACK} size={20} />
                    </View>
                </TouchableScale>
            );
        }
        else {
            return (
                <TouchableScale
                    friction={90}
                    tension={100}
                    activeScale={0.95}
                    onPress={this.goToDetails}>
                    <View style={styles.listContainer} elevation={5}>
                        <View style={styles.textContainer}>
                            <Text style={styles.textStyle}>{this.props.name}</Text>
                        </View>
                    </View>
                </TouchableScale>
            );
        }
    }
}

const styles = StyleSheet.create({
    listContainer: {
        borderRadius: 10,
        margin: 5,
        backgroundColor: constants.colors.BASE_OFFWHITE,
        width: 150,
        height: 100,
        shadowColor: constants.colors.BASE_BLACK,
        shadowOpacity: 0.8,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 1
        },
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        padding: 5,
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontWeight: '600',
        fontSize: 20,
        fontFamily: 'varela',
        color: constants.colors.BASE_BLACK,
    }
});

BankCard.propTypes = {
    name: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    itemToken: PropTypes.string.isRequired,
};

export default BankCard;
