import {
    observable,
    action,
    decorate
} from 'mobx';

class DomainStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    currentAccountId = '';
    plaidActive = false;

    setCurrentAccountId(accountId) {
        this.currentAccountId = accountId;
        this.rootStore.transactionStore.setCurrentTransactionsForAccount(accountId);
    }

    setPlaidActive(plaidActive) {
        this.plaidActive = plaidActive;
    }

    getCurrentAccountId() {
        return this.currentAccountId;
    }
}

export default decorate(DomainStore, {
    currentAccountId: observable,
    plaidActive: observable,
    setCurrentAccountId: action.bound,
});