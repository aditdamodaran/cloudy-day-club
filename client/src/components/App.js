import React from 'react';
import { Provider } from 'react-redux'
import Login from './Login';
import Dashboard from './Dashboard';
import { token } from '../spotify';
import configureStore from '../store/configureStore';
import { PersistGate } from 'redux-persist/integration/react'
import '../styles/styles.scss'

const {store, persistor} = configureStore();

class App extends React.Component {
  state = {
    token: ''
  };

  componentDidMount() {
    this.setState({ token });
  }

  render() {
    const { token } = this.state;
    console.log(token)
    
    return (
      <div>
        {token ? (
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Dashboard />
            </PersistGate>
          </Provider>
          ) : <Login />}
      </div>
    );
  }
}

export default App;
