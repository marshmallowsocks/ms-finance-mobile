import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';
import {
    Bubbles
} from 'react-native-loader';
import {
    inject,
    observer
} from 'mobx-react';

import AccountCard from '../cards/AccountCard';
import api from '../../api';
import constants from '../../constants';
import TransactionCard from '../cards/TransactionCard';
import CollapsibleHeader from '../headers/CollapsibleHeader';

class DetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            itemToken: null,
        };
    }

    static navigationOptions = ({ navigation }) => ({
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
    });

    async componentDidMount() {
        const { navigation } = this.props;
        const { domainStore } = this.props.store;
        const itemToken = navigation.getParam('itemToken', '');
        if(api.getAccountData(itemToken).length === 0) {
            await api.fetchAccountData(itemToken);
        }
        await api.fetchTransactionsForItem(itemToken);
        domainStore.setCurrentAccountId(api.getAccountData(itemToken)[0].accountId);
        this.setState({
            loading: false,
            itemToken: itemToken,
        });
    }
    
    keyExtractor = (item, index) => `${index}`;

    renderItem = ({ item }) => {
        const style = {};
        const { domainStore } = this.props.store;
        if(item.accountId === domainStore.getCurrentAccountId()) {
            style.transform = [{
                scale: 1.05,
            }];
        }
        return (
            <View style={style}>
                <AccountCard 
                    name={item.name}
                    balances={item.balances}
                    type={item.type}
                    accountId={item.accountId}
                />
            </View>
        );
    }

    renderTransaction = ({ item }) => (
        <TransactionCard 
            name={item.name}
            amount={item.amount}
            date={item.date}
            category={item.mainCategory}
        />
    );

    render() {
        if(this.state.loading) {
            return (
                <View style={styles.loadingContainer}>
                    <Bubbles size={20} color={constants.colors.BASE_BLACK} />
                </View>
            );
        }
        const { transactionStore } = this.props.store;
        let noTransactions = false;
        
        if(!transactionStore.currentTransactions || transactionStore.currentTransactions.length === 0) {
            noTransactions = true;
        }

        return (
            <View style={styles.container}>
                <View style={styles.transactionsContainer}>
                    <Text style={styles.transactionsHeader}>Transactions</Text>
                    {noTransactions ? 
                        <Text style={[styles.container, { fontSize: 22 }]}>No transactions available.</Text>
                        :
                        <FlatList
                            style={{ marginBottom: 10 }}
                            keyExtractor={this.keyExtractor}
                            data={transactionStore.currentTransactions}
                            renderItem={this.renderTransaction}
                        />
                    }
                </View>
                <View style={styles.accountContainer}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={this.keyExtractor}
                        data={api.getAccountData(this.state.itemToken)}
                        renderItem={this.renderItem}
                        extraData={this.state}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    accountContainer: {
        flex: 0.15,
        borderWidth: 2,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderColor: '#eee',
    },
    transactionsContainer: {
        flex: 0.85,
        marginLeft: 5,
        marginRight: 5,
    },
    transactionsHeader: {
        fontWeight: 'bold',
        fontSize: 40,
    }
});

export default inject('store')(observer(DetailsScreen));