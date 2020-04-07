import React, { useState, useRef } from 'react'
import {Store} from '../store';


export default function Transactions({ transactions }) {
  const typeRef = useRef();
  const amountRef = useRef();
  const { state, dispatch } = React.useContext(Store);

  console.log(transactions);
  function onClick (e) {
    e.preventDefault();
    const type = typeRef.current.value;
    const amount = amountRef.current.value;
    fetch('http://127.0.0.1:4000/api/transactions', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({
        type,
        amount,
      }), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(() => dispatch({
      type: 'FORCE_UPDATE',
      payload: [],
    }));
  }
  const [selected, setSelected] = useState(null);
  return (
    <section className="container">
      <section className="accordions">
        {
          (!transactions || transactions?.length === 0) &&
          (<p className="is-size-4">No movements have been done yet.</p>)
        }
        {transactions?.map((transaction, i) => (
          <article className={`accordion ${selected === i && 'is-active'}`}>
            <div className="accordion-header toggle" onClick={() => setSelected(i)} style={{textAlign: 'center', color: transactions.type === 'credit' ? 'green' : 'red'}}>
              $ {transaction.amount}
            </div>
            <div class="accordion-body">
              <div class="accordion-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
                </div>
            </div>
          </article>
        ))}
      </section>
      <section>
        <div class="field has-addons">
          <p class="control">
            <span class="select">
              <select ref={typeRef}>
                <option value="credit">Add</option>
                <option value="debit">Extract</option>
              </select>
            </span>
          </p>
          <p class="control is-expanded">
            <input ref={amountRef} class="input" type="text" placeholder="Amount of money" />
          </p>
          <p class="control">
            <a class="button" onClick={onClick}>
              Transfer
            </a>
          </p>
        </div>
      </section>
      </section>
  )
}
