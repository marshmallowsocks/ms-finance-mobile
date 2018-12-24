import React from 'react';
import {
    FlatList,
    View,
    StyleSheet,
    ScrollView,
    Text,
} from 'react-native';
import {
    observer,
    inject
} from 'mobx-react';
import {
    Agenda,
} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';

import ActionButton from 'react-native-action-button';
import PlaidAuthenticator from 'react-native-plaid-link';

import Header from '../headers/Header';
import BankCard from '../cards/BankCard';
import ValueDisplayCard from '../cards/ValueDisplayCard';
import TransactionCard from '../cards/TransactionCard';
import api from '../../api';
import helpers from '../../util';
import NetBalanceCard from '../cards/NetBalanceCard';
import constants from '../../constants';
import moment from 'moment';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'Loading..',
                    itemToken: ' ',
                    loading: true
                },
                {
                    name: 'Loading..',
                    itemToken: ' ',
                    loading: true
                },
                {
                    name: 'Loading..',
                    itemToken: ' ',
                }
            ],
            loading: true,
            items: [],

        };

        this.onPlaidMessage = this.onPlaidMessage.bind(this);
    }
    
    async componentDidMount() {
        await api.getInstitutions();
        const { institutionStore } = this.props.store;
        const transactionPromises = [];
        
        institutionStore.institutions.forEach(i => transactionPromises.push(api.fetchTransactionsForItem(i.itemToken)))
        await Promise.all(transactionPromises);

        this.setState({
            data: [],
            loading: false,
        });
    }

    keyExtractor = (item, index) => `${index}`;

    renderItem = ({ item }) => (
        <BankCard 
            name={item.name}
            loading={this.state.loading}
            itemToken={item.itemToken}
            navigation={this.props.navigation}
        />
    );

    onPlaidMessage(data) {
        const { domainStore } = this.props.store;
        if(data.eventName === 'EXIT') {
            domainStore.setPlaidActive(false);
        }
    }

    renderCalendarItem(item) {
        const { data } = item;
        return (
            <View style={{ padding: 5 }}>
                <TransactionCard 
                    name={data.name}
                    amount={data.amount}
                    date={data.date}
                    category={data.mainCategory}
                />
            </View>
        );
      }
    
    renderEmptyDate() {
        return (
            <View style={styles.emptyDate} />
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    loadItems(day) {
        const { transactionStore } = this.props.store;
        const strTime = moment(day.timestamp).format('YYYY-MM-DD');
        const transactions = transactionStore.getTransactionsOnDate(moment(day.timestamp).format('YYYY-MM-DD'));

        if (!this.state.items[strTime]) {
            this.state.items[strTime] = [];
            transactions.forEach(t => {
                this.state.items[strTime].push({
                    data: t
                });
            });
        }
        
        const newItems = {};
        Object.keys(this.state.items).forEach(key => newItems[key] = this.state.items[key]);
        this.setState({
            items: newItems
        });
    }
    

    render() {
        const { domainStore, institutionStore, accountStore } = this.props.store;
        const netBalance = helpers.format(helpers.round(accountStore.netBalance, 2));
        const cashBalance = helpers.format(helpers.round(accountStore.cashBalance, 2));
        const creditDebt = helpers.format(helpers.round(accountStore.creditDebt, 2));
        const investmentBalance = helpers.format(helpers.round(accountStore.investmentBalance, 2));
        
        if(domainStore.plaidActive) {
            return (<PlaidAuthenticator
                onMessage={console.log}
                publicKey=""
                env="development"
                product="auth,transactions"
                clientName="Marshmallowsocks Finance"
                onMessage={this.onPlaidMessage}
              />);
        }

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header navigation={this.props.navigation} />
                </View>
                <View style={styles.body}>
                    <ScrollView style={styles.scroller}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 0.65, alignItems: 'stretch'}}>
                                <NetBalanceCard
                                    amount={netBalance}
                                    loading={this.state.loading}
                                />
                            </View>
                            <View style={{flex: 0.35, alignSelf: 'flex-end', flexDirection: 'column'}}>
                                <ValueDisplayCard 
                                    type='cash'
                                    amount={cashBalance}
                                    loading={this.state.loading}
                                />
                                <ValueDisplayCard 
                                    type='liability'
                                    amount={creditDebt}
                                    loading={this.state.loading}
                                />
                                <ValueDisplayCard 
                                    type='investment'
                                    amount={investmentBalance}
                                    loading={this.state.loading}
                                />
                            </View>
                        </View>
                        <View style={styles.institutions}>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={this.keyExtractor}
                                data={this.state.loading ? this.state.data : institutionStore.institutions}
                                renderItem={this.renderItem}
                            /> 
                        </View>
                    </ScrollView>
                    { this.state.loading ? <View /> :
                        <View style={styles.container}>
                            <Agenda
                                items={this.state.items}
                                loadItemsForMonth={this.loadItems.bind(this)}
                                renderItem={this.renderCalendarItem.bind(this)}
                                renderEmptyDate={this.renderEmptyDate.bind(this)}
                                rowHasChanged={this.rowHasChanged.bind(this)}
                                pastScrollRange={0}
                                futureScrollRange={0}
                                style={{
                                    flex: 1,
                                }}
                            />
                        </View>
                    }
                </View>
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="Add institution" onPress={() => { domainStore.setPlaidActive(true) }}>
                        <Icon name="ios-add" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="Add group" onPress={() => {}}>
                        <Icon name="ios-cloud" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="idk lol" onPress={() => {}}>
                        <Icon name="md-done-all" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 0.12,
    },
    body: {
        flex: 0.88,
        marginLeft: 10,
        marginRight: 10,
    },
    scroller: {
        flex: 0.01,
    },
    institutions: {
        marginTop: 10,
    },
    calendar: {
        marginTop: 10,
        flex: 0.99,
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

export default inject('store')(observer(HomeScreen));