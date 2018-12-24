import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import moment from 'moment';
import helpers from '../../util';
import constants from '../../constants';

class TransactionCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let color;
        let amount;

        if(this.props.amount > 0) {
            color = constants.colors.BASE_RED;
            amount = this.props.amount;
        }
        else {
            color = constants.colors.BASE_GREEN;
            amount = -1 * this.props.amount;
        }
        const parts = helpers.format(helpers.round(amount, 2)).split('.');
        if(!parts[1]) {
            parts[1] = '00';
        }

        while(parts[1].length < 2) {
            parts[1] += '0';
        }
        
        return (
            <View style={[styles.container, { borderLeftColor: color }]}>
                <View style={styles.descriptionContainer}>
                        <Text style={styles.nameStyle}>{this.props.name}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.metaContainer}>
                        <Text style={styles.dateStyle}>{moment(this.props.date).format('MMM Do YY')}</Text>
                        <Text style={styles.categoryStyle}>{this.props.category}</Text>
                    </View>
                    <View style={styles.amountContainer}>
                        <Text style={[styles.amountStyle, { color }]}>
                            {parts[0]}.<Text style={[{fontSize: 16, fontFamily: 'varela', color}]}>{parts[1]}</Text>
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: constants.colors.BASE_BLACK,
        backgroundColor: constants.colors.BASE_OFFWHITE,
        borderWidth: 2,
        borderColor: '#eee',
        borderRadius: 10,
        padding: 10,
        height: 150,
        marginBottom: 3,
    },
    nameStyle: {
        flexWrap: 'wrap',
        fontWeight: '500',
        fontSize: 20,
    },
    dateStyle: {
        color: constants.colors.BASE_BLACK,
        fontFamily: 'varela',
        fontSize: 16
    },
    categoryStyle: {
        color: constants.colors.BASE_BLACK,
        fontFamily: 'varela',
        fontSize: 16
    },
    descriptionContainer: {
        flexDirection: 'row',
        flex: 0.3
    },
    detailsContainer: {
        flexDirection: 'row',
        flex: 0.7,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    metaContainer: {
        flex: 0.6,
        justifyContent: 'flex-end',
    },
    amountContainer: {
        flex: 0.4,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    amountStyle: {
        fontSize: 22,
        fontFamily: 'varela',
    }
});

TransactionCard.propTypes = {
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
};

export default TransactionCard;