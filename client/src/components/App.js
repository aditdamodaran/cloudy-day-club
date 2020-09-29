import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux'
import Login from './Login';
import Dashboard from './Dashboard';
import { token } from '../spotify';
import configureStore from '../store/configureStore';
import '../styles/styles.scss'

const store = configureStore();

const App = () => {
  const [authToken, setToken] = useState('')

  useEffect(() => {
    setToken(token)
  }, [authToken])

  return (
    <div>
      {token ? (
        <Provider store={store}>
          <Dashboard />
        </Provider>
      ) : <Login />}
    </div>
  )
}

export default App;
