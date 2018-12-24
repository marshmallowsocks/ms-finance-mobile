import {
    observable,
    action,
    decorate
} from 'mobx';

class InstitutionStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    institutions = [];

    addInstitution(institution) {
        this.institutions.push(institution);
    }
}

export default decorate(InstitutionStore, {
    institutions: observable,
    addInstitution: action.bound  
});