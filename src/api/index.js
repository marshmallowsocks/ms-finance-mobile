import constants from '../constants';
import store from '../store';
import { createApolloFetch } from 'apollo-fetch';

class API {
    constructor() {
        if(!API.instance) {
            API.instance = this;
            API.isInitialized = false;
            
            this.fetch = createApolloFetch({ uri: constants.api.GRAPHQL});

            this.fetch.use(({ request, options }, next) => {
                options.headers = {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${this.getToken()}`
                };
                next();
            });

            API.isInitialized = true;
        }
        return API.instance;
    }

    client() {
        return this.fetch;
    }

    getToken() {
        return store.authenticationStore.token;
    }

    async login({username, password}) {
        try {
            let { authenticationStore } = store;
            let tokenBody = await fetch(`${constants.api.API_BASE_URL}${constants.api.auth.LOGIN}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            let token = await tokenBody.json();
            authenticationStore.setUsername(username);
            authenticationStore.setAuthtoken(token.token);
            //console.log('Logged in!');
            return token;
        }
        catch(e) {
            //console.log('Some shit happened. ' + JSON.stringify(e, null, 2));
            return null;
        }
    }

    async getInstitutions() {
        //console.log('Getting institutions...');
        try {
            const { institutionStore } = store;
            const query = `
                query {
                    institutions {
                        name
                        itemToken
                    }
                }
            `;
            const result = await this.fetch({ query });
            result.data.institutions.forEach(i => institutionStore.addInstitution(i));
        }
        catch(e) {
            //console.log('client shit: ' + JSON.stringify(e, null, 2));
        }
    }

    async fetchTransactionsForItem(itemToken) {
        //console.log('Fetching transaction data...');
        try {
            const { transactionStore } = store;
            const query = `
                query {
                    transactionsForItem(itemToken: "${itemToken}") {
                        transactions {
                            name
                            accountId
                            amount
                            category
                            date
                        }
                    }
                }
            `;
            const result = await this.fetch({ query });
            const { transactions } = result.data.transactionsForItem;
            transactionStore.addAllTransactions(transactions.map(t => {
                return {
                    ...t,
                    itemId: itemToken
                };
            }));
        }
        catch(e) {
            //console.log('Transactions shit..' + JSON.stringify(e, null, 2));
        }
    }

    async fetchAccountData(itemToken) {
        //console.log('Fetching account data...');
        try {
            const { accountStore } = store;
            const query = `
                query {
                    accountsForItem(itemToken: "${itemToken}") {
                        accounts {
                            accountId
                            balances {
                                available
                                current
                                limit
                            }
                            name
                            officialName
                            type
                        }
                        item {
                            itemId
                        }
                    }
                }
            `;

            const result = await this.fetch({ query });
            const { accounts } = result.data.accountsForItem;
            accountStore.addAccountCollection(accounts.map(account => {
                return {
                    ...account,
                    itemId: itemToken
                };
            }));
        }
        catch(e) {
            //console.log('Account shit: ' + JSON.stringify(e, null, 2));
        }
    }

    getAccountData (itemToken) {
        //console.log('Getting account data for: ' + itemToken);
        const { accountStore } = store;

        return accountStore.allAccounts.filter(account => account.itemId === itemToken);
    }

    transactionDataForItem (itemToken) {
        //console.log('Getting transaction data for: ' + itemToken);
        const { transactionStore } = store;

        transactionStore.setCurrentTransactions(
            transactionStore.allTransactions.filter(t => t.itemId === itemToken)
        );
    }

    transactionDataForAccount (accountId) {
        const { transactionStore } = store;
        transactionStore.setCurrentTransactions(
            transactionStore.allTransactions.filter(t => t.accountId === accountId)
        );
    }
}

const instance = new API();
export default instance;