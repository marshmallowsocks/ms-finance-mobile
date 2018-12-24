import React from 'react';
import DismissKeyboard from 'dismissKeyboard';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Bubbles } from 'react-native-loader';
import {
    Alert,
    StyleSheet,
    View,
    TouchableWithoutFeedback,
} from 'react-native';
import {
    Button,
    Input,
    Icon,
} from 'react-native-elements';
import api from '../../api';
import constants from '../../constants';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameValidation: '',
            passwordValidation: '',
            loading: false,
        };
    
        this.updateState = this.updateState.bind(this);
        this.validateAndLogin = this.validateAndLogin.bind(this);
    }

    updateState(type, data) {
        switch(type) {
            case 'username':
                this.setState({
                    username: data,
                    usernameValidation: '',
                });
                break;
            case 'password': 
                this.setState({
                    password: data,
                    passwordValidation: ''
                });
                break;
        }
    }

    async validateAndLogin() {
        DismissKeyboard();
        let valid = true;
        if(this.state.username === '') {
            this.setState({
                usernameValidation: 'Please enter a username.'
            });
            valid = false;
        }

        if(this.state.password === '') {
            this.setState({
                passwordValidation: 'Please enter a password.'
            });
            valid = false;
        }

        if(!valid) { 
            return;
        }

        this.setState({
            loading: true
        });

        const token = await api.login({
            username: this.state.username,
            password: this.state.password,
        });

        if(!token) {
            Alert.alert(
                'Invalid login',
                'Your username or password was incorrect. Please check your credentials and try again!'
            );
            this.setState({
                loading: false,
                username: '',
                password: ''
            });
        }

        else {
            this.props.navigation.navigate('Home');
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => DismissKeyboard()}>
                <View style={styles.root}>
                    <View style={styles.logo}>
                        <Icon 
                            name='dollar'
                            color='white'
                            type='font-awesome'
                            size={100}
                        />                    
                    </View>
                    <View style={styles.form}>
                        <View>
                            <Input 
                                value={this.state.username}
                                label={'Username'}
                                labelStyle={styles.formLabelStyle}
                                containerStyle={styles.formContainerStyle}
                                inputContainerStyle={styles.inputContainerStyle}
                                inputStyle={styles.formInputStyle}
                                rightIcon={
                                    <Icon
                                      name='user'
                                      type='font-awesome'
                                      size={24}
                                      color='white'
                                    />
                                }
                                onChangeText={username => this.updateState('username', username)}
                            />
                            <Input
                                value={this.state.password}
                                label={'Password'}
                                labelStyle={styles.formLabelStyle}
                                containerStyle={styles.formContainerStyle}
                                inputContainerStyle={styles.inputContainerStyle}
                                inputStyle={styles.formInputStyle}
                                rightIcon={
                                    <Icon
                                      name='lock'
                                      type='font-awesome'
                                      size={24}
                                      color='white'
                                    />
                                }
                                secureTextEntry={true} 
                                onChangeText={password => this.updateState('password', password)}
                            />
                        </View>
                        <View>
                            <Button 
                                buttonStyle={styles.loginButton}
                                elevation={5}
                                titleStyle={styles.loginTextStyle}
                                title={this.state.loading ? '' : 'Login'}
                                titleStyle={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    fontFamily: 'varela',
                                    color: constants.colors.BASE_RED,
                                }}
                                icon={ this.state.loading ?
                                    <Bubbles size={15} color={colors.BASE_RED} />
                                : null }
                                onPress={this.validateAndLogin}
                            />
                        </View>
                    </View>
                    <KeyboardSpacer />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const { colors } = constants;
const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.BASE_RED,
    },
    logo: {
        flex: 0.6,
        justifyContent: 'center'
    },
    form: {
        flex: 0.4,
        justifyContent: 'space-around'
    },
    loginButton: {
        borderRadius: 25,
        backgroundColor: colors.BASE_OFFWHITE,
        marginLeft: 20,
        marginRight: 20,
        height: 60,
        shadowColor: constants.colors.BASE_OFFWHITE,
        shadowOpacity: 0.8,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    loginTextStyle: {
        color: colors.BASE_RED,
        fontFamily: 'varela',
    },
    loader: {
        alignSelf: 'center',
        justifyContent: 'center',
        paddingTop: 40
    },
    labelStyle: {
        color: colors.BASE_OFFWHITE,
        fontFamily: 'varela',
    },
    inputContainerStyle: {
        borderBottomWidth: 1,
        borderBottomColor: colors.BASE_OFFWHITE,
    },
    formContainerStyle: {
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    formLabelStyle: {
        color: colors.BASE_OFFWHITE,
        fontFamily: 'varela',
    },
    formInputStyle: {
        color: colors.BASE_OFFWHITE,
        fontFamily: 'varela',
    },
});

export default LoginScreen;
