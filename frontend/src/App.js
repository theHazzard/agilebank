import React, {useEffect, useContext} from 'react';
import Header from './components/Header';
import Transactions from './components/Transactions';
import {Store} from './store';

import './App.css';

function App() {
  const { state, dispatch } = React.useContext(Store);
  const trigger = state ? state.version : 0;
  useEffect(() =>  {
    Promise.all([
      fetch('http://127.0.0.1:4000/api/account')
        .then(function(response) {
          return response.json();
        }),
      fetch('http://127.0.0.1:4000/api/transactions')
        .then(function(response) {
          return response.json();
        })
    ]).then(([account, transactions]) =>
      dispatch({
        type: 'UPDATE',
        payload: {
          account,
          movements: transactions
        },
      }));
    
    return () => {};
  }, [trigger])
  
  const {name, amount} = state?.account;
  const {movements} = state;

  return (
    <div className="columns">
      <Header client={name} amount={amount} />
      <section className="column">
        <Transactions transactions={movements}/>
      </section>
    </div>
  );
}

export default App;
