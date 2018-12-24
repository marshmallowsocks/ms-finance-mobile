import React from 'react';
import {
    StyleSheet
} from 'react-native';
import {
    ListItem
} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import {
    inject,
    observer
} from 'mobx-react';
import helpers from '../../util';
import constants from '../../constants';

class DepositoryCard extends React.Component {
    constructor(props) {
        super(props);
    }

    setAccountId() {
        const { domainStore } = this.props.store;
        domainStore.setCurrentAccountId(this.props.accountId);
    }

    render() {
        const {
            available,
            current,
            limit
        } = this.props.balances;
        let amount; 
        if(available !== null) {
            amount = helpers.format(helpers.round(available, 2));
        }
        else if(current !== null) {
            amount = helpers.format(helpers.round(current, 2));
        }
        else {
            amount = 'Unavailable.'
        }
        return (
            <ListItem
                component={TouchableScale}
                elevation={5}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95} //

                containerStyle={styles.listContainer}
                elevation={5}
                title={this.props.name}
                titleStyle={styles.titleStyle}
                subtitleStyle={{ color: 'white' }}
                subtitle={amount}
                onPress={() => this.setAccountId()}
            />
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        borderRadius: 10,
        margin: 5,
        backgroundColor: constants.colors.BASE_GREEN,
        height: 100,
        width: 195,
        shadowColor: constants.colors.BASE_GREEN,
        shadowOpacity: 0.8,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    titleStyle: {
        color: constants.colors.BASE_OFFWHITE,
        fontWeight: 'bold',
        marginBottom: 30
    }
});

export default inject('store')(observer(DepositoryCard));