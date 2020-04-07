import React from 'react'

export default function Header({client, amount}) {
  return (
    <header className="column is-narrow" style={{textAlign: 'center', width: 250, height: '100vh', backgroundColor: 'currentColor'}}>
      <img src={`https://api.adorable.io/avatars/285/${+(Date.now())}.png`} />
      <h3 className="is-size-3" style={{color: 'white'}}>{client}</h3>
      <p style={{color: 'white'}}>{amount}</p>
    </header>
  )
}
