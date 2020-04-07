
import React from 'react'

export const Store = React.createContext();

const initialState = {
  version: 0,
  account: {},
  movements: []
}

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE':
      return { ...state, ...action.payload };
    case 'FORCE_UPDATE':
      const _state = { ...state, version: state.version + 1 };
      debugger;
      return _state;
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}