import React from 'react';
import PropTypes from 'prop-types';
import DepositoryCard from './DepositoryCard';
import CreditCard from './CreditCard';
import constants from '../../constants';
import InvestmentCard from './InvestmentCard';

class AccountCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        switch(this.props.type) {
            case 'depository':
                return (<DepositoryCard 
                            name={this.props.name}
                            balances={this.props.balances}
                            accountId={this.props.accountId}
                        />);
            case 'credit':
                return (<CreditCard 
                            name={this.props.name}
                            balances={this.props.balances}
                            accountId={this.props.accountId}
                        />);
            case 'brokerage':
                return (<InvestmentCard
                            name={this.props.name}
                            balances={this.props.balances}
                            accountId={this.props.accountId}
                        />);
        }
    }
}

AccountCard.propTypes = {
    name: PropTypes.string.isRequired,
    balances: PropTypes.shape({
        available: PropTypes.number,
        current: PropTypes.number,
        limit: PropTypes.any
    }),
    type: PropTypes.string.isRequired,
    accountId: PropTypes.string.isRequired,
};

export default AccountCard;
