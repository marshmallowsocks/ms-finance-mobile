import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import {
    Bars
} from 'react-native-loader';
import constants from '../../constants';

class NetBalanceCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.listContainer}>
                <Text style={styles.netBalanceText}>Net balance</Text>
                    {
                        this.props.loading ? 
                        <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
                            <Bars size={20} color={constants.colors.BASE_OFFWHITE} />
                        </View>
                        :
                        <Text style={styles.amountText}>{this.props.amount}</Text>
                    }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        borderRadius: 10,
        flex: 1,
        margin: 5,
        padding: 15,
        backgroundColor: constants.colors.BASE_BLACK,
        shadowColor: constants.colors.BASE_BLACK,
        shadowOpacity: 0.8,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    netBalanceText: {
        color: constants.colors.BASE_OFFWHITE,
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'varela',
    },
    amountText: {
        color: constants.colors.BASE_OFFWHITE,
        textAlign: 'center',
        fontSize: 35,
        fontFamily: 'varela',
    },
});

NetBalanceCard.propTypes = {
    amount: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default NetBalanceCard;
