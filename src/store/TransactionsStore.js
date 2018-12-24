import {
    observable,
    action,
    decorate,
} from 'mobx';

import moment from 'moment';

class TransactionStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.ignoreTransfers = false;
    }

    allTransactions = [];
    currentTransactions = [];

    addAllTransactions (transactions) {
        const creditCardPayment = /.*payment.*thank you.*/gmi;

        transactions.forEach(transaction => {
            if(creditCardPayment.test(transaction.name)) {
                transaction.category.unshift('Credit Card Payment');
                transaction.ignore = this.ignoreTransfers;
            }
            if(transaction.category && transaction.category.length) {
                transaction.mainCategory = transaction.category.shift();
            }
            if(transaction.mainCategory === 'Transfer') {
                transaction.ignore = this.ignoreTransfers;
            }
            this.allTransactions.push(transaction);
        });
    }

    getTransactionsOnDate (date) {
        return this.allTransactions.filter(t => t.date === date);
    }

    setCurrentTransactions (transactions) {
        this.currentTransactions = transactions;
    }

    setCurrentTransactionsForAccount (accountId) {
        //console.log('Setting current transactions for account: ' + accountId);
        this.currentTransactions = this.allTransactions.filter(t => t.accountId === accountId);
    }
    
    getTransactionsAggregateForTimescale(timeScale, date) {
        const transactionForDate = {
            debit: 0,
            credit: 0
        };
        let timeScaleTest;

        switch(timeScale) {
            case 'date':
                timeScaleTest = (date1, date2) => date1 === date2;
                break;
            case 'week':
                timeScaleTest = (date1, date2) => moment(date1).isSame(date2, 'week');
                break;
            case 'month':
                timeScaleTest = (date1, date2) => moment(date1).isSame(date2, 'month');
                break;
        }

        this.allTransactions.forEach(transaction => {
            if(timeScaleTest(transaction.date, date) && !transaction.ignore) {
                if(transaction.amount < 0) {
                    transactionForDate.credit -= transaction.amount;
                }
                else {
                    transactionForDate.debit += transaction.amount;
                }
            }
        });

        return transactionForDate;
    }
}

export default decorate(TransactionStore, {
    allTransactions: observable,
    currentTransactions: observable,
    addAllTransactions: action.bound,
    setCurrentTransactions: action.bound,
});