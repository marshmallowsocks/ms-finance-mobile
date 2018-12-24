import AuthenticationStore from './AuthenticationStore';
import InstitutionStore from './InstitutionStore';
import AccountStore from './AccountStore';
import TransactionStore from './TransactionsStore';
import DomainStore from './DomainStore';

class ObservableMSFinanceStore {
    constructor() {
        if(!ObservableMSFinanceStore.instance) {
            this.authenticationStore = new AuthenticationStore(this);
            this.institutionStore = new InstitutionStore(this);
            this.accountStore = new AccountStore(this);
            this.transactionStore = new TransactionStore(this);
            this.domainStore = new DomainStore(this);
            ObservableMSFinanceStore.instance = this;
        }
    }
}

const instance = new ObservableMSFinanceStore();
export default instance;