import { 
    observable,
    action,
    decorate,
} from 'mobx';

class AuthenticationStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    username = '';
    token = '';

    setUsername(username) {
        this.username = username;
    }

    setAuthtoken(token) {
        this.token = token;
    }
}


export default decorate(AuthenticationStore, {
    username: observable,
    password: observable,
    setUsername: action.bound,
    setAuthtoken: action.bound,
});