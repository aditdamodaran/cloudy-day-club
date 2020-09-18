import React from 'react';
import { Provider } from 'react-redux'
import Login from './Login';
import Dashboard from './Dashboard';
import { token } from '../spotify';
import configureStore from '../store/configureStore';
import '../styles/styles.scss'

const store = configureStore();

class App extends React.Component {
  state = {
    token: ''
  };

  componentDidMount() {
    this.setState({ token });
  }

  render() {
    const { token } = this.state;
    
    return (
      <div>
        {token ? (
          <Provider store={store}>
            <Dashboard />
          </Provider>
          ) : <Login />}
      </div>
    );
  }
}

export default App;
