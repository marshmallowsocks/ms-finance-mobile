import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Placeholder from 'rn-placeholder';
import constants from '../../constants';

class ValueDisplayCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let title;
        let backgroundColor;
        switch(this.props.type) {
            case 'cash':
                title = 'Cash';
                backgroundColor = constants.colors.BASE_GREEN;
                break;
            case 'liability':
                title = 'Debt';
                backgroundColor = constants.colors.BASE_RED;
                break;
            case 'investment':
                title = 'Investment';
                backgroundColor = constants.colors.BASE_YELLOW;
                break;
        }

        
        return (
            <View style={[styles.listContainer, { backgroundColor}]}>
                <Text style={{ fontFamily: 'varela', textAlign: 'center', color: constants.colors.BASE_OFFWHITE }}>{title}</Text>
                <Placeholder.Line
                    color={constants.colors.BASE_OFFWHITE}
                    width="20%"
                    textSize={14}
                    animate={'shine'}
                    onReady={!this.props.loading}>
                    <Text style={{ fontFamily: 'varela', textAlign: 'center', color: constants.colors.BASE_OFFWHITE, fontWeight: 'bold' }}>{this.props.amount}</Text>
                </Placeholder.Line>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        borderRadius: 10,
        margin: 5,
        width: 125,
        height: 75,
        padding: 15,
        shadowColor: constants.colors.BASE_BLACK,
        shadowOpacity: 0.8,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 1
        }
    }
});

ValueDisplayCard.propTypes = {
    type: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired
};

export default ValueDisplayCard;
