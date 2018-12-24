import React from 'react';
import AppNavigator from './src/routes';
import Store from './src/store';
import { Provider } from 'mobx-react';
import { 
  Font,
  AppLoading,
} from 'expo';
import { createAppContainer } from 'react-navigation';

const AppContainer = createAppContainer(AppNavigator); 

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
  }

  async _loadFont() {
    return Font.loadAsync({
      'varela': require('./assets/fonts/VarelaRound-Regular.ttf')
    });
  }
  
  render() {
    if(!this.state.initialized) {
      return (<AppLoading 
        startAsync={this._loadFont}
        onFinish={() => this.setState({ initialized: true })}
        onError={console.warn}
      />);
    }
    
    return (
        <Provider store={Store}>
          <AppContainer />
        </Provider>
    );
  }
}