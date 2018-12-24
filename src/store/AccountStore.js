import { 
    observable,
    action,
    decorate,
} from 'mobx';

class AccountStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }
    
    accounts = {};
    allAccounts = [];
    allCrypto = [];
    groups = [];
    netBalance = 0;
    cashBalance = 0;
    investmentBalance = 0;
    creditDebt = 0;

    cleanBalance(balances) {
        if(balances.limit !== null) {
            // is a credit card / line of credit
            return balances.current !== null ? balances.current : (balances.available !== null ? balances.limit - balances.available : -Infinity)
        }
        return balances.available !== null ? balances.available : (balances.current !== null ? balances.current : -Infinity);
    }

    addAccountCollection (accounts) {
        //console.log('Adding account collection.');
        accounts.forEach(account => {
            this.addAccount(account);
        });
    }

    addAccount (account) {
        const type = account.type;
        if(!this.accounts[type]) {
            this.accounts[type] = [];
        }

        this.accounts[type] = [...this.accounts[type], account];
        this.allAccounts = [...this.allAccounts, account];
        
        this.recalculateBalance();
    }

    calculateBalance (accounts) {
        Object.keys(accounts).forEach(type => {
            accounts[type].forEach(account => {
                const balance = this.cleanBalance(account.balances);
                if(balance === -Infinity) {
                    return;
                }
                switch(type) {
                    case 'brokerage':
                        this.investmentBalance += balance;
                        break;
                    case 'depository':
                        this.cashBalance += balance;
                        break;
                    case 'credit':
                        this.creditDebt += balance;
                        break;
                }
            });
        });
        this.netBalance = this.cashBalance + this.investmentBalance + this.cryptoBalance - this.creditDebt;
    }

    recalculateBalance () {
        this.investmentBalance = 0;
        this.creditDebt = 0;
        this.cashBalance = 0;
        this.cryptoBalance = 0;

        this.calculateBalance(this.accounts);
    }
}

export default decorate(AccountStore, {
    accounts: observable,
    allAccounts: observable,
    allCrypto: observable,
    groups: observable,
    netBalance: observable,
    cashBalance: observable,
    investmentBalance: observable,
    cryptoBalance: observable,
    creditDebt: observable,
    addAccountCollection: action.bound,
    addAccount: action.bound,
    calculateBalance: action.bound,
    recalculateBalance: action.bound
});